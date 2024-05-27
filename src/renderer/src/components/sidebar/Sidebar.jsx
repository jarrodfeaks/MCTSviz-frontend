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
import TreeOptions from "../tree/graphs/graphOptions/TreeOptions";

const Sidebar = ({ onUpdateTree, showToastMessage, isTreeCreated }) => {
  const [isCreatingTree, setIsCreatingTree] = useState(false);

  const [iterations, setIterations] = useState();

  const [seed, setSeed] = useState();

  const [exploreExploitParam, setExploreExploitParam] = useState(0.5);

  const { options, updateOptions } = useContext(OptionsContext);

  const graphOptions = [
    { label: "Tree", value: "tree" },
    { label: "Tree (Legacy)", value: "treeLegacy" },
    { label: "Radial", value: "radial" }
  ];

  const graphControls = {
    tree: TreeOptions,
  };

  const GraphControlComponent = graphControls[options.graphType];

  // send API request to create a new tree
  const handleCreateTree = async () => {
    setIsCreatingTree(true);
    try {
      const res = await api.createTree(seed);
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

  // send request to iterate existing tree
  const handleIterateTree = async () => {
    updateOptions({ isLoading: true });
    try {
      const res = await api.iterateTree(iterations, exploreExploitParam);
      console.log(res.data);
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
              <span>Exploit</span>
              <span>Explore</span>
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
            keyfilter="num"
            onChange={(e) => setExploreExploitParam(e.target.value)}
          />
        </div>
        <div className="seed-group">
          <label className="control-label" htmlFor="seed">Seed</label>
          <InputText
            value={seed}
            id="seed"
            placeholder="e.g. 1234"
            onChange={(e) => setSeed(e.target.value)}
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
        {GraphControlComponent && <GraphControlComponent />}
      </div>
    </>
  );
};

export default Sidebar;
