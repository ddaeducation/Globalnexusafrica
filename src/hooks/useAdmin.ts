import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      setUserId(session.user.id);

      const { data: isAdminRole } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });

      if (!isAdminRole) {
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return { isAdmin, loading, userId, signOut };
};
