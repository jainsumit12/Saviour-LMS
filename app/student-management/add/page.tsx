"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Avatar, AvatarFallback } from "@/ui/avatar";
import { Separator } from "@/ui/separator";
import { UserPlus, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentFormData, studentSchema } from "@/utils/validation-schemas";
import CustomField from "@/components/reusableComponents/customField";
import CustomSelect from "@/components/reusableComponents/customSelect";
import { useMutation } from "@tanstack/react-query";
import { StudentController } from "./controller";

function PartnerAddStudent() {
  const studentController = new StudentController();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { mutate } = useMutation({
    mutationFn: studentController.addStudent,
  });
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      city: "us",
      state: "us",
      country: "us",
      dob: "",
      email: "",
      emergency_contact: {
        name: "",
        phone: "",
      },
      is_active: false,
      phone: "",
    },
  });

  const onSubmit = (data: StudentFormData) => {
    console.log(data, "submit_data");
    mutate(data);
  };

  console.log(form.watch(), "values");

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Add Student</h1>
              <p className="text-muted-foreground">
                Register a new student to your partner account
              </p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Students
            </Button>
          </div>

          {/* Student Registration Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Student Registration
              </CardTitle>
              <CardDescription>
                Complete the form below to register a new student
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <CustomField
                    label="First Name"
                    control={form.control}
                    name="first_name"
                    placeholder="Enter first name"
                    isLoading={false}
                  />
                  <CustomField
                    label="Last Name"
                    control={form.control}
                    name="last_name"
                    placeholder="Enter last name"
                    isLoading={false}
                  />
                  <CustomField
                    label="Email"
                    control={form.control}
                    name="email"
                    placeholder="student@example.com"
                    isLoading={false}
                  />
                  <CustomField
                    label="Phone"
                    control={form.control}
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    isLoading={false}
                  />
                  <CustomField
                    label="Date of Birth"
                    control={form.control}
                    name="dob"
                    placeholder="YYYY-MM-DD"
                    isLoading={false}
                    type="date"
                  />

                  <CustomField
                    label="Address"
                    control={form.control}
                    name="address"
                    placeholder="Street address, apartment, suite, etc."
                    isLoading={false}
                    type="textarea"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <CustomSelect
                    label="Country"
                    control={form.control}
                    name="country"
                    placeholder="Select country"
                    isLoading={false}
                    options={[
                      { label: "United States", value: "us" },
                      { label: "Canada", value: "ca" },
                      { label: "United Kingdom", value: "uk" },
                      { label: "Australia", value: "au" },
                      { label: "India", value: "in" },
                      { label: "Germany", value: "de" },
                      { label: "France", value: "fr" },
                      { label: "Japan", value: "jp" },
                      { label: "Singapore", value: "sg" },
                      { label: "Netherlands", value: "nl" },
                    ]}
                  />
                  <CustomSelect
                    label="State"
                    control={form.control}
                    name="state"
                    placeholder="Select state"
                    isLoading={false}
                    options={[
                      { label: "United States", value: "us" },
                      { label: "Canada", value: "ca" },
                      { label: "United Kingdom", value: "uk" },
                      { label: "Australia", value: "au" },
                      { label: "India", value: "in" },
                      { label: "Germany", value: "de" },
                      { label: "France", value: "fr" },
                      { label: "Japan", value: "jp" },
                      { label: "Singapore", value: "sg" },
                      { label: "Netherlands", value: "nl" },
                    ]}
                  />
                  <CustomSelect
                    label="City"
                    control={form.control}
                    name="city"
                    placeholder="Select City"
                    isLoading={false}
                    options={[
                      { label: "United States", value: "us" },
                      { label: "Canada", value: "ca" },
                      { label: "United Kingdom", value: "uk" },
                      { label: "Australia", value: "au" },
                      { label: "India", value: "in" },
                      { label: "Germany", value: "de" },
                      { label: "France", value: "fr" },
                      { label: "Japan", value: "jp" },
                      { label: "Singapore", value: "sg" },
                      { label: "Netherlands", value: "nl" },
                    ]}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Emergency Contact Information</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <CustomField
                      label="Emergency Contact Name"
                      control={form.control}
                      name="emergency_contact.name"
                      placeholder="Contact person name"
                      isLoading={false}
                    />
                    <CustomField
                      label="Emergency Contact Phone"
                      control={form.control}
                      name="emergency_contact.phone"
                      placeholder="Contact person phone"
                      isLoading={false}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset Form
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding Student...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Student
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recently Added Students */}
          {students.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Recently Added Students ({students.length})
                </CardTitle>
                <CardDescription>
                  Students you've recently registered to your partner account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students
                    .slice(-5)
                    .reverse()
                    .map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {student.first_name[0]}
                              {student.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {student.first_name} {student.last_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {student.phone}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            {student.country.toUpperCase()}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            Added:{" "}
                            {new Date(student.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  {students.length > 5 && (
                    <div className="text-center pt-4">
                      <Button variant="outline" size="sm">
                        View All Students ({students.length})
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default PartnerAddStudent;
