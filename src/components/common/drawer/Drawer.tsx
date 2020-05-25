/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from "react";
import styled from "styled-components";
import MTDrawer from "@material-ui/core/Drawer";

interface Props {
  openDrawer: boolean;
  onClick: (open: boolean) => void;
}

function Drawer({ openDrawer, onClick }: Props) {
  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onClick(false);
    },
    [onClick],
  );

  return (
    <MTDrawer open={openDrawer} onClose={handleClose}>
      <Wrap>1</Wrap>
    </MTDrawer>
  );
}

const Wrap = styled.div``;

export default Drawer;
