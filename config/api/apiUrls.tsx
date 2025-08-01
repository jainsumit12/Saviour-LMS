const localUrl = "http://localhost:6565";

export const ApiUrl = {
  BASE_URL: localUrl,
  LOGIN_URL: `${localUrl}/auth/login`,
  AUTH_LOGOUT: `${localUrl}/auth/logout`,
  ADD_STUDENT: `${localUrl}/auth/logout`,
};

export const graphqlQuerys = {
  ADMIN_GET_QUERY: `query{ping}`,
};
