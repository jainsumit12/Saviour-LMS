"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { GraduationCap, Mail, Lock, User, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import FallbackSpinner from "./reusableComponents/Fallback";

function LoginForm() {
  const auth = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    {
      value: "admin",
      label: "Administrator",
      description: "Full system access and management capabilities",
    },
    {
      value: "partner",
      label: "Partner",
      description: "Course sales and student management",
    },
    {
      value: "institute",
      label: "Institute",
      description: "Course creation and staff management",
    },
    {
      value: "student",
      label: "Student",
      description: "Course enrollment and learning progress",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    auth.login({ email, password, role: selectedRole });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-white to-gray-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to Saviour EduTech
            </h1>
            <p className="text-gray-600">Sign in to your dashboard</p>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>
              Choose your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Select Your Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{role.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {role.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRole && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!selectedRole || !email || !password}
                  >
                    {auth.authLoading ? (
                      <Loader2 className="animate-spin text-secondary" />
                    ) : (
                      <User className="w-4 h-4 mr-2" />
                    )}
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2 justify-center">
          {roles.map((role) => (
            <Badge
              key={role.value}
              variant={selectedRole === role.value ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedRole(role.value)}
            >
              {role.label}
            </Badge>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Saviour EduTech. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;
