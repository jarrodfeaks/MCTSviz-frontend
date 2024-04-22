import React, { useState } from "react";
import Tree from "react-d3-tree";
import TreeWrapper from "./TreeWrapper";
import TreeViewInfoCard from "./TreeViewInfoCard";
import IconRotate from "../../assets/icons/IconRotate";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production"
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication"
          },
          children: [
            {
              name: "Worker"
            }
          ]
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly"
          },
          children: [
            {
              name: "Worker"
            }
          ]
        }
      ]
    }
  ]
};

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
          className="node"
          r={isSelected ? "18" : "15"}
          stroke={strokeColor}
          strokeWidth={isSelected ? "1.5" : "1"}
          fill={fillColor}
        />
      </g>
    </>
  )
};

const TreeView = ({ tree }) => {

  const [selectedNode, setSelectedNode] = useState(null);
  const [viewOrientation, setViewOrientation] = useState("vertical");
  const [whiteSpaceToggle, setWhiteSpaceToggled] = useState(true);

  const toggleViewOrientation = () => {
    setViewOrientation((currentOrientation) =>
      currentOrientation === "horizontal" ? "vertical" : "horizontal"
    );
  };

  const toggleWhiteSpace = () => {
    setWhiteSpaceToggled((prev) => !prev);
  };
  const separation = whiteSpaceToggle ? {siblings: 0.1, nonSiblings: 0.2} : {siblings: 1, nonSiblings: 1};

  const handleUpdateSelectedNode = (node) => {
    setSelectedNode(node);
  }

  return (
    <TreeWrapper>
      <Tree
        data={tree}
        orientation={viewOrientation}
        separation={separation}
        renderCustomNodeElement={(props) => (
          <CustomNode {...props} selectedNode={selectedNode} handleUpdateSelectedNode={handleUpdateSelectedNode} />
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
      <Button
        className="overlay bottom-right"
        label="Change scale"
        style={{ padding: "0.5rem" }}
        tooltip={"Change scale of Tree"}
        tooltipOptions={{ position: "left", style: { fontSize: "0.9rem" } }}
        outlined
        raised
        onClick={toggleWhiteSpace}
      />
      {selectedNode && (
        <Card className="overlay top-left" title="Selected Node Attributes">
          <TreeViewInfoCard node={selectedNode} />
        </Card>
      )}
    </TreeWrapper>
  );
};

export default TreeView;
