"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Badge } from "@/ui/badge";
import { Avatar, AvatarFallback } from "@/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Copy,
  Trash2,
  MoreHorizontal,
  FileText,
  Calendar,
  User,
  Mail,
  Palette,
  LayoutGrid,
  List,
  Download,
  Send,
} from "lucide-react";
import { toast } from "sonner";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category:
    | "welcome"
    | "notification"
    | "marketing"
    | "course"
    | "certificate"
    | "reminder"
    | "custom";
  description: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  isActive: boolean;
  usageCount: number;
  preview: string;
  thumbnail?: string;
}

interface EmailTemplateManagementProps {
  onEditTemplate?: (templateId: string) => void;
  onCreateTemplate?: () => void;
}

// Mock email templates data
const mockTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Welcome Email",
    subject: "Welcome to {{institute_name}}!",
    category: "welcome",
    description: "A warm welcome email for new students joining the platform",
    createdBy: "Admin User",
    createdAt: "2024-01-15",
    lastModified: "2024-01-20",
    isActive: true,
    usageCount: 124,
    preview:
      "Welcome to our educational platform! We're excited to have you join our community...",
  },
  {
    id: "2",
    name: "Course Enrollment Confirmation",
    subject: "Course Enrollment Confirmed - {{course_name}}",
    category: "course",
    description: "Confirmation email sent when a student enrolls in a course",
    createdBy: "Sarah Wilson",
    createdAt: "2024-01-10",
    lastModified: "2024-01-18",
    isActive: true,
    usageCount: 89,
    preview:
      "Congratulations! You have successfully enrolled in {{course_name}}. Your learning journey starts now...",
  },
  {
    id: "3",
    name: "Certificate Awarded",
    subject: "Congratulations! Certificate Awarded",
    category: "certificate",
    description: "Email template for certificate award notifications",
    createdBy: "Admin User",
    createdAt: "2024-01-05",
    lastModified: "2024-01-15",
    isActive: true,
    usageCount: 67,
    preview:
      "We are pleased to inform you that you have been awarded a certificate for completing {{course_name}}...",
  },
  {
    id: "4",
    name: "Assignment Reminder",
    subject: "Assignment Due Reminder - {{assignment_name}}",
    category: "reminder",
    description: "Reminder email for upcoming assignment deadlines",
    createdBy: "John Smith",
    createdAt: "2024-01-01",
    lastModified: "2024-01-12",
    isActive: true,
    usageCount: 156,
    preview:
      'This is a friendly reminder that your assignment "{{assignment_name}}" is due on {{due_date}}...',
  },
  {
    id: "5",
    name: "Newsletter Template",
    subject: "Monthly Newsletter - {{month}} {{year}}",
    category: "marketing",
    description: "Monthly newsletter template for educational updates",
    createdBy: "Marketing Team",
    createdAt: "2023-12-20",
    lastModified: "2024-01-08",
    isActive: true,
    usageCount: 245,
    preview:
      "Stay updated with the latest news, course releases, and educational insights from our platform...",
  },
  {
    id: "6",
    name: "System Maintenance Notice",
    subject: "Scheduled Maintenance Notification",
    category: "notification",
    description: "Template for system maintenance notifications",
    createdBy: "IT Team",
    createdAt: "2023-12-15",
    lastModified: "2023-12-28",
    isActive: false,
    usageCount: 12,
    preview:
      "We will be performing scheduled maintenance on our platform. Please be aware of the following...",
  },
];

