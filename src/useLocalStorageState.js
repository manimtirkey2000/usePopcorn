import { useState, useEffect } from "react";
export default function useLocalStorageState(initialState, keyName) {
  const [value, setValue] = useState(function () {
    const storedWatched = localStorage.getItem(keyName);
    return storedWatched ? JSON.parse(storedWatched) : initialState;
  });
  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(value));
  }, [value, keyName]);

  return [value, setValue];
}
