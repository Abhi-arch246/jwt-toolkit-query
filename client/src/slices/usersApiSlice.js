import { apiSlice } from "./apiSlice";
const USERS_URL = "./api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "post",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "post",
        body: data,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "post",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update`,
        method: "put",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutMutation,
  useUpdateUserMutation,
} = usersApiSlice;
