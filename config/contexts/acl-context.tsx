"use client";
import { useState } from "react";
import { createContext } from "react";
import { AnyMongoAbility } from "@casl/ability";
import {
  AbilityContextvalue,
  AclGuardProps,
  ACLObj,
  RouteConfig,
} from "@/types/types";
import { useAuth } from "@/hooks/use-auth";
import { defineRulesFor } from "./ability-setter";
import NotAuthorized from "@/components/not-authorized";
import { usePathname } from "next/navigation";
import { routeConfig } from "@/navigation/navigation";

const defaultACLObj: ACLObj = {
  subject: "all",
};

const AbilityContext = createContext<AbilityContextvalue>({
  ability: undefined,
  setAbility: () => null,
});

const AbilityProvider = (props: AclGuardProps) => {
  const auth = useAuth();
  const pathname = usePathname();
  const { children, aclAbilities } = props;
  const [ability, setAbility] = useState<AnyMongoAbility | undefined>(
    undefined
  );
  console.log("ACL ABILITIES", aclAbilities);

  if (
    pathname === "/404" ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return <>{children}</>;
  } else if (!!auth.user && !!auth.user.role && !ability) {
    const options =
      routeConfig[auth?.user.role?.value as keyof RouteConfig]?.map(
        (item) => item.subject
      ) || [];

    setAbility(defineRulesFor(auth.user.role?.value, options));
  } else if (ability && ability.can("read", aclAbilities.subject)) {
    const values = {
      ability,
      setAbility,
    };

    return (
      <AbilityContext.Provider value={values}>
        {children}
      </AbilityContext.Provider>
    );
  } else {
    return <NotAuthorized />;
  }
};

export { AbilityProvider, AbilityContext, defaultACLObj };

export const AbilityConsumer = AbilityContext.Consumer;
