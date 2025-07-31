"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { Badge } from '@/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Textarea } from '@/ui/textarea'
import { Checkbox } from '@/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Separator } from '@/ui/separator'

import { 
  Send, 
  Mail, 
  Users, 
  MessageSquare, 
  Clock,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  User,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Building2,
  Bell,
  X,
  ExternalLink,
  UserCheck,
  GraduationCap,
  Award
} from 'lucide-react'
import { toast } from 'sonner'

interface EmailCampaign {
  id: string
  subject: string
  status: 'draft' | 'scheduled' | 'sent' | 'failed'
  recipients: number
  openRate?: number
  clickRate?: number
  createdAt: string
  scheduledAt?: string
  sentAt?: string
}

interface Notification {
  id: string
  type: 'institute' | 'student' | 'system' | 'partner'
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high' | 'urgent'
  actionUrl?: string
  relatedEntity?: {
    id: string
    name: string
    type: string
  }
}

// Mock data
const mockCampaigns: EmailCampaign[] = [
  {
    id: '1',
    subject: 'Welcome to Our New Course Catalog',
    status: 'sent',
    recipients: 1250,
    openRate: 68.5,
    clickRate: 24.3,
    createdAt: '2024-01-15',
    sentAt: '2024-01-16'
  },
  {
    id: '2',
    subject: 'Certificate Award Notifications',
    status: 'sent',
    recipients: 89,
    openRate: 85.2,
    clickRate: 67.4,
    createdAt: '2024-01-10',
    sentAt: '2024-01-12'
  },
  {
    id: '3',
    subject: 'Monthly Newsletter - January 2024',
    status: 'scheduled',
    recipients: 2100,
    createdAt: '2024-01-08',
    scheduledAt: '2024-02-01'
  },
  {
    id: '4',
    subject: 'Course Enrollment Reminders',
    status: 'draft',
    recipients: 0,
    createdAt: '2024-01-05'
  }
]

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'institute',
    title: 'New Institute Registration',
    message: 'Digital Learning Hub has submitted their registration application for review.',
    timestamp: '2024-01-20T10:30:00Z',
    read: false,
    priority: 'high',
    actionUrl: '/institutes/pending-approval',
    relatedEntity: {
      id: '25',
      name: 'Digital Learning Hub',
      type: 'institute'
    }
  },
  {
    id: '2',
    type: 'institute',
    title: 'Institute Profile Updated',
    message: 'Massachusetts Institute of Technology has updated their contact information and course catalog.',
    timestamp: '2024-01-20T09:15:00Z',
    read: false,
    priority: 'medium',
    relatedEntity: {
      id: '1',
      name: 'Massachusetts Institute of Technology',
      type: 'institute'
    }
  },
  {
    id: '3',
    type: 'institute',
    title: 'Institute Verification Required',
    message: 'European Business School requires document verification to complete their registration.',
    timestamp: '2024-01-19T16:45:00Z',
    read: false,
    priority: 'urgent',
    actionUrl: '/institutes/pending-approval',
    relatedEntity: {
      id: '12',
      name: 'European Business School',
      type: 'institute'
    }
  },
  {
    id: '4',
    type: 'institute',
    title: 'Course Catalog Submission',
    message: 'Tokyo Institute of Technology has submitted 12 new courses for approval.',
    timestamp: '2024-01-19T14:20:00Z',
    read: true,
    priority: 'medium',
    relatedEntity: {
      id: '13',
      name: 'Tokyo Institute of Technology',
      type: 'institute'
    }
  },
  {
    id: '5',
    type: 'institute',
    title: 'Partnership Agreement Renewal',
    message: 'Stanford University partnership agreement is due for renewal in 30 days.',
    timestamp: '2024-01-19T11:30:00Z',
    read: false,
    priority: 'medium',
    relatedEntity: {
      id: '2',
      name: 'Stanford University',
      type: 'institute'
    }
  },
  {
    id: '6',
    type: 'institute',
    title: 'Quality Assurance Review Completed',
    message: 'Australian National University has successfully completed their annual quality review.',
    timestamp: '2024-01-18T13:45:00Z',
    read: true,
    priority: 'low',
    relatedEntity: {
      id: '8',
      name: 'Australian National University',
      type: 'institute'
    }
  }
]

