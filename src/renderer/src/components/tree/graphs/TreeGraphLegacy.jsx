import Tree from "react-d3-tree";
import React, { useState } from "react";
import { Button } from "primereact/button";
import IconRotate from "../../../assets/icons/IconRotate";
import { Card } from "primereact/card";
import TreeGraphLegacyInfoCard from "./TreeGraphLegacyInfoCard";

const CustomNode = ({ nodeDatum, toggleNode, selectedNode, handleUpdateSelectedNode }) => {

  const isLeaf = Boolean(!nodeDatum.children?.length);
  const isSelected = selectedNode && nodeDatum.__rd3t.id === selectedNode.__rd3t.id;

  const fillColor = isSelected ? (isLeaf ? "#C2DFFF" : "#5CABFF") : (isLeaf ? "#FFF" : "#CCC");
  const strokeColor = isSelected ? (isLeaf ? "#116DD0" : "#0B488A") : "#222";

  const handleNodeClick = () => {
    handleUpdateSelectedNode(isSelected ? null : nodeDatum);
  };

  return (
    <>
      <g onClick={handleNodeClick} onContextMenu={toggleNode}>
        <circle
          className="circle-node"
          r={isSelected ? "18" : "15"}
          stroke={strokeColor}
          strokeWidth={isSelected ? "1.5" : "1"}
          fill={fillColor}
        />
      </g>
    </>
  )
};

const TreeGraphLegacy = ({ data }) => {

  const [selectedNode, setSelectedNode] = useState(null);
  const [viewOrientation, setViewOrientation] = useState("horizontal");

  const toggleViewOrientation = () => {
    setViewOrientation((currentOrientation) =>
      currentOrientation === "horizontal" ? "vertical" : "horizontal"
    );
  };

  const handleUpdateSelectedNode = (node) => {
    setSelectedNode(node);
  };

  return (
    <>
      <Tree
        data={data}
        orientation={viewOrientation}
        separation={{ siblings: 0.1, nonSiblings: 0.2 }}
        renderCustomNodeElement={(props) => (
          <CustomNode
            {...props}
            selectedNode={selectedNode}
            handleUpdateSelectedNode={handleUpdateSelectedNode}
          />
        )}
      />
      <Button
        className="overlay top-right"
        style={{ padding: "0.25rem" }}
        tooltip={`Switch to ${viewOrientation === "horizontal" ? "vertical" : "horizontal"} orientation`}
        tooltipOptions={{ position: "left", style: { fontSize: "0.9rem" } }}
        outlined
        raised
        icon={IconRotate}
        onClick={toggleViewOrientation}
      />
      {selectedNode && (
        <Card className="overlay top-left" title="Selected Node Attributes">
          <TreeGraphLegacyInfoCard node={selectedNode} />
        </Card>
      )}
    </>
  );
};

export default TreeGraphLegacy;
