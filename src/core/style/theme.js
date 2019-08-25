const brand = "#00e59b";
const transitions = {
  easeIn: "0.085s all ease-in"
};

const dark = {
  brand,
  transitions,
  primary: "#dbdbe2",
  secondary: "#b1b1b9",
  placeholder: "#b1b1b9",
  borderColor: brand,
  backgroundPrimary: "#06070d",
  backgroundSecondary: "#15191f",
  backgroundInput: "transparent",
  overlay: "rgba(0, 0, 0, 0.3)"
};

const light = {
  brand,
  transitions,
  primary: "#0e0d20",
  secondary: "#5d5d6c",
  placeholder: "#5d5d6c",
  borderColor: brand,
  backgroundPrimary: "#ffffff",
  backgroundSecondary: "#fbfbfb",
  backgroundInput: "transparent",
  overlay: "rgba(255, 255, 255, 0.3)"
};

export default {
  dark,
  light
};
