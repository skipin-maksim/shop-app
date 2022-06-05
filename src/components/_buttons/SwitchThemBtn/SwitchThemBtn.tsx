import React, { FC, useEffect, useState } from "react";
import { switchTheme } from "../../../helpers/layoutHelpers";
import { FaMoon, FaSun } from "react-icons/fa";

import s from "./switchThemeBtn.module.scss";

const SwitchThemBtn: FC = () => {
  const [currentMode, setCurrentMode] = useState("");

  const switchHandle = () => {
    const mode = switchTheme();
    setCurrentMode(mode);
  };

  useEffect(() => {
    const mode = localStorage.getItem("data-theme");
    setCurrentMode(mode ? mode : "light");
  }, []);

  return (
    <button type={"button"} onClick={switchHandle} className={s.switcher_btn}>
      {currentMode === "dark" && <FaMoon className={s.moon} />}
      {/*<Button onClick={switchTheme}>Switch theme</Button>*/}
      <div className={s.line} />
      {currentMode === "light" && <FaSun className={s.sun} />}
    </button>
  );
};

export default SwitchThemBtn;
