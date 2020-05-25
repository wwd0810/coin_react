import React from "react";
import styled from "styled-components";
import { RingLoader } from "react-spinners";

function Loading() {
  return (
    <Wrap>
      <div>
        <RingLoader color={"#c9daf0"} loading={true} />
      </div>
      <span>LOADING</span>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #ffffff;
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -30px;
    margin-left: -30px;
    width: 60px;
    height: 60px;
  }
  & > span {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
    width: 200px;
    height: 200px;

    color: #c9daf0;
    text-align: center;
    font-size: 24pt;
    font-weight: bold;
  }
`;

export default Loading;
