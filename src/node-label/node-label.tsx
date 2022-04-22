import React, { FC } from 'react';

import './node-label.css';

type Props = {
  text: string;
}

export const NodeLabel: FC<Props> = (props) => {
  const {text} = props;

  return (
    <span className="node-label">
      {text}
    </span>
  );
};
