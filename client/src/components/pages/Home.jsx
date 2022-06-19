import React from "react";
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";
import "antd/dist/antd.css";
import Header from "./Header";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <InputTodo />
      <ListTodos />
    </div>
  );
};

export default Home;
