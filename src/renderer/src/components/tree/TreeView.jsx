import React, { useState } from "react";
import Tree from "react-d3-tree";

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

const TreeView = ({ tree }) => {
  
  const [selectedNode, setSelectedNode] = useState(null);

  const handleClick = (nodeData) => {
    if (onNodeClick) {
      onNodeClick(nodeData);
    }
    setSelectedNode(nodeData);
  };

  const getNodeStyle = (nodeId) => {
    // Apply red outline style to the clicked node
    if (selectedNode && selectedNode.id === nodeId) {
      return {
        stroke: 'red',
        strokeWidth: '2px',
      };
    }
    return null;
  };


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Tree
        data={tree}
        onClick={handleClick} // Call handleClick when a node is clicked  (dont have handleClick working)
        collapsible={false} // if true when clicking on node shows or hids child nodes
        orientation="vertical" // Change orientation top down
        separation={{ siblings: 1, nonSiblings: 2 }} //not sure what this does
       
      />
    </div>
  );
};

export default TreeView;
