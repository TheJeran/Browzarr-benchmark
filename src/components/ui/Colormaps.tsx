"use client";

import React, {useEffect, useState} from 'react'
import { GetColorMapTexture } from '../textures';
import { useGlobalStore } from '@/utils/GlobalStates';
import { colormaps } from '@/components/textures';
import { useShallow } from 'zustand/shallow';
import { MdOutlineSwapVert } from "react-icons/md";

const Colormaps = ({currentOpen, setOpen} : {currentOpen: string, setOpen: React.Dispatch<React.SetStateAction<string>>}) => {
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

    useEffect(()=>{
        if (currentOpen != 'colormaps'){
            setShowOptions(false)
        }
    },[currentOpen])
    
  return (
    <div style={{position:'relative'}}>
        <div className='panel-item' onClick={e=>{setShowOptions(x=>!x); setOpen('colormaps')}} style={{backgroundImage:`url(./colormap_icons/${cmap}.webp)`, backgroundSize: '100%', transform: flipCmap ? 'scaleX(-1)' : ''}}/>  
        <div className='panel-item-options' style={{transform: showOptions ? 'scale(100%) ' : 'scale(0%) ', width:'auto', padding:'30px 10px', maxHeight:'600px', justifyContent:'space-around', overflow:'visible'}}>
            <div className='scroller' style={{width:'auto', padding:'10px 10px', justifyContent:'space-around', overflow:'auto'}}>
            {colormaps.map((val)=>(
                    <img key={val} className={`cmap ${flipCmap ? 'flipped' : ''}`} src={`./colormap_icons/${val}.webp`} alt={val} onClick={e=>{setCmap(val); setShowOptions(false)}} />
            ))}
            </div>
            <MdOutlineSwapVert className='flipper' style={{position:'absolute', right:'95%', bottom:'90%', height:'50px', 
            width:'50px', cursor:'pointer', transform: `${flipCmap ? 'rotate(180deg)' : 'rotate(0deg)'}`,
            transition:'.25s'}} 
            onClick={e=>setFlipCmap(x=>!x)}
        />
        </div>
        
    </div>
  )
}

export default Colormaps
