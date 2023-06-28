'use client'

import { useEffect, useRef } from "react";
import FadeIn from "./FadeIn";
import Spotlight, { SpotlightCard } from "./SpotlightCard";

export const Card: React.FC<{
  children: React.ReactNode;
  onMouseEnter?: (event: any) => void;
  onMouseLeave?: (event: any) => void;
  text: string;
}> = ({ children, onMouseEnter, onMouseLeave, text }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boxElement = boxRef.current;

    if (!boxElement) {
      return;
    }

    const updateAnimation = () => {
      const angle =
        (parseFloat(boxElement.style.getPropertyValue("--angle")) + 0.5) % 360;
      boxElement.style.setProperty("--angle", `${angle}deg`);
      requestAnimationFrame(updateAnimation);
    };

    requestAnimationFrame(updateAnimation);
  }, []);

  return (
    <FadeIn>
      <Spotlight>
        <SpotlightCard>
          <div className="w-full h-full">
            <div className="group relative w-full h-full shadow-lg overflow-hidden bg-gray-800 p-[1px] transition-all duration-600 ease-in-out bg-gradient-to-r hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700">
              <div className="opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-spin-slow absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <div className="flex items-end relative shadow-lg w-full h-[50vh] bg-gradient-to-tr from-[#060708] via-[#0e1113] to-[#060708] p-6">
                <div className="space-y-4">
                  <div className="">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </Spotlight>
    </FadeIn>
  );
};
