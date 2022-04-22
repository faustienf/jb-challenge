import React, { FC, useState } from 'react';

import { Three } from './three';
import { Node } from './types';

import './three-node.css';

type Props = {
  node: Node;
};

export const ThreeNode: FC<Props> = (props) => {
  const {
    node,
  } = props;

  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <li 
      key={node.id}
      className="three-node"
    >
      {node.children.length > 0
        ? (
          <button 
            type="button"
            className="three-node-button"
            onClick={() => setCollapsed(state => !state)}
          >
            <span className="three-node-icon">
              {isCollapsed ? '➖' : '➕'}
            </span>
            {' '}
            <span className="three-node-label">
              {node.label}
            </span>
          </button>
        )
        : (
          <span className="three-node-label">
            {node.label}
          </span>
        )
      }

      {isCollapsed && node.children && (
        <Three nodes={node.children} />
      )}
    </li>
  );
};
