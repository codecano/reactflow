import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, addEdge, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import CircleNodes from './nodeTypes/CircleNode';
import SquareNode from './nodeTypes/SquareNode';
import TriangleNode from './nodeTypes/TriangleNode';

const nodeTypes = {
  circle: CircleNodes,
  square: SquareNode,
  triangle: TriangleNode
};

const initialNodes = [{ id: '1', data: { label: 'Start' }, type: "input", position: { x: 100, y: 100 } }];
const initialEdges = [{ id: '1-2', source: '1', target: '2' }];
const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const initialNodeForm = { id: null, label: '' };

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [formDisplay, setFormDisplay] = useState('none');
  const [nodeForm, setNodeForm] = useState(initialNodeForm);

  const handleNode = (id) => {
    if (id) {
      // Editing existing node
      const updatedNodes = nodes.map(node => {
        if (node.id === id) return { ...node, data: { label: nodeForm.label }, type: nodeForm.type };
        return node;
      });
      setNodes(updatedNodes);
      alert('Node updated successfully');
    } else {
      // Adding new node
      const newNode = { id: String(nodes.length + 1), data: { label: nodeForm.label }, type: nodeForm.type, position: { x: 100, y: nodes[nodes.length - 1].position.y + 100 } };
      setNodes([...nodes, newNode]);
      alert('New node added successfully');
    }
    setFormDisplay('none');
    setNodeForm(initialNodeForm);
  };

  const onConnect = useCallback(
    (connection) => {
      setEdges((oldEdges) => addEdge(connection, oldEdges));
    }, [setEdges],
  );

  const onNodeDoubleClick = (event, node) => {
    setFormDisplay('block');
    setNodeForm({ id: node.id, label: node.data.label });
  }

  const storeData = () => {
    if (nodes) localStorage.setItem('nodes', JSON.stringify(nodes));
    if (edges) localStorage.setItem('edges', JSON.stringify(edges));
    alert('Data stored successfully');
  }

  useEffect(() => {
    const localNodes = JSON.parse(localStorage.getItem('nodes'));
    if (localNodes) setNodes(localNodes);

    const localEdges = JSON.parse(localStorage.getItem('edges'));
    if (localEdges) setEdges(localEdges);
  }, []);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodeDoubleClick={onNodeDoubleClick}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      defaultViewport={defaultViewport}
      nodeTypes={nodeTypes}
      minZoom={0.2}
      maxZoom={4}
      attributionPosition='bottom-center'
    >
      <div className="updatenode__controls">
        <div className='nodeButton'>
          <button style={{ marginRight: "10px" }} onClick={() => setFormDisplay('block')} >Add Node</button>
          <button onClick={() => storeData()}>Save Graph</button>
        </div>
        <div style={{ display: formDisplay }} className='nodeForm'>
          <input value={nodeForm?.label} onChange={(evt) => setNodeForm((prev) => ({ ...prev, label: evt.target.value }))} style={{ marginBottom: "5px" }} placeholder='Enter Node title' />
          <br />
          <select style={{ marginBottom: "5px", width: "100%", padding: "2px" }} value={nodeForm?.type} onChange={(evt) => setNodeForm((prev) => ({ ...prev, type: evt.target.value }))}>
            <option value={""}>Default</option>
            <option value={"square"}>Square</option>
            <option value={"circle"}>Circle</option>
            <option value={"triangle"}>Triangle</option>
          </select>
          <br />
          <button onClick={() => handleNode(nodeForm.id)}>{nodeForm.id ? 'Update' : 'Save'}</button>
        </div>
      </div>
      <Background color="#ccc" variant="dots" />
    </ReactFlow>
  );
};

export default App;