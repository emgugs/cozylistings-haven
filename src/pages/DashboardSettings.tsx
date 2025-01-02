import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiSettingsForm } from "@/components/settings/ApiSettingsForm";
import { supabase } from "@/integrations/supabase/client";

const DashboardSettings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">API Settings</h2>
      </div>
      <ApiSettingsForm />
    </div>
  );
};

export default DashboardSettings;