import { createAuthClient } from "better-auth/react" // make sure to import from react

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // the base url of your auth server
})
