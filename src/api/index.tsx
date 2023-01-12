import { CreateConsumerUnitRequestPayload, EditConsumerUnitRequestPayload } from "@/types/consumerUnit";
import { GetContractsResponsePayload, RenewContractRequestPayload, RenewContractResponsePayload } from "@/types/contract";
import { CreateDistributorRequestPayload, CreateDistributorResponsePayload, DistributorPropsTariffs } from "@/types/distributor";
import { PostElectricityBillRequestPayload, PostElectricityBillResponsePayload } from "@/types/electricityBill";
import { GetSubgroupsResponsePayload } from "@/types/subgroups";
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
  tagTypes: ['Distributors', 'ConsumerUnit', 'Subgroups', 'CurrentContract', "Invoices", "Recommendation"],
  endpoints: (builder) => ({
    fetchConsumerUnits: builder.query<ConsumerUnitsPayload, number>({
      query: (universityId) => `consumer-units?university_id=${universityId}`,
    }),
    getConsumerUnit: builder.query<ConsumerUnit, number>({
      query: (consumerUnitId) => `consumer-units/${consumerUnitId}`,
      providesTags: ['ConsumerUnit']
    }),
    fetchInvoices: builder.query<void, number>({
      query: (consumerUnitId) =>
        `energy-bills?consumer_unit_id=${consumerUnitId}`,
      providesTags: ['Invoices']
    }),
    getSubgroups: builder.query<GetSubgroupsResponsePayload, void>({
      query: () => "/contracts/list-subgroups/",
      providesTags: ['Subgroups']
    }),
    getDistributors: builder.query<Array<DistributorPropsTariffs>, number>({
      query: (universityId) => `distributors/?university_id=${universityId}`,
      providesTags: ["Distributors"]
    }),
    createDistributor: builder.mutation<CreateDistributorResponsePayload, CreateDistributorRequestPayload>({
      query: (body) => ({
        url: "distributors/",
        method: "POST",
        body
      }),
      invalidatesTags: ["Distributors"]
    }),
    createConsumerUnit: builder.mutation<string, CreateConsumerUnitRequestPayload>({
      query: (body) => ({
        url: "consumer-units/create_consumer_unit_and_contract/",
        method: "POST",
        body
      }),
      invalidatesTags: ["ConsumerUnit", "CurrentContract"]
    }),
    editConsumerUnit: builder.mutation<string, EditConsumerUnitRequestPayload>({
      query: (body) => ({
        url: "consumer-units/edit_consumer_unit_and_contract/",
        method: "POST",
        body
      }),
      invalidatesTags: ["ConsumerUnit", "CurrentContract"]
    }),
    getContract: builder.query<GetContractsResponsePayload, number>({
      query: (consumerunitId) => `contracts/get-current-contract-of-consumer-unit/?consumer_unit_id=${consumerunitId}`,
      providesTags: (result, error, arg) =>
        result
          ? [{ type: 'CurrentContract', arg }, 'CurrentContract']
          : ['CurrentContract']
    }),
    renewContract: builder.mutation<RenewContractResponsePayload, RenewContractRequestPayload>({
      query: (body) => ({
        url: "contracts/",
        method: "POST",
        body
      }),
      invalidatesTags: ["CurrentContract"]
    }),
    postInvoice: builder.mutation<PostElectricityBillResponsePayload, PostElectricityBillRequestPayload>({
      query: (body) => ({
        url: "/energy-bills/",
        method: "POST",
        body
      }),
      invalidatesTags: ["Invoices"]
    }),
    // FIXME: Seria interessante cachear a resposta desse endpoint. Se for
    // realizada qq requisição POST para faturas ou tarifas, o cache desse
    // endpoint deve ser invalidado. Como faz isso?
    recommendation: builder.query<Recommendation, number>({
      query: (consumerUnitId) => `recommendation/${consumerUnitId}`,
      providesTags: ["Recommendation"]
    }),
    recommendationSettings: builder.query<RecommendationSettings, void>({
      query: () => "recommendation-settings",
      keepUnusedDataFor: 120,
    }),
  })
})

export const {
  useGetSubgroupsQuery,
  useGetDistributorsQuery,
  useCreateDistributorMutation,
  useEditConsumerUnitMutation,
  useCreateConsumerUnitMutation,
  useGetContractQuery,
  useRenewContractMutation,
  usePostInvoiceMutation,
  useFetchConsumerUnitsQuery,
  useGetConsumerUnitQuery,
  useFetchInvoicesQuery,
  useRecommendationQuery,
  useRecommendationSettingsQuery,
} = mecEnergiaApi;
