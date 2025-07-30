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
import { Separator } from "@/ui/separator";

import {
  MessageSquare,
  Plus,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  MoreVertical,
  FileText,
  Paperclip,
  User,
  Calendar,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { toast } from "sonner";

// Types
interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
  attachments?: string[];
}

interface TicketResponse {
  id: string;
  message: string;
  author: string;
  authorRole: "partner" | "admin";
  timestamp: string;
  attachments?: string[];
}

function PartnerSupport() {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Form state for new ticket
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    category: "",
    priority: "medium" as const,
  });

  // Response form state
  const [responseMessage, setResponseMessage] = useState("");

  // Mock data
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "1",
      subject: "Issue with Course Purchase Payment",
      description:
        "We are experiencing difficulties with the payment gateway when purchasing courses for our students. The transaction gets stuck at the payment confirmation step.",
      category: "payment",
      priority: "high",
      status: "in-progress",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-22",
      responses: [
        {
          id: "1",
          message:
            "Thank you for reporting this issue. We are investigating the payment gateway integration and will update you soon.",
          author: "Admin Support",
          authorRole: "admin",
          timestamp: "2024-01-20T10:30:00Z",
        },
        {
          id: "2",
          message:
            "We have identified the issue and are working on a fix. Expected resolution within 24 hours.",
          author: "Admin Support",
          authorRole: "admin",
          timestamp: "2024-01-21T14:15:00Z",
        },
      ],
    },
    {
      id: "2",
      subject: "Question about Student Progress Tracking",
      description:
        "How can I export student progress reports for our internal documentation? I cannot find the export option in the student tracking section.",
      category: "feature-request",
      priority: "medium",
      status: "resolved",
      createdAt: "2024-01-18",
      updatedAt: "2024-01-19",
      responses: [
        {
          id: "3",
          message:
            "You can export student progress reports by going to Track Student → Select Student → Progress Tab → Export button (top right). The feature is available in both PDF and Excel formats.",
          author: "Admin Support",
          authorRole: "admin",
          timestamp: "2024-01-18T16:45:00Z",
        },
      ],
    },
    {
      id: "3",
      subject: "Access Issue for New Staff Member",
      description:
        'Our newly added staff member cannot access the partner portal. They receive an "insufficient permissions" error when trying to log in.',
      category: "technical",
      priority: "medium",
      status: "open",
      createdAt: "2024-01-22",
      updatedAt: "2024-01-22",
      responses: [],
    },
  ]);

  const categories = [
    { value: "technical", label: "Technical Issue" },
    { value: "payment", label: "Payment & Billing" },
    { value: "feature-request", label: "Feature Request" },
    { value: "account", label: "Account Management" },
    { value: "course", label: "Course Related" },
    { value: "student", label: "Student Management" },
    { value: "other", label: "Other" },
  ];

  const priorities = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
    {
      value: "medium",
      label: "Medium",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
  ];

  const statuses = [
    {
      value: "open",
      label: "Open",
      icon: Clock,
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "in-progress",
      label: "In Progress",
      icon: AlertCircle,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "resolved",
      label: "Resolved",
      icon: CheckCircle,
      color: "bg-green-100 text-green-800",
    },
    {
      value: "closed",
      label: "Closed",
      icon: CheckCircle,
      color: "bg-gray-100 text-gray-800",
    },
  ];

  // Handle form submission
  const handleSubmitTicket = async () => {
    if (
      !newTicket.subject.trim() ||
      !newTicket.description.trim() ||
      !newTicket.category
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const ticket: SupportTicket = {
      id: Date.now().toString(),
      subject: newTicket.subject,
      description: newTicket.description,
      category: newTicket.category,
      priority: newTicket.priority,
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      responses: [],
    };

    setTickets((prev) => [ticket, ...prev]);
    setNewTicket({
      subject: "",
      description: "",
      category: "",
      priority: "medium",
    });
    toast.success("Support ticket created successfully!");
    setActiveTab("tickets");
  };

  // Handle response submission
  const handleSubmitResponse = (ticketId: string) => {
    if (!responseMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const response: TicketResponse = {
      id: Date.now().toString(),
      message: responseMessage,
      author: "Partner User",
      authorRole: "partner",
      timestamp: new Date().toISOString(),
    };

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              responses: [...ticket.responses, response],
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : ticket
      )
    );

    setResponseMessage("");
    toast.success("Response sent successfully!");
  };

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    return (
      priorities.find((p) => p.value === priority)?.color ||
      "bg-gray-100 text-gray-800"
    );
  };

  // Get status badge color and icon
  const getStatusInfo = (status: string) => {
    return statuses.find((s) => s.value === status) || statuses[0];
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Create Ticket Tab
  const CreateTicketTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Create Support Ticket
          </CardTitle>
          <CardDescription>
            Submit a query or report an issue to our admin team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={newTicket.subject}
                onChange={(e) =>
                  setNewTicket((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="Brief description of your issue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={newTicket.category}
                onValueChange={(value) =>
                  setNewTicket((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={newTicket.priority}
              onValueChange={(value: any) =>
                setNewTicket((prev) => ({ ...prev, priority: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${priority.color}`}
                      />
                      {priority.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={newTicket.description}
              onChange={(e) =>
                setNewTicket((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Provide detailed information about your issue or query..."
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Attachments (Optional)</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <Paperclip className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to upload files or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                Max file size: 10MB. Supported formats: PDF, DOC, DOCX, JPG, PNG
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSubmitTicket}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Submit Ticket
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Tickets List Tab
  const TicketsListTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setActiveTab("create")}>
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No Support Tickets</h3>
              <p className="text-muted-foreground mb-4">
                You haven't created any support tickets yet.
              </p>
              <Button onClick={() => setActiveTab("create")}>
                Create Your First Ticket
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredTickets.map((ticket) => {
            const statusInfo = getStatusInfo(ticket.status);
            const StatusIcon = statusInfo.icon;

            return (
              <Card
                key={ticket.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent
                  className="p-6"
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {ticket.description}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setSelectedTicket(ticket.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(ticket.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {ticket.responses.length} responses
                      </span>
                    </div>
                    <Badge className={statusInfo.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );

  // Ticket Detail View
  const TicketDetailView = () => {
    const ticket = tickets.find((t) => t.id === selectedTicket);
    if (!ticket) return null;

    const statusInfo = getStatusInfo(ticket.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setSelectedTicket(null)}
                className="mb-4"
              >
                ← Back to Tickets
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{ticket.subject}</h2>
                <Badge className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
                <Badge className={statusInfo.color}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusInfo.label}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Ticket #{ticket.id}</span>
                <span>Created {formatDate(ticket.createdAt)}</span>
                <span>Updated {formatDate(ticket.updatedAt)}</span>
                <span>
                  {categories.find((c) => c.value === ticket.category)?.label}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{ticket.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversation */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ticket.responses.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No responses yet. Our support team will respond soon.
              </div>
            ) : (
              ticket.responses.map((response) => (
                <div key={response.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{response.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {response.authorRole === "admin"
                            ? "Admin Support"
                            : "You"}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(response.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{response.message}</p>
                </div>
              ))
            )}

            {/* Response Form */}
            {ticket.status !== "closed" && (
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <Label>Add Response</Label>
                  <Textarea
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleSubmitResponse(ticket.id)}
                      disabled={!responseMessage.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  if (selectedTicket) {
    return <TicketDetailView />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Support & Communication</h2>
        <p className="text-muted-foreground">
          Get help from our admin team or submit queries about your account
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="create">Create Ticket</TabsTrigger>
          <TabsTrigger value="tickets">
            My Tickets ({tickets.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <CreateTicketTab />
        </TabsContent>

        <TabsContent value="tickets">
          <TicketsListTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PartnerSupport;
