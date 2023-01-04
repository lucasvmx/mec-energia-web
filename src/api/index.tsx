import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Define a service using a base URL and expected endpoints
export const mecEnergiaApi = createApi({
  reducerPath: "mecEnergiaApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: () => ({
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
//export const { } = mecEnergiaApi;
