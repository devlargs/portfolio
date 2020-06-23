import styled from "styled-components";

export const Background = styled.div`
  background: url("nature.png") no-repeat;
  background-size: 100% 100% !important;
  width: calc(100vw - 200px);
  opacity: 0.9;

  .container {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    display: block;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%) translateX(-50%);
    .name {
      font-size: 4em;
      color: white;
      margin-bottom: 0px;
      .surname {
        color: #3782e5;
      }
    }
    .job {
      font-size: 3em;
      color: white;
    }
  }
`;
