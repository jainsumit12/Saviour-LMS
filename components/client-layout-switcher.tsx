"use client";
import { AuthProvider } from "@/config/contexts/auth-context";
import BlankLayout from "@/components/blank-layout";
import UserLayout from "@/components/user-layout";
import { ACLObj, RouteConfig, RouteItem } from "@/types/types";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import RouteProgress from "./route-progress";
import { Toaster } from "../ui/sonner";
import { routeConfig } from "@/navigation/navigation";
import { useSelector } from "react-redux";
import AbilityProvider from "@/config/contexts/acl-context";

export default function ClientLayoutSwitcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const ROLE: string = useSelector(
    (state: any) => state?.data?.userdata?.user?.role.value
  );
  const pathname = usePathname();
   const config = useMemo(() => {
    return (
      (routeConfig[(ROLE as keyof RouteConfig) ?? "admin"] ?? []).find(
        (item: RouteItem) => pathname.includes(item.path)
      ) as ACLObj | undefined
    );
  }, [pathname, ROLE]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 10,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouteProgress />
        <AbilityProvider aclAbilities={config as ACLObj}>
          {!!config ? (
            <UserLayout>{children}</UserLayout>
          ) : (
            <BlankLayout>{children}</BlankLayout>
          )}
          <Toaster closeButton position="top-right" richColors />
        </AbilityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
