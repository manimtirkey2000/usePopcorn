import { useEffect } from "react";
export default function useKey(key, action) {
  useEffect(() => {
    function Callback(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) action();
    }
    document.addEventListener("keydown", Callback);
    return () => {
      document.removeEventListener("keydown", Callback);
    };
  }, [action, key]);
}
