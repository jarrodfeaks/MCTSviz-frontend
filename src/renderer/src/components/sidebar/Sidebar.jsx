import React, { useContext, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Divider } from 'primereact/divider';
import api from "../../api/api";
import "./Sidebar.css";
import OptionsContext from "../../OptionsContext";

const Sidebar = ({ onUpdateTree }) => {

  const [ iterations, setIterations ] = useState();

  const { options, updateOptions } = useContext(OptionsContext);

  const graphOptions = [
    { label: "Tree", value: "tree" },
    { label: "D3 Demo", value: "d3" }
  ]

  const handleCreateTree = async () => {
    const res = await api.createTree();
    console.log(res);
    if (res.status === 200) {
      onUpdateTree(res.data);
    }
  };

  const handleIterateTree = async () => {
    const res = await api.iterateTree(iterations);
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
        <Divider />
        <label htmlFor="dropdown">Visualisations</label>
        <Dropdown
          id="dropdown"
          options={graphOptions}
          value={options.graphType}
          onChange={(e) => updateOptions({ graphType: e.value })}
        />
      </div>
    </>
  )
};

export default Sidebar;
