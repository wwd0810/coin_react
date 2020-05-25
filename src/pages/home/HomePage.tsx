import React from "react";

import HomeContainer from "containers/home/HomeContainer";
import BaseTemplate from "components/base/baseTemplate";

function HomePage() {
  return (
    <BaseTemplate seletedItem="home" main={true}>
      <HomeContainer />
    </BaseTemplate>
  );
}

export default HomePage;
