import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import TreeView from "./tree/TreeView";
import Sidebar from "./sidebar/Sidebar";

const Dashboard = () => {

  const [ tree, setTree ] = useState({});

  const handleUpdateTree = (newTree) => {
    setTree(newTree);
  };

  const handleNodeClick = (nodeData) => {
    console.log("node was clicked");
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <Sidebar onUpdateTree={handleUpdateTree} />
      </div>
      <div className={styles.mainContent}>
        <TreeView tree={tree} />
      </div>
    </div>
  );
};

export default Dashboard;
