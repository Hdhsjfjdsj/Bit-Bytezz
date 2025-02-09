import React, { useState } from "react";
import roadmapData from "./roadmap.json";
import "./TreeNode.css";

const TreeNode = ({
  node,
  selectedNode,
  onClick,
  openNodes,
  setOpenNodes,
  level,
  handleViewClick,
}) => {
  const isSelected = selectedNode === node.label;
  const isOpen = openNodes[node.label]; // Track using node label

  const handleNodeClick = () => {
    setOpenNodes((prev) => ({
      ...prev,
      [node.label]: !prev[node.label], // Toggle open state
    }));
    onClick(node.label); // Select the node
  };

  return (
    <div className="tree-node">
      <div className={`node-container ${isSelected ? "selected-container" : ""}`}>
        <div className={`node ${isSelected ? "selected" : ""}`} onClick={handleNodeClick}>
          {node.children ? (isOpen ? "▼" : "▶") : "•"} {node.label}
        </div>
        {isSelected && (
          <button className="action-btn" onClick={() => handleViewClick(node.label)}>
            View
          </button>
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

const Roadmap = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [openNodes, setOpenNodes] = useState({});
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleViewClick = async (nodeLabel) => {
    setLoading(true);
    setError(null);
    setCourseData(null);

    try {
      const response = await fetch("http://localhost:5000/generate-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course_name: nodeLabel }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }

      const data = await response.json();
      setCourseData(data.courseDetails);

      // Save JSON response to file
      await fetch("http://localhost:5000/save-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.courseDetails),
      });
    } catch (error) {
      setError("Error fetching course details.");
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>📌 Roadmap</h1>
      <p>Click on topics to expand and explore.</p>

      <div className="tree-container">
        <TreeNode
          node={roadmapData}
          selectedNode={selectedNode}
          onClick={setSelectedNode}
          openNodes={openNodes}
          setOpenNodes={setOpenNodes}
          level={0}
          handleViewClick={handleViewClick}
        />
      </div>

      {selectedNode && (
        <div className="info-box">
          <h2>📍 Selected Topic: {selectedNode}</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {courseData && (
            <div className="course-details">
              <h3>Course Overview</h3>
              <p>{courseData["Course Overview"]}</p>

              <h3>Eligibility Criteria</h3>
              <p>{courseData["Eligibility Criteria"]}</p>

              <h3>Duration & Structure</h3>
              <p>{courseData["Duration & Structure"]}</p>

              <h3>Top Institutions</h3>
              <ul>
                {courseData["Top Institutions"].map((institution, index) => (
                  <li key={index}>{institution}</li>
                ))}
              </ul>

              <h3>Career Opportunities</h3>
              <p><strong>Job Roles:</strong> {courseData["Career Opportunities"]["Job Roles"].join(", ")}</p>
              <p><strong>Industries:</strong> {courseData["Career Opportunities"]["Industries"].join(", ")}</p>

              <h3>Future Scope in India</h3>
              <p>{courseData["Future Scope in India"]}</p>

              <h3>Further Study Options</h3>
              <ul>
                {courseData["Further Study Options"].map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <footer>
        <p>🔥 Keep Exploring & Keep Learning! 🚀</p>
      </footer>
    </div>
  );
};

export default Roadmap;
