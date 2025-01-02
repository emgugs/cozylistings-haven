import { serve } from "https://deno.fresh.dev/std@v9.6.1/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    console.log('Starting property sync...');

    // Get all user settings to fetch properties for each user's credentials
    const { data: settingsData, error: settingsError } = await supabaseClient
      .from('settings')
      .select('*');

    if (settingsError) throw settingsError;

    for (const settings of settingsData) {
      console.log(`Processing settings for user ${settings.user_id}`);

      const endpoints = [
        { url: settings.endpoint_for_sale, type: 'For Sale', status: 'Available' },
        { url: settings.endpoint_sold, type: 'For Sale', status: 'Sold' },
        { url: settings.endpoint_for_lease, type: 'For Lease', status: 'Available' },
        { url: settings.endpoint_leased, type: 'For Lease', status: 'Leased' },
      ].filter(endpoint => endpoint.url);

      for (const endpoint of endpoints) {
        try {
          console.log(`Fetching from endpoint: ${endpoint.url}`);
          
          const response = await fetch(endpoint.url, {
            headers: {
              'X-Api-Key': settings.api_key,
              'Authorization': `Bearer ${settings.bearer_token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
          }

          const properties = await response.json();

          // Process each property - only store IDs
          for (const prop of properties) {
            const propertyData = {
              external_id: prop.id?.toString(),
              listing_type: endpoint.type,
              status: endpoint.status,
            };

            // Upsert the property
            const { error: upsertError } = await supabaseClient
              .from('properties')
              .upsert(
                propertyData,
                { 
                  onConflict: 'external_id',
                  ignoreDuplicates: false,
                }
              );

            if (upsertError) {
              console.error('Error upserting property:', upsertError);
            }
          }
        } catch (error) {
          console.error(`Error processing endpoint ${endpoint.url}:`, error);
        }
      }
    }

    return new Response(
      JSON.stringify({ message: 'Property sync completed successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in sync-properties function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});