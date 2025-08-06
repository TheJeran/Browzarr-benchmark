"use client";

import React from 'react'
import '../css/MainPanel.css'
import {PlotType, Variables, Colormaps, AdjustPlot, Dataset, PlayButton} from '../index'
import { PiFileMagnifyingGlass } from "react-icons/pi";
import { Card } from "@/components/ui/card"
import { useAnalysisStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';

const MainPanel = () => {
  const {analysisMode, setAnalysisMode} = useAnalysisStore(useShallow(state => ({
    analysisMode: state.analysisMode,
    setAnalysisMode: state.setAnalysisMode
  })))

  return (
    <div className="panel-container">
      < PiFileMagnifyingGlass size={50} 
        className='panel-item'
        style={{
        position:'absolute',
        bottom:'100%'
        }}
        onClick={e=> setAnalysisMode(!analysisMode)}
      />
    <Card className="panel-container">
      <PlotType />
      <Variables />
      <Colormaps />
      <AdjustPlot  />
      <Dataset  />
      <PlayButton />
    </Card>
  </div>
  )
}

export default MainPanel
