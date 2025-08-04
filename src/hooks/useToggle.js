import { useState, useCallback } from 'react';

function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);

  // useCallback pour optimiser la performance
  const toggle = useCallback(() => setState(state => !state), []);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  return [state, { toggle, setTrue, setFalse }];
}

export default useToggle;