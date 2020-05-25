/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

import Test1 from "assets/test/test1.png";
import Test2 from "assets/test/test2.png";
import Test3 from "assets/test/test3.png";
import Test4 from "assets/test/test4.png";
import Test5 from "assets/test/test5.png";

function Carousle() {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrap>
      <Slider {...settings}>
        <div className="slide">
          <div className="count">
            <em>1/5</em>
          </div>
          <img src={Test1} />
        </div>
        <div className="slide">
          <div className="count">
            <em>2/5</em>
          </div>
          <img src={Test2} />
        </div>
        <div className="slide">
          <div className="count">
            <em>3/5</em>
          </div>
          <img src={Test3} />
        </div>
        <div className="slide">
          <div className="count">
            <em>4/5</em>
          </div>
          <img src={Test4} />
        </div>
        <div className="slide">
          <div className="count">
            <em>5/5</em>
          </div>
          <img src={Test5} />
        </div>
      </Slider>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;
height: 160px;

background: #AAAAAA;
border-radius: 6px;

.slide {
  position: relative;

    outline: none;
    height: 160px;

    border-radius: 6px;
    & > img { 
      
      /* height: 160px; */
      
      border-radius: 6px;
    }

    & > .count {
    position: absolute;
    right: 0;
    width: 32px;
    height: 16px;

    background: #FFFFFF;
    opacity: 0.8;
    border-radius: 3px;

    margin: 8px;

    /* z-index: 999; */

    & > em {
        font-size: 10px;
        line-height: 14px;

        display: flex;
        align-items: center;
        justify-content: center;

        color: #666666;

    }
}

}

  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`

width: 100%;
height: 328px;

background: #AAAAAA;
border-radius: 6px;

.slide {
  position: relative;

    outline: none;
    height: 328px;

    border-radius: 6px;
    & > img { 
      
      
    }

    & > .count {
    position: absolute;
    right: 0;
    width: 32px;
    height: 16px;

    background: #FFFFFF;
    opacity: 0.8;
    border-radius: 3px;

    margin: 16px;

    /* z-index: 999; */

    & > em {
        font-size: 10px;
        line-height: 14px;

        display: flex;
        align-items: center;
        justify-content: center;

        color: #666666;

    }
}

}

`}
`;

export default Carousle;
