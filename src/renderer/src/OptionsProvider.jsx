import React, { useState } from "react";
import OptionsContext from "./OptionsContext";

const OptionsProvider = ({ children }) => {
  const [options, setOptions] = useState({
    graphType: "tree",
    isLoading: false,
    treeOptions: {
      size: "normal",
      filterTarget: "reward",
      filterValue: 50,
      filterType: "highlight",
      applyFilter: false,
      clearFilters: false
    },
  });

  const updateOptions = (newOptions) => {
    setOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
  };

  const setGraphTypeOption = (type, key, value) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [`${type}Options`]: {
        ...prevOptions[`${type}Options`],
        [key]: value
      }
    }));
  };

  return (
    <OptionsContext.Provider value={{ options, updateOptions, setGraphTypeOption }}>{children}</OptionsContext.Provider>
  );
};

export default OptionsProvider;
