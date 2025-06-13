import React from 'react'
import { Button } from "@/components/ui/button"
import './css/PlotLineOptions.css'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePlotStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'

// Memoized Point Options
const PointOptions = React.memo(() => {
  const { showPoints, linePointSize, pointColor, setLinePointSize, setPointColor } = usePlotStore(useShallow(state => ({
    showPoints: state.showPoints,
    linePointSize: state.linePointSize,
    pointColor: state.pointColor,
    setLinePointSize: state.setLinePointSize,
    setPointColor: state.setPointColor,
  })))
  if (!showPoints) return null
  return (
    <>
      <div className='w-full flex items-center'>
        <div className='w-[40%]'><b>Point Size</b></div>
        <input
          type="range"
          min={1}
          max={20}
          step={.5}
          value={linePointSize}
          onChange={e => setLinePointSize(parseFloat(e.target.value))}
        />
      </div>
      <div className='w-full flex items-center'>
        <div className='w-[40%]'><b>Point Color</b></div>
        <input
          type='color'
          title='Point Color'
          value={pointColor}
          onChange={e => setPointColor(e.target.value)}
        />
      </div>
    </>
  )
})

// Memoized Line Options
const LineOptions = React.memo(() => {
  const { lineWidth, lineColor, useLineColor, setLineWidth, setLineColor, setUseLineColor } = usePlotStore(useShallow(state => ({
    lineWidth: state.lineWidth,
    lineColor: state.lineColor,
    useLineColor: state.useLineColor,
    setLineWidth: state.setLineWidth,
    setLineColor: state.setLineColor,
    setUseLineColor: state.setUseLineColor,
  })))
  return (
    <>
      <div className='w-full flex items-center'>
        <div className='w-[40%]'><b>Line Width</b></div>
        <input
          type="range"
          min={1}
          max={10}
          step={.2}
          value={lineWidth}
          onChange={e => setLineWidth(parseFloat(e.target.value))}
        />
      </div>
      <div className='w-full flex items-center'>
        <div className='w-[40%]'><b>Line Color</b></div>
        {useLineColor && (
          <input
            type='color'
            title='Line Color'
            value={lineColor}
            onChange={e => setLineColor(e.target.value)}
          />
        )}
        <Button
          className="h-8 px-2 py-1"
          variant='outline'
          onClick={() => setUseLineColor(!useLineColor)}
        >
          {useLineColor ? "Use Plot Color" : "Use Single Color"}
        </Button>
      </div>
    </>
  )
})

const PlotLineOptions = React.memo(() => {
  const { showPoints, setShowPoints } = usePlotStore(useShallow(state => ({
    showPoints: state.showPoints,
    setShowPoints: state.setShowPoints,
  })))

  return (
    <div className='plotline-options'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="cursor-pointer" variant="outline">Line Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60 items-center" align="center">
          <DropdownMenuGroup onClick={e => e.preventDefault()}>
            <DropdownMenuItem>
              <Button
                variant="outline"
                onClick={e => {
                  e.preventDefault()
                  setShowPoints(!showPoints)
                }}
              >
                {showPoints ? "Hide Points" : "Show Points"}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <PointOptions />
          <DropdownMenuSeparator />
          <LineOptions />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
})

export default PlotLineOptions