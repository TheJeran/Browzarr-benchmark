"use client";
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGlobalStore, useZarrStore } from '@/utils/GlobalStates'
import { useShallow } from 'zustand/shallow'
import MetaDataInfo from "./MetaDataInfo"

const Variables = ({ currentOpen, setOpen }: { currentOpen: string, setOpen: React.Dispatch<React.SetStateAction<string>> }) => {
  const { variables, zMeta, setVariable } = useGlobalStore(useShallow(state => ({
    variables: state.variables,
    zMeta: state.zMeta,
    setVariable: state.setVariable
  })))
  const [selected, setSelected] = React.useState<string | undefined>(undefined)
  const meta = React.useMemo(() => zMeta?.find((e: any) => e.name === selected), [selected, zMeta])

  React.useEffect(() => {
  if (variables && variables.length > 0 && selected === null) {
    // Do not auto-select on load
    // setSelected(variables[0])
  }
}, [variables, selected])

  return (
    <div className="flex flex-col gap-2 w-full">
      <Select
        value={selected}
        onValueChange={val => {
          setSelected(val)
          setOpen("variables")
        }}
      >
        <SelectTrigger className="w-[48px]">
          <SelectValue placeholder="α β" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Variables</SelectLabel>
            {variables.map((val, idx) => (
              <SelectItem key={idx} value={val}>
                {val}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {meta && (
        <MetaDataInfo
          meta={meta}
          setters={{
            setShowMeta: () => {},
            setShowOptions: () => {},
          }}
        />
      )}
    </div>
  )
}

export default Variables
