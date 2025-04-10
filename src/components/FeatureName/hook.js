import { useState, useEffect } from "react";

const useCustomHook = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    console.log("Value updated:", value);
  }, [value]);

  return [value, setValue];
};

export default useCustomHook;