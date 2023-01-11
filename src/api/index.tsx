import { Recommendation, RecommendationSettings } from "@/types/recommendation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { ConsumerUnit, ConsumerUnitsPayload } from "@/types/consumerUnit";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    const session = await getSession();

    if (session) {
      headers.set("Authorization", `Token ${session.user.token}`);
    }

    return headers;
  },
});

export const mecEnergiaApi = createApi({
  reducerPath: "mecEnergiaApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchConsumerUnits: builder.query<ConsumerUnitsPayload, number>({
      query: (universityId) => `consumer-units?university_id=${universityId}`,
    }),
    getConsumerUnit: builder.query<ConsumerUnit, number>({
      query: (consumerUnitId) => `consumer-units/${consumerUnitId}`,
    }),
    fetchInvoices: builder.query<void, number>({
      query: (consumerUnitId) =>
        `energy-bills?consumer_unit_id=${consumerUnitId}`,
    }),
    recommendation: builder.query<Recommendation, number>({
      query: (consumerUnitId) => `recommendation/${consumerUnitId}`,
      keepUnusedDataFor: 0.1,
    }),
    recommendationSettings: builder.query<RecommendationSettings, void>({
      query: () => "recommendation-settings",
      keepUnusedDataFor: 120,
    }),
  }),
});

export const {
  useFetchConsumerUnitsQuery,
  useGetConsumerUnitQuery,
  useFetchInvoicesQuery,
  useRecommendationQuery,
  useRecommendationSettingsQuery,
} = mecEnergiaApi;
