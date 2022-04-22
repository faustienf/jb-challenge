import React, { ComponentProps, FC } from 'react';

import { Node } from './types';
import { ThreeNode } from './three-node';

import './three.css';

type ThreeNodeProps = ComponentProps<typeof ThreeNode>;

type Props = Pick<ThreeNodeProps, 'onRenderLabel' | 'children'> & {
  nodes: Node[];
};

export const Three: FC<Props> = (props) => {
  const {
    nodes,
    children,
    onRenderLabel,
  } = props;

  return (
    <ul className="three">
      {nodes.map(node => (
        <ThreeNode 
          key={node.id}
          node={node}
          onRenderLabel={onRenderLabel}
        >
          {children}
        </ThreeNode>
      ))}
    </ul>
  );
};
