import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
} from '@xyflow/react';
import type { FlowEdge, FlowNode } from './usePersonGraphNodes';

interface PersonGraphProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export const PersonGraph = ({ nodes, edges }: PersonGraphProps) => (
  <ReactFlow
    nodes={nodes}
    edges={edges}
    fitView
    proOptions={{ hideAttribution: true }}
    panOnDrag={true}
    nodesDraggable={true}
    zoomOnScroll={true}
    zoomOnDoubleClick={true}
    style={{ background: '#001', borderRadius: '1rem', pointerEvents: 'all' }}
  >
    <Background color="#0ff" variant={BackgroundVariant.Dots} gap={20} />
    <Controls showZoom showFitView showInteractive={false} />
  </ReactFlow>
);
