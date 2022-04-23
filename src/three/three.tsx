import React, { FC, PropsWithChildren, ReactNode } from 'react';

import { Node } from './types';

import './three.css';

type Props = {
  node: Node;
  onRenderLabel: (node: Node) => ReactNode;
};

export const Three: FC<PropsWithChildren<Props>> = (props) => {
  const {
    node,
    children,
    onRenderLabel,
  } = props;

  return (
    <div className="three">
      {onRenderLabel(node)}
      {children}
    </div>
  );
};
