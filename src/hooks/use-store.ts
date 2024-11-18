import { useEffect, useState } from "react";

export const useAsyncStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [state, setState] = useState<F>();

  useEffect(() => {
    setState(() => result);
  }, [result]);

  return state;
};
