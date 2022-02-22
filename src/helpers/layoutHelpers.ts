const body = document.body;
const bodyDataSet = body.dataset;

export const initTheme = () => {
  const mode = localStorage.getItem("data-theme");
  const currentMode = mode ? mode : "light";

  body.setAttribute("data-theme", currentMode);
};

export const switchTheme = () => {
  if (bodyDataSet.theme === "dark") {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("data-theme", "light");
    return "light";
  } else {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("data-theme", "dark");
    return "dark";
  }
};
