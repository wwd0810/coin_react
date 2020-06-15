import React from "react";
import styled from "styled-components";
import DealApplyItem from "./item";
import { User, Account } from "stores/users/types";

import Modal from "components/common/modal";
import { Dealing } from "stores/market/types";

interface Props {
  open: boolean;
  close: () => void;
  duplicate: (pw: string) => void;
  check: boolean;
  high?: string;
  low?: string;
  user: { user: User; account: Account[] };
  postSell: (quantity: number, price: number, password: string) => void;
  update: (idx: number, amount: number, price: number, password: string) => void;
  product?: Dealing;
}

function DealApply({
  user,
  postSell,
  high,
  low,
  open,
  close,
  product,
  duplicate,
  check,
  update,
}: Props) {
  const onPost = (quantity: number, price: number, password: string) => {
    postSell(quantity, price, password);
  };

  return (
    <Wrap>
      <Modal open={open} type="one" close={close} title="등록 완료">
        <ul>
          <li>판매 등록이</li>
          <li>정상적으로 완료되었습니다.</li>
        </ul>
      </Modal>
      {user.account
        .filter((data) => data.type !== "COIN_POINT")
        .map((data, idx) => (
          <DealApplyItem
            check={check}
            duplicate={duplicate}
            account={data}
            postSell={onPost}
            high={high}
            low={low}
            product={product}
            key={idx}
            update={update}
          />
        ))}
    </Wrap>
  );
}

const Wrap = styled.div`

width: 100%;
  
${({ theme }) => theme.media.mobile`

`}
${({ theme }) => theme.media.tablet`

`}
${({ theme }) => theme.media.desktop`

`}
`;

export default DealApply;
