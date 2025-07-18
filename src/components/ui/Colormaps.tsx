"use client";

import React, {useEffect, useState} from 'react'
import { GetColorMapTexture } from '../textures';
import { useGlobalStore } from '@/utils/GlobalStates';
import { colormaps } from '@/components/textures';
import { useShallow } from 'zustand/shallow';
import { MdOutlineSwapVert } from "react-icons/md";

const Colormaps = () => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [cmap, setCmap] = useState<string>('Spectral')
    const [flipCmap, setFlipCmap] = useState<boolean>(false)
    const {colormap, setColormap} = useGlobalStore(useShallow(state => ({
        setColormap : state.setColormap,
        colormap: state.colormap
    })))

    useEffect(()=>{
        setColormap(GetColorMapTexture(colormap, cmap === "Default" ? "Spectral" : cmap, 1, "#000000", 0, flipCmap));
    }, [cmap, flipCmap])
  return (
    <div style={{position:'relative'}}>
        <div className='panel-item' onClick={e=>setShowOptions(x=>!x)} > Colormap </div>
        <div className='panel-item-options' style={{transform: showOptions ? 'scale(100%) ' : 'scale(0%) ', width:'auto', padding:'30px 10px', justifyContent:'space-around'}}>
            {colormaps.map((val)=>(
                <div className='variable-item' onClick={e=>{setCmap(val); setShowOptions(false)}}>{val}</div>
            ))}
        </div>
        <MdOutlineSwapVert style={{position:'absolute', left:'-150px', bottom:'50px', height:'50px', 
            width:'50px', cursor:'pointer', transform: showOptions ? 'scale(100%) ' : 'scale(0%) ', 
            transition:'.25s', transitionDelay:showOptions ? '.25s' :'0s'}} 
            onClick={e=>setFlipCmap(x=>!x)}
        />
    </div>
  )
}

export default Colormaps
