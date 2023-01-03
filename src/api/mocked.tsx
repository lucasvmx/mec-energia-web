import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ConsumerUnitsPayload } from "@/types/consumerUnit";
import { DistributorsPayload } from "@/types/supplier";

const baseUrl = "/api"; // mocked from /pages/api/

// Define a service using a base URL and expected endpoints
export const mockedMecEnergiaApi = createApi({
  reducerPath: "mockedMecEnergiaApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    fetchConsumerUnits: builder.query<ConsumerUnitsPayload, void>({
      query: () => "consumer-units",
    }),
    fetchDistributors: builder.query<DistributorsPayload, void>({
      query: () => "distributors",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchConsumerUnitsQuery, useFetchDistributorsQuery } =
  mockedMecEnergiaApi;
