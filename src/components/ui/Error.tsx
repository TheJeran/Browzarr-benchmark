import React from 'react'
import './css/Error.css'
import { useErrorStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import { Button } from './button'

const Error = () => {
    const {zarrFetch, cors, oom, setZarrFetch, setCors, setOom} = useErrorStore(useShallow(state => ({
        zarrFetch: state.zarrFetch,
        cors: state.cors,
        oom: state.oom,

        setZarrFetch: state.setZarrFetch,
        setCors: state.setCors,
        setOom: state.setOom
    })))

    const errorArray = [zarrFetch, cors, oom]
    const setterArray = [setZarrFetch, setCors, setOom]
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
    <>
    {renderCond && 
    <div className='error-background'>
        <div className='error-container'>
            <div className='text-[48px] font-bold text-center mb-[10px]'>
                Error
            </div>
            <div className='error-message'>
                {zarrFetch &&
                <div>
                    Failed to fetch data from the store.<br/> 
                    If this store has worked beforehand then this is likely a temporary issue. Try again
                </div>
                }
                {cors &&
                <div>
                    This dataset is hosted on a different website and your browser is blocking it for security reasons. 
                    It&apos;s called a &quot;CORS&quot; issue (Cross-Origin Resource Sharing). 
                    The server you're trying to access hasn't given permission for browsers to fetch data from other websites like this one. <br/><br/>
                    If you access it through code outside a browser (i.e., in Python), it works fine - because those environments 
                    don&apos;t follow browser security rules. <br/><br/>
                    To fix this, the dataset&apos;s hosting server needs to allow access by adding headers that tell your browser &quot;this is safe.&quot; 
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


            </div>
            <div className='flex justify-center mt-[10px]'>
                <Button
                    className='cursor-pointer hover:scale-[1.1]'
                    onClick={e=>ClearError()}
                >
                Okay
                </Button>
            </div>
            
      </div>
    </div>}
    </>    
  )
}

export default Error
