'use client'

import useMouse from '@react-hook/mouse-position';
import { motion } from 'framer-motion';
import React, { ReactNode, useRef, useState } from 'react';

type Props = {
  children: ReactNode;
}

const CustomCursor: React.FC<Props> = ({ children }) => {

  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  const ref = useRef(null);
  const mouse = useMouse(ref, {
    enterDelay: 100,
    leaveDelay: 100
  });

  let mouseXPosition = 0;
  let mouseYPosition = 0;

  if (mouse.x !== null) {
    mouseXPosition = mouse.clientX! - 5;
  }

  if (mouse.y !== null) {
    mouseYPosition = mouse.clientY! - 5;
  }

  const variants = {
    default: {
      opacity: 1,
      height: 7,
      width: 7,
      fontSize: "1px",
      backgroundColor: "#fff",
      x: mouseXPosition,
      y: mouseYPosition,
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    project: {
      opacity: 1,
      border: '2px solid #888',
      backgroundColor: "#1a1d2e",
      color: "#FFF",
      height: 80,
      width: 80,
      fontSize: "12px",
      x: mouseXPosition - 32,
      y: mouseYPosition - 32
    },
    contact: {
      opacity: 1,
      border: '2px solid #888',
      backgroundColor: "#1a1d2e",
      color: "#FFF",
      height: 64,
      width: 64,
      fontSize: "32px",
      x: mouseXPosition - 28,
      y: mouseYPosition - 28
    }
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28
  };

  function projectEnter(text: any) {
    setCursorText(text);
    setCursorVariant("project");
  }

  function projectLeave(event: any) {
    setCursorText("");
    setCursorVariant("default");
  }

  function contactEnter(emoji: any) {
    setCursorText(emoji);
    setCursorVariant("contact");
  }

  function contactLeave(event: any) {
    setCursorText("");
    setCursorVariant("default");
  }

  return (
    <div ref={ref}>
      <motion.div
        variants={variants}
        className="rounded-full fixed z-[100] flex items-center justify-center top-0 left-0 h-[10px] w-[10px] pointer-events-none text-center"
        animate={cursorVariant}
        transition={spring}
      >
        <span className="cursorText">{cursorText}</span>
      </motion.div>
      <div>{children}</div>
    </div>
  )
}

export default CustomCursor