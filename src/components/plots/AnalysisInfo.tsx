import React, {useMemo} from 'react'
import './Plots.css'
import { useGlobalStore } from '@/utils/GlobalStates'


const AnalysisInfo = ({loc, show, info, plotDim} : {loc: number[], show: boolean, info: number[], plotDim: number}) => {
    const dimNames = useGlobalStore(state=>state.dimNames)

    const plotNames = useMemo(()=>dimNames.filter((val,idx)=> idx != plotDim),[dimNames, plotDim])

  return (
    <div className='analysis-info'
        style={{
            left:`${loc[0]+10}px`,
            top:`${loc[1]+10}px`,
            display: show ? '' : 'none'
        }}
    >
        {`${plotNames[0]}: ${info[1]}`}<br/>
        {`${plotNames[1]}: ${info[0]}`}<br/>

    </div>
    )
}

export default AnalysisInfo
