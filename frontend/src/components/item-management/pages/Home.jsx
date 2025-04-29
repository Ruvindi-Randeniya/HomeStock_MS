import React from "react";
import Sidebar from "../data-files/sideBar";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl text-center my-4 font-bold">Welcome to Item Adding</h2>
      </div>
    </div>
  );
};

export default Home;
