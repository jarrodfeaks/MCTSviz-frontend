import React from "react";

const TreeGraphLegacyInfoCard = ({ node }) => {

  const renderBoard = (board) => {
    if (!board) return null;
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(3, 1fr)", gap: "5px" }}>
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
          <div>{renderBoard(node.attributes.board)}</div>
        </>
      ) : (
        <div>No attributes found</div>
      )}
    </div>
  )
}

export default TreeGraphLegacyInfoCard;
