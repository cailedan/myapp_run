import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  // 使用数组来存储多个选中的日期
  const [selectedDays, setSelectedDays] = React.useState([]);

  const handleDayClick = (day) => {
    // 检查日期是否已选中
    const isSelected = selectedDays.some(selected => selected.toDateString() === day.toDateString());
    if (isSelected) {
      // 如果已选中，从数组中移除该日期
      setSelectedDays(selectedDays.filter(selected => selected.toDateString()!== day.toDateString()));
    } else {
      // 如果未选中，将该日期添加到数组中
      setSelectedDays([...selectedDays, day]);
    }
  };

  const modifiers = {
    selected: (day) => selectedDays.some(selected => selected.toDateString() === day.toDateString())
  };

  const renderDay = (day, modifiers) => {
    // 根据是否选中设置不同的类名
    const dayClasses = cn(
      buttonVariants({ variant: "ghost" }),
      "size-8 p-0 font-normal aria-selected:opacity-100",
      "flex justify-center items-center",
      modifiers.selected
        ? "bg-yellow-400 text-white"
        : "bg-transparent text-gray-700"
    );

    return (
      <button
        type="button"
        className={dayClasses}
        onClick={() => handleDayClick(day)}
      >
        {day.getDate()}
      </button>
    );
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 overflow-x-auto scrollbar", className)}
      classNames={{
       
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium w-full text-center",//月份标题
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",//星期标题
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
         
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100",
          "flex justify-center items-center"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-green-200 text-black hover:bg-red hover:text-rose-400 focus:bg-green-200 focus:text-blue",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        )
      }}
      // 传递选中日期数组
      selected={selectedDays}
      onDayClick={handleDayClick}
      modifiers={modifiers}
      renderDay={renderDay}
      {...props}
    />
  );
}

export { Calendar };