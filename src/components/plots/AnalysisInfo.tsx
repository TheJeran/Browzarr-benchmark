import React, {useMemo} from 'react'
import './Plots.css'
import { useGlobalStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import { parseLoc } from '@/utils/HelperFuncs'


const AnalysisInfo = ({loc, show, info, plotDim} : {loc: number[], show: boolean, info: number[], plotDim: number}) => {
    const {dimNames, dimUnits} = useGlobalStore(useShallow(state=>({dimNames: state.dimNames, dimUnits: state.dimUnits})))

    const plotNames = useMemo(()=>dimNames.filter((_val,idx)=> idx != plotDim),[dimNames, plotDim])
    const plotUnits = useMemo(()=>dimUnits.filter((_val,idx)=> idx != plotDim),[dimNames, plotDim])
    
  return (
    <div className='analysis-info'
        style={{
            left:`${loc[0]+10}px`,
            top:`${loc[1]+10}px`,
            display: show ? '' : 'none'
        }}
    >
        {`${plotNames[0]}: ${parseLoc(info[0],plotUnits[0])}`}<br/>
        {`${plotNames[1]}: ${parseLoc(info[1],plotUnits[1])}`}<br/>
        {`Value: ${Math.round(info[2] * 100)/100}`}
    </div>
    )
}

export default AnalysisInfo
