import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);

      // 1. ambil user login
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("USER:", user);
      console.log("USER ERROR:", userError);

      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      // 2. ambil profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      console.log("PROFILE:", profile);
      console.log("PROFILE ERROR:", profileError);

      // 3. kalau tidak ada profile
      if (!profile || profileError) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      console.log("ROLE:", profile.role);

      // 4. cek role admin
      setAllowed(profile.role === "admin");
      setLoading(false);
    };

    checkUser();
  }, []);

  // loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  // kalau tidak allowed
  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}