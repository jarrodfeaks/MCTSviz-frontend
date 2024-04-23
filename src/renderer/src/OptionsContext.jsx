import { createContext } from "react";

const defaultOptions = {
  graphType: "tree"
};

const OptionsContext = createContext(defaultOptions);

export default OptionsContext;
