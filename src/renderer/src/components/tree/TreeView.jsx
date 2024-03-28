import React from "react";
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
  return (
    // <div id="treeWrapper" style={{ width: '100%', height: '100%' }}>
      <Tree data={tree} />
    // </div>
  )
}

export default TreeView;
