import { Background, type Node, ReactFlow } from '@xyflow/react';
import React from 'react';

import '@xyflow/react/dist/style.css';

const nodes: Node[] = [
  {
    id: '0',
    type: 'input',
    data: {
      label: <span className="text-black">Node 0</span>,
    },
    position: { x: 0, y: 50 },
  },
  {
    id: '1',
    type: 'default',
    data: {
      label: <span className="text-black">Node 1</span>,
    },
    position: { x: 200, y: 150 },
  },
];

const edges = [{ id: 'e0-1', source: '0', target: '1' }];

export const FlowExample: React.FC = () => (
  <div className="w-full h-1/2">
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      fitViewOptions={{ padding: 2 }}
    >
      <Background />
    </ReactFlow>
  </div>
);
