import { useEffect, useRef } from "react";

type SavedCallback = () => void;

export const useInterval = (
  callback: (...args: any) => void,
  delay: number
) => {
  const savedCallback = useRef<SavedCallback>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
