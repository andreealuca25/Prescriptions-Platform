export const changeColorBox = (element, conditionFulfilled) => {
  if (!conditionFulfilled) {
    element.style.border = "2px solid rgba(255, 17, 0)";
    element.style.backgroundColor = " rgba(255, 17, 0, 0.33)";
  } else {
    element.style.border = "";
    element.style.backgroundColor = "";
  }
};
