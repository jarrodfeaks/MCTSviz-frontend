import React from "react";
import "./TreeWrapper.css";

const TreeWrapper = ({ children }) => {
  return (
    <div className="treeWrapper">
      {children}
    </div>
  );
};

export default TreeWrapper;
