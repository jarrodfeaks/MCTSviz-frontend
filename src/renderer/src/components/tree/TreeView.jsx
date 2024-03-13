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

const TreeView = () => {
  return (
    // <div id="treeWrapper" style={{ width: '100%', height: '100%' }}>
      <Tree data={orgChart} />
    // </div>
  )
}

export default TreeView;
