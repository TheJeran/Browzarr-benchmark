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

    const {exportImg, includeBackground, includeColorbar, doubleSize, getCbarLoc} = useImageExportStore(useShallow(state => ({
        exportImg: state.exportImg,
        includeBackground: state.includeBackground,
        includeColorbar: state.includeColorbar,
        doubleSize: state.doubleSize,
        getCbarLoc: state.getCbarLoc
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

            const cbarStartPos = Math.round(docWidth/2 - cbarWidth/2)
            const cbarTop = doubleSize ? docHeight - 140 : docHeight-70

            const transPose = cbarLoc === 'right' || cbarLoc === 'left'

            if (transPose){
                const tempWidth = cbarWidth
                cbarWidth = cbarHeight
                cbarHeight = tempWidth
            }


            if (secondCanvas instanceof HTMLCanvasElement) {
                ctx.drawImage(secondCanvas, cbarStartPos, cbarTop , cbarWidth, cbarHeight) // These are the default dimensions of the colorbar-canvas. It is 50px from bottom
            }
            const labelNum = 10; // Number of cbar "ticks"
            const valRange = valueScales.maxVal-valueScales.minVal;
            const valScale = 1/(labelNum-1)
            const posDelta = 1/(labelNum-1)*cbarWidth
        
            for (let i =0; i < labelNum; i++){
                ctx.font = `${cbarTickSize}px "Segoe UI"`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'top'
                ctx.fillText(String((valueScales.minVal+(i*valScale*valRange)).toFixed(2)), cbarStartPos+i*posDelta, cbarTop+cbarHeight+6) 
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
