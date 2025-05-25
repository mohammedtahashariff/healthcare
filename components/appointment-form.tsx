"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const appointmentFormSchema = z.object({
  doctorId: z.string({
    required_error: "Please select a doctor.",
  }),
  appointmentDate: z.date({
    required_error: "Please select a date.",
  }),
  appointmentTime: z.string({
    required_error: "Please select a time.",
  }),
  type: z.enum(["virtual", "in-person"], {
    required_error: "Please select an appointment type.",
  }),
  symptoms: z.string().min(1, "Please describe your symptoms.").max(500),
  notes: z.string().max(1000).optional(),
})

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

const defaultValues: Partial<AppointmentFormValues> = {
  type: "virtual",
  notes: "",
}

interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialization: string
}

const doctors: Doctor[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Smith",
    specialization: "General Physician",
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Johnson",
    specialization: "Cardiologist",
  },
  // Add more doctors as needed
]

export function AppointmentForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues,
  })

  async function fetchAvailableTimeSlots(doctorId: string, date: Date) {
    try {
      const response = await fetch(
        `/api/doctors/${doctorId}/available-slots?date=${format(date, "yyyy-MM-dd")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      const slots = await response.json()
      setAvailableTimeSlots(slots)
    } catch (error) {
      console.error("Error fetching time slots:", error)
      toast({
        title: "Error",
        description: "Failed to fetch available time slots",
        variant: "destructive",
      })
    }
  }

  async function onSubmit(data: AppointmentFormValues) {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to book appointment")
      }

      toast({
        title: "Success",
        description: "Appointment booked successfully",
      })

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error booking appointment:", error)
      toast({
        title: "Error",
        description: "Failed to book appointment",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doctor</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose a doctor for your appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointmentDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date)
                      if (date && form.getValues("doctorId")) {
                        fetchAvailableTimeSlots(form.getValues("doctorId"), date)
                      }
                    }}
                    disabled={(date) =>
                      date < new Date() || date > new Date().setMonth(new Date().getMonth() + 2)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select your preferred appointment date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appointmentTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableTimeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose an available time slot.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="in-person">In-person</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose between a virtual or in-person appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symptoms</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe your symptoms..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Briefly describe your symptoms or reason for the appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional information..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Optional: Add any additional notes or concerns.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Book Appointment</Button>
      </form>
    </Form>
  )
} 