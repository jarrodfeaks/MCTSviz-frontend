import { createContext } from "react";

const defaultOptions = {
  graphType: "tree",
  isLoading: false,
  enableFilter: false,
};

const OptionsContext = createContext(defaultOptions);

export default OptionsContext;
