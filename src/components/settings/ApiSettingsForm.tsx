import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/hooks/use-settings";

interface ApiSettingsFormProps {
  onSave?: () => void;
}

export const ApiSettingsForm = ({ onSave }: ApiSettingsFormProps) => {
  const [apiKey, setApiKey] = useState("");
  const [bearerToken, setBearerToken] = useState("");
  const [endpoints, setEndpoints] = useState({
    forSale: "",
    leased: "",
    forLease: "",
    sold: "",
  });
  
  const { loading, fetchSettings, saveSettings, testConnection } = useSettings();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await fetchSettings();
      if (settings) {
        setApiKey(settings.api_key || "");
        setBearerToken(settings.bearer_token || "");
        setEndpoints({
          forSale: settings.endpoint_for_sale || "",
          leased: settings.endpoint_leased || "",
          forLease: settings.endpoint_for_lease || "",
          sold: settings.endpoint_sold || "",
        });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const handleSave = async () => {
    try {
      await saveSettings({
        api_key: apiKey,
        bearer_token: bearerToken,
        endpoint_for_sale: endpoints.forSale,
        endpoint_leased: endpoints.leased,
        endpoint_for_lease: endpoints.forLease,
        endpoint_sold: endpoints.sold,
      });
      onSave?.();
    } catch (error) {
      console.error("Error in handleSave:", error);
    }
  };

  return (
    <div className="space-y-6">
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
                  onClick={() => testConnection(endpoints[key as keyof typeof endpoints])}
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

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};