import React, { FC } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const LayOut: FC = () => {
  return (
    <>
      <Header />
      <br />
      <Outlet />
      <br />
      <Footer />
    </>
  );
};

export default LayOut;
