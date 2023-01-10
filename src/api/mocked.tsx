// TODO Remove after integration
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DistributorsPayload } from "@/types/supplier";

const baseUrl = "/api"; // mocked from /pages/api/

export const mecEnergiaMockedApi = createApi({
  reducerPath: "mecEnergiaMockedApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    fetchDistributors: builder.query<DistributorsPayload, void>({
      query: () => "distributors",
    }),
  }),
});

export const { useFetchDistributorsQuery } = mecEnergiaMockedApi;
