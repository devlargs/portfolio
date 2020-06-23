import React from "react";
import { Background } from "./styles";

const Home = () => {
  return (
    <Background>
      <div className="container">
        <h1 className="name">
          Ralph <span className="surname">Largo</span>
        </h1>
        <h1 className="job">I am a web developer</h1>
      </div>
    </Background>
  );
};

export default Home;
