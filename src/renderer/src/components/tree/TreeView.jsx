import React, { useContext, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import TreeWrapper from "./TreeWrapper";
import TreeViewInfoCard from "./TreeViewInfoCard";
import IconRotate from "../../assets/icons/IconRotate";
import D3TreeGraph from "./graphs/D3TreeGraph";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import OptionsContext from "../../OptionsContext";
import LoadingOverlay from "../loadingOverlay/LoadingOverlay";

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

const TreeView = ({ tree }) => {

  const { options } = useContext(OptionsContext);

  // const graphMap = {
  //   tree: TreeGraph,
  //   d3: D3TreeGraph
  // }

  const [selectedNode, setSelectedNode] = useState(null);
  const [viewOrientation, setViewOrientation] = useState("horizontal");

  const toggleViewOrientation = () => {
    setViewOrientation((currentOrientation) =>
      currentOrientation === "horizontal" ? "vertical" : "horizontal"
    );
  };

  const handleUpdateSelectedNode = (node) => {
    setSelectedNode(node);
  }

  useEffect(() => {
    setSelectedNode(null);
  }, [options.graphType]);

  return (
    <LoadingOverlay isLoading={options.isLoading}>
      <TreeWrapper>
        {options.graphType === "d3" && (
          <D3TreeGraph data={tree?.tree || {}} />
        )}
        {options.graphType === "tree" && (
          <Tree
            data={tree?.tree || {}}
            orientation={viewOrientation}
            separation={{ siblings: 0.2, nonSiblings: 0.4 }}
            renderCustomNodeElement={(props) => (
              <CustomNode {...props} selectedNode={selectedNode} handleUpdateSelectedNode={handleUpdateSelectedNode} />
            )}
          />
        )}
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
            <TreeViewInfoCard node={selectedNode} />
          </Card>
        )}
      </TreeWrapper>
    </LoadingOverlay>
  );
};

export default TreeView;
