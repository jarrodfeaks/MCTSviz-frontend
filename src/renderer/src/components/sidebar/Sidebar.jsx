import React, { useContext, useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { Slider } from "primereact/slider";
import api from "../../api/api";
import "./Sidebar.css";
import OptionsContext from "../../OptionsContext";

const Sidebar = ({ onUpdateTree, showToastMessage, isTreeCreated }) => {
  const [isCreatingTree, setIsCreatingTree] = useState(false);

  const [iterations, setIterations] = useState();

  const [exploreExploitParam, setExploreExploitParam] = useState(0.5);

  const { options, updateOptions } = useContext(OptionsContext);

  const graphOptions = [
    { label: "Tree", value: "tree" },
    { label: "Tree (Legacy)", value: "treeLegacy" },
    { label: "Radial", value: "radial" }
  ];

  const handleCreateTree = async () => {
    setIsCreatingTree(true);
    try {
      const res = await api.createTree("0");
      if (res.status === 200) onUpdateTree(res.data);
    } catch (err) {
      showToastMessage(
        "error",
        "Error",
        err.request?.status === 0 ? "Could not connect to backend server." : err.message
      );
    } finally {
      setIsCreatingTree(false);
    }
  };

  const handleIterateTree = async () => {
    updateOptions({ isLoading: true });
    try {
      const res = await api.iterateTree(iterations, exploreExploitParam);
      if (res.status === 200) onUpdateTree(res.data);
    } catch (err) {
      showToastMessage("error", "Error", err.message);
    } finally {
      updateOptions({ isLoading: false });
    }
  };

  return (
    <>
      <div className="sidebar-container">
        <h1 className="sidebar-heading">Algorithm Controls</h1>
        <Button label="Create Tree" onClick={handleCreateTree} loading={isCreatingTree} />
        <div>
          <label className="control-label" htmlFor="iterations">
            Iterations to run
          </label>
          <div className="p-inputgroup flex-1">
            <InputNumber
              id="iterations"
              value={iterations}
              min={1}
              onChange={(e) => setIterations(e.value)}
            />
            <Button
              label="Run"
              onClick={handleIterateTree}
              disabled={!iterations || !isTreeCreated || options.isLoading}
            />
          </div>
        </div>
        <div className="slider-group">
          <div className="slider-control">
            <div className="slider-labels">
              <span>Explore</span>
              <span>Exploit</span>
            </div>
            <Slider
              min={0}
              max={1}
              step={0.02}
              value={Number(exploreExploitParam)}
              onChange={(e) => setExploreExploitParam(e.value)}
            />
          </div>
          <InputText
            value={exploreExploitParam}
            // min={0}
            // max={1}
            // minFractionDigits={0}
            // maxFractionDigits={2}
            // allowEmpty={false}
            onChange={(e) => setExploreExploitParam(e.target.value)}
          />
        </div>
        <Divider />
        <h1 className="sidebar-heading">Visualisation Options</h1>
        <div style={{ marginTop: "-0.5rem" }}>
          <label className="control-label" htmlFor="dropdown">
            Graph type
          </label>
          <div className="p-inputgroup flex-1">
            <Dropdown
              id="dropdown"
              options={graphOptions}
              value={options.graphType}
              onChange={(e) => updateOptions({ graphType: e.value })}
            />
          </div>
        </div>
        <Button
          label="Filter by reward"
          disabled={options.graphType !== "d3"}
          onClick={() => updateOptions({ enableFilter: true })}
        />
      </div>
    </>
  );
};

export default Sidebar;
