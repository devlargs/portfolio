import React from "react";
import { Background, TypeEffect } from "./styles";
import TypingEffect from "react-typing-effect";

const Home = () => {
  return (
    <Background>
      <div className="container">
        <h1 className="name">
          Ralph<span className="surname">Largo</span>
        </h1>
        <h1 className="job">
          I am&nbsp;
          <TypeEffect>
            <TypingEffect
              speed={50}
              eraseDelay={1000}
              typingDelay={10}
              text={[
                "a Front End Web Developer.",
                "looking for Remote Work.",
                "a React JS Developer.",
              ]}
            />
          </TypeEffect>
        </h1>
      </div>
    </Background>
  );
};

export default Home;
