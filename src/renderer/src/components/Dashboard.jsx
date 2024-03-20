import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import TreeView from "./tree/TreeView";
import Sidebar from "./sidebar/Sidebar";

const Dashboard = () => {

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}><Sidebar /></div>
      <div className={styles.mainContent}>
        <TreeView />
      </div>
    </div>
  );
};

export default Dashboard;
