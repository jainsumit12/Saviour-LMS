// ===============================next APP props types ========================//

import { AnyMongoAbility } from "@casl/ability";
import { NextComponentType, NextPageContext } from "next";
import { ReactElement, ReactNode } from "react";
export interface RouteChild {
  title: string;
  path: string;
  icon: string;
  subject: string;
  action: string;
}

export interface RouteItem extends RouteChild {
  children?: RouteChild[];
}
export type RouteRole = "admin" | "partner" | "institute" | "student";

export type RouteConfig = {
  [role in RouteRole]: RouteItem[];
};
export interface AclGuardProps {
  children: ReactNode;
  aclAbilities: ACLObj;
}
export enum ROLES {
  ADMIN = "admin",
  PARTNER = "partner",
  INSTITUTE = "institute",
  STUDENT = "student",
}

export interface ACLObj {
  subject: string;
}

export type NextPage<P = {}, IP = P> = NextComponentType<
  NextPageContext,
  IP,
  P
> & {
  acl?: ACLObj;
  setConfig?: () => void;
  contentHeightFixed?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

// ==================== Authcontext types =========================== //

export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
  role: string;
};

export type RegisterParams = {
  email: string;
  username: string;
  password: string;
};

interface Option {
  id: string;
  name: string;
  value: string;
}

interface Role {
  id: string;
  name: string;
  value: string;
  options: Option[];
}

export type UserDataType = {
  id: string;
  role: Role;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
  phone?: string;
};

export type AuthValuesType = {
  logout: () => void;
  user: UserDataType | null;
  setUser: (value: UserDataType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void;
  authLoading: boolean;
  ability: AnyMongoAbility | undefined;
  setAbility: (updatedSettings: AnyMongoAbility | undefined) => void;
  setAuthLoading: (value: boolean) => void;
  abilityChanger: (userdata: UserDataType) => void;
};

export type CourseFormData = {
  title: string;
  fullDescription: string;
  shortDescription: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  price: string;
  currency: string;
  duration: string;
  durationUnit: "weeks" | "months" | "hours";
  maxStudents: string;
  startDate: string;
  endDate: string;
  enrollmentDeadline?: string;
  format: string;
  instructor: string;
  thumbnail?: string;
  tags?: string[];
  status: "draft" | "active" | "archived";
};

export type StudentFormData = {
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  country: string;
  city: string;
  state: string;
  dob: Date;
  is_active: boolean;
  emergency_contact: {
    name: string;
    phone: string;
  };
};

//=============================== grid===========================//

export type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
