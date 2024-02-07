import React, { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', data: { label: 'first' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const UpdateNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [formDisplay, setFormDisplay] = useState('none');
  const [nodeForm, setNodeForm] = useState({ id: null, label: '' });

  const handleNode = (id) => {
    if (id) {
      // Editing existing node
      const updatedNodes = nodes.map(node => {
        if (node.id === id) {
          return { ...node, data: { label: nodeForm.label } };
        }
        return node;
      });
      setNodes(updatedNodes);
    } else {
      // Adding new node
      const newNode = {
        id: String(nodes.length + 1),
        data: { label: nodeForm.label },
        position: { x: 100, y: nodes[nodes.length - 1].position.y + 100 }
      };
      setNodes([...nodes, newNode]);
    }
    setFormDisplay('none');
    setNodeForm({ id: null, label: '' });
  };

  useEffect(() => {
    console.log(nodes);
  }, [nodes])


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultViewport={defaultViewport}
      minZoom={0.2}
      maxZoom={4}
      attributionPosition="bottom-left"
    >
      <div className="updatenode__controls">
        <button style={{ marginRight: "10px" }} onClick={() => setFormDisplay('block')} >Add Node</button>
        <button>Save Graph</button>
        <div style={{ display: formDisplay }}>
          <label>label:</label>
          <input value={nodeForm?.label} onChange={(evt) => setNodeForm((prev) => ({ ...prev, label: evt.target.value }))} />
          <br />
          <button onClick={() => handleNode(nodeForm.id)}>Save</button>
        </div>
      </div>
    </ReactFlow>
  );
};

export default UpdateNode;
