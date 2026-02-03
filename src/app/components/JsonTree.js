"use client";
import { useState } from "react";
import "./tree.css";

function TreeNode({ label, value }) {
  const [open, setOpen] = useState(false);

  const isObject = typeof value === "object" && value !== null;

  if (!isObject) {
    return (
      <div className="tree-item leaf">
        <span className="key">{label}</span>
        <span className="colon">:</span>
        <span className="value">{String(value)}</span>
      </div>
    );
  }

  return (
    <div className="tree-item">
      <div className="tree-key" onClick={() => setOpen(!open)}>
        <span className="arrow">{open ? "▼" : "▶"}</span>
        <span className="key">{label}</span>
        <span className="type">({Array.isArray(value) ? "array" : "object"})</span>
      </div>

      {open && (
        <div className="tree-children">
          {Object.entries(value).map(([k, v]) => (
            <TreeNode key={k} label={k} value={v} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function JsonTree({ data }) {
  return (
    <div className="json-tree">
      <TreeNode label="root" value={data} />
    </div>
  );
}
