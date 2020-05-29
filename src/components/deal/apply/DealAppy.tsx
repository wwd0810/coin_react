import React, { useState } from "react";
import styled from "styled-components";
import DealApplyItem from "./item";
import { User, Account } from "stores/users/types";

import Keypad from "components/common/keypad";

interface Props {
  user: { user: User; account: Account };
  postSell: (quantity: number, price: number) => void;
}

function DealApply({ user, postSell }: Props) {
  let quantity = 0;
  let price = 0;

  const [open, setOpen] = useState<boolean>(false);

  const onPost = (quantity: number, price: number) => {
    quantity = quantity;
    price = price;

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrap>
      {open && <Keypad onPrev={handleClose} />}
      <DealApplyItem account={user.account} postSell={onPost} />
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
