"use client";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  tables: z.coerce.number().min(1),
  slot: z.string({
    required_error: "Please select an email to display.",
  }),
  email: z.string().email(),
});

const Create = () => {
  const [date, setDate] = useState<Date>();
  const [done, setDone] = useState<boolean>(false);
  const [availSlots, setAvailSlots] = useState([
    { slot1: false },
    { slot2: false },
    { slot3: false },
  ]);

  useEffect(() => {
      const fetchAvailableSlots = async () => {
        const formattedDate = date ? format(date, "dd-MM-yyyy") : "invalid";
        const resp = await axios.get(
          `/api/datetime/${formattedDate}`
        );
        if (resp) {
          const timeSlotArr = [
            { slot1: resp.data?.slot1 },
            { slot2: resp.data?.slot2 },
            { slot3: resp.data?.slot3 },
          ];
          setAvailSlots(timeSlotArr);
        }
      };
      fetchAvailableSlots();
  }, [date]);

  const [summary, setSummary] = useState<{
    id: string;
    date: string;
    slot: string;
    name: string;
    email: string;
    tables: number;
  }>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      tables: 1,
      slot: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedDate = date ? format(date, "dd-MM-yyyy") : "invalid";
    const userData = { ...values, date: formattedDate };
    const resp = await axios.post(`/api`, userData);
    if (resp) {
      setDone(true);
      setSummary(resp.data);
    }
  }

  if (done) {
    return (
      summary && (
        <div className="h-screen flex items-center">
          <div className="p-8 border rounded-xl shadow-xl space-y-5">
            <h1 className="text-xl font-bold">Summary</h1>
            <p>Date: {summary.date}</p>
            <p>Time: {summary.slot}</p>
            <p>Name: {summary.name}</p>
            <p>Tables: {summary.tables}</p>
            <p>Email: {summary.email}</p>
            <Button>
              <Link href="/">
                <Home />
              </Link>
            </Button>
          </div>
        </div>
      )
    );
  } else {
    return (
      <div className="h-screen flex items-center">
        <div className="border rounded-xl shadow-xl p-6">
          <h1 className="text-xl font-bold mb-5">Create Booking</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tables"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="No. of tables"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="date"
                render={() => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              {date && (
                <FormField
                  name="slot"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Slots Available" />
                          </SelectTrigger>
                          <SelectContent>
                            {!availSlots[0].slot1 && (
                              <SelectItem value="10:00 am">10:00 am</SelectItem>
                            )}
                            {!availSlots[1].slot2 && (
                              <SelectItem value="12:00 pm">12:00 pm</SelectItem>
                            )}
                            {!availSlots[2].slot3 && (
                              <SelectItem value="2:00 pm">2:00 pm</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }
};
export default Create;
