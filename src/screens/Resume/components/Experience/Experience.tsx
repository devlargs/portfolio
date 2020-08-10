import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { Root } from "./styles";
import "react-vertical-timeline-component/style.min.css";

// TODO Create a component for experiences
// TODO Serve static files through s3

const Experience = () => {
  return (
    <Root>
      <h1>work experience</h1>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "black" }}
          contentArrowStyle={{ borderRight: "7px solid  white" }}
          date="Sept 2018 - present"
          iconStyle={{
            background: "white",
            color: "black",
            marginRight: 400,
          }}
          icon={
            <img
              src="http://metrolime.com/wp-content/uploads/2017/12/Metrolime-angled-02.png"
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
          <h4 className="vertical-timeline-element-subtitle">Metrolime</h4>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "black" }}
          contentArrowStyle={{ borderRight: "7px solid  white" }}
          date="Sept 2017 - Jan 2018"
          iconStyle={{
            background: "white",
            color: "black",
            marginRight: 400,
          }}
          icon={
            <img
              src="http://www.matchlynx.com/images/matchlynx-logo.e3f2b09386fe134ebec7fa8402e29413.png"
              alt=""
              style={{ width: 50, height: 50, marginTop: 3, marginLeft: 5 }}
            />
          }
        >
          <h3
            className="vertical-timeline-element-title"
            style={{ color: "rgb(33, 150, 243)" }}
          >
            React JS Developer (Part Time)
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Matchlynx</h4>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "black" }}
          contentArrowStyle={{ borderRight: "7px solid  white" }}
          date="Sept 2016 - Sept 2018"
          iconStyle={{
            background: "white",
            color: "black",
            marginRight: 400,
          }}
          icon={
            <img
              src="https://rdblobprod.blob.core.windows.net/prod/custom/company/original/5cbeacca4e95b.jpeg"
              alt=""
              style={{ width: 50, height: 50, marginTop: 3, marginLeft: 5 }}
            />
          }
        >
          <h3
            className="vertical-timeline-element-title"
            style={{ color: "rgb(33, 150, 243)" }}
          >
            Web Developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">Volenday</h4>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "black" }}
          contentArrowStyle={{ borderRight: "7px solid  white" }}
          date="May 2016 - July 2016"
          iconStyle={{
            background: "white",
            color: "black",
            marginRight: 400,
          }}
          icon={
            <img
              src="https://image.flaticon.com/icons/png/512/25/25694.png"
              alt=""
              style={{ width: 50, height: 50, marginTop: 3, marginLeft: 5 }}
            />
          }
        >
          <h3
            className="vertical-timeline-element-title"
            style={{ color: "rgb(33, 150, 243)" }}
          >
            Front End Developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Freelance/Various Companies
          </h4>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "white", color: "black" }}
          contentArrowStyle={{ borderRight: "7px solid  white" }}
          date="Nov 2015 - May 2016"
          iconStyle={{
            background: "white",
            color: "black",
            marginRight: 400,
          }}
          icon={
            <img
              src="https://cdn.onlinewebfonts.com/svg/img_228835.png"
              alt=""
              style={{ width: 50, height: 50, marginTop: 3, marginLeft: 5 }}
            />
          }
        >
          <h3
            className="vertical-timeline-element-title"
            style={{ color: "rgb(33, 150, 243)" }}
          >
            Web & Mobile Application Developer
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Jeager System Development
          </h4>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Root>
  );
};

export default Experience;
