"use client"
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Separator } from "@/ui/separator";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";

import {
  BookOpen,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Save,
  Eye,
  AlertCircle,
  FileText,
  Target,
  Award,
  Globe,
  X,
} from "lucide-react";
import {
  courseSchema,
  CourseFormData,
  CourseModuleData,
  LearningObjectiveData,
  PrerequisiteData,
} from "@/utils/validation-schemas";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/ui/alert";

 function InstituteAddCourse() {
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState("");

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "UI/UX Design",
    "Digital Marketing",
    "Business",
    "Finance",
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
  ];
  const formats = [
    "Online Live",
    "Online Self-Paced",
    "Hybrid",
    "In-Person",
    "Bootcamp",
    "Workshop",
  ];
  const instructors = [
    "Dr. Sarah Johnson",
    "Prof. Michael Chen",
    "Alex Rodriguez",
    "Dr. Emily Watson",
    "James Wilson",
  ];

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      category: "",
      level: "Beginner",
      language: "",
      price: "",
      currency: "USD",
      duration: "",
      durationUnit: "weeks",
      maxStudents: "",
      startDate: "",
      endDate: "",
      enrollmentDeadline: "",
      format: "",
      instructor: "",
      thumbnail: "",
      tags: [],
      status: "draft",
    },
  });

  // Separate state for complex nested data that doesn't need validation
  const [modules, setModules] = useState<CourseModuleData[]>([
    { id: "1", title: "", description: "", duration: "", resources: [] },
  ]);

  const [learningObjectives, setLearningObjectives] = useState<
    LearningObjectiveData[]
  >([{ id: "1", objective: "" }]);

  const [prerequisites, setPrerequisites] = useState<PrerequisiteData[]>([
    { id: "1", prerequisite: "" },
  ]);

  const addModule = () => {
    const newModule: CourseModuleData = {
      id: Date.now().toString(),
      title: "",
      description: "",
      duration: "",
      resources: [],
    };
    setModules((prev) => [...prev, newModule]);
  };

  const updateModule = (
    id: string,
    field: keyof CourseModuleData,
    value: string
  ) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === id ? { ...module, [field]: value } : module
      )
    );
  };

  const removeModule = (id: string) => {
    if (modules.length > 1) {
      setModules((prev) => prev.filter((module) => module.id !== id));
    }
  };

  const addLearningObjective = () => {
    const newObjective: LearningObjectiveData = {
      id: Date.now().toString(),
      objective: "",
    };
    setLearningObjectives((prev) => [...prev, newObjective]);
  };

  const updateLearningObjective = (id: string, value: string) => {
    setLearningObjectives((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, objective: value } : obj))
    );
  };

  const removeLearningObjective = (id: string) => {
    if (learningObjectives.length > 1) {
      setLearningObjectives((prev) => prev.filter((obj) => obj.id !== id));
    }
  };

  const addPrerequisite = () => {
    const newPrerequisite: PrerequisiteData = {
      id: Date.now().toString(),
      prerequisite: "",
    };
    setPrerequisites((prev) => [...prev, newPrerequisite]);
  };

  const updatePrerequisite = (id: string, value: string) => {
    setPrerequisites((prev) =>
      prev.map((req) => (req.id === id ? { ...req, prerequisite: value } : req))
    );
  };

  const removePrerequisite = (id: string) => {
    if (prerequisites.length > 1) {
      setPrerequisites((prev) => prev.filter((req) => req.id !== id));
    }
  };

  const addTag = () => {
    if (currentTag.trim()) {
      const currentTags = form.getValues("tags") || [];
      if (!currentTags.includes(currentTag.trim())) {
        form.setValue("tags", [...currentTags, currentTag.trim()]);
        setCurrentTag("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((tag:any) => tag !== tagToRemove)
    );
  };

  const validateModules = (): boolean => {
    return modules.every((module, index) => {
      if (!module.title.trim()) {
        toast.error(`Module ${index + 1} title is required`);
        return false;
      }
      return true;
    });
  };

  const validateLearningObjectives = (): boolean => {
    return learningObjectives.every((obj, index) => {
      if (!obj.objective.trim()) {
        toast.error(`Learning objective ${index + 1} is required`);
        return false;
      }
      return true;
    });
  };

  const onSubmit = async (
    data: CourseFormData,
    action: "draft" | "publish" = "draft"
  ) => {
    // Validate modules and objectives
    if (!validateModules() || !validateLearningObjectives()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call with complete data
      const completeData = {
        ...data,
        modules,
        learningObjectives,
        prerequisites: prerequisites.filter((req) => req.prerequisite.trim()),
        status: action === "publish" ? "active" : "draft",
      };

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const message =
        action === "draft"
          ? "Course saved as draft!"
          : "Course published successfully!";
      toast.success(message);

      // Reset form
      form.reset();
      setModules([
        { id: "1", title: "", description: "", duration: "", resources: [] },
      ]);
      setLearningObjectives([{ id: "1", objective: "" }]);
      setPrerequisites([{ id: "1", prerequisite: "" }]);
    } catch (error) {
      toast.error("Failed to save course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (action: "draft" | "publish") => {
    form.handleSubmit((data:any) => onSubmit(data, action))();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Add New Course</h1>
          <p className="text-muted-foreground">
            Create a new course with detailed curriculum and requirements
          </p>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Provide basic details about your course
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter course title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description for course preview"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Detailed course description"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Language *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {languages.map((language) => (
                                <SelectItem key={language} value={language}>
                                  {language}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label>Course Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="Add a tag"
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                      />
                      <Button type="button" variant="outline" onClick={addTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {form.watch("tags")?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.watch("tags").map((tag:any) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => removeTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Course Structure */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Course Structure
                  </CardTitle>
                  <CardDescription>
                    Define the modules and curriculum structure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {modules.map((module, index) => (
                    <div
                      key={module.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Module {index + 1}</h4>
                        {modules.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeModule(module.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Module Title *</Label>
                          <Input
                            value={module.title}
                            onChange={(e) =>
                              updateModule(module.id, "title", e.target.value)
                            }
                            placeholder="Enter module title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Module Description</Label>
                          <Textarea
                            value={module.description}
                            onChange={(e) =>
                              updateModule(
                                module.id,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Describe what students will learn in this module"
                            rows={2}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input
                            value={module.duration}
                            onChange={(e) =>
                              updateModule(
                                module.id,
                                "duration",
                                e.target.value
                              )
                            }
                            placeholder="e.g., 2 weeks, 5 hours"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addModule}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Module
                  </Button>
                </CardContent>
              </Card>

              {/* Learning Objectives */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Learning Objectives
                  </CardTitle>
                  <CardDescription>
                    What will students achieve after completing this course?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningObjectives.map((obj, index) => (
                    <div key={obj.id} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          value={obj.objective}
                          onChange={(e) =>
                            updateLearningObjective(obj.id, e.target.value)
                          }
                          placeholder={`Learning objective ${index + 1}`}
                        />
                      </div>
                      {learningObjectives.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLearningObjective(obj.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addLearningObjective}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Learning Objective
                  </Button>
                </CardContent>
              </Card>

              {/* Prerequisites */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Prerequisites
                  </CardTitle>
                  <CardDescription>
                    What should students know before taking this course?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prerequisites.map((req, index) => (
                    <div key={req.id} className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          value={req.prerequisite}
                          onChange={(e) =>
                            updatePrerequisite(req.id, e.target.value)
                          }
                          placeholder={`Prerequisite ${index + 1}`}
                        />
                      </div>
                      {prerequisites.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePrerequisite(req.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addPrerequisite}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Prerequisite
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing & Enrollment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Pricing & Enrollment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="maxStudents"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Students *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Duration *</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="durationUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>&nbsp;</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="weeks">Weeks</SelectItem>
                              <SelectItem value="months">Months</SelectItem>
                              <SelectItem value="hours">Hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="enrollmentDeadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enrollment Deadline</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Course Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Course Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Format *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {formats.map((format) => (
                              <SelectItem key={format} value={format}>
                                {format}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instructor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructor *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select instructor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {instructors.map((instructor) => (
                              <SelectItem key={instructor} value={instructor}>
                                {instructor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Thumbnail URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Save as draft to continue editing later, or publish to
                      make the course available for enrollment.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleSubmit("publish")}
                      disabled={loading}
                      className="w-full"
                      type="button"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-transparent border-t-current" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Publish Course
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleSubmit("draft")}
                      disabled={loading}
                      className="w-full"
                      type="button"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-transparent border-t-current" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save as Draft
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default InstituteAddCourse
