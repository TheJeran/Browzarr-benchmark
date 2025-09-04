import { useGlobalStore } from "@/utils/GlobalStates"
import './css/Loading.css'
import { useShallow } from "zustand/shallow"


export function Loading(){
  const {progress, showLoading, downloading, decompressing} = useGlobalStore(useShallow(state => ({
    progress: state.progress,
    showLoading: state.showLoading,
    downloading: state.downloading,
    decompressing: state.decompressing
  })))

    return (
      showLoading && 
      <div className="loading-container">
      <div className='loading'>
        {downloading ? 'Downloading' : decompressing ? 'Unpacking' : 'Building'}
        </div>
      <div className="progress-bar"
        style={{
          width:`${progress}%`
        }}
      />
      </div>
      
    )
  }