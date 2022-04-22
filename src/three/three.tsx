import React, { FC } from 'react';

import { Node } from './types';
import './three.css';
import { ThreeNode } from './three-node';

type Props = {
  nodes: Node[];
};

export const Three: FC<Props> = (props) => {
  const {
    nodes,
  } = props;

  return (
    <ul className="three">
      {nodes.map(node => (
        <ThreeNode 
          key={node.id}
          node={node}
        />
      ))}
    </ul>
  );
};
