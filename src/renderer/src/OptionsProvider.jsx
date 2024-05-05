import React, { useState } from "react";
import OptionsContext from "./OptionsContext";

const OptionsProvider = ({ children }) => {
  const [options, setOptions] = useState({
    graphType: "tree",
    isLoading: false,
    enableFilter: false,
  });

  const updateOptions = (newOptions) => {
    setOptions((prevOptions) => ({ ...prevOptions, ...newOptions }));
  };

  return (
    <OptionsContext.Provider value={{ options, updateOptions }}>
      {children}
    </OptionsContext.Provider>
  );
};

export default OptionsProvider;
