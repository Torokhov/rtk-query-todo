import React from "react";
import "./App.css";
import { useGetTasksQuery, useRemoveTaskMutation, useUpdateTaskMutation } from "./api/todoApi";
import { Task } from "./types";

function App() {
  const { data, isLoading, isError, error } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [removeTask] = useRemoveTaskMutation();

  const createChangeTaskCompleteHandler = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTask({ id, completed: e.target.checked });
  };

  const createRemoveTaskHandler = (id: number) => () => {
    removeTask({ id });
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
            <button onClick={createRemoveTaskHandler(task.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
