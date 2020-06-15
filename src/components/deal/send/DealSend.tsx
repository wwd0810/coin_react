/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import SearchIcon from "assets/icons/search.png";
import DealSendItem from "./item/DealSendItem";
import { Account } from "stores/users/types";
import Modal from "components/common/modal";

interface Props {
  modalOpen: boolean;
  close: () => void;
  duplicate: (pw: string) => void;
  check: boolean;
  goback: () => void;
  accounts?: Account[];
  findUser: (type: string, query: string) => void;
  findAccounts: Account[];
  post: (to: string, type: string, amount: string, password: number) => void;
}

function DealSend({
  modalOpen,
  accounts,
  goback,
  findUser,
  findAccounts,
  post,
  check,
  duplicate,
}: Props) {
  const [option, setOption] = useState<number>(0);

  const [search, setSearch] = useState<string>("");

  const [res, setRes] = useState<string>("");

  const onChangeOption = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setRes("");
    setSearch("");
    setOption(Number(value));
  }, []);

  const enterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let tmp = "";

      if (option === 0) tmp = "PHONE";
      if (option === 1) tmp = "USERNAME";

      findUser(tmp, search);
    }
  };

  const searchPress = (e: any) => {
    let tmp = "";

    if (option === 0) tmp = "PHONE";
    if (option === 1) tmp = "USERNAME";

    findUser(tmp, search);
  };

  const onChangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setSearch(value);
  }, []);

  const onChangeRes = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setRes(value);
  }, []);

  const postSend = (price: string, password: number) => {
    post(res, "DILLING", price, password);
  };

  useEffect(() => {
    if (findAccounts.length > 0) {
      const addr = findAccounts.filter((data) => data.type === "DILLING");
      if (addr) {
        setRes(addr[0].id);
      } else {
        alert("해당 유저 주소가 없습니다.");
      }
    }
    // if (addr) {
    //   setRes(addr);
    // }
  }, [findAccounts]);

  return (
    <Wrap>
      <Modal open={modalOpen} close={goback} title="전송완료">
        <ul>
          <li>딜링(DL)전송이</li>
          <li>정상적으로 완료되었습니다.</li>
        </ul>
      </Modal>
      <div className="p-box">
        <div className="title">받는사람</div>
        <div className="search">
          <select onChange={onChangeOption} value={option}>
            <option value={0}>연락처</option>
            <option value={1}>아이디</option>
            <option value={2}>직접입력</option>
          </select>
          <span className="input-box">
            <input
              type="text"
              readOnly={option === 2 ? true : false}
              value={search}
              onChange={onChangeSearch}
              onKeyDown={enterPress}
            />
            <img src={SearchIcon} onClick={searchPress} />
          </span>
        </div>
        <span>
          <input
            type="text"
            readOnly={option !== 2 ? true : false}
            value={res}
            onChange={onChangeRes}
          />
        </span>
      </div>
      <div className="c-box">
        {accounts
          ?.filter((data) => data.type !== "COIN_POINT")
          .map((data, idx) => (
            <DealSendItem
              check={check}
              duplicate={duplicate}
              account={data}
              key={idx}
              post={postSend}
              addr={res}
            />
          ))}
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;

padding: 23px 16px;;

& > .c-box{
    display: flex;
    flex-direction: column;

}

& > .p-box {

    display: flex;
    flex-direction: column;

    margin-bottom: 32px;

    & > span {
        
    }
    & > .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;

        color: ${({ theme }) => theme.colors.primary_color};

        border-bottom: 2px solid ${({ theme }) => theme.colors.primary_color};

        margin-bottom: 10px;
    }

    & > .search {
        display: flex;
        justify-content: space-between;

        margin-bottom: 8px;

        & > select {
            width: 96px;
            height: 40px;
            padding-left : 14px;
            margin-right: 8px;
        }
    }

    & > span {

    }
}
  
${({ theme }) => theme.media.mobile`

.input-box {
        position: relative;
        width: 100%;
        
        & > img {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            /* background-size: 15px 15px; */
            /* overflow: hidden; */
        }
    }

`}
${({ theme }) => theme.media.tablet`

.input-box {
        position: relative;
        width: 100%;
        
        & > img {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            /* background-size: 15px 15px; */
            /* overflow: hidden; */
        }
    }

`}
${({ theme }) => theme.media.desktop`

.input-box {
        position: relative;
        width: 100%;
        & > img {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
        }
    }
`}
`;

export default DealSend;
