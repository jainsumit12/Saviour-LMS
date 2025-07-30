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
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Separator } from "@/ui/separator";
import { UserPlus, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  country: string;
  emergencyContact: string;
  emergencyPhone: string;
  createdAt: string;
}

function PartnerAddStudent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  // Student form state
  const [studentForm, setStudentForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    country: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newStudent: Student = {
        id: (students.length + 1).toString(),
        ...studentForm,
        createdAt: new Date().toISOString(),
      };

      setStudents((prev) => [...prev, newStudent]);
      setStudentForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: "",
        city: "",
        country: "",
        emergencyContact: "",
        emergencyPhone: "",
      });
      setLoading(false);
      toast.success("Student added successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Add Student</h1>
          <p className="text-muted-foreground">
            Register a new student to your partner account
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Students
          </Button>
        </div>
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
          <form onSubmit={handleStudentSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  required
                  value={studentForm.firstName}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  required
                  value={studentForm.lastName}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={studentForm.email}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="student@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={studentForm.phone}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={studentForm.dateOfBirth}
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      dateOfBirth: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  value={studentForm.country}
                  onValueChange={(value) =>
                    setStudentForm((prev) => ({ ...prev, country: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="sg">Singapore</SelectItem>
                    <SelectItem value="nl">Netherlands</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={studentForm.address}
                onChange={(e) =>
                  setStudentForm((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                placeholder="Street address, apartment, suite, etc."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={studentForm.city}
                onChange={(e) =>
                  setStudentForm((prev) => ({ ...prev, city: e.target.value }))
                }
                placeholder="Enter city"
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Emergency Contact Information</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="emergencyContact">
                    Emergency Contact Name
                  </Label>
                  <Input
                    id="emergencyContact"
                    value={studentForm.emergencyContact}
                    onChange={(e) =>
                      setStudentForm((prev) => ({
                        ...prev,
                        emergencyContact: e.target.value,
                      }))
                    }
                    placeholder="Enter emergency contact name"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">
                    Emergency Contact Phone
                  </Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={studentForm.emergencyPhone}
                    onChange={(e) =>
                      setStudentForm((prev) => ({
                        ...prev,
                        emergencyPhone: e.target.value,
                      }))
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setStudentForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    dateOfBirth: "",
                    address: "",
                    city: "",
                    country: "",
                    emergencyContact: "",
                    emergencyPhone: "",
                  })
                }
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
          </form>
        </CardContent>
      </Card>

      {/* Recently Added Students */}
      {students.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Added Students ({students.length})</CardTitle>
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
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {student.firstName} {student.lastName}
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
  );
}

export default PartnerAddStudent;
