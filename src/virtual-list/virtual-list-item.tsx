import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { Index } from 'types/opaque';

import './virtual-list-item.css';

type Props = {
  index: Index;
  onRender: (element: HTMLLIElement, index: Index) => void;
}

export const VirtualListItem: FC<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    index,
    onRender,
  } = props;

  const ref = useRef<HTMLLIElement>(null);

  useEffect(
    () => {
      const element = ref.current;
      if (!element) return;

      onRender(element, index);
    },
  );

  return (
    <li 
      ref={ref}
      className="virtual-list-item"
      style={{visibility: 'hidden'}}  
    >
      {children}
    </li>
  );
};
