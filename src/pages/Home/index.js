import React from "react";

const Home = ({ user }) => {
  return (
    <div>
      <h1>Welcome to Ink N Threadworks</h1>
      {user ? (
        <p>Hello, {user.email}</p>
      ) : (
        <p>Please sign up or log in to start designing.</p>
      )}
    </div>
  );
};

export default Home;
