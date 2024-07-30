import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../../services/urls';

export const TodoApi = createApi({
  reducerPath: 'TodoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Todo'],
  endpoints: builder => ({
    getTodos: builder.query({
      query: () => ({
        url: '/todos',
        method: 'GET',
      }),
    }),
    updateTodoStatus: builder.mutation({
      query: ({todoId, completed}) => ({
        url: `/todos/${todoId}`,
        method: 'PATCH',
        body: {completed},
      }),
    }),
    deleteTodo: builder.mutation({
      query: todoId => ({
        url: `/todos/${todoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useUpdateTodoStatusMutation,
} = TodoApi;
