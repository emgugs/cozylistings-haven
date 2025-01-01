import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const DashboardSettings = () => {
  const [apiKey, setApiKey] = useState("");
  const [bearerToken, setBearerToken] = useState("");
  const [endpoints, setEndpoints] = useState({
    forSale: "",
    leased: "",
    forLease: "",
    sold: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: settings, error } = await supabase
        .from("settings")
        .select("*")
        .single();

      if (error) throw error;

      if (settings) {
        setApiKey(settings.api_key);
        setBearerToken(settings.bearer_token);
        setEndpoints({
          forSale: settings.endpoint_for_sale || "",
          leased: settings.endpoint_leased || "",
          forLease: settings.endpoint_for_lease || "",
          sold: settings.endpoint_sold || "",
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: existingSettings } = await supabase
        .from("settings")
        .select("id")
        .single();

      const settingsData = {
        api_key: apiKey,
        bearer_token: bearerToken,
        endpoint_for_sale: endpoints.forSale,
        endpoint_leased: endpoints.leased,
        endpoint_for_lease: endpoints.forLease,
        endpoint_sold: endpoints.sold,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      };

      let error;
      if (existingSettings) {
        ({ error } = await supabase
          .from("settings")
          .update(settingsData)
          .eq("id", existingSettings.id));
      } else {
        ({ error } = await supabase.from("settings").insert([settingsData]));
      }

      if (error) throw error;

      toast({
        title: "Settings Saved",
        description: "Your API settings have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async (endpoint: string) => {
    try {
      const { data: functionUrl } = await supabase.functions.invoke('vaultre-proxy', {
        body: JSON.stringify({ endpoint }),
        headers: {
          'x-api-key': apiKey,
          'authorization': `Bearer ${bearerToken}`,
        },
      });

      toast({
        title: "Connection Successful",
        description: "Successfully connected to the API endpoint.",
      });
      
      console.log('API Response:', functionUrl);
    } catch (error) {
      console.error('API Test Error:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to the API endpoint. Please check your settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">API Settings</h2>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">X-Api-Key</Label>
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              type="password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bearerToken">Bearer Token</Label>
            <Input
              id="bearerToken"
              value={bearerToken}
              onChange={(e) => setBearerToken(e.target.value)}
              placeholder="Enter your Bearer token"
              type="password"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Endpoint Settings</h3>
        <div className="space-y-4">
          {[
            { key: 'forSale', label: 'For Sale Endpoint' },
            { key: 'leased', label: 'Leased Endpoint' },
            { key: 'forLease', label: 'For Lease Endpoint' },
            { key: 'sold', label: 'Sold Endpoint' }
          ].map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{label}</Label>
              <div className="flex gap-2">
                <Input
                  id={key}
                  value={endpoints[key as keyof typeof endpoints]}
                  onChange={(e) =>
                    setEndpoints({ ...endpoints, [key]: e.target.value })
                  }
                  placeholder={`Enter ${label} URL`}
                  className="flex-1"
                />
                <Button 
                  onClick={() => handleTestConnection(endpoints[key as keyof typeof endpoints])}
                  variant="outline"
                  disabled={loading}
                >
                  Test
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardSettings;