import { Node } from "three";
import { ID } from "types/opaque";

// 900001 nodes
export const nodesSample: Node[] = [
  {
    id: 'ID' as ID,
    label: 'Root node',
    children: Array(3000)
      .fill(0)
      .map((_, i) => ({
        id: `ID-${i}` as ID,
        label: `Node ${i + 1}`,
        children: Array(300).fill(0).map((_, i2) => ({
          id: `ID-${i}-${i2}` as ID,
          label: `Node ${i + 1} - ${i2 + 1}`,
          children: [],
        })),
      })),
  }
];