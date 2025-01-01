import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const DashboardSettings = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");
  const [bearerToken, setBearerToken] = useState(localStorage.getItem("bearerToken") || "");
  const [endpoints, setEndpoints] = useState({
    forSale: localStorage.getItem("endpoint_forSale") || "",
    leased: localStorage.getItem("endpoint_leased") || "",
    forLease: localStorage.getItem("endpoint_forLease") || "",
    sold: localStorage.getItem("endpoint_sold") || "",
  });
  const { toast } = useToast();

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("bearerToken", bearerToken);
    localStorage.setItem("endpoint_forSale", endpoints.forSale);
    localStorage.setItem("endpoint_leased", endpoints.leased);
    localStorage.setItem("endpoint_forLease", endpoints.forLease);
    localStorage.setItem("endpoint_sold", endpoints.sold);

    toast({
      title: "Settings Saved",
      description: "Your API settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">API Settings</h2>
        <Button onClick={handleSave}>Save Settings</Button>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bearerToken">Bearer Token</Label>
            <Input
              id="bearerToken"
              value={bearerToken}
              onChange={(e) => setBearerToken(e.target.value)}
              placeholder="Enter your Bearer token"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Endpoint Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forSale">For Sale Endpoint</Label>
            <Input
              id="forSale"
              value={endpoints.forSale}
              onChange={(e) =>
                setEndpoints({ ...endpoints, forSale: e.target.value })
              }
              placeholder="Enter For Sale endpoint URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leased">Leased Endpoint</Label>
            <Input
              id="leased"
              value={endpoints.leased}
              onChange={(e) =>
                setEndpoints({ ...endpoints, leased: e.target.value })
              }
              placeholder="Enter Leased endpoint URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="forLease">For Lease Endpoint</Label>
            <Input
              id="forLease"
              value={endpoints.forLease}
              onChange={(e) =>
                setEndpoints({ ...endpoints, forLease: e.target.value })
              }
              placeholder="Enter For Lease endpoint URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sold">Sold Endpoint</Label>
            <Input
              id="sold"
              value={endpoints.sold}
              onChange={(e) =>
                setEndpoints({ ...endpoints, sold: e.target.value })
              }
              placeholder="Enter Sold endpoint URL"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardSettings;