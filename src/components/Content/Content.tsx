import React from "react";
import { Switch, Route } from "react-router-dom";

// screens
import About from "../../screens/About";
import Contact from "../../screens/Contact";
import Home from "../../screens/Home";
import Resume from "../../screens/Resume";
import Portfolio from "../../screens/Portfolio";

const Content = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/resume">
        <Resume />
      </Route>
      <Route path="/portfolio">
        <Portfolio />
      </Route>
      <Route path="*">
        <h1>Error</h1>
      </Route>
    </Switch>
  );
};

export default Content;
