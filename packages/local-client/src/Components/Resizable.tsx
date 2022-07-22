import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

import "./Resizeable.css";
interface ResizeableProps extends ResizableBoxProps {
  direction?: "horizontal" | "vertical";
}
const Resizeable: React.FC<ResizeableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  let resizableOptios: ResizableBoxProps;

  useEffect(() => {
    let timer: any;
    const linstener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", linstener);

    return () => {
      window.removeEventListener("resize", linstener);
    };
  }, [width]);

  if (direction === "horizontal") {
    resizableOptios = {
      className: "resizeable-horizontal",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      width,
      height: Infinity,
      resizeHandles: ["e"],
      onResizeStop: (_e, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableOptios = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableOptios}>{children}</ResizableBox>;
};

export default Resizeable;
