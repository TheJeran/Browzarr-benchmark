'use client';

import React from 'react'
import { useState, useEffect } from 'react';
import './css/MiddleSlider.css'

interface MiddleParams{
    canvasWidth:number;
    setCanvasWidth:React.Dispatch<React.SetStateAction<number>>;
}

const MiddleSlider = ({canvasWidth,setCanvasWidth}:MiddleParams) => {
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);
        
    // Start resizing on mousedown/touchstart
    const handleStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault(); // Prevent text selection
        setIsResizing(true);
    };
        
    // Adjust width on mousemove/touchmove
    const handleMove = (e: MouseEvent | TouchEvent) => {
        if (isResizing) {
            e.preventDefault();
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            setCanvasWidth(clientX);
        }
    };
        
    // Stop resizing on mouseup/touchend
    const handleEnd = () => {
        if (canvasWidth < screenWidth*0.25){
            setCanvasWidth(0);
        }
        if (canvasWidth > screenWidth*0.85){
            setCanvasWidth(screenWidth); //This 10 is the width of the middleslider. May need to adjust
        }
        setIsResizing(false);
    };
    
    // Add/remove document event listeners based on resizing state
    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('touchend', handleEnd);
        }
        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [isResizing]);

    return (
        <div className='middle-slider' 
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            style={{
                left:`${canvasWidth}px`,
            }}  
        />
    )
}

export {MiddleSlider}
