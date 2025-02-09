import React, { useEffect, useRef, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "@tensorflow/tfjs";

const AIInterviewPostureCoach = () => {
  const videoRef = useRef(null);
  const [feedback, setFeedback] = useState("Sit comfortably. We'll analyze your posture.");
  const [confidence, setConfidence] = useState(80);
  const [net, setNet] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = [
    "What motivates you to work hard?",
    "Tell me about a time you overcame a challenge.",
    "Where do you see yourself in 5 years?",
    "What are your strengths and weaknesses?",
    "Why should we hire you?",
  ];

  useEffect(() => {
    const loadPosenet = async () => {
      try {
        const model = await posenet.load({
          architecture: "MobileNetV1",
          outputStride: 16,
          inputResolution: { width: 640, height: 480 },
          multiplier: 0.75, // Good balance of speed & accuracy
        });
        setNet(model);
      } catch (error) {
        console.error("❌ Error loading PoseNet:", error);
      }
    };

    loadPosenet();
  }, []);

  useEffect(() => {
    if (!net) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            detectPoseLoop();
          };
        }
      } catch (error) {
        console.error("❌ Error accessing camera:", error);
        setFeedback("Camera access denied.");
      }
    };

    startCamera();
  }, [net]);

  let frameCount = 0;
  const detectPoseLoop = async () => {
    if (!net || !videoRef.current) return;

    const detect = async () => {
      frameCount++;
      if (frameCount % 3 === 0) {
        // Process every 3rd frame to reduce lag
        await detectPose();
      }
      requestAnimationFrame(detect);
    };

    detect();
  };

  const recentShoulderWidths = [];
  const detectPose = async () => {
    if (!videoRef.current || !net) return;

    try {
      const pose = await net.estimateSinglePose(videoRef.current, {
        flipHorizontal: false,
      });

      console.log("✅ Pose Data:", pose);
      evaluatePosture(pose);
    } catch (error) {
      console.error("❌ Pose estimation error:", error);
    }
  };

  const evaluatePosture = (pose) => {
    if (!pose || !pose.keypoints) return;

    const minConfidence = 0.6;
    const leftShoulder = pose.keypoints.find(p => p.part === "leftShoulder" && p.score > minConfidence);
    const rightShoulder = pose.keypoints.find(p => p.part === "rightShoulder" && p.score > minConfidence);
    const nose = pose.keypoints.find(p => p.part === "nose" && p.score > minConfidence);

    if (!leftShoulder || !rightShoulder || !nose) {
      setFeedback("❌ Kindly sit properly.");
      return;
    }

    const videoWidth = videoRef.current.videoWidth || 640;
    const shoulderWidth = Math.abs(leftShoulder.position.x - rightShoulder.position.x);

    recentShoulderWidths.push(shoulderWidth);
    if (recentShoulderWidths.length > 15) recentShoulderWidths.shift(); // Keep last 15 frames

    const sortedWidths = [...recentShoulderWidths].sort((a, b) => a - b);
    const medianShoulderWidth = sortedWidths[Math.floor(sortedWidths.length / 2)];

    const normalizedShoulderWidth = (medianShoulderWidth / videoWidth) * 100;

    const shoulderHeightDiff = Math.abs(leftShoulder.position.y - rightShoulder.position.y);
    const isLeaning = shoulderHeightDiff > 20;

    const noseCenterOffset = Math.abs(nose.position.x - (leftShoulder.position.x + rightShoulder.position.x) / 2);
    const isHeadTilted = noseCenterOffset > 30;

    const defaultDistance = 28;
    const closeThreshold = defaultDistance * 1.4;
    const farThreshold = defaultDistance * 0.6;

    let newFeedback = "Adjust your posture...";
    let newConfidence = 80;

    if (normalizedShoulderWidth > closeThreshold) {
      newFeedback = "You're sitting too close. Move back slightly.";
      newConfidence -= 15;
    } else if (normalizedShoulderWidth < farThreshold && medianShoulderWidth > 80) {
      newFeedback = "You're sitting too far. Move closer.";
      newConfidence -= 10;
    } else if (isLeaning) {
      newFeedback = "You seem to be leaning. Keep your shoulders level.";
      newConfidence -= 10;
    } else if (isHeadTilted) {
      newFeedback = "Your head is tilted. Keep it straight.";
      newConfidence -= 10;
    } else {
      newFeedback = "Perfect posture! Maintain this.";
      newConfidence = 98;
    }

    setConfidence(prev => Math.round((prev * 0.7) + (newConfidence * 0.3)));
    setFeedback(newFeedback);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      setCurrentQuestionIndex(prevIndex => (prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (event.key === "ArrowLeft") {
      setCurrentQuestionIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ flex: 2, textAlign: "center" }}>
        <h1 style={{ color: "#333", fontSize: "24px" }}>AI Interview Posture Coach</h1>
        <p style={{ fontSize: "16px", color: "#666" }}>
          Adjust your posture while speaking for an ideal interview presence.
        </p>

        <video
          ref={videoRef}
          style={{ width: "600px", height: "450px", border: "2px solid #444", borderRadius: "8px", marginTop: "20px" }}
          autoPlay
          muted
        />

        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
          <h2 style={{ fontSize: "18px", color: "#222" }}>AI Feedback:</h2>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: feedback.includes("Perfect") ? "green" : "red" }}>
            {feedback}
          </p>
        </div>
      </div>

      <div style={{ flex: 1, marginLeft: "20px", textAlign: "center", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "18px", color: "#222" }}>Question Box</h2>
        <p style={{ fontSize: "16px", color: "#666" }}>{questions[currentQuestionIndex]}</p>
      </div>
    </div>
  );
};

export default AIInterviewPostureCoach;