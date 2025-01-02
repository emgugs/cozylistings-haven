import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Settings {
  api_key: string;
  bearer_token: string;
  endpoint_for_sale: string;
  endpoint_leased: string;
  endpoint_for_lease: string;
  endpoint_sold: string;
}

export const useSettings = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("No active session");
      }

      const { data: settings, error } = await supabase
        .from("settings")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (error) throw error;
      return settings;
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error;
    }
  };

  const saveSettings = async (settings: Partial<Settings>) => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("No active session");
      }

      const settingsData = {
        ...settings,
        user_id: session.user.id,
      };

      const { data: existingSettings, error: fetchError } = await supabase
        .from("settings")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

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
    } catch (error: any) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save settings. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async (endpoint: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("No active session");
      }

      const { data: functionUrl } = await supabase.functions.invoke('vaultre-proxy', {
        body: JSON.stringify({ endpoint }),
      });

      toast({
        title: "Connection Successful",
        description: "Successfully connected to the API endpoint.",
      });
      
      return functionUrl;
    } catch (error: any) {
      console.error('API Test Error:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect to the API endpoint. Please check your settings.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    loading,
    fetchSettings,
    saveSettings,
    testConnection,
  };
};