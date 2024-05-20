import { createContext } from "react";

const defaultOptions = {
  graphType: "tree",
  isLoading: false,
  treeOptions: {
    size: "normal",
    filterTarget: "reward",
    filterValue: 50,
    filterType: "highlight",
    applyFilter: false,
    clearFilters: false,
  },
};

const OptionsContext = createContext(defaultOptions);

export default OptionsContext;
