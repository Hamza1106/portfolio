import React, { useState } from "react";

const StreamlitWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 1000,
        fontFamily: "inherit",
      }}
    >
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            backdropFilter: "blur(12px)",
            transition: "0.3s",
          }}
        >
          <span style={{ fontSize: "18px" }}>🤖</span>
          <span>Open AI Agent</span>
        </button>
      ) : (
        <div
          style={{
            width: "400px",
            height: "600px",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 15px 50px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#000",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
              background: "red",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "6px",
            }}
          >
            X
          </button>

          {/* STREAMLIT IFRAME */}
          <iframe
            src="http://localhost:8501"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="AI Agent"
          />
        </div>
      )}
    </div>
  );
};

export default StreamlitWidget;