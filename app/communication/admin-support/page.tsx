"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Textarea } from '@/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Separator } from '@/ui/separator'
import {
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  MoreVertical,
  User,
  Calendar,
  Building2,
  Handshake,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import { toast } from 'sonner'

// Types
interface SupportTicket {
  id: string
  subject: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  source: 'partner' | 'institute'
  submittedBy: string
  organizationName: string
  createdAt: string
  updatedAt: string
  responses: TicketResponse[]
  attachments?: string[]
}

interface TicketResponse {
  id: string
  message: string
  author: string
  authorRole: 'partner' | 'institute' | 'admin'
  timestamp: string
  attachments?: string[]
}

 function AdminSupportPanel() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [responseMessage, setResponseMessage] = useState('')

  // Mock data combining partner and institute tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      subject: 'Payment Gateway Integration Issue',
      description: 'We are experiencing difficulties with the payment gateway when purchasing courses for our students. The transaction gets stuck at the payment confirmation step.',
      category: 'payment',
      priority: 'high',
      status: 'open',
      source: 'partner',
      submittedBy: 'John Smith',
      organizationName: 'TechCorp Education Partners',
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22',
      responses: []
    },
    {
      id: '2',
      subject: 'Course Approval Process Clarification',
      description: 'We have submitted several courses for approval but are not sure about the review timeline. Could you please clarify the approval process and expected waiting time?',
      category: 'course-management',
      priority: 'medium',
      status: 'resolved',
      source: 'institute',
      submittedBy: 'Dr. Sarah Johnson',
      organizationName: 'Digital Learning Institute',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-20',
      responses: [
        {
          id: '1',
          message: 'Thank you for your inquiry. Course approval typically takes 3-5 business days. Our review team checks curriculum quality, instructor qualifications, and compliance with educational standards.',
          author: 'Admin Support Team',
          authorRole: 'admin',
          timestamp: '2024-01-19T10:30:00Z'
        },
        {
          id: '2',
          message: 'Thank you for the clarification. This helps us set proper expectations for our course submissions.',
          author: 'Dr. Sarah Johnson',
          authorRole: 'institute',
          timestamp: '2024-01-19T14:15:00Z'
        }
      ]
    },
    {
      id: '3',
      subject: 'Student Enrollment Limit Issue',
      description: 'We are unable to enroll more than 50 students in our courses even though our institute plan should allow 200 students. Please help resolve this limitation.',
      category: 'account',
      priority: 'high',
      status: 'in-progress',
      source: 'institute',
      submittedBy: 'Prof. Michael Chen',
      organizationName: 'Advanced Tech University',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-21',
      responses: [
        {
          id: '3',
          message: 'Thank you for reporting this issue. I have escalated this to our technical team to review your account settings and enrollment limits.',
          author: 'Admin Support Team',
          authorRole: 'admin',
          timestamp: '2024-01-21T09:00:00Z'
        }
      ]
    },
    {
      id: '4',
      subject: 'Export Feature for Student Progress Reports',
      description: 'How can I export student progress reports for our internal documentation? I cannot find the export option in the student tracking section.',
      category: 'feature-request',
      priority: 'low',
      status: 'resolved',
      source: 'partner',
      submittedBy: 'Emily Rodriguez',
      organizationName: 'Global Learning Solutions',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16',
      responses: [
        {
          id: '4',
          message: 'You can export student progress reports by going to Track Student → Select Student → Progress Tab → Export button (top right). The feature is available in both PDF and Excel formats.',
          author: 'Admin Support Team',
          authorRole: 'admin',
          timestamp: '2024-01-15T16:45:00Z'
        }
      ]
    },
    {
      id: '5',
      subject: 'Quiz Import Feature Request',
      description: 'It would be helpful to have a bulk import feature for quiz questions. Currently, we have to add each question manually which is time-consuming for courses with many assessments.',
      category: 'feature-request',
      priority: 'medium',
      status: 'open',
      source: 'institute',
      submittedBy: 'Dr. Lisa Wang',
      organizationName: 'Innovation Academy',
      createdAt: '2024-01-21',
      updatedAt: '2024-01-21',
      responses: []
    }
  ])

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
  ]

  const statuses = [
    { value: 'open', label: 'Open', icon: Clock, color: 'bg-blue-100 text-blue-800' },
    { value: 'in-progress', label: 'In Progress', icon: RefreshCw, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'resolved', label: 'Resolved', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    { value: 'closed', label: 'Closed', icon: XCircle, color: 'bg-gray-100 text-gray-800' }
  ]

  const categories = [
    'technical', 'payment', 'feature-request', 'account', 'course-management', 
    'student-management', 'staff-management', 'quiz-assessment', 'billing', 'other'
  ]

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchesSource = sourceFilter === 'all' || ticket.source === sourceFilter
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesSource && matchesPriority
  })

  // Get statistics
  const getTicketStats = () => {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in-progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      urgent: tickets.filter(t => t.priority === 'urgent').length,
      partner: tickets.filter(t => t.source === 'partner').length,
      institute: tickets.filter(t => t.source === 'institute').length
    }
  }

  const stats = getTicketStats()

  // Handle ticket status update
  const updateTicketStatus = (ticketId: string, newStatus: 'open' | 'in-progress' | 'resolved' | 'closed') => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : ticket
    ))
    toast.success(`Ticket status updated to ${newStatus}`)
  }

  // Handle admin response
  const handleAdminResponse = (ticketId: string) => {
    if (!responseMessage.trim()) {
      toast.error('Please enter a response message')
      return
    }

    const response: TicketResponse = {
      id: Date.now().toString(),
      message: responseMessage,
      author: 'Admin Support Team',
      authorRole: 'admin',
      timestamp: new Date().toISOString()
    }

    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            responses: [...ticket.responses, response],
            updatedAt: new Date().toISOString().split('T')[0],
            status: ticket.status === 'open' ? 'in-progress' : ticket.status
          }
        : ticket
    ))

    setResponseMessage('')
    toast.success('Response sent successfully!')
  }

  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    return priorities.find(p => p.value === priority)?.color || 'bg-gray-100 text-gray-800'
  }

  // Get status badge color and icon
  const getStatusInfo = (status: string) => {
    return statuses.find(s => s.value === status) || statuses[0]
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Ticket Detail View
  const TicketDetailView = () => {
    const ticket = tickets.find(t => t.id === selectedTicket)
    if (!ticket) return null

    const statusInfo = getStatusInfo(ticket.status)
    const StatusIcon = statusInfo.icon

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
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Tickets
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{ticket.subject}</h2>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {statuses.map(status => (
                        <DropdownMenuItem 
                          key={status.value}
                          onClick={() => updateTicketStatus(ticket.id, status.value as any)}
                        >
                          <status.icon className="h-4 w-4 mr-2" />
                          {status.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={getPriorityColor(ticket.priority)}>
                  {ticket.priority}
                </Badge>
                <Badge className={statusInfo.color}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusInfo.label}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {ticket.source === 'partner' ? (
                    <Handshake className="h-3 w-3" />
                  ) : (
                    <Building2 className="h-3 w-3" />
                  )}
                  {ticket.source}
                </Badge>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>Ticket #{ticket.id}</span>
                <span>Created {formatDate(ticket.createdAt)}</span>
                <span>Updated {formatDate(ticket.updatedAt)}</span>
                <span>{ticket.organizationName}</span>
                <span>by {ticket.submittedBy}</span>
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
            <CardTitle>Conversation ({ticket.responses.length + 1} messages)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Original Ticket */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    {ticket.source === 'partner' ? (
                      <Handshake className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Building2 className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{ticket.submittedBy}</p>
                    <p className="text-xs text-muted-foreground">
                      {ticket.organizationName} • {ticket.source}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(ticket.createdAt)}
                </span>
              </div>
              <p className="text-sm">{ticket.description}</p>
            </div>

            {/* Responses */}
            {ticket.responses.map(response => (
              <div key={response.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      response.authorRole === 'admin' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      {response.authorRole === 'admin' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : response.authorRole === 'partner' ? (
                        <Handshake className="h-4 w-4" />
                      ) : (
                        <Building2 className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{response.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {response.authorRole === 'admin' ? 'Admin Support' : 
                         response.authorRole === 'partner' ? 'Partner' : 'Institute'}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(response.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm">{response.message}</p>
              </div>
            ))}

            {/* Admin Response Form */}
            {ticket.status !== 'closed' && (
              <div className="border-t pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <Label className="font-medium">Admin Response</Label>
                  </div>
                  <Textarea
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Type your response here..."
                    rows={4}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      This response will be sent to {ticket.submittedBy} at {ticket.organizationName}
                    </p>
                    <Button 
                      onClick={() => handleAdminResponse(ticket.id)}
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
    )
  }

  if (selectedTicket) {
    return <TicketDetailView />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Support Ticket Management</h2>
        <p className="text-muted-foreground">
          Manage and respond to support requests from partners and institutes
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tickets</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
                <p className="text-2xl font-bold text-blue-600">{stats.open}</p>
              </div>
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
              </div>
              <RefreshCw className="h-6 w-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 flex-wrap">
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
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="partner">Partners</SelectItem>
                  <SelectItem value="institute">Institutes</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  {priorities.map(priority => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredTickets.length} of {tickets.length} tickets
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No Support Tickets Found</h3>
              <p className="text-muted-foreground">
                No tickets match your current filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTickets.map(ticket => {
            const statusInfo = getStatusInfo(ticket.status)
            const StatusIcon = statusInfo.icon
            
            return (
              <Card key={ticket.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6" onClick={() => setSelectedTicket(ticket.id)}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {ticket.source === 'partner' ? (
                            <Handshake className="h-3 w-3" />
                          ) : (
                            <Building2 className="h-3 w-3" />
                          )}
                          {ticket.source}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {ticket.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{ticket.organizationName}</span>
                        <span>by {ticket.submittedBy}</span>
                        <span>{ticket.responses.length} responses</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedTicket(ticket.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {statuses.map(status => (
                          <DropdownMenuItem 
                            key={status.value}
                            onClick={() => updateTicketStatus(ticket.id, status.value as any)}
                          >
                            <status.icon className="h-4 w-4 mr-2" />
                            Mark as {status.label}
                          </DropdownMenuItem>
                        ))}
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
                        Last updated {formatDate(ticket.updatedAt)}
                      </span>
                    </div>
                    <Badge className={statusInfo.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
export default AdminSupportPanel