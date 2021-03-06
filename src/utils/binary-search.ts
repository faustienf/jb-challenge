import { Index } from "types/opaque";

/**
 * классический алгоритм бинарного поиска,
 * только для сравнения элементов используется компаратор
 * как в Array.prototype.sort(). Компаратор должен вернуть число:
 * 0 - совпадение
 * -1 - наш элемент в правой части
 * 1 - наш элемент в левой части
 * 
 * @param array 
 * @param comparator 
 * @returns [item | undefined, index]
 */
export const binarySearch = <V extends any>(
  array: V[],
  comparator: (value: V, index: Index) => number,
): [undefined | V, Index | -1] => {
  let start = 0;
  let end = array.length - 1;
    
  while (start <= end) {
    const middleIndex = Math.floor((start + end) / 2) as Index;
    const position = comparator(array[middleIndex], middleIndex);
    
    // found!!!
    if (position === 0) {
      return [array[middleIndex], middleIndex];
    // move right
    } else if (position < 0) {
      start = middleIndex + 1;
    // move left
    } else {
      end = middleIndex - 1;
    }
  }

  return [undefined, -1];
};
