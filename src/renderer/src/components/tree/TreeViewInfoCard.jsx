import React from "react";

const TreeViewInfoCard = ({ node }) => {
  return (
    <div>
      {node && node.attributes ? (
        <ul style={{ padding: 0 }}>
          {Object.entries(node.attributes).map(([key, value], index) => (
            <li key={index}><strong>{`${key}: `}</strong>{`${value}`}</li>
          ))}
        </ul>
      ) : (
        <div>No attributes found</div>
      )}
    </div>
  )
}

export default TreeViewInfoCard;
