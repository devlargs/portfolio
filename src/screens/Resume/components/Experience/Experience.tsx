import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { Root } from "./styles";
import "react-vertical-timeline-component/style.min.css";

const Experience = () => {
  return (
    <Root>
      <h1>work experience</h1>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "black" }}
          contentArrowStyle={{ borderRight: "7px solid  white" }}
          date="Sept 2018 - Feb 2020"
          iconStyle={{
            background: "black",
            color: "black",
            marginRight: 400,
          }}
          icon={
            <img
              src="https://reactjsexample.com/favicon.png"
              alt=""
              style={{ width: 50, height: 50, marginTop: 3, marginLeft: 5 }}
            />
          }
        >
          <h3
            className="vertical-timeline-element-title"
            style={{ color: "rgb(33, 150, 243)" }}
          >
            Senior Web Developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Racket Studios</h4>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "black" }}
          contentArrowStyle={{ borderRight: "7px solid  white" }}
          date="Sept 2018 - Feb 2020"
          iconStyle={{
            background: "black",
            color: "black",
            marginRight: 400,
          }}
          icon={
            <img
              src="https://reactjsexample.com/favicon.png"
              alt=""
              style={{ width: 50, height: 50, marginTop: 3, marginLeft: 5 }}
            />
          }
        >
          <h3
            className="vertical-timeline-element-title"
            style={{ color: "rgb(33, 150, 243)" }}
          >
            Senior Web Developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Racket Studios</h4>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "black" }}
          contentArrowStyle={{ borderRight: "7px solid  white" }}
          date="Sept 2018 - Feb 2020"
          iconStyle={{
            background: "black",
            color: "black",
            marginRight: 400,
          }}
          icon={
            <img
              src="https://reactjsexample.com/favicon.png"
              alt=""
              style={{ width: 50, height: 50, marginTop: 3, marginLeft: 5 }}
            />
          }
        >
          <h3
            className="vertical-timeline-element-title"
            style={{ color: "rgb(33, 150, 243)" }}
          >
            Senior Web Developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Racket Studios</h4>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "black" }}
          contentArrowStyle={{ borderRight: "7px solid  white" }}
          date="Sept 2018 - Feb 2020"
          iconStyle={{
            background: "black",
            color: "black",
            marginRight: 400,
          }}
          icon={
            <img
              src="https://reactjsexample.com/favicon.png"
              alt=""
              style={{ width: 50, height: 50, marginTop: 3, marginLeft: 5 }}
            />
          }
        >
          <h3
            className="vertical-timeline-element-title"
            style={{ color: "rgb(33, 150, 243)" }}
          >
            Senior Web Developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Racket Studios</h4>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Root>
  );
};

export default Experience;
