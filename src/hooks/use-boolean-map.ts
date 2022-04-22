import { useState } from 'react';

type ToggleHandler<K> = (key: K) => void;

type Context<K> = [
  Map<K, boolean>,
  ToggleHandler<K>
];

export const useBooleanMap = <K = string>(): Context<K> => {
  const [state, setState] = useState<Map<K, boolean>>(new Map());

  const onToggle = (key: K) => {
    setState(currentState => {
      const nextState = new Map(currentState);
      nextState.set(key, !currentState.get(key));
      return nextState;
    });
  };

  return [state, onToggle];
};
