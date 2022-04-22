import React from 'react';

import type { ID } from 'types/opaque';
import {Three, Node} from './three';
import { NodeLabel } from 'node-label';
import { NodeButton } from 'node-button';

import './app.css';
import { useBooleanMap } from 'hooks/use-boolean-map';

const nodes = [
  {
    id: 'ss1' as ID,
    label: 'label',
    children: [
      {
        id: 'ss2' as ID,
        label: 'label',
        children: [
          {
            id: 'ss3' as ID,
            label: 'label',
            children: [],
          }
        ],
      },
      {
        id: 'ss4' as ID,
        label: 'label',
        children: [],
      }
    ],
  }
];

export const App = () => {
  const [collapsedMap, onToggleCollapsed] = useBooleanMap<ID>();

  const onRenderLabel = (node: Node) => node.children.length
    ? (
      <NodeButton 
        isCollapsed={collapsedMap.get(node.id)}
        onClick={() => onToggleCollapsed(node.id)}
      >
        <NodeLabel text={node.label} />
      </NodeButton>
    )
    : <NodeLabel text={node.label} />;

  const onRenderChildren = (node: Node) => collapsedMap.get(node.id) && (
    <Three 
      nodes={node.children} 
      onRenderLabel={onRenderLabel}
    >
      {onRenderChildren}
    </Three>
  );

  return (
    <div className="app">
      <Three 
        nodes={nodes}
        onRenderLabel={onRenderLabel}
      >
        {onRenderChildren}
      </Three>
    </div>
  );
}
