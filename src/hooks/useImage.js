import { useState, useEffect } from "react";

const useImage = (src) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!src) {
      setImage(null);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setImage(img);
    img.onerror = () => setImage(null);

    return () => {
      // Cleanup if the component unmounts
      setImage(null);
    };
  }, [src]);

  return [image];
};

export default useImage;
