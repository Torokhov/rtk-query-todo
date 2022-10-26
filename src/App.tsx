import React from "react";
import "./App.css";
import { useGetTasksQuery } from "./api/todoApi";

function App() {
  const { data } = useGetTasksQuery();
  console.log(data);
  return <div className="App"></div>;
}

export default App;
