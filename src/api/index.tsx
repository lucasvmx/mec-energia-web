import { DistributorPropsTariffs } from "@/types/distributor";
import { GetSubgroupsResponsePayload } from "@/types/subgroups";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

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
    example: builder.query<void, void>({
      query: () => "distributors",
    }),
    getSubgroups: builder.query<GetSubgroupsResponsePayload, void>({
      query: () => "/contracts/list-subgroups/"
    }),
    getDistributors: builder.query<Array<DistributorPropsTariffs>, number>({
      query: (universityId) => `distributors/?university_id=${universityId}`
    })
  }),
});

export const { useExampleQuery, useGetSubgroupsQuery, useGetDistributorsQuery } = mecEnergiaApi;
