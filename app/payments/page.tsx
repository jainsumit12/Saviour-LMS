"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import { Separator } from '@/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import {
  Search,
  Filter,
  Download,
  Eye,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Building2,
  User,
  BookOpen,
  Receipt,
  FileText,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Banknote,
  PiggyBank,
  Activity,
  Printer
} from 'lucide-react'
import { toast } from 'sonner'

interface Payment {
  id: string
  orderId: string
  transactionId: string
  partnerId: string
  partnerName: string
  partnerEmail: string
  studentId: string
  studentName: string
  studentEmail: string
  courseId: string
  courseTitle: string
  instituteName: string
  instructor: string
  amount: number
  currency: string
  paymentMethod: 'card' | 'paypal' | 'bank_transfer' | 'wallet'
  paymentMethodDetails: string
  status: 'completed' | 'pending' | 'failed' | 'refunded' | 'disputed'
  processingFee: number
  netAmount: number
  commissionRate: number
  commissionAmount: number
  createdAt: string
  completedAt?: string
  failureReason?: string
  refundReason?: string
  refundAmount?: number
  notes?: string
}

// Mock payment data
const mockPayments: Payment[] = [
  {
    id: '1',
    orderId: 'ORD-2024-001',
    transactionId: 'TXN-ABC123XYZ',
    partnerId: 'partner-1',
    partnerName: 'EduPartner Global',
    partnerEmail: 'contact@edupartner.com',
    studentId: 'student-1',
    studentName: 'Alice Johnson',
    studentEmail: 'alice.johnson@email.com',
    courseId: 'course-1',
    courseTitle: 'Full Stack Web Development Bootcamp',
    instituteName: 'Tech Academy Institute',
    instructor: 'Dr. Sarah Johnson',
    amount: 2999,
    currency: 'USD',
    paymentMethod: 'card',
    paymentMethodDetails: '**** **** **** 4242',
    status: 'completed',
    processingFee: 87,
    netAmount: 2912,
    commissionRate: 15,
    commissionAmount: 450,
    createdAt: '2024-01-25T10:30:00Z',
    completedAt: '2024-01-25T10:31:15Z'
  },
  {
    id: '2',
    orderId: 'ORD-2024-002',
    transactionId: 'TXN-DEF456UVW',
    partnerId: 'partner-2',
    partnerName: 'Learning Solutions Ltd',
    partnerEmail: 'admin@learningsolutions.com',
    studentId: 'student-2',
    studentName: 'Michael Chen',
    studentEmail: 'michael.chen@email.com',
    courseId: 'course-2',
    courseTitle: 'Digital Marketing Mastery',
    instituteName: 'Business Skills Institute',
    instructor: 'Mark Thompson',
    amount: 1999,
    currency: 'USD',
    paymentMethod: 'paypal',
    paymentMethodDetails: 'michael.chen@email.com',
    status: 'completed',
    processingFee: 58,
    netAmount: 1941,
    commissionRate: 12,
    commissionAmount: 240,
    createdAt: '2024-01-24T14:20:00Z',
    completedAt: '2024-01-24T14:21:08Z'
  },
  {
    id: '3',
    orderId: 'ORD-2024-003',
    transactionId: 'TXN-GHI789RST',
    partnerId: 'partner-1',
    partnerName: 'EduPartner Global',
    partnerEmail: 'contact@edupartner.com',
    studentId: 'student-3',
    studentName: 'Sarah Williams',
    studentEmail: 'sarah.williams@email.com',
    courseId: 'course-3',
    courseTitle: 'Data Science Fundamentals',
    instituteName: 'DataTech Academy',
    instructor: 'Dr. Emily Chen',
    amount: 3499,
    currency: 'USD',
    paymentMethod: 'card',
    paymentMethodDetails: '**** **** **** 1234',
    status: 'pending',
    processingFee: 105,
    netAmount: 3394,
    commissionRate: 15,
    commissionAmount: 525,
    createdAt: '2024-01-24T09:15:00Z'
  },
  {
    id: '4',
    orderId: 'ORD-2024-004',
    transactionId: 'TXN-JKL012MNO',
    partnerId: 'partner-3',
    partnerName: 'SkillBridge Academy',
    partnerEmail: 'info@skillbridge.edu',
    studentId: 'student-4',
    studentName: 'James Rodriguez',
    studentEmail: 'james.rodriguez@email.com',
    courseId: 'course-4',
    courseTitle: 'UX/UI Design Masterclass',
    instituteName: 'Creative Design Academy',
    instructor: 'Alex Rodriguez',
    amount: 2499,
    currency: 'USD',
    paymentMethod: 'bank_transfer',
    paymentMethodDetails: 'Bank of America ****1567',
    status: 'failed',
    processingFee: 0,
    netAmount: 0,
    commissionRate: 12,
    commissionAmount: 0,
    createdAt: '2024-01-23T16:45:00Z',
    failureReason: 'Insufficient funds'
  },
  {
    id: '5',
    orderId: 'ORD-2024-005',
    transactionId: 'TXN-PQR345STU',
    partnerId: 'partner-2',
    partnerName: 'Learning Solutions Ltd',
    partnerEmail: 'admin@learningsolutions.com',
    studentId: 'student-5',
    studentName: 'Emma Taylor',
    studentEmail: 'emma.taylor@email.com',
    courseId: 'course-1',
    courseTitle: 'Full Stack Web Development Bootcamp',
    instituteName: 'Tech Academy Institute',
    instructor: 'Dr. Sarah Johnson',
    amount: 2999,
    currency: 'USD',
    paymentMethod: 'card',
    paymentMethodDetails: '**** **** **** 9876',
    status: 'refunded',
    processingFee: 87,
    netAmount: 2912,
    commissionRate: 15,
    commissionAmount: 450,
    createdAt: '2024-01-22T11:30:00Z',
    completedAt: '2024-01-22T11:31:22Z',
    refundReason: 'Student requested refund within 7 days',
    refundAmount: 2999
  }
]

 function PaymentManagement() {
  const [payments] = useState<Payment[]>(mockPayments)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all')
  const [partnerFilter, setPartnerFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    const matchesPaymentMethod = paymentMethodFilter === 'all' || payment.paymentMethod === paymentMethodFilter
    const matchesPartner = partnerFilter === 'all' || payment.partnerId === partnerFilter
    
    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesPartner
  })

  const handleDownloadInvoice = (payment: Payment) => {
    // Check if payment is eligible for invoice download
    if (payment.status === 'pending' || payment.status === 'failed') {
      toast.error('Invoice not available for pending or failed payments')
      return
    }

    // Simulate invoice generation and download
    toast.success('Generating invoice...')
    
    // Create a mock invoice content
    const invoiceContent = `
PAYMENT INVOICE - ${payment.orderId}
=====================================

Company: Saviour EduTech
Date: ${new Date().toLocaleDateString()}
Invoice #: INV-${payment.orderId}

Bill To:
${payment.partnerName}
${payment.partnerEmail}

Transaction Details:
- Order ID: ${payment.orderId}
- Transaction ID: ${payment.transactionId}
- Date: ${new Date(payment.createdAt).toLocaleDateString()}
- Status: ${payment.status.toUpperCase()}

Course Information:
- Course: ${payment.courseTitle}
- Institute: ${payment.instituteName}
- Instructor: ${payment.instructor}
- Student: ${payment.studentName}

Payment Summary:
- Course Amount: ${formatCurrency(payment.amount)}
- Processing Fee: ${formatCurrency(payment.processingFee)}
- Commission (${payment.commissionRate}%): ${formatCurrency(payment.commissionAmount)}
- Net Amount: ${formatCurrency(payment.netAmount)}

Payment Method: ${getPaymentMethodName(payment.paymentMethod)}
Payment Details: ${payment.paymentMethodDetails}

Thank you for your business!
    `

    // Create and download the invoice file
    const blob = new Blob([invoiceContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice-${payment.orderId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Invoice downloaded successfully!')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-300"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-700 border-red-300"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>
      case 'refunded':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300"><RefreshCw className="h-3 w-3 mr-1" />Refunded</Badge>
      case 'disputed':
        return <Badge className="bg-orange-100 text-orange-700 border-orange-300"><AlertCircle className="h-3 w-3 mr-1" />Disputed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="h-4 w-4" />
      case 'paypal':
        return <Wallet className="h-4 w-4" />
      case 'bank_transfer':
        return <Banknote className="h-4 w-4" />
      case 'wallet':
        return <PiggyBank className="h-4 w-4" />
      default:
        return <DollarSign className="h-4 w-4" />
    }
  }

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card'
      case 'paypal':
        return 'PayPal'
      case 'bank_transfer':
        return 'Bank Transfer'
      case 'wallet':
        return 'Digital Wallet'
      default:
        return method
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  // Calculate summary statistics
  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)
  const totalCommissions = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.commissionAmount, 0)
  const totalProcessingFees = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.processingFee, 0)
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)

  const uniquePartners = Array.from(new Set(payments.map(p => p.partnerId)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Payment Management</h1>
          <p className="text-muted-foreground">
            Monitor all course purchases and transaction history
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Receipt className="w-4 h-4 mr-2" />
            Generate Invoice
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
                <p className="text-2xl font-semibold">{formatCurrency(pendingAmount)}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              {payments.filter(p => p.status === 'pending').length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Commissions</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalCommissions)}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <PiggyBank className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Average 14% commission
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing Fees</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalProcessingFees)}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              2.9% average fee rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by order ID, partner, student, or course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="wallet">Digital Wallet</SelectItem>
              </SelectContent>
            </Select>
            <Select value={partnerFilter} onValueChange={setPartnerFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Partners" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Partners</SelectItem>
                {uniquePartners.map(partnerId => {
                  const partner = payments.find(p => p.partnerId === partnerId)
                  return (
                    <SelectItem key={partnerId} value={partnerId}>
                      {partner?.partnerName}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>
            Showing {filteredPayments.length} of {payments.length} payments
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Details</TableHead>
                <TableHead>Partner & Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{payment.orderId}</p>
                      <p className="text-sm text-muted-foreground">{payment.transactionId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{payment.partnerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{payment.studentName}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{payment.courseTitle}</p>
                      <p className="text-xs text-muted-foreground">{payment.instituteName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{formatCurrency(payment.amount)}</p>
                      {payment.status === 'completed' && (
                        <p className="text-xs text-muted-foreground">
                          Net: {formatCurrency(payment.netAmount)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                      <div>
                        <p className="text-sm font-medium">{getPaymentMethodName(payment.paymentMethod)}</p>
                        <p className="text-xs text-muted-foreground">{payment.paymentMethodDetails}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(payment.status)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{formatDate(payment.createdAt)}</p>
                      {payment.completedAt && (
                        <p className="text-xs text-muted-foreground">
                          Completed: {formatDate(payment.completedAt)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedPayment(payment)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Payment Details - {payment.orderId}</DialogTitle>
                          </DialogHeader>
                          
                          {selectedPayment && (
                            <div className="space-y-6">
                              {/* Transaction Info */}
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <h4 className="font-medium mb-3">Transaction Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Order ID:</span>
                                      <span className="font-mono">{selectedPayment.orderId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Transaction ID:</span>
                                      <span className="font-mono">{selectedPayment.transactionId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Status:</span>
                                      {getStatusBadge(selectedPayment.status)}
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Created:</span>
                                      <span>{formatDate(selectedPayment.createdAt)}</span>
                                    </div>
                                    {selectedPayment.completedAt && (
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Completed:</span>
                                        <span>{formatDate(selectedPayment.completedAt)}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-3">Payment Method</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                      {getPaymentMethodIcon(selectedPayment.paymentMethod)}
                                      <span>{getPaymentMethodName(selectedPayment.paymentMethod)}</span>
                                    </div>
                                    <p className="text-muted-foreground">{selectedPayment.paymentMethodDetails}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              {/* Partner & Student Info */}
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <h4 className="font-medium mb-3">Partner Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Partner:</span>
                                      <span>{selectedPayment.partnerName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Email:</span>
                                      <span>{selectedPayment.partnerEmail}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-3">Student Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Student:</span>
                                      <span>{selectedPayment.studentName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Email:</span>
                                      <span>{selectedPayment.studentEmail}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              {/* Course Info */}
                              <div>
                                <h4 className="font-medium mb-3">Course Information</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Course:</span>
                                    <span>{selectedPayment.courseTitle}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Institute:</span>
                                    <span>{selectedPayment.instituteName}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Instructor:</span>
                                    <span>{selectedPayment.instructor}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              {/* Financial Breakdown */}
                              <div>
                                <h4 className="font-medium mb-3">Financial Breakdown</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Course Amount:</span>
                                    <span>{formatCurrency(selectedPayment.amount)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Processing Fee:</span>
                                    <span>-{formatCurrency(selectedPayment.processingFee)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Commission ({selectedPayment.commissionRate}%):</span>
                                    <span>-{formatCurrency(selectedPayment.commissionAmount)}</span>
                                  </div>
                                  <Separator />
                                  <div className="flex justify-between font-medium">
                                    <span>Net Amount:</span>
                                    <span>{formatCurrency(selectedPayment.netAmount)}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Additional Info */}
                              {(selectedPayment.failureReason || selectedPayment.refundReason) && (
                                <>
                                  <Separator />
                                  <div>
                                    <h4 className="font-medium mb-3">Additional Information</h4>
                                    {selectedPayment.failureReason && (
                                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm text-red-800">
                                          <strong>Failure Reason:</strong> {selectedPayment.failureReason}
                                        </p>
                                      </div>
                                    )}
                                    {selectedPayment.refundReason && (
                                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                          <strong>Refund Reason:</strong> {selectedPayment.refundReason}
                                        </p>
                                        {selectedPayment.refundAmount && (
                                          <p className="text-sm text-blue-800 mt-1">
                                            <strong>Refund Amount:</strong> {formatCurrency(selectedPayment.refundAmount)}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}

                              {/* Modal Actions */}
                              <div className="flex justify-end gap-2 pt-4 border-t">
                                <Button
                                  variant="outline"
                                  onClick={() => handleDownloadInvoice(selectedPayment)}
                                  disabled={selectedPayment.status === 'pending' || selectedPayment.status === 'failed'}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Invoice
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => window.print()}
                                >
                                  <Printer className="h-4 w-4 mr-2" />
                                  Print
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadInvoice(payment)}
                        disabled={payment.status === 'pending' || payment.status === 'failed'}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredPayments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Payments Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
export default PaymentManagement;