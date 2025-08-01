import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Skeleton } from "@/ui/skeleton";
import React from "react";
type propTypes = {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  isLoading: boolean;
  options: (number | string | Record<string, any>)[];
};
const CustomSelect = ({
  control,
  name,
  label,
  placeholder,
  isLoading,
  options,
}: propTypes) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {isLoading ? (
            <Skeleton className="h-4 w-[250px]" />
          ) : (
            <FormLabel>{label}</FormLabel>
          )}
          {isLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((val: any) => (
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomSelect;
