import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ConsumerUnitCards } from "@/types/consumerUnit";

// const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const baseUrl = "/api"; // mocked from /pages/api/

// Define a service using a base URL and expected endpoints
export const mecEnergiaApi = createApi({
  reducerPath: "mecEnergiaApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    fetchConsumerUnits: builder.query<ConsumerUnitCards, void>({
      query: () => "consumer-units",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchConsumerUnitsQuery } = mecEnergiaApi;
