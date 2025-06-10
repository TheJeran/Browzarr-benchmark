import React, {useState} from 'react'
import { useGlobalStore } from '@/utils/GlobalStates'

import './css/VariableScroller.css'
const variables = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta"];


const VariableScroller = (baseURL: string, variables: string[]) => {
  const [selectedIndex, setSelectedIndex] = useState(Math.floor(variables.length / 2));

  const handleScroll = (event: any) => {
    const newIndex =
      selectedIndex + (event.deltaY > 0 ? 1 : -1);
    if (newIndex >= 0 && newIndex < variables.length) {
      setSelectedIndex(newIndex);
    }
  };

  return (
    <div className="scroll-container" onWheel={handleScroll}>
      {variables.map((variable, index) => {
        const distance = Math.abs(selectedIndex - index);
        return (
          <div
            key={index}
            className="scroll-item"
            style={{
              opacity: 1 - distance * 0.3,
              transform: `scale(${1 - distance * 0.1})`,
              fontWeight: selectedIndex === index ? "bold" : "normal",
            }}
          >
            {variable}
          </div>
        );
      })}
    </div>
  );
};


export default VariableScroller
