/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// import Drawer from "../drawer";

// import MenuIcon from "assets/icons/menu.png";
import NoticeIcon from "assets/icons/notice.png";
// import NoticeColorIcon from "assets/icons/notice-new.png";

interface Props {
  main?: boolean;
  title?: string;
}

function Header({ main, title }: Props) {
  // const [open, setOpen] = useState<boolean>(false);

  // const onOpen = useCallback((e: any) => {
  //   e.preventDefault();
  //   setOpen(true);
  // }, []);

  // const toggleDrawer = (open: boolean) => {
  //   setOpen(false);
  // };
  return (
    <Wrap>
      {/* <Drawer openDrawer={open} onClick={toggleDrawer} /> */}
      {main ? (
        <div className="topMenu" id={title}>
          <span className="main-logo">
            {/* <button className="left-btn">
              <img src={MenuIcon} onClick={onOpen} />
            </button> */}
            <em className="logo-first">cash</em>
            <em className="logo-last">link</em>
          </span>
          <Link to="/center/notice" className="right-btn">
            <img src={NoticeIcon} />
          </Link>
        </div>
      ) : (
        <div
          className="topMenu"
          id={title}
          style={{ borderBottom: title !== "마이페이지" ? "1px solid #E5E5E5" : "none" }}
        >
          <span className="logo">{title !== "마이페이지" && title}</span>
        </div>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
width: 100%;

height: 52px;

position: fixed;
top: 0px;

background: ${({ theme }) => theme.colors.white_color};

z-index: 999;

& > .topMenu {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding : 10px 16px;


  
  & > a {
    & > img {
      width: 24px;
      height: 24px;
    }
  }
  
  & > .logo {
  
    width: 100%;
    height: 32px; 
  
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    
    
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    color: #666666;
  }

  & > .main-logo {

    display: flex;
    align-items: center;

    & > button {

      & > img {
        width: 24px;
        height: 24px;
      }

      margin-right: 12px;
    }

    
    & > em{
    
      font-weight: 600;
      font-size: 24px;
      line-height: 33px;
      color: ${({ theme }) => theme.colors.primary_color};
    }

    & > .logo-last {
      color: ${({ theme }) => theme.colors.secondary_color};
    }
  }
}

${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`
    height: 70px;

    & > .topMenu {
      display: none;
    }
`}

`;

export default Header;
