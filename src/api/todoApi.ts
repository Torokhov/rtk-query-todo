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

      invalidatesTags: [{ type: "Tasks", id: "LIST" }]
    })
  })
});

export const { useGetTasksQuery, useUpdateTaskMutation } = todoApi;
