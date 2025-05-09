import { CalendarIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Component as AreaChartCard } from "../ui/areachart"

export function HoverShowdata(props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{props.data}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <AreaChartCard/>
      </HoverCardContent>
    </HoverCard>
  )
}
