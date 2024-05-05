import React from "react";

const TreeViewInfoCard = ({ node }) => {

  const renderBoard = (board) => {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px" }}>
        {board.map((element, index) => (
          <div key={index} style={{ border: "1px solid black", padding: "5px" }}>
            {element}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {node && node.attributes ? (
        <>
          <ul style={{ padding: 0 }}>
            {Object.entries(node.attributes).map(([key, value], index) => (
              <li key={index}><strong>{`${key}: `}</strong>{`${value}`}</li>
            ))}
          </ul>
          {/*<div>{renderBoard(["o", "x", " ", "x", "o", "o", " ", " ", "x"])}</div>*/}
        </>
      ) : (
        <div>No attributes found</div>
      )}
    </div>
  )
}

export default TreeViewInfoCard;
