import styled from "styled-components";

export const StyledImage = styled.img`
  width: 150px;
  height: 150px;
  margin: auto;
  border-radius: 50%;
  border: 2px solid white;
`;

export const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  text-align: center;
`;

export const NameTag = styled.div`
  opacity: 0;
  position: absolute;
  width: 200px;
  height: 44px;
  background-color: #1890ff;
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  p {
    white-space: nowrap;
    z-index: -1;
    text-transform: uppercase;
    padding-top: 9px;
    font-size: 20px;
    text-align: center;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
`;
