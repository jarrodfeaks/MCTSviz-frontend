import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import api from "../../api/api";

const Sidebar = ({ onUpdateTree }) => {

  const [ iterations, setIterations ] = useState();

  const handleCreateTree = async () => {
    const res = await api.createTree();
    console.log(res);
    if (res.status === 200) {
      onUpdateTree(res.data);
    }
  };

  const handleIterateTree = async () => {
    const res = await api.iterateTree();
    if (res.status === 200) {
      onUpdateTree(res.data);
    }
  };

  return (
    <>
      <div style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Button label="Create Tree" onClick={handleCreateTree} />
        <Button label="Run Iteration" onClick={handleIterateTree} />
        {/*<label htmlFor="iterations">Iterations to run</label>*/}
        {/*<div className="p-inputgroup flex-1">*/}
        {/*  <InputNumber*/}
        {/*    id="iterations"*/}
        {/*    value={iterations}*/}
        {/*    onValueChange={(e) => setIterations(e.value)}*/}
        {/*  />*/}
        {/*  <Button label="Run" />*/}
        {/*</div>*/}
      </div>
    </>
  )
};

export default Sidebar;
