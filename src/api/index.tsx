import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInRequestPayload, SignInResponsePayload } from "@/types/auth";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Define a service using a base URL and expected endpoints
export const mecEnergiaApi = createApi({
  reducerPath: "mecEnergiaApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponsePayload, SignInRequestPayload>({
      query: (dto) => {
        const formData = new FormData()
        formData.append('username', dto.username)
        formData.append('password', dto.password)
        return {
          url: 'token',
          body: formData,
          method: 'POST'
        }
      }
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignInMutation } = mecEnergiaApi;
