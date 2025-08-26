"use client";

import React, { useEffect, useRef } from 'react'
import { useGlobalStore, useImageExportStore } from './GlobalStates'
import { useShallow } from 'zustand/shallow'
import { useThree } from '@react-three/fiber'
import { useCSSVariable } from '@/components/ui';
import * as THREE from 'three'

const ExportCanvas = ({show}:{show: boolean}) => {
    const {valueScales, variable, metadata } = useGlobalStore(useShallow(state => ({
        valueScales: state.valueScales,
        variable: state.variable,
        metadata: state.metadata
    })))

    const {exportImg, includeBackground, includeColorbar, doubleSize, getCbarLoc, getCbarNum} = useImageExportStore(useShallow(state => ({
        exportImg: state.exportImg,
        includeBackground: state.includeBackground,
        includeColorbar: state.includeColorbar,
        doubleSize: state.doubleSize,
        getCbarLoc: state.getCbarLoc,
        getCbarNum: state.getCbarNum
    })))
    
    const {gl, scene, camera} = useThree()
    const skipFirst = useRef<boolean>(true)
    const textColor = useCSSVariable('--text-plot')
    const bgColor = useCSSVariable('--background')

    useEffect(()=>{   
        if (!show){
            return
        }
        if (skipFirst.current){ // It will try to render on first load. So this has to be here to stop it. Will retweak logic at some point cause it doesn't ALWAYS try. 
            skipFirst.current = false
            return
        }
        const domWidth = gl.domElement.width;
        const domHeight = gl.domElement.height;

        const docWidth = doubleSize ? domWidth * 2 : domWidth
        const docHeight = doubleSize ? domHeight * 2 : domHeight

        // Create a new canvas for compositing
        const compositeCanvas = document.createElement('canvas')
        const ctx = compositeCanvas.getContext('2d')
        if (!ctx){return}

        compositeCanvas.width = docWidth
        compositeCanvas.height = docHeight
        if (includeBackground){
            ctx.fillStyle = bgColor
            ctx.fillRect(0, 0, compositeCanvas.width, compositeCanvas.height)
        }
        if (doubleSize){
            const originalSize = gl.getSize(new THREE.Vector2())
            // Set higher resolution
            
            gl.setSize(docWidth, docHeight)
            gl.render(scene, camera)
            ctx.drawImage(gl.domElement, 0, 0, docWidth, docHeight) 
            gl.setSize(originalSize.x, originalSize.y)
            gl.render(scene, camera)
        }
        else{
            gl.render(scene, camera)
            ctx.drawImage(gl.domElement, 0, 0, docWidth, docHeight) 
        }

        const variableSize = doubleSize ? 72 : 36
        ctx.fillStyle = textColor
        ctx.font = `${variableSize}px "Segoe UI"`
        ctx.fillText(variable, doubleSize ? 40 : 20, doubleSize ? 100 : 50) // Variable in top Left

        const cbarTickSize = doubleSize ? 28 : 14
        const unitSize = doubleSize ? 40 : 20
        
        if (includeColorbar){
            const secondCanvas = document.getElementById('colorbar-canvas')
            const cbarLoc = getCbarLoc();
            

            let cbarWidth = doubleSize ? 1024 : 512
            let cbarHeight = doubleSize ? 48: 24;

            let cbarStartPos = Math.round(docWidth/2 - cbarWidth/2)
            let cbarTop = cbarLoc === 'top' ? (doubleSize ? 140 : 70) : (doubleSize ? docHeight - 140 : docHeight-70)

            const transpose = cbarLoc === 'right' || cbarLoc === 'left'

            if (transpose){
                const tempWidth = cbarWidth
                cbarWidth = cbarHeight
                cbarHeight = tempWidth
                cbarTop = Math.round(docHeight/2 - cbarHeight/2)
                cbarStartPos = cbarLoc === 'right' ? (doubleSize ? docWidth - 140 : docWidth - 70) : (doubleSize ? 140 : 70)
            }

            if (secondCanvas instanceof HTMLCanvasElement) {
                if (transpose) {
                    // Save the current canvas state
                    ctx.save()
                    
                    // Calculate the center point for rotation
                    const centerX = cbarStartPos + cbarWidth/2
                    const centerY = cbarTop + cbarHeight/2
                    
                    // Move to the center point
                    ctx.translate(centerX, centerY)
                    
                    // Rotate anti-clockwise
                    ctx.rotate(-Math.PI / 2)
                    
                    // Draw the image centered at the origin (since we translated to center)
                    // Use original dimensions since we're rotating the canvas context
                    const originalWidth = doubleSize ? 1024 : 512
                    const originalHeight = doubleSize ? 48 : 24
                    ctx.drawImage(secondCanvas, -originalWidth/2, -originalHeight/2, originalWidth, originalHeight)
                    
                    // Restore the canvas state
                    ctx.restore()
                } else if(cbarLoc === 'top'){
                    ctx.drawImage(secondCanvas, cbarStartPos, cbarTop, cbarWidth, cbarHeight)
                }else {
                    ctx.drawImage(secondCanvas, cbarStartPos, cbarTop, cbarWidth, cbarHeight)
                }
            }
            const labelNum = getCbarNum(); // Number of cbar "ticks"
            const valRange = valueScales.maxVal-valueScales.minVal;
            const valScale = 1/(labelNum-1)
            const posDelta = transpose ? 1/(labelNum-1)*cbarHeight : 1/(labelNum-1)*cbarWidth

            // TickLabels
            ctx.font = `${cbarTickSize}px "Segoe UI"`

            if (transpose){
                ctx.textBaseline = 'middle'
                ctx.textAlign = cbarLoc == 'left' ? 'left' : 'right'
                for (let i =0; i < labelNum; i++){
                    if (cbarLoc == 'left'){
                        ctx.fillText(String((valueScales.minVal+(i*valScale*valRange)).toFixed(2)), cbarStartPos+cbarWidth+6, cbarTop+cbarHeight-i*posDelta) 
                    } else{
                        ctx.fillText(String((valueScales.minVal+(i*valScale*valRange)).toFixed(2)), cbarStartPos-6, cbarTop+cbarHeight-i*posDelta) 
                    }
                }
            } else{
                ctx.textBaseline = 'top'
                ctx.textAlign = 'center'
                for (let i =0; i < labelNum; i++){
                    ctx.fillText(String((valueScales.minVal+(i*valScale*valRange)).toFixed(2)), cbarStartPos+i*posDelta, cbarTop+cbarHeight+6) 
                }
            }

            ctx.fillStyle = textColor
            ctx.font = `${unitSize}px "Segoe UI" bold`
            ctx.textAlign = 'center'
            ctx.fillText(metadata?.units, cbarStartPos+cbarWidth/2, cbarTop-unitSize-6) // Cbar Units above middle of cbar
        }
        
        const waterMarkSize = doubleSize ? 40 : 20
        ctx.fillStyle = "#888888"
        ctx.font = `${waterMarkSize}px "Segoe UI", serif `
        ctx.textAlign = 'left'
        ctx.textBaseline = 'bottom'
        ctx.fillText("browzarr.io", doubleSize ? 20 : 10, doubleSize ? docHeight - 20 : docHeight - 10) // Watermark

        // Export the composite
        compositeCanvas.toBlob((blob) => {
            if(!blob){return}
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.download = 'browzarr-plot.png'
            link.href = url
            link.click()
            URL.revokeObjectURL(url)
        }, 'image/png')

    },[exportImg])

  return (
    <>
    </>
  )
  
}

export default ExportCanvas
