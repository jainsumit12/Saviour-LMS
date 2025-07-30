"use client";
import { AbilityProvider, defaultACLObj } from "@/config/contexts/acl-context";
import { AuthProvider } from "@/config/contexts/auth-context";
import BlankLayout from "@/components/blank-layout";
import UserLayout from "@/components/user-layout";
import { ACLObj, RouteConfig } from "@/types/types";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import RouteProgress from "./route-progress";
import { Toaster } from "../ui/sonner";
import { routeConfig } from "@/navigation/navigation";
import { useSelector } from "react-redux";

export default function ClientLayoutSwitcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const ROLE: string = useSelector(
    (state: any) => state?.data?.userdata?.user?.role.value
  );
  const pathname = usePathname();
  const config: ACLObj | undefined = (
    routeConfig[(ROLE as keyof RouteConfig) ?? "admin"] ?? []
  ).find((item) => {
    if (pathname.includes(item.path)) {
      return { subject: item.subject };
    }

    return undefined;
  });

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
        <AbilityProvider aclAbilities={config!}>
          <RouteProgress />
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
