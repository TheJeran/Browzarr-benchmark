import { useGlobalStore } from "@/utils/GlobalStates"
import './css/Loading.css'
import { useShallow } from "zustand/shallow"


export function Loading(){
  const {progress, showLoading, downloading} = useGlobalStore(useShallow(state => ({
    progress: state.progress,
    showLoading: state.showLoading,
    downloading: state.downloading
  })))

    return (
      showLoading && 
      <div className="loading-container">
      <div className='loading'>
        {downloading ? 'Downloading' : 'Building'}
        </div>
      <div className="progress-bar"
        style={{
          width:`${progress}%`
        }}
      />
      </div>
      
    )
  }