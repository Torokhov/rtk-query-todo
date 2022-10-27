import React from "react";
import "./App.css";
import { useGetTasksQuery } from "./api/todoApi";
import { Task } from "./types";

function App() {
  const { data, isLoading, isError, error } = useGetTasksQuery();

  if (isLoading) {
    return <div>Загружаем список задач</div>;
  }

  if (isError) {
    return <div>{`Произошла ошибка ${error}`}</div>;
  }

  return (
    <div>
      <div>
        {data?.map((task: Task) => (
          <div key={task.id}>
            <label>
              <input type="checkbox" checked={task.completed} />
              <span>{task.text}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
