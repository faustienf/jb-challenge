import { ID } from 'types/opaque';

export type Node = {
  id: ID;
  label: string;
  children: Node[];
}
