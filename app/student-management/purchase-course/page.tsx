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
import { Progress } from "@/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Separator } from "@/ui/separator";
import { Checkbox } from "@/ui/checkbox";

import { Alert, AlertDescription } from "@/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import {
  UserPlus,
  Search,
  Filter,
  Star,
  Users,
  Clock,
  DollarSign,
  BookOpen,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  X,
  Plus,
  Minus,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Award,
  Receipt,
  Download,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Shield,
  Lock,
  Banknote,
  Wallet,
  Grid3X3,
  List,
} from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";

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
  avatar?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  institute: {
    id: string;
    name: string;
    logo?: string;
  };
  instructor: string;
  category: string;
  duration: string;
  price: number;
  currency: string;
  rating: number;
  enrollments: number;
  maxStudents: number;
  level: "beginner" | "intermediate" | "advanced";
  tags: string[];
  image?: string;
}

interface CartItem {
  course: Course;
  quantity: number;
  studentId: string;
  studentName: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank_transfer" | "wallet";
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    type: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "paypal",
    type: "paypal",
    name: "PayPal",
    icon: Wallet,
    description: "Pay with your PayPal account",
  },
  {
    id: "bank_transfer",
    type: "bank_transfer",
    name: "Bank Transfer",
    icon: Banknote,
    description: "Direct bank transfer",
  },
];

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development Bootcamp",
    description:
      "Comprehensive course covering React, Node.js, MongoDB, and deployment strategies.",
    institute: {
      id: "inst1",
      name: "Tech Academy Institute",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Dr. Sarah Johnson",
    category: "Technology",
    duration: "16 weeks",
    price: 2999,
    currency: "USD",
    rating: 4.8,
    enrollments: 245,
    maxStudents: 300,
    level: "intermediate",
    tags: ["React", "Node.js", "MongoDB", "JavaScript"],
  },
  {
    id: "2",
    title: "Digital Marketing Mastery",
    description:
      "Learn modern digital marketing strategies, SEO, social media marketing, and analytics.",
    institute: {
      id: "inst2",
      name: "Business Skills Institute",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Mark Thompson",
    category: "Marketing",
    duration: "12 weeks",
    price: 1999,
    currency: "USD",
    rating: 4.6,
    enrollments: 189,
    maxStudents: 200,
    level: "beginner",
    tags: ["SEO", "Social Media", "Analytics", "Content Marketing"],
  },
  {
    id: "3",
    title: "Data Science Fundamentals",
    description:
      "Introduction to data analysis, statistics, machine learning, and Python programming.",
    institute: {
      id: "inst3",
      name: "DataTech Academy",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Dr. Emily Chen",
    category: "Data Science",
    duration: "20 weeks",
    price: 3499,
    currency: "USD",
    rating: 4.9,
    enrollments: 156,
    maxStudents: 150,
    level: "advanced",
    tags: ["Python", "Machine Learning", "Statistics", "Pandas"],
  },
  {
    id: "4",
    title: "UX/UI Design Masterclass",
    description:
      "Complete guide to user experience and interface design with hands-on projects.",
    institute: {
      id: "inst4",
      name: "Creative Design Academy",
      logo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop&crop=center",
    },
    instructor: "Alex Rodriguez",
    category: "Design",
    duration: "14 weeks",
    price: 2499,
    currency: "USD",
    rating: 4.7,
    enrollments: 178,
    maxStudents: 180,
    level: "intermediate",
    tags: ["Figma", "Sketch", "Prototyping", "User Research"],
  },
];

// Demo students data
const demoStudents: Student[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1995-03-15",
    address: "123 Main St, Apt 4B",
    city: "New York",
    country: "United States",
    emergencyContact: "Bob Johnson",
    emergencyPhone: "+1 (555) 123-4568",
    createdAt: "2024-01-15T10:30:00Z",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47b?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    dateOfBirth: "1992-07-22",
    address: "456 Oak Avenue",
    city: "San Francisco",
    country: "United States",
    emergencyContact: "Lisa Chen",
    emergencyPhone: "+1 (555) 234-5679",
    createdAt: "2024-01-10T09:15:00Z",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@email.com",
    phone: "+1 (555) 345-6789",
    dateOfBirth: "1998-11-08",
    address: "789 Pine Street",
    city: "Chicago",
    country: "United States",
    emergencyContact: "David Williams",
    emergencyPhone: "+1 (555) 345-6790",
    createdAt: "2024-01-20T11:45:00Z",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    firstName: "James",
    lastName: "Rodriguez",
    email: "james.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    dateOfBirth: "1990-05-12",
    address: "321 Elm Drive",
    city: "Miami",
    country: "United States",
    emergencyContact: "Maria Rodriguez",
    emergencyPhone: "+1 (555) 456-7891",
    createdAt: "2024-01-08T15:20:00Z",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "5",
    firstName: "Emma",
    lastName: "Taylor",
    email: "emma.taylor@email.com",
    phone: "+1 (555) 567-8901",
    dateOfBirth: "1996-09-30",
    address: "654 Maple Lane",
    city: "Seattle",
    country: "United States",
    emergencyContact: "John Taylor",
    emergencyPhone: "+1 (555) 567-8902",
    createdAt: "2024-01-12T08:30:00Z",
    avatar:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
  },
];

