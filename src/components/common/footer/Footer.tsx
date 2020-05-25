/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import { Link } from "react-router-dom";

import HomeIcon from "assets/icons/home.png";
import HomeColorIcon from "assets/icons/home-color.png";
import DealIcon from "assets/icons/deal.png";
import DealColorIcon from "assets/icons/deal-color.png";
import ListIcon from "assets/icons/list.png";
import ListColorIcon from "assets/icons/list-color.png";
import MyPageIcon from "assets/icons/mypage.png";
import MypageColorIcon from "assets/icons/mypage-color.png";

interface Props {
  seletedItem: string;
}

function Footer({ seletedItem }: Props) {
  const items = [
    {
      title: "홈",
      icon: HomeIcon,
      colorIcon: HomeColorIcon,
      url: "/home",
    },
    {
      title: "거래하기",
      icon: DealIcon,
      colorIcon: DealColorIcon,
      url: "/deal",
    },
    {
      title: "거래내역",
      icon: ListIcon,
      colorIcon: ListColorIcon,
      url: "/list",
    },
    {
      title: "마이페이지",
      icon: MyPageIcon,
      colorIcon: MypageColorIcon,
      url: "/mypage",
    },
  ];

  return (
    <Wrap>
      {items.map((ele, idx) => (
        <Link to={ele.url} key={idx}>
          <span className="item" key={idx}>
            <img src={seletedItem === ele.url.split("/")[1] ? ele.colorIcon : ele.icon} />
            <em
              className={classnames("asd", {
                active: seletedItem === ele.url.split("/")[1],
              })}
            >
              {ele.title}
            </em>
          </span>
        </Link>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
    width: 100%;
    height: 52px;

    position: fixed;
    bottom: 0px;

    display: flex;

    background: ${({ theme }) => theme.colors.white_color};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);

    & > a {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        & >  .item{
        /* width: 100%; */
        display: flex;
        flex-direction: column;
        align-items: center;
        

        & > img {
            width: 24px;
            height: 24px;

            margin-bottom: 2px;
        }

        & > em {
            color: ${({ theme }) => theme.colors.font_grey};
            font-size: 10px;
            line-height: 14px;
        }

        & > .active {
            color: ${({ theme }) => theme.colors.primary_color};
        }
    }
    }
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`
    display: none;
`}
`;

export default Footer;
