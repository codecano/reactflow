import { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 50, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Connect' },
    position: { x: 100, y: 200 },
  },
];

const initialEdges = [
  { id: '1-2', source: '1', target: '2', type: 'step' },
  { id: '2-3', source: '2', target: '3', type: 'line' },
];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  return (
    <div style={{ height: '80%', width: '100%' }}>
      <h4 className='text-center my-3'>Welcome to Codecano</h4>
      {/* <div className='container mb-3'>
        <div class="mb-3">
          <input type="text" placeholder='Enter text' class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Add New</button>
      </div> */}
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