function EmailTemplateManagement({
  onEditTemplate,
  onCreateTemplate,
}: EmailTemplateManagementProps) {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getCategoryBadge = (category: string) => {
    const colors = {
      welcome: "bg-green-50 text-green-700 border-green-200",
      notification: "bg-blue-50 text-blue-700 border-blue-200",
      marketing: "bg-purple-50 text-purple-700 border-purple-200",
      course: "bg-orange-50 text-orange-700 border-orange-200",
      certificate: "bg-yellow-50 text-yellow-700 border-yellow-200",
      reminder: "bg-red-50 text-red-700 border-red-200",
      custom: "bg-gray-50 text-gray-700 border-gray-200",
    };

    return (
      <Badge className={`${colors[category as keyof typeof colors]} text-xs`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
        Active
      </Badge>
    ) : (
      <Badge
        variant="secondary"
        className="bg-gray-50 text-gray-700 border-gray-200 text-xs"
      >
        Inactive
      </Badge>
    );
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || template.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && template.isActive) ||
      (statusFilter === "inactive" && !template.isActive);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDuplicateTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      const newTemplate: EmailTemplate = {
        ...template,
        id: Date.now().toString(),
        name: `${template.name} (Copy)`,
        createdAt: new Date().toISOString().split("T")[0],
        lastModified: new Date().toISOString().split("T")[0],
        usageCount: 0,
      };
      setTemplates((prev) => [newTemplate, ...prev]);
      toast.success("Template duplicated successfully");
    }
  };

  const handleDeleteTemplate = () => {
    if (selectedTemplate) {
      setTemplates((prev) => prev.filter((t) => t.id !== selectedTemplate.id));
      toast.success("Template deleted successfully");
      setShowDeleteDialog(false);
      setSelectedTemplate(null);
    }
  };

  const handleToggleStatus = (templateId: string) => {
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === templateId
          ? { ...template, isActive: !template.isActive }
          : template
      )
    );
    toast.success("Template status updated");
  };

  const GridView = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredTemplates.map((template) => (
        <Card key={template.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base truncate">
                  {template.name}
                </CardTitle>
                <CardDescription className="text-sm truncate mt-1">
                  {template.subject}
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowPreviewDialog(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  {onEditTemplate && (
                    <DropdownMenuItem
                      onClick={() => onEditTemplate(template.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => handleDuplicateTemplate(template.id)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleToggleStatus(template.id)}
                  >
                    {template.isActive ? (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Deactivate
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Activate
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowDeleteDialog(true);
                    }}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              {getCategoryBadge(template.category)}
              {getStatusBadge(template.isActive)}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {template.description}
            </p>

            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>Created by {template.createdBy}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  Modified{" "}
                  {new Date(template.lastModified).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Send className="h-3 w-3" />
                <span>Used {template.usageCount} times</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setSelectedTemplate(template);
                  setShowPreviewDialog(true);
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
              {onEditTemplate && (
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => onEditTemplate(template.id)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4 font-medium">Template</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Created By</th>
                <th className="p-4 font-medium">Last Modified</th>
                <th className="p-4 font-medium">Usage</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTemplates.map((template) => (
                <tr key={template.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {template.subject}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{getCategoryBadge(template.category)}</td>
                  <td className="p-4">{getStatusBadge(template.isActive)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {template.createdBy
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{template.createdBy}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">
                      {new Date(template.lastModified).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{template.usageCount}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setShowPreviewDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {onEditTemplate && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onEditTemplate(template.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleDuplicateTemplate(template.id)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(template.id)}
                          >
                            {template.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTemplate(template);
                              setShowDeleteDialog(true);
                            }}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Email Templates</h2>
          <p className="text-muted-foreground">
            Manage and organize your email templates
          </p>
        </div>
        {onCreateTemplate && (
          <Button
            onClick={onCreateTemplate}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Template
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="welcome">Welcome</SelectItem>
                <SelectItem value="notification">Notification</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
                <SelectItem value="reminder">Reminder</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              {filteredTemplates.length} template
              {filteredTemplates.length !== 1 ? "s" : ""}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates */}
      {filteredTemplates.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium mb-2">No Templates Found</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
                ? "No templates match your current filters"
                : "Get started by creating your first email template"}
            </p>
            {onCreateTemplate && (
              <Button onClick={onCreateTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <GridView />
      ) : (
        <ListView />
      )}

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>
              Preview how this email template will look to recipients
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {getCategoryBadge(selectedTemplate.category)}
                {getStatusBadge(selectedTemplate.isActive)}
              </div>

              <div>
                <h4 className="font-medium mb-2">Subject Line</h4>
                <div className="p-3 bg-muted rounded border">
                  {selectedTemplate.subject}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Email Content Preview</h4>
                <div className="p-4 bg-muted rounded border min-h-[200px]">
                  <p className="text-sm">{selectedTemplate.preview}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPreviewDialog(false)}
            >
              Close
            </Button>
            {onEditTemplate && selectedTemplate && (
              <Button
                onClick={() => {
                  setShowPreviewDialog(false);
                  onEditTemplate(selectedTemplate.id);
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Template
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedTemplate?.name}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTemplate}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmailTemplateManagement;
