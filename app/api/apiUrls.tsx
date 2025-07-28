const localSocket = "ws://localhost:13006";
const liveSocket = "wss://saviour-backend.loopretail.tngwebsolutions.com";

const localUrl = "http://localhost:3000/";


export const ApiUrl = {
  BASE_URL: localUrl,
  SOCKET_BASE_URL: localSocket,
  LOGIN_URL: `${localUrl}auth/store/login`,
  AUTH_LOGOUT: `${localUrl}auth/logout`,
  ROLE_NAMES_URL: `${localUrl}role`,
  ROLE_MODULES_URL: `${localUrl}role-option`,
};

export const graphqlQuerys = {
  ADMIN_GET_QUERY: `query{ping}`,
};
