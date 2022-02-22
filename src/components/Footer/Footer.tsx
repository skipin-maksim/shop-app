import React, { FC } from "react";
import { Container } from "reactstrap";
import SwitchThemBtn from "../_buttons/SwitchThemBtn/SwitchThemBtn";

const Footer: FC = () => {
  return (
    <footer id={"footer"} className={"auto-bg"}>
      <Container className={"pt-2 pb-3"}>
        <h2>Footer</h2>
        <div className={"d-flex align-items-center justify-content-center"}>
          <SwitchThemBtn />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
