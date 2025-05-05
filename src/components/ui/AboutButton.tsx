'use client';

import { useSetAtom } from "jotai";
import { uiAtom } from "@/components/ui";

import "./css/AboutButton.css";
  const AboutButton = () => {
    const setUi = useSetAtom(uiAtom);
    return (
        <button className="button-about"
          onClick={() =>
            setUi((prev) => ({
              ...prev,
              modal: true,
            }))
          }
        >
            <a>About</a>
        </button>
    );
  };
  
  export default AboutButton;