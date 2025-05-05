import './css/Analysis.css'
import * as React from 'react'

const axis = [0,1,2]
const operations = [
    'Max','Min','Mean','StDev'
]

interface Analysis{
    setters:{
        setAxis:React.Dispatch<React.SetStateAction<number>>;
        setOperation:React.Dispatch<React.SetStateAction<string>>
        setExecute:React.Dispatch<React.SetStateAction<boolean>>
    }
}


const AnalysisWindow = ({setters}:Analysis)=> {
    const {setAxis, setOperation, setExecute} = setters;

    return(
        <div className="analysis-container">
            <label htmlFor="axis">Axis</label>
            <select name="axis" id="" onChange={(e)=>setAxis(parseInt(e.target.value))}>
                {
                axis.map((val, index)=>(
                    <option key={index} value={val}>{val}</option>
                ))
                }
            </select>
            <br/>
            <label htmlFor="operation">Operation</label>
            <select name="operation" id="" 
                defaultValue={'Mean'}
            onChange={(e)=>setOperation(e.target.value)}>
            {
                operations.map((val, index)=>(
                    <option key={index} value={val}>{val}</option>
                ))
                }
            </select>
            <br/>
            <button onClick={()=>setExecute(x=>!x)}>Calculate</button>
        </div>
    )
}

export default AnalysisWindow