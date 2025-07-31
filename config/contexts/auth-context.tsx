"use client";
import { login, logout } from "@/reduxstore/authSlice";
import {
  AuthValuesType,
  LoginParams,
  RegisterParams,
  UserDataType,
} from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiStatus } from "@/helper/helper";
import { toast } from "sonner";
import { ApiUrl } from "../api/apiUrls";
import httpRequest from "../api/AxiosInterseptor";
import { routeConfig } from "@/navigation/navigation";
import { defineRulesFor } from "./ability-setter";

const defaultProvider: AuthValuesType = {
  user: null,
  setUser: () => null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setAbility: () => null,
  register: () => Promise.resolve(),
  ability: undefined,
  abilityChanger: () => null,
  authLoading: false,
  setAuthLoading: () => Boolean,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const myUser = useSelector((state: any) => state?.data?.userdata);
  const [user, setUser] = useState<UserDataType | null>(
    myUser?.isAuthenticated ? myUser?.user : defaultProvider.user
  );
  const [ability, setAbility] = useState<any>(undefined);
  const [authLoading, setAuthLoading] = useState(defaultProvider.authLoading);
  const router = useRouter();
  const dispatch = useDispatch();
  const path = usePathname();

  useEffect(() => {
    if (!myUser?.isAuthenticated && path !== "/login") handleLogout();
  }, [router]);

  const handleLogin = async (params: LoginParams) => {
    setAuthLoading(true);
    let response = await httpRequest.post(ApiUrl.LOGIN_URL, params);
    if (response.status === ApiStatus.STATUS_200) {
      let mainRes = response.data.data;
      toast.success("Login Successfully");
      setUser(mainRes);
      dispatch(login(mainRes));
      router.replace("/");
      setAuthLoading(false);
      setAbility(undefined);
      return;
    }
  };

  const authCheck = async () => {
    setUser(null);
    dispatch(logout());
    localStorage.removeItem("persist:root");
    toast.success("Logout Successfully");
    router.replace("/login");
  };

  const handleLogout = () => {
    authCheck();
  };

  const handleRegister = (params: RegisterParams) => {};
  const abilityChanger = (userdata: UserDataType) => {
    let options =
      routeConfig[userdata?.role?.value as keyof typeof routeConfig]?.map(
        (item) => item.subject
      ) || [];
    let newAbility = defineRulesFor(options);
    setAbility(newAbility);
  };
  const values = {
    user,
    setUser,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    authLoading,
    setAbility,
    ability,
    abilityChanger,
    setAuthLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
