import React, { useRef, useState } from "react";
import styles from "./Dashboard.module.css";
import TreeView from "./tree/TreeView";
import Sidebar from "./sidebar/Sidebar";
import { Toast } from "primereact/toast";

const Dashboard = () => {

  const toast = useRef(null);

  const [ tree, setTree ] = useState({});

  const isTreeCreated = !(Object.keys(tree).length === 0);

  const handleUpdateTree = (newTree) => {
    setTree(newTree);
  };

  const showToastMessage = (type, title, content) => {
    toast.current.show({ severity: type, summary: title, detail: content });
  };

  return (
    <div className={styles.dashboard}>
      <Toast ref={toast} />
      <div className={styles.sidebar}>
        <Sidebar onUpdateTree={handleUpdateTree} showToastMessage={showToastMessage} isTreeCreated={isTreeCreated} />
      </div>
      <div className={styles.mainContent}>
        {!isTreeCreated && (
          <div className={styles.welcomeOverlay}>
            <span>Create a tree to get started.</span>
          </div>
        )}
        <TreeView tree={tree} />
      </div>
    </div>
  );
};

export default Dashboard;
