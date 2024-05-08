import React from "react";
import "./GraphWrapper.css";

const GraphWrapper = ({ children }) => {
  return (
    <div className="treeWrapper">
      {children}
    </div>
  );
};

export default GraphWrapper;
