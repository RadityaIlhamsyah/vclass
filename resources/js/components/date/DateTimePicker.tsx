'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDeadline } from '@/stores/deadline-store';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

export function DateTimePicker() {
    const { deadline, setDeadline } = useDeadline();

    const handleDateTimeChange = (date: Date | undefined) => {
        if (date) {
            const newDateTime = new Date(date);
            newDateTime.setHours(12, 0, 0, 0);
            setDeadline(newDateTime);
        } else {
            setDeadline(undefined);
        }
    };

    // Handle time selection from the dropdown
    const handleTimeChange = (value: string) => {
        if (deadline) {
            const updatedDeadline = new Date(deadline);
            const [hours, minutes] = value.split(':');
            updatedDeadline.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            setDeadline(updatedDeadline);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[240px] justify-start text-left font-normal',
                        !deadline && 'text-muted-foreground',
                    )}
                >
                    <CalendarIcon />
                    {deadline ? (
                        format(deadline, 'PPP p')
                    ) : (
                        <span>Tentukan Deadlinenya</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={handleDateTimeChange}
                    initialFocus
                />

                <div className="mt-4 flex gap-4">
                    <Select onValueChange={handleTimeChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Waktu" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="08:00">08:00 AM</SelectItem>
                            <SelectItem value="09:00">09:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="12:00">12:00 PM</SelectItem>
                            <SelectItem value="13:00">01:00 PM</SelectItem>
                            <SelectItem value="14:00">02:00 PM</SelectItem>
                            <SelectItem value="15:00">03:00 PM</SelectItem>
                            <SelectItem value="16:00">04:00 PM</SelectItem>
                            <SelectItem value="17:00">05:00 PM</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    );
}
