'use client';

import {useState } from "react";
import './css/MetaData.css'

const defaultAttributes = [
    "long_name",
    "description",
    "units",
    "_ARRAY_DIMENSIONS"
    ]

const Metadata = ({ data }: { data: Record<string, any> }) => {
    const [showAll, setShowAll] = useState<boolean>(false)

  return (
    <div className="metadata">
      {defaultAttributes.map((value)=>(
        data[value] && (
        <p key={value}>
            <strong>{value}: </strong>{String(data[value])}
        </p>)
      ))

      }  
      {showAll && <>
      {Object.entries(data).map(([key, value]) => (
        !defaultAttributes.includes(key) && (<p key={key}>
          <strong>{key}:</strong> {String(value)}
        </p>)
      ))}</>}
      <button onClick={()=>setShowAll(x=>!x)}>{showAll ? "Hide" : "Show"} Extra </button>
    </div>
  );
};


export default Metadata;