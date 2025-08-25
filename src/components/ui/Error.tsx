import React from 'react'
import './css/Error.css'
import { useErrorStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import { Button } from './button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Error = () => {
    const {zarrFetch, cors, oom, invalidURL, setZarrFetch, setCors, setOom, setInvalidURL} = useErrorStore(useShallow(state => ({
        zarrFetch: state.zarrFetch,
        cors: state.cors,
        oom: state.oom,
        invalidURL: state.invalidURL,
        setZarrFetch: state.setZarrFetch,
        setCors: state.setCors,
        setOom: state.setOom,
        setInvalidURL: state.setInvalidURL
    })))

    const errorArray = [zarrFetch, cors, oom, invalidURL]
    const setterArray = [setZarrFetch, setCors, setOom, setInvalidURL]
    const renderCond = errorArray.includes(true)

    const ClearError = ()=>{
        for (let i = 0; i < errorArray.length ; i++){
            if (errorArray[i]){
                const setter = setterArray[i]
                setter(false)
            }
        }
    }

  return (
    <Dialog open={renderCond}>
        <DialogContent>
            <DialogTitle className="text-center text-lg font-semibold">
                Error
            </DialogTitle>
            <div className='error-message'>
                {zarrFetch &&
                <div>
                    Failed to fetch data from the store.<br/> 
                    If this store has worked beforehand then this is likely a temporary issue. Try again
                </div>
                }
                {cors &&
                <div>
                    This dataset is hosted on a different website and is likely blocked for security reasons. 
                    This is called a <b>CORS</b> issue (Cross-Origin Resource Sharing). 
                    However, for security reasons the exact reason is occluded.
                    A potential issue is that the server hosting the dataset needs to add headers that tell your browser <b>this is safe.</b>
                    If you control the server, you can add those CORS headers. Otherwise, reach out to whoever manages the data and ask them to enable CORS for browser access.
                </div>
                }

                {oom &&
                <div>
                    Whoa there! <br/><br/>
                    If you&apos;re reading this you&apos;ve just tried to plot a ridiculous amount of points. Your browser ran out of memory allocating the arrays 
                    necessary to dictate their positions in space. Stick to the volumetric view if you need to view the entire dataset.
                </div>
                }
                {invalidURL &&
                <div>
                    This address appears invalid. 
                </div>

                }


            </div>
            <div className='flex justify-center mt-[10px]'>
                <Button
                variant='pink'
                    className='cursor-pointer hover:scale-[1.1]'
                    onClick={e=>ClearError()}
                >
                Okay
                </Button>
            </div>
      </DialogContent>
    </Dialog>

  )
}

export default Error
