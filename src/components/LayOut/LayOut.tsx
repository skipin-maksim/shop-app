import React, { FC } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const LayOut: FC = () => {
  return (
    <>
      <Header />

      <div id={"main-content"}>
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default LayOut;
