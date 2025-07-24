import React from 'react'
import './css/Error.css'
import { useErrorStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'

const Error = () => {
    const {zarrFetch, cors, oom} = useErrorStore(useShallow(state => ({
        zarrFetch: state.zarrFetch,
        cors: state.cors,
        oom: state.oom,
    })))

    const renderCond = [zarrFetch, cors, oom].includes(true)

  return (
    <>
    {true && 
    <div className='error-background'>
        <div className='error-container'>
        <div>
            Error
        </div>
        <div className='error-message'>


        </div>
      </div>
    </div>}
    </>    
  )
}

export default Error
