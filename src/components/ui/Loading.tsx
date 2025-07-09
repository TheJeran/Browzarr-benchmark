import { useGlobalStore } from "@/utils/GlobalStates"
import './css/Loading.css'


export function Loading({showLoading}:{showLoading:boolean}){
  const progress = useGlobalStore(state => state.progress)

    return (
      showLoading && 
      <div className="loading-container">
      <div className='loading'>
        Loading
        </div>
      <div className="progress-bar"
        style={{
          width:`${progress}%`
        }}
      />
      </div>
      
    )
  }