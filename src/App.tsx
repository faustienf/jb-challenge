import React from 'react';

import type { ID } from 'types/opaque';
import { Node, Three } from './three';
import { NodeLabel } from './node-label';
import { NodeButton } from './node-button';
import { useBooleanMap } from './hooks/use-boolean-map';
import { VirtualList } from './virtual-list';
import { nodesSample } from './nodes-sample';

import './app.css';

export const App = () => {
  const [collapsed, onToggleCollapsed] = useBooleanMap<ID>();

  const onRenderLabel = (node: Node) => node.children.length
    ? (
      <NodeButton 
        isCollapsed={collapsed.get(node.id)}
        onClick={() => onToggleCollapsed(node.id)}
      >
        <NodeLabel text={node.label} />
      </NodeButton>
    )
    : <NodeLabel text={node.label} />;

  const onRenderChildNodes = (nodes: Node[]) => (
    nodes.map(childNode => (
      <Three
        key={childNode.id}
        node={childNode}
        onRenderLabel={onRenderLabel}
      >
        {collapsed.get(childNode.id) && (
          <VirtualList
            minRows={5}
            className="app-sub-list"
          >
            {onRenderChildNodes(childNode.children)}
          </VirtualList>
        )}
      </Three>
    ))
  );

  return (
    <div className="app">
      {nodesSample.map(node => (
        <Three
          key={node.id}
          node={node}
          onRenderLabel={onRenderLabel}
        >
          {collapsed.get(node.id) && (
            <VirtualList
              minRows={10}
              className="app-list"
            >
              {onRenderChildNodes(node.children)}
            </VirtualList>
          )}
        </Three>
      ))}
    </div>
  );
}