function PartnerStudentManagement() {
  const [activeTab, setActiveTab] = useState("purchase-courses");
  const [students] = useState<Student[]>(demoStudents); // Using demo students
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [coursesViewMode, setCoursesViewMode] = useState<"table" | "card">(
    "card"
  );

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    cardName: "",
    billingAddress: "",
    billingCity: "",
    billingCountry: "",
    billingZip: "",
  });

  // Check if a course is already in cart for the selected student
  const isCourseInCart = (courseId: string, studentId: string) => {
    return cart.some(
      (item) => item.course.id === courseId && item.studentId === studentId
    );
  };

  const addToCart = (course: Course, studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    // Check if course is already in cart for this student
    if (isCourseInCart(course.id, studentId)) {
      toast.error("Course is already in cart for this student");
      return;
    }

    const newItem: CartItem = {
      course,
      quantity: 1,
      studentId,
      studentName: `${student.firstName} ${student.lastName}`,
    };
    setCart((prev) => [...prev, newItem]);

    toast.success(
      `${course.title} added to cart for ${student.firstName} ${student.lastName}`
    );
  };

  const removeFromCart = (courseId: string, studentId: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.course.id === courseId && item.studentId === studentId)
      )
    );
  };

  const updateQuantity = (
    courseId: string,
    studentId: string,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) {
      removeFromCart(courseId, studentId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.course.id === courseId && item.studentId === studentId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.course.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.institute.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredStudents = students.filter(
    (student) =>
      student.firstName
        .toLowerCase()
        .includes(studentSearchQuery.toLowerCase()) ||
      student.lastName
        .toLowerCase()
        .includes(studentSearchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(studentSearchQuery.toLowerCase())
  );

  const categories = Array.from(
    new Set(mockCourses.map((course) => course.category))
  );

  const handlePayment = async () => {
    setPaymentProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      setCurrentStep(4);
      toast.success("Payment successful! Enrollments confirmed.");
    }, 3000);
  };

  const resetCart = () => {
    setCart([]);
    setCurrentStep(1);
    setPaymentSuccess(false);
    setSelectedPaymentMethod("");
    setPaymentForm({
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
      cardName: "",
      billingAddress: "",
      billingCity: "",
      billingCountry: "",
      billingZip: "",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({rating})</span>
      </div>
    );
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "beginner":
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            Beginner
          </Badge>
        );
      case "intermediate":
        return (
          <Badge className="bg-purple-50 text-purple-700 border-purple-200">
            Intermediate
          </Badge>
        );
      case "advanced":
        return (
          <Badge className="bg-orange-50 text-orange-700 border-orange-200">
            Advanced
          </Badge>
        );
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const renderCoursesCardView = () => (
    <div className="grid gap-4 md:grid-cols-2">
      {filteredCourses.map((course) => {
        const isInCart =
          selectedStudentId && isCourseInCart(course.id, selectedStudentId);

        return (
          <Card
            key={course.id}
            className={`hover:shadow-md transition-shadow ${
              isInCart ? "bg-green-50 border-green-200" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm leading-tight line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {course.category}
                      </p>
                    </div>
                  </div>
                  {isInCart && (
                    <Badge
                      variant="secondary"
                      className="text-green-700 bg-green-100 border-green-300"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Added
                    </Badge>
                  )}
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{course.institute.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">${course.price}</span>
                  </div>
                  {renderStars(course.rating)}
                </div>

                <div className="flex items-center gap-1">
                  {getLevelBadge(course.level)}
                </div>

                <div className="pt-2 border-t">
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      selectedStudentId && addToCart(course, selectedStudentId)
                    }
                    // disabled={!selectedStudentId || isInCart}
                    variant={isInCart ? "secondary" : "default"}
                  >
                    {isInCart ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <Plus className="h-3 w-3 mr-1" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderCoursesTableView = () => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Institute</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => {
              const isInCart =
                selectedStudentId &&
                isCourseInCart(course.id, selectedStudentId);

              return (
                <TableRow
                  key={course.id}
                  className={isInCart ? "bg-green-50" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{course.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.category}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{course.institute.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{course.instructor}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{course.duration}</span>
                  </TableCell>
                  <TableCell>{getLevelBadge(course.level)}</TableCell>
                  <TableCell>
                    <span className="font-medium">${course.price}</span>
                  </TableCell>
                  <TableCell>{renderStars(course.rating)}</TableCell>
                  <TableCell>
                    {isInCart ? (
                      <Badge
                        variant="secondary"
                        className="text-green-700 bg-green-100 border-green-300"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        In Cart
                      </Badge>
                    ) : (
                      <Badge variant="outline">Available</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant={isInCart ? "secondary" : "outline"}
                      onClick={() =>
                        selectedStudentId &&
                        addToCart(course, selectedStudentId)
                      }
                      // disabled={!selectedStudentId || isInCart}
                    >
                      {isInCart ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderPaymentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Review Your Order</h3>
              <p className="text-muted-foreground">
                Confirm your course selections and student enrollments
              </p>
            </div>

            <div className="space-y-4">
              {cart.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.course.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Student: {item.studentName} •{" "}
                          {item.course.institute.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.course.duration} • {item.course.instructor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(
                              item.course.id,
                              item.studentId,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(
                              item.course.id,
                              item.studentId,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          $
                          {(item.course.price * item.quantity).toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeFromCart(item.course.id, item.studentId)
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({getCartItemCount()} items)</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>$0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("purchase-courses")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Button>
              <Button onClick={() => setCurrentStep(2)}>
                Continue to Payment
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Select Payment Method
              </h3>
              <p className="text-muted-foreground">
                Choose how you'd like to pay for the courses
              </p>
            </div>

            <RadioGroup
              value={selectedPaymentMethod}
              onValueChange={setSelectedPaymentMethod}
            >
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label
                      htmlFor={method.id}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div className="p-2 bg-muted rounded-lg">
                        <method.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Review
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!selectedPaymentMethod}
              >
                Continue to Payment Details
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
              <p className="text-muted-foreground">
                Enter your payment information securely
              </p>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your payment information is encrypted and secure. We don't store
                your card details.
              </AlertDescription>
            </Alert>

            {selectedPaymentMethod === "card" && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentForm.cardNumber}
                      onChange={(e) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          cardNumber: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={paymentForm.cardName}
                      onChange={(e) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          cardName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      placeholder="MM/YY"
                      value={paymentForm.cardExpiry}
                      onChange={(e) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          cardExpiry: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCVC">CVC</Label>
                    <Input
                      id="cardCVC"
                      placeholder="123"
                      value={paymentForm.cardCVC}
                      onChange={(e) =>
                        setPaymentForm((prev) => ({
                          ...prev,
                          cardCVC: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Billing Address</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="billingAddress">Address</Label>
                      <Input
                        id="billingAddress"
                        placeholder="123 Main St"
                        value={paymentForm.billingAddress}
                        onChange={(e) =>
                          setPaymentForm((prev) => ({
                            ...prev,
                            billingAddress: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingCity">City</Label>
                      <Input
                        id="billingCity"
                        placeholder="New York"
                        value={paymentForm.billingCity}
                        onChange={(e) =>
                          setPaymentForm((prev) => ({
                            ...prev,
                            billingCity: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingCountry">Country</Label>
                      <Select
                        value={paymentForm.billingCountry}
                        onValueChange={(value) =>
                          setPaymentForm((prev) => ({
                            ...prev,
                            billingCountry: value,
                          }))
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
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="billingZip">ZIP Code</Label>
                      <Input
                        id="billingZip"
                        placeholder="10001"
                        value={paymentForm.billingZip}
                        onChange={(e) =>
                          setPaymentForm((prev) => ({
                            ...prev,
                            billingZip: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedPaymentMethod === "paypal" && (
              <div className="text-center py-8">
                <Wallet className="h-12 w-12 mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground mb-4">
                  You'll be redirected to PayPal to complete your payment
                </p>
              </div>
            )}

            {selectedPaymentMethod === "bank_transfer" && (
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Bank transfer instructions will be provided after order
                    confirmation.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount</span>
                  <span className="text-2xl font-bold">
                    ${getCartTotal().toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Payment Method
              </Button>
              <Button onClick={handlePayment} disabled={paymentProcessing}>
                {paymentProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Pay ${getCartTotal().toLocaleString()}
                  </>
                )}
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Payment Successful!
              </h3>
              <p className="text-muted-foreground">
                Your courses have been purchased and students have been
                enrolled.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Order ID</span>
                    <span className="font-mono">ORD-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="capitalize">
                      {selectedPaymentMethod.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Paid</span>
                    <span className="font-semibold">
                      ${getCartTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students Enrolled</span>
                    <span>{cart.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-center">
              <Button variant="outline">
                <Receipt className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button onClick={resetCart}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Start New Order
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Student Management</h1>
          <p className="text-muted-foreground">
            Purchase courses for students with integrated payment processing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="relative">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart
            {getCartItemCount() > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 w-5 h-5 p-0 rounded-full text-xs"
              >
                {getCartItemCount()}
              </Badge>
            )}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="purchase-courses">Purchase Courses</TabsTrigger>
          <TabsTrigger value="checkout">
            Checkout {getCartItemCount() > 0 && `(${getCartItemCount()})`}
          </TabsTrigger>
        </TabsList>

        {/* Purchase Courses Tab */}
        <TabsContent value="purchase-courses" className="space-y-6">
          <div className="flex gap-6">
            {/* Left Column - Students List (30%) */}
            <div className="w-[30%] space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Students ({students.length})
                  </CardTitle>
                  <CardDescription>
                    Select a student to purchase courses for
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Student Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search students..."
                      value={studentSearchQuery}
                      onChange={(e) => setStudentSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Students List */}
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedStudentId === student.id
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedStudentId(student.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={student.avatar}
                            alt={`${student.firstName} ${student.lastName}`}
                          />
                          <AvatarFallback>
                            {student.firstName[0]}
                            {student.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {student.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {student.city}, {student.country}
                          </p>
                        </div>
                        {selectedStudentId === student.id && (
                          <CheckCircle className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>

                  {!selectedStudentId && (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      Select a student to start adding courses
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Courses (70%) */}
            <div className="flex-1 space-y-4">
              {/* Course Filters and View Toggle */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center flex-1">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search courses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
                      <Button
                        variant={
                          coursesViewMode === "card" ? "default" : "ghost"
                        }
                        size="sm"
                        onClick={() => setCoursesViewMode("card")}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={
                          coursesViewMode === "table" ? "default" : "ghost"
                        }
                        size="sm"
                        onClick={() => setCoursesViewMode("table")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Student Info */}
              {selectedStudentId && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">
                          Adding courses for:{" "}
                          {
                            students.find((s) => s.id === selectedStudentId)
                              ?.firstName
                          }{" "}
                          {
                            students.find((s) => s.id === selectedStudentId)
                              ?.lastName
                          }
                        </p>
                        <p className="text-sm text-blue-700">
                          {
                            students.find((s) => s.id === selectedStudentId)
                              ?.email
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Courses Display */}
              {!selectedStudentId ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Select a Student First
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a student from the left panel to start browsing and
                      adding courses
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredCourses.length} courses
                    </p>
                  </div>

                  {coursesViewMode === "card"
                    ? renderCoursesCardView()
                    : renderCoursesTableView()}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Checkout Tab */}
        <TabsContent value="checkout" className="space-y-6">
          {cart.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Your Cart is Empty</h3>
                <p className="text-muted-foreground mb-4">
                  Add some courses to your cart to proceed with checkout
                </p>
                <Button onClick={() => setActiveTab("purchase-courses")}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          step <= currentStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step < currentStep ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span>{step}</span>
                        )}
                      </div>
                      {step < 4 && (
                        <div
                          className={`w-24 h-1 mx-2 ${
                            step < currentStep ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>Review</span>
                  <span>Payment</span>
                  <span>Details</span>
                  <span>Complete</span>
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  {renderPaymentStep()}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PartnerStudentManagement;
