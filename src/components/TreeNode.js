import React from "react";
import "./TreeNode.css";

const TreeNode = ({ node, selectedNode, onClick, openNodes, setOpenNodes, level, handleViewClick }) => {
  const isSelected = selectedNode === node.label;
  const isOpen = openNodes[level] === node.label;

  return (
    <div className="tree-node">
      <div className={node-container ${isSelected ? "selected-container" : ""}}>
        <div className={node ${isSelected ? "selected" : ""}} onClick={() => onClick(node.label)}>
          {isOpen ? "▼" : "▶"} {node.label}
        </div>
        {isSelected && (
          <button className="action-btn" onClick={() => handleViewClick(node.label)}>View</button>
        )}
      </div>
      {isOpen && node.children && (
        <div className="child-container">
          {node.children.map((child, index) => (
            <TreeNode
              key={index}
              
              node={child}
              selectedNode={selectedNode}
              onClick={onClick}
              openNodes={openNodes}
              setOpenNodes={setOpenNodes}
              level={level + 1}
              handleViewClick={handleViewClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;