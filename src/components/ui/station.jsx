import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Station() {
  return (
    <div>
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
  );
}

export default Station
