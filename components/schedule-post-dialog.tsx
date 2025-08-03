"use client"

import { useState } from "react"
import { Calendar, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface SchedulePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: string | null
  onSchedule: (postId: string, scheduledFor: Date) => void
}

export function SchedulePostDialog({ open, onOpenChange, postId, onSchedule }: SchedulePostDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("09:00")

  const handleSchedule = () => {
    if (!selectedDate || !postId) return

    const [hours, minutes] = selectedTime.split(":").map(Number)
    const scheduledDateTime = new Date(selectedDate)
    scheduledDateTime.setHours(hours, minutes, 0, 0)

    onSchedule(postId, scheduledDateTime)
    onOpenChange(false)
    setSelectedDate(undefined)
    setSelectedTime("09:00")
  }

  const suggestedTimes = [
    { time: "08:00", label: "8:00 AM - Morning commute" },
    { time: "12:00", label: "12:00 PM - Lunch break" },
    { time: "17:00", label: "5:00 PM - End of workday" },
    { time: "19:00", label: "7:00 PM - Evening engagement" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Schedule Post
          </DialogTitle>
          <DialogDescription>Choose when you want this post to be published on LinkedIn</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Select Time</Label>
            <Input id="time" type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Suggested Times</Label>
            <div className="grid grid-cols-1 gap-2">
              {suggestedTimes.map((suggestion) => (
                <Button
                  key={suggestion.time}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto p-3 bg-transparent"
                  onClick={() => setSelectedTime(suggestion.time)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  <div>
                    <div className="font-medium">{suggestion.time}</div>
                    <div className="text-xs text-muted-foreground">{suggestion.label}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSchedule} disabled={!selectedDate} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Schedule Post
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
