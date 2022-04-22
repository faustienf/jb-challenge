import React, { FC, ReactNode } from 'react';

import { Node } from './types';

import './three-node.css';

type Props = {
  node: Node;
  onRenderLabel: (node: Node) => ReactNode;
  children?: (node: Node) => ReactNode;
};

export const ThreeNode: FC<Props> = (props) => {
  const {
    node,
    children,
    onRenderLabel,
  } = props;

  return (
    <li 
      className="three-node"
    >
      {onRenderLabel(node)}
      {children && children(node)}
    </li>
  );
};
