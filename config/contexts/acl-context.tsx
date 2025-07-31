"use client";
import { useEffect, useState } from "react";
import { AclGuardProps } from "@/types/types";
import { useAuth } from "@/hooks/use-auth";
import NotAuthorized from "@/components/not-authorized";
import { usePathname } from "next/navigation";

const AbilityProvider = ({ aclAbilities, children }: AclGuardProps) => {
  const { user, ability, abilityChanger } = useAuth();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!!user && !!user.role?.value && !ability) {
      abilityChanger(user);
    }
    setIsReady(true);
  }, [user, ability]);

  const isPublic = ["/404", "/", "/login", "/register"].includes(pathname);

  if (!isReady && !isPublic) return null;

  if (isPublic) return <>{children}</>;

  if (ability && ability.can("read", aclAbilities.subject)) {
    return <>{children}</>;
  }
  if (!aclAbilities) return <NotAuthorized />;
};

export default AbilityProvider;
