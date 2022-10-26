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
      })
    })
  })
});

export const { useGetTasksQuery } = todoApi;
