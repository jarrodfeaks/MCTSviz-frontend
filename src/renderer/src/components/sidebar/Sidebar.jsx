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
    // iterations is the num of iterations to run
    console.log(iterations);
    const res = await api.iterateTree();
    if (res.status === 200) {
      onUpdateTree(res.data);
    }
  };

  return (
    <>
      <div
        style={{ padding: "1rem 0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <Button label="Create Tree" onClick={handleCreateTree} />
        {/*<Button label="Run Iteration" onClick={handleIterateTree} />*/}
        <label htmlFor="iterations">Iterations to run</label>
        <div className="p-inputgroup flex-1">
          <InputNumber
            id="iterations"
            value={iterations}
            min={1}
            onChange={(e) => setIterations(e.value)}
          />
          <Button label="Run" onClick={handleIterateTree} disabled={!iterations} />
        </div>
      </div>
    </>
  )
};

export default Sidebar;
