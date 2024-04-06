import React, { useState } from "react";
import Tree from "react-d3-tree";
import TreeWrapper from "./TreeWrapper";
import IconRotate from "../../assets/icons/IconRotate";
import { Button } from "primereact/button";

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

const TreeView = ({ tree }) => {

  const [viewOrientation, setViewOrientation] = useState("horizontal");

  const toggleViewOrientation = () => {
    setViewOrientation((currentOrientation) =>
      currentOrientation === "horizontal" ? "vertical" : "horizontal"
    );
  };

  return (
    <TreeWrapper>
      <Tree data={tree} orientation={viewOrientation} />
      <Button
        className="control top-right"
        style={{ padding: "0.25rem" }}
        tooltip={`Switch to ${viewOrientation === "horizontal" ? "vertical" : "horizontal"} orientation`}
        tooltipOptions={{ position: "left", style: { fontSize: "0.9rem" } }}
        outlined
        raised
        icon={IconRotate}
        onClick={toggleViewOrientation}
      />
    </TreeWrapper>
    // </div>
  );
};

export default TreeView;
