import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../types";

export const todoApi = createApi({
  reducerPath: "todos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/"
  }),
  tagTypes: ["Tasks"],
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => ({
        method: "GET",
        url: "tasks"
      }),
      providesTags: (result) =>
        result ? [...result.map(({ id }) => ({ type: "Tasks" as const, id })), { type: "Tasks", id: "LIST" }] : [{ type: "Tasks", id: "LIST" }]
    }),
    updateTask: build.mutation<Task, Partial<Task> & Pick<Task, "id">>({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
        body: patch
      }),

      invalidatesTags: (result) => [{ type: "Tasks", id: result?.id }]
    }),

    removeTask: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `tasks/${id}`,
        method: "DELETE"
      }),

      invalidatesTags: (result, error, arg) => [{ type: "Tasks", id: arg.id }]
    }),
    getTask: build.query<Task, { id: number }>({
      query: ({ id }) => ({
        method: "GET",
        url: `tasks/${id}`
      }),
      providesTags: (result) => [{ type: "Tasks", id: result?.id }]
    })
  })
});

export const { useGetTasksQuery, useUpdateTaskMutation, useGetTaskQuery, useRemoveTaskMutation } = todoApi;
