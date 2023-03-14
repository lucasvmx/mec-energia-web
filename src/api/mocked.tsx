// TODO Remove after integration
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Distributor, DistributorResponsePayload } from "@/types/distributor";
import { Tariff } from "@/types/tariffs";

const baseUrl = "/api"; // mocked from /pages/api/

export const mecEnergiaMockedApi = createApi({
  reducerPath: "mecEnergiaMockedApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    fetchDistributors: builder.query<Distributor[], number>({
      query: (universityId) => `distributors?university_id=${universityId}`,
      transformResponse: (distributors: DistributorResponsePayload[]) => {
        // Sorts alphabetically by default
        return distributors.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }

          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }

          return 0;
        });
      },
    }),

    fetchTariffs: builder.query<Tariff[], number>({
      query: (distributorId) => `tariffs?distributor_id=${distributorId}`,
    }),
  }),
});

export const { useFetchDistributorsQuery, useFetchTariffsQuery } =
  mecEnergiaMockedApi;
