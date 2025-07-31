"use client";
import BlankLayout from "@/components/blank-layout";
import FallbackSpinner from "@/components/reusableComponents/Fallback";
import { useAuth } from "@/hooks/use-auth";
import { routeConfig } from "@/navigation/navigation";
import { ROLES } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const auth = useAuth();

  const getHomeRoute = (role: string) => {
    if (role === ROLES.ADMIN) {
      return "/dashboard";
    } 
    else if (role === ROLES.PARTNER) {
      return routeConfig[ROLES.PARTNER][0].path;
    } else if (role === ROLES.INSTITUTE) {
      return routeConfig[ROLES.INSTITUTE][0].path;
    } else if (role === ROLES.STUDENT) {
      return routeConfig[ROLES.STUDENT][0].path;
    } else {
      return "/401";
    }
  };

  useEffect(() => {
    const role = auth.user?.role?.value;
    if (role) {
      router.replace(getHomeRoute(role));
    } else {
      router.replace("/login");
    }
  }, [auth.user?.role?.value]);

  return (
    <BlankLayout>
      <FallbackSpinner />
    </BlankLayout>
  );
}