function Communication() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [emailSubject, setEmailSubject] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [showComposeDialog, setShowComposeDialog] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Sent</Badge>
      case 'scheduled':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive" className="text-xs">Urgent</Badge>
      case 'high':
        return <Badge className="bg-orange-50 text-orange-700 border-orange-200 text-xs">High</Badge>
      case 'medium':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">Medium</Badge>
      case 'low':
        return <Badge variant="secondary" className="text-xs">Low</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{priority}</Badge>
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'institute':
        return <Building2 className="h-4 w-4 text-blue-500" />
      case 'student':
        return <UserCheck className="h-4 w-4 text-green-500" />
      case 'system':
        return <Bell className="h-4 w-4 text-purple-500" />
      case 'partner':
        return <Users className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })))
    toast.success('All notifications marked as read')
  }

  const handleSendEmail = () => {
    if (!emailSubject || !emailContent || selectedRecipients.length === 0) {
      toast.error('Please fill in all required fields')
      return
    }

    const newCampaign: EmailCampaign = {
      id: Date.now().toString(),
      subject: emailSubject,
      status: 'sent',
      recipients: selectedRecipients.length,
      createdAt: new Date().toISOString().split('T')[0],
      sentAt: new Date().toISOString().split('T')[0]
    }

    setCampaigns(prev => [newCampaign, ...prev])
    setEmailSubject('')
    setEmailContent('')
    setSelectedRecipients([])
    setShowComposeDialog(false)
    toast.success('Email sent successfully!')
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) {
      return 'Just now'
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Stats calculations
  const totalEmailsSent = campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + c.recipients, 0)
  const totalRecipients = new Set(campaigns.flatMap(c => Array.from({length: c.recipients}, (_, i) => `recipient-${c.id}-${i}`))).size
  const averageOpenRate = campaigns
    .filter(c => c.openRate !== undefined)
    .reduce((sum, c, _, arr) => sum + (c.openRate || 0) / arr.length, 0)
  const unreadNotifications = notifications.filter(n => !n.read).length
  const activeInstitutes = 24 // Mock data for active institutes

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Communication Center</h2>
          <p className="text-muted-foreground">
            Send emails and manage notifications for institutes and students
          </p>
        </div>
        <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Compose Email
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Compose New Email</DialogTitle>
              <DialogDescription>
                Create and send emails to institutes, students, or partners
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-institutes">All Institutes</SelectItem>
                    <SelectItem value="active-institutes">Active Institutes</SelectItem>
                    <SelectItem value="pending-institutes">Pending Institutes</SelectItem>
                    <SelectItem value="all-students">All Students</SelectItem>
                    <SelectItem value="active-students">Active Students</SelectItem>
                    <SelectItem value="partners">Partners</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Email Template (Optional)</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome Email</SelectItem>
                    <SelectItem value="notification">General Notification</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter email subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Message *</Label>
                <Textarea
                  id="content"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  placeholder="Write your message here..."
                  rows={8}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowComposeDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendEmail}>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Emails Sent</p>
                <p className="text-2xl font-bold">{totalEmailsSent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Recipients</p>
                <p className="text-2xl font-bold">{totalRecipients.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-4 w-4 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg. Open Rate</p>
                <p className="text-2xl font-bold">{averageOpenRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Building2 className="h-4 w-4 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Institutes</p>
                <p className="text-2xl font-bold">{activeInstitutes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Bell className="h-4 w-4 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                <p className="text-2xl font-bold">{unreadNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Email Campaigns</TabsTrigger>
          <TabsTrigger value="notifications">
            Institute Notifications
            {unreadNotifications > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {unreadNotifications}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Recent Email Campaigns
                </CardTitle>
                <CardDescription>
                  Latest email campaigns and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {campaigns.slice(0, 3).map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{campaign.subject}</h4>
                        <p className="text-xs text-muted-foreground">
                          {campaign.recipients} recipients • {campaign.createdAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(campaign.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Institute Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Institute Notifications
                  </CardTitle>
                  <CardDescription>
                    Latest notifications from institutes
                  </CardDescription>
                </div>
                {unreadNotifications > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    Mark All Read
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 4).map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border rounded cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm truncate">{notification.title}</p>
                            {getPriorityBadge(notification.priority)}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {notification.relatedEntity && (
                              <span className="text-xs text-blue-600">
                                {notification.relatedEntity.name}
                              </span>
                            )}
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common communication tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Mail className="h-6 w-6" />
                  <span>Send Newsletter</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Bell className="h-6 w-6" />
                  <span>Institute Alerts</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span>Templates</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Users className="h-6 w-6" />
                  <span>Bulk Messages</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Campaigns</CardTitle>
                  <CardDescription>
                    Manage and track your email campaigns
                  </CardDescription>
                </div>
                <Button onClick={() => setShowComposeDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Click Rate</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.subject}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                      <TableCell>
                        {campaign.openRate ? `${campaign.openRate}%` : '-'}
                      </TableCell>
                      <TableCell>
                        {campaign.clickRate ? `${campaign.clickRate}%` : '-'}
                      </TableCell>
                      <TableCell>
                        {campaign.sentAt || campaign.scheduledAt || campaign.createdAt}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Institute Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Institute Notifications</CardTitle>
                <CardDescription>
                  Stay updated with institute activities and requirements
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {unreadNotifications > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    Mark All Read
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white rounded-lg border">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          {getPriorityBadge(notification.priority)}
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {notification.relatedEntity && (
                              <div className="flex items-center gap-1 text-xs text-blue-600">
                                <Building2 className="h-3 w-3" />
                                {notification.relatedEntity.name}
                              </div>
                            )}
                          </div>
                          {notification.actionUrl && (
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Communication