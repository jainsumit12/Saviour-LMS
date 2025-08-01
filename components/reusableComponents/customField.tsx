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
type propTypes = {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  isLoading: boolean;
  type?: React.HTMLInputTypeAttribute;
};
const CustomField = ({
  control,
  name,
  label,
  placeholder,
  isLoading,
  type,
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
          <FormControl>
            {isLoading ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                type={type || "text"}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomField;
