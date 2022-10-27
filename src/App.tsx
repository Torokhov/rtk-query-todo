import React from "react";
import "./App.css";
import { useGetTasksQuery, useUpdateTaskMutation } from "./api/todoApi";
import { Task } from "./types";

function App() {
  const { data, isLoading, isError, error } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();

  const createChangeTaskCompleteHandler = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask({ id, completed: e.target.checked });
  };

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
              <input type="checkbox" checked={task.completed} onChange={createChangeTaskCompleteHandler(task.id)} />
              <span>{task.text}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
