import React, { memo } from "react";
import { Handle } from "reactflow";

export default memo(({ data, isConnectable }) => {
  return (
    <div
      style={{
        minWidth: "150px",
        minHeight: "50px",        
        background: "#fff",
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
