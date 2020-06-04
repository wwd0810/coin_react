import React from "react";
import styled from "styled-components";

function ErrorPage() {
  return (
    <Wrap>
      <div>
        <h1>503</h1>
        <h3>Service Unavailable</h3>
        <h5>The server is temporarily busy, try again later!</h5>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > h1 {
      font-weight: bold;
      font-size: 96px;
    }

    & > h3 {
      font-weight: bold;
      font-size: 38px;
    }

    & > h5 {
      font-size: 18px;
    }
  }
`;

export default ErrorPage;
