import { useEffect, useState } from 'react';
import './ResizeBar.css'

const ResizeBar = ({height,setHeight}:{height:number,setHeight:React.Dispatch<React.SetStateAction<number>>}) => {
    
      const [isResizing, setIsResizing] = useState<boolean>(false);
    
      // Start resizing on mousedown
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault(); // Prevent text selection
      setIsResizing(true);// Record starting height
    };
    
      // Adjust height on mousemove
      const handleMouseMove = (e: MouseEvent) => {
        if (isResizing) {
          e.preventDefault();
          const vertPixels = window.innerHeight-e.clientY
          const vh = Math.round(vertPixels/window.innerHeight*100)
          setHeight(vh)
        }
      };
    
      // Stop resizing on mouseup
      const handleMouseUp = () => {
        setIsResizing(false);
      };
    
      // Add/remove document event listeners based on resizing state
      useEffect(() => {
        if (isResizing) {
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }, [isResizing]);

  return (
    <div className='resize-bar' 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
              bottom:`${height}vh`,
            }}
            
    />
  )
}

export default ResizeBar
