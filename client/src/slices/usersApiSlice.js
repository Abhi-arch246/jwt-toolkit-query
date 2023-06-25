import { apiSlice } from "./apiSlice";

const USERS_URL = "./api/users/";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    regist: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useRegistMutation } = usersApiSlice;
