import React, { FC, PropsWithChildren } from 'react';

import './node-button.css';

type Props = {
  isCollapsed?: boolean;
  onClick: () => void;
}

export const NodeButton: FC<PropsWithChildren<Props>> = (props) => {
  const {
    isCollapsed,
    children,
    onClick,
  } = props;

  return (
    <button 
      type="button"
      className="node-button"
      onClick={onClick}
    >
      <span className="node-button-icon">
        {isCollapsed ? '➖' : '➕'}
      </span>
      {' '}
      {children}
    </button>
  );
};
