import React from "react";
import { Root, Container } from "./styles";
import { Switch, Route } from "react-router-dom";

// screens
import About from "../../screens/About";
import Contact from "../../screens/Contact";
import Home from "../../screens/Home";

const Content = () => {
  return (
    <Root>
      <Container>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Root>
  );
};

export default Content;
