import React, {
    ComponentProps,
    FC,
    PropsWithChildren,
    useCallback,
    useMemo,
    useRef,
    useState
} from 'react';

import { Index, Opaque } from 'types/opaque';
import { binarySearch } from 'utils/binary-search';
import { VirtualListItem } from './virtual-list-item';

import './virtual-list.css';

type Props = ComponentProps<'div'> & {
  minRows: number;
}

type Offset = Opaque<number, 'Offset'>;

export const VirtualList: FC<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    minRows,
    className = '',
    ...divProps
  } = props;

  const [start, setStart] = useState(0 as Index);
  const offsetsRef = useRef<Offset[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  
  const threshold = useMemo(
    () => Math.ceil((minRows + 1) / 2),
    [minRows],
  );

  const handleItemRender = useCallback(
    (itemElement: HTMLLIElement, index: Index) => {
      const offsets = offsetsRef.current;
      const rootEl = rootRef.current;
      const clientHeight = itemElement.clientHeight as Offset;

      offsets[index] = index 
        ? clientHeight + offsets[index - 1] as Offset
        : clientHeight;
  
      itemElement.style.removeProperty('visibility');
      itemElement.style.setProperty(
        'transform',
        `translateY(${offsets[index] - clientHeight}px)`
      );

      const lastOffset = offsets[offsets.length - 1];
      
      if (rootEl) {
        rootEl.style.setProperty('height', `${lastOffset}px`)
      }
    },
    [],
  );

  const allItems = useMemo(
    () => React.Children
    .map(children, (child, index) => {
      return (
        <VirtualListItem
          key={index}
          index={index as Index}
          onRender={handleItemRender}
        >
          {child}
        </VirtualListItem>
      );
    }),
    [children, handleItemRender],
  );

  const items = useMemo(
    () => allItems?.slice(start, start + minRows + (threshold * 2)),
    [allItems, minRows, start, threshold],
  );

  const handleScroll = useCallback(
    (e: React.UIEvent) => {
      const {
        scrollTop,
      } = e.currentTarget;

      const offsets = offsetsRef.current;

      const [, foundIndex] = binarySearch(offsets, (offset, index) => {
        const prevOffest = offsets[index - 1] || 0;
        const isFound = offset > scrollTop && scrollTop >= prevOffest;

        if (isFound) {
          return 0;
        }
        return offset - scrollTop;
      });

      const nextStart = Math.max(foundIndex - threshold, 0) as Index;
      setStart(nextStart);
    },
    [threshold],
  );

  return (
    <div
      {...divProps}
      ref={rootRef}
      className={`virtual-list ${className}`}
      onScroll={handleScroll}  
    >
      <ul 
        className="virtual-list-items">
        {items}
      </ul>
    </div>
  );
};
