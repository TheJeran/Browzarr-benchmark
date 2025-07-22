"use client";

import { useGlobalStore } from '@/utils/GlobalStates';
import React, {useEffect, useState} from 'react'
import { useShallow } from 'zustand/shallow';
import { Input } from './input';
import { Button } from './button';
import { CgDatabase } from "react-icons/cg";
import LocalZarr from './LocalZarr';

const ZARR_STORES = {
    ESDC: 'https://s3.bgc-jena.mpg.de:9000/esdl-esdc-v3.0.2/esdc-16d-2.5deg-46x72x1440-3.0.2.zarr',
    SEASFIRE: 'https://s3.bgc-jena.mpg.de:9000/misc/seasfire_rechunked.zarr',
}

const Dataset = ({currentOpen, setOpen} : {currentOpen: string, setOpen: React.Dispatch<React.SetStateAction<string>>}) => {
    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [showStoreInput, setShowStoreInput] = useState<boolean>(false)
    const [showLocalInput, setShowLocalInput] = useState<boolean>(false)
    const {setInitStore, setVariable} = useGlobalStore(useShallow(state => ({
        setInitStore: state.setInitStore,
        setVariable: state.setVariable
    })))

    const [currentStore, setCurrentStore] = useState<string>("Default")

    useEffect(()=>{
            if (currentOpen != 'datasets'){
                setShowOptions(false)
            }
        },[currentOpen])

  return (
    <div style={{position:'relative'}}>
        <div className='panel-item' onClick={e=>{setShowOptions(x=>!x); setOpen('datasets')}} > <CgDatabase style={{height:'80px', color:'var(--foreground)'}}/> </div>
        <div style={{position:'relative'}}>
            <div className='panel-item-options' style={{transform: showOptions ? 'scale(100%) translateY(-50%)' : 'scale(0%) ', textAlign:'right', height:'auto', width:'fit-content', padding:'30px 10px', justifyContent:'space-around', overflow:'visible'}}>
                <div className='variable-item' onClick={e=>{setShowLocalInput(false); setShowStoreInput(false); setInitStore(ZARR_STORES['ESDC'])}}>ESDC</div>
                <div className='variable-item' onClick={e=>{setShowLocalInput(false); setShowStoreInput(false); setInitStore(ZARR_STORES['SEASFIRE'])}}>Seasfire</div>
                <div style={{position:'relative'}}>
                    <div className='variable-item' onClick={e=>{setShowLocalInput(false); setShowStoreInput(x=>!x)}}>Personal</div>
                    <div className='store-input' style={{position:'absolute'}}>
                        {showStoreInput && 
                        <form
                            className="flex max-w-sm items-center gap-2 mr-[10px]"
                            action=""
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            const input = (e.currentTarget.elements[0] as HTMLInputElement);
                            setInitStore(input.value);
                            setVariable("Default");
                            }}
                        >
                            <Input className='w-[200px]' placeholder="Remote Store URL" /> 
                            <Button className='cursor-pointer' type="submit" variant="outline">
                            Fetch
                            </Button>
                        </form>
                        }
                    </div>
                </div>
                <div style={{position:'relative'}}>
                    <div className='variable-item' onClick={e=>{setShowLocalInput(x=>!x); setShowStoreInput(false)}}>Local</div>
                    <div className='store-input' style={{position:'absolute'}}>
                        {showLocalInput && <LocalZarr setShowLocal={setShowLocalInput}/>}
                    </div>
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default Dataset
