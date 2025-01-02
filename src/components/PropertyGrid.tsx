import React from "react";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "./PropertyCard";
import { supabase } from "@/integrations/supabase/client";

const fetchProperties = async () => {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Fetch property details for each ID
  const propertiesWithDetails = await Promise.all(
    data.map(async (property) => {
      try {
        const { data: functionUrl } = await supabase.functions.invoke('vaultre-proxy', {
          body: JSON.stringify({ endpoint: `https://ap-southeast-2.api.vaultre.com.au/api/v1.3/properties/${property.external_id}` }),
        });

        // Map API response to our PropertyCard props
        return {
          id: property.id,
          name: functionUrl.headline || 'Unnamed Property',
          price: functionUrl.price?.display || 'Price on Application',
          image: functionUrl.images?.[0]?.url,
          baths: functionUrl.bathrooms,
          beds: functionUrl.bedrooms,
          cars: functionUrl.carSpaces,
          address: `${functionUrl.address?.streetNumber || ''} ${functionUrl.address?.street || ''}, ${functionUrl.address?.suburb || ''}, ${functionUrl.address?.state || ''}`,
        };
      } catch (error) {
        console.error(`Error fetching details for property ${property.external_id}:`, error);
        return null;
      }
    })
  );

  return propertiesWithDetails.filter(Boolean);
};

const PropertyGrid = () => {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[4/3] rounded-t-xl" />
              <div className="space-y-3 p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-500">Error loading properties. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;