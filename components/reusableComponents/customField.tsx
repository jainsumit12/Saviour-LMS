import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Skeleton } from "@/ui/skeleton";
import React from "react";
import { UseFormReturn } from "react-hook-form";
type propTypes = {
  form: UseFormReturn;
  name: string;
  label: string;
  placeholder: string;
  isLoading: boolean;
};
const CustomField = ({
  form,
  name,
  label,
  placeholder,
  isLoading,
}: propTypes) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {isLoading ? (
            <Skeleton className="h-4 w-[250px]" />
          ) : (
            <FormLabel>{label}</FormLabel>
          )}
          <FormControl>
            {isLoading ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomField;
