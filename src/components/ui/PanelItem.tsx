"use client"

import { Popover, PopoverTrigger, PopoverContent } from "radix-ui"

import { Button } from "radix-ui"

export function PanelItem({ children, options }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="panel-item">
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-2">
        {options}
      </PopoverContent>
    </Popover>
  )
}