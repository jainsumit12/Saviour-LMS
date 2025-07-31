"use client"
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
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Switch } from "@/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Separator } from "@/ui/separator";
import { Badge } from "@/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Textarea } from "@/ui/textarea";
import {
  Settings as SettingsIcon,
  CreditCard,
  DollarSign,
  Receipt,
  Save,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Key,
  Percent,
  Globe,
  Building,
  Mail,
  Send,
  Server,
  Shield,
  TestTube,
} from "lucide-react";
import { toast } from "sonner";

interface CurrencySettings {
  baseCurrency: string;
  allowedCurrencies: string[];
  exchangeRateSource: string;
  autoUpdateRates: boolean;
}

interface PaymentGatewaySettings {
  razorpay: {
    enabled: boolean;
    keyId: string;
    keySecret: string;
    webhookSecret: string;
    testMode: boolean;
  };
  stripe: {
    enabled: boolean;
    publicKey: string;
    secretKey: string;
    webhookSecret: string;
    testMode: boolean;
  };
  paypal: {
    enabled: boolean;
    clientId: string;
    clientSecret: string;
    webhookId: string;
    testMode: boolean;
  };
}

interface TaxSettings {
  enabled: boolean;
  taxName: string;
  taxRate: number;
  taxType: "percentage" | "fixed";
  inclusiveTax: boolean;
  taxRegions: Array<{
    id: string;
    name: string;
    rate: number;
    enabled: boolean;
  }>;
  invoiceDetails: {
    companyName: string;
    taxNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
}

interface SMTPSettings {
  enabled: boolean;
  host: string;
  port: number;
  username: string;
  password: string;
  encryption: "none" | "tls" | "ssl";
  fromEmail: string;
  fromName: string;
  replyToEmail: string;
  testMode: boolean;
  connectionVerified: boolean;
  lastTestResult: {
    success: boolean;
    timestamp: string;
    message: string;
  } | null;
}

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
];

const exchangeRateSources = [
  { id: "fixer", name: "Fixer.io", url: "https://fixer.io" },
  {
    id: "openexchange",
    name: "Open Exchange Rates",
    url: "https://openexchangerates.org",
  },
  { id: "currencyapi", name: "Currency API", url: "https://currencyapi.com" },
  {
    id: "exchangerate",
    name: "ExchangeRate-API",
    url: "https://exchangerate-api.com",
  },
];

function Settings() {
  const [activeTab, setActiveTab] = useState("currency");
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [testingConnection, setTestingConnection] = useState(false);
  const [sendingTestEmail, setSendingTestEmail] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState("");

  // Currency Settings State
  const [currencySettings, setCurrencySettings] = useState<CurrencySettings>({
    baseCurrency: "USD",
    allowedCurrencies: ["USD", "EUR", "INR"],
    exchangeRateSource: "fixer",
    autoUpdateRates: true,
  });

  // Payment Gateway Settings State
  const [paymentSettings, setPaymentSettings] =
    useState<PaymentGatewaySettings>({
      razorpay: {
        enabled: false,
        keyId: "",
        keySecret: "",
        webhookSecret: "",
        testMode: true,
      },
      stripe: {
        enabled: false,
        publicKey: "",
        secretKey: "",
        webhookSecret: "",
        testMode: true,
      },
      paypal: {
        enabled: false,
        clientId: "",
        clientSecret: "",
        webhookId: "",
        testMode: true,
      },
    });

  // Tax Settings State
  const [taxSettings, setTaxSettings] = useState<TaxSettings>({
    enabled: false,
    taxName: "GST",
    taxRate: 18,
    taxType: "percentage",
    inclusiveTax: false,
    taxRegions: [
      { id: "1", name: "India", rate: 18, enabled: true },
      { id: "2", name: "United States", rate: 8.5, enabled: false },
      { id: "3", name: "European Union", rate: 20, enabled: false },
    ],
    invoiceDetails: {
      companyName: "Saviour EduTech",
      taxNumber: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  // SMTP Settings State
  const [smtpSettings, setSMTPSettings] = useState<SMTPSettings>({
    enabled: false,
    host: "smtp-relay.brevo.com",
    port: 587,
    username: "",
    password: "",
    encryption: "tls",
    fromEmail: "",
    fromName: "Saviour EduTech",
    replyToEmail: "",
    testMode: true,
    connectionVerified: false,
    lastTestResult: null,
  });

  const toggleSecretVisibility = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCurrencySettingsSave = () => {
    // In a real app, this would save to backend
    toast.success("Currency settings saved successfully");
  };

  const handlePaymentSettingsSave = () => {
    // In a real app, this would save to backend
    toast.success("Payment gateway settings saved successfully");
  };

  const handleTaxSettingsSave = () => {
    // In a real app, this would save to backend
    toast.success("Tax settings saved successfully");
  };

  const handleSMTPSettingsSave = () => {
    // In a real app, this would save to backend
    toast.success("SMTP settings saved successfully");
  };

  const handleTestConnection = async () => {
    if (
      !smtpSettings.host ||
      !smtpSettings.username ||
      !smtpSettings.password
    ) {
      toast.error("Please fill in all required SMTP fields");
      return;
    }

    setTestingConnection(true);

    // Simulate SMTP connection test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      const result = {
        success,
        timestamp: new Date().toISOString(),
        message: success
          ? "SMTP connection established successfully"
          : "Failed to connect: Invalid credentials or server unavailable",
      };

      setSMTPSettings((prev) => ({
        ...prev,
        connectionVerified: success,
        lastTestResult: result,
      }));

      if (success) {
        toast.success("SMTP connection verified successfully");
      } else {
        toast.error("SMTP connection failed");
      }

      setTestingConnection(false);
    }, 2000);
  };

  const handleSendTestEmail = async () => {
    if (!testEmailAddress) {
      toast.error("Please enter a test email address");
      return;
    }

    if (!smtpSettings.connectionVerified) {
      toast.error("Please verify SMTP connection first");
      return;
    }

    setSendingTestEmail(true);

    // Simulate sending test email
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo

      if (success) {
        toast.success(`Test email sent successfully to ${testEmailAddress}`);
      } else {
        toast.error("Failed to send test email");
      }

      setSendingTestEmail(false);
    }, 3000);
  };

  const updatePaymentGateway = (
    gateway: keyof PaymentGatewaySettings,
    field: string,
    value: any
  ) => {
    setPaymentSettings((prev) => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        [field]: value,
      },
    }));
  };

  const updateTaxRegion = (regionId: string, field: string, value: any) => {
    setTaxSettings((prev) => ({
      ...prev,
      taxRegions: prev.taxRegions.map((region) =>
        region.id === regionId ? { ...region, [field]: value } : region
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          Configure system settings, payment gateways, and tax options
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="currency" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Currency
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment Gateways
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Tax Settings
          </TabsTrigger>
          <TabsTrigger value="smtp" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            SMTP Settings
          </TabsTrigger>
        </TabsList>

        {/* Currency Settings */}
        <TabsContent value="currency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Currency Configuration
              </CardTitle>
              <CardDescription>
                Set up your base currency and supported currencies for the
                platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="base-currency">Base Currency</Label>
                  <Select
                    value={currencySettings.baseCurrency}
                    onValueChange={(value) =>
                      setCurrencySettings((prev) => ({
                        ...prev,
                        baseCurrency: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select base currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span>{currency.symbol}</span>
                            <span>{currency.code}</span>
                            <span className="text-muted-foreground">
                              - {currency.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exchange-source">Exchange Rate Source</Label>
                  <Select
                    value={currencySettings.exchangeRateSource}
                    onValueChange={(value) =>
                      setCurrencySettings((prev) => ({
                        ...prev,
                        exchangeRateSource: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select exchange rate source" />
                    </SelectTrigger>
                    <SelectContent>
                      {exchangeRateSources.map((source) => (
                        <SelectItem key={source.id} value={source.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{source.name}</span>
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Supported Currencies</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {currencies.map((currency) => (
                    <div
                      key={currency.code}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={currency.code}
                        checked={currencySettings.allowedCurrencies.includes(
                          currency.code
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCurrencySettings((prev) => ({
                              ...prev,
                              allowedCurrencies: [
                                ...prev.allowedCurrencies,
                                currency.code,
                              ],
                            }));
                          } else {
                            setCurrencySettings((prev) => ({
                              ...prev,
                              allowedCurrencies: prev.allowedCurrencies.filter(
                                (c) => c !== currency.code
                              ),
                            }));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor={currency.code}
                        className="text-sm flex items-center gap-1"
                      >
                        <span>{currency.symbol}</span>
                        <span>{currency.code}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-update"
                  checked={currencySettings.autoUpdateRates}
                  onCheckedChange={(checked) =>
                    setCurrencySettings((prev) => ({
                      ...prev,
                      autoUpdateRates: checked,
                    }))
                  }
                />
                <Label htmlFor="auto-update">
                  Auto-update exchange rates daily
                </Label>
              </div>

              <Button onClick={handleCurrencySettingsSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Currency Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Gateway Settings */}
        <TabsContent value="payment" className="space-y-6">
          {/* Razorpay */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    Razorpay
                  </CardTitle>
                  <CardDescription>
                    Indian payment gateway for seamless transactions
                  </CardDescription>
                </div>
                <Switch
                  checked={paymentSettings.razorpay.enabled}
                  onCheckedChange={(checked) =>
                    updatePaymentGateway("razorpay", "enabled", checked)
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="razorpay-key-id">Key ID</Label>
                  <Input
                    id="razorpay-key-id"
                    placeholder="rzp_test_..."
                    value={paymentSettings.razorpay.keyId}
                    onChange={(e) =>
                      updatePaymentGateway("razorpay", "keyId", e.target.value)
                    }
                    disabled={!paymentSettings.razorpay.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razorpay-key-secret">Key Secret</Label>
                  <div className="relative">
                    <Input
                      id="razorpay-key-secret"
                      type={showSecrets.razorpaySecret ? "text" : "password"}
                      placeholder="Enter key secret"
                      value={paymentSettings.razorpay.keySecret}
                      onChange={(e) =>
                        updatePaymentGateway(
                          "razorpay",
                          "keySecret",
                          e.target.value
                        )
                      }
                      disabled={!paymentSettings.razorpay.enabled}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => toggleSecretVisibility("razorpaySecret")}
                    >
                      {showSecrets.razorpaySecret ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="razorpay-webhook">Webhook Secret</Label>
                <div className="relative">
                  <Input
                    id="razorpay-webhook"
                    type={showSecrets.razorpayWebhook ? "text" : "password"}
                    placeholder="Enter webhook secret"
                    value={paymentSettings.razorpay.webhookSecret}
                    onChange={(e) =>
                      updatePaymentGateway(
                        "razorpay",
                        "webhookSecret",
                        e.target.value
                      )
                    }
                    disabled={!paymentSettings.razorpay.enabled}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => toggleSecretVisibility("razorpayWebhook")}
                  >
                    {showSecrets.razorpayWebhook ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="razorpay-test"
                  checked={paymentSettings.razorpay.testMode}
                  onCheckedChange={(checked) =>
                    updatePaymentGateway("razorpay", "testMode", checked)
                  }
                  disabled={!paymentSettings.razorpay.enabled}
                />
                <Label htmlFor="razorpay-test">Test Mode</Label>
                {paymentSettings.razorpay.testMode && (
                  <Badge variant="secondary">Test</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stripe */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    Stripe
                  </CardTitle>
                  <CardDescription>
                    Global payment processing platform
                  </CardDescription>
                </div>
                <Switch
                  checked={paymentSettings.stripe.enabled}
                  onCheckedChange={(checked) =>
                    updatePaymentGateway("stripe", "enabled", checked)
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stripe-public-key">Publishable Key</Label>
                  <Input
                    id="stripe-public-key"
                    placeholder="pk_test_..."
                    value={paymentSettings.stripe.publicKey}
                    onChange={(e) =>
                      updatePaymentGateway(
                        "stripe",
                        "publicKey",
                        e.target.value
                      )
                    }
                    disabled={!paymentSettings.stripe.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret-key">Secret Key</Label>
                  <div className="relative">
                    <Input
                      id="stripe-secret-key"
                      type={showSecrets.stripeSecret ? "text" : "password"}
                      placeholder="sk_test_..."
                      value={paymentSettings.stripe.secretKey}
                      onChange={(e) =>
                        updatePaymentGateway(
                          "stripe",
                          "secretKey",
                          e.target.value
                        )
                      }
                      disabled={!paymentSettings.stripe.enabled}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => toggleSecretVisibility("stripeSecret")}
                    >
                      {showSecrets.stripeSecret ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-webhook">Webhook Secret</Label>
                <div className="relative">
                  <Input
                    id="stripe-webhook"
                    type={showSecrets.stripeWebhook ? "text" : "password"}
                    placeholder="whsec_..."
                    value={paymentSettings.stripe.webhookSecret}
                    onChange={(e) =>
                      updatePaymentGateway(
                        "stripe",
                        "webhookSecret",
                        e.target.value
                      )
                    }
                    disabled={!paymentSettings.stripe.enabled}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => toggleSecretVisibility("stripeWebhook")}
                  >
                    {showSecrets.stripeWebhook ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="stripe-test"
                  checked={paymentSettings.stripe.testMode}
                  onCheckedChange={(checked) =>
                    updatePaymentGateway("stripe", "testMode", checked)
                  }
                  disabled={!paymentSettings.stripe.enabled}
                />
                <Label htmlFor="stripe-test">Test Mode</Label>
                {paymentSettings.stripe.testMode && (
                  <Badge variant="secondary">Test</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* PayPal */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    PayPal
                  </CardTitle>
                  <CardDescription>
                    Trusted global payment solution
                  </CardDescription>
                </div>
                <Switch
                  checked={paymentSettings.paypal.enabled}
                  onCheckedChange={(checked) =>
                    updatePaymentGateway("paypal", "enabled", checked)
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="paypal-client-id">Client ID</Label>
                  <Input
                    id="paypal-client-id"
                    placeholder="Enter PayPal client ID"
                    value={paymentSettings.paypal.clientId}
                    onChange={(e) =>
                      updatePaymentGateway("paypal", "clientId", e.target.value)
                    }
                    disabled={!paymentSettings.paypal.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paypal-client-secret">Client Secret</Label>
                  <div className="relative">
                    <Input
                      id="paypal-client-secret"
                      type={showSecrets.paypalSecret ? "text" : "password"}
                      placeholder="Enter client secret"
                      value={paymentSettings.paypal.clientSecret}
                      onChange={(e) =>
                        updatePaymentGateway(
                          "paypal",
                          "clientSecret",
                          e.target.value
                        )
                      }
                      disabled={!paymentSettings.paypal.enabled}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => toggleSecretVisibility("paypalSecret")}
                    >
                      {showSecrets.paypalSecret ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paypal-webhook">Webhook ID</Label>
                <Input
                  id="paypal-webhook"
                  placeholder="Enter webhook ID"
                  value={paymentSettings.paypal.webhookId}
                  onChange={(e) =>
                    updatePaymentGateway("paypal", "webhookId", e.target.value)
                  }
                  disabled={!paymentSettings.paypal.enabled}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="paypal-test"
                  checked={paymentSettings.paypal.testMode}
                  onCheckedChange={(checked) =>
                    updatePaymentGateway("paypal", "testMode", checked)
                  }
                  disabled={!paymentSettings.paypal.enabled}
                />
                <Label htmlFor="paypal-test">Sandbox Mode</Label>
                {paymentSettings.paypal.testMode && (
                  <Badge variant="secondary">Sandbox</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Button onClick={handlePaymentSettingsSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Payment Gateway Settings
          </Button>
        </TabsContent>

        {/* Tax Settings */}
        <TabsContent value="tax" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" />
                    Tax Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure tax settings for your platform
                  </CardDescription>
                </div>
                <Switch
                  checked={taxSettings.enabled}
                  onCheckedChange={(checked) =>
                    setTaxSettings((prev) => ({ ...prev, enabled: checked }))
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tax-name">Tax Name</Label>
                  <Input
                    id="tax-name"
                    placeholder="e.g., GST, VAT, Sales Tax"
                    value={taxSettings.taxName}
                    onChange={(e) =>
                      setTaxSettings((prev) => ({
                        ...prev,
                        taxName: e.target.value,
                      }))
                    }
                    disabled={!taxSettings.enabled}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-rate">Default Tax Rate</Label>
                  <div className="relative">
                    <Input
                      id="tax-rate"
                      type="number"
                      placeholder="18"
                      value={taxSettings.taxRate}
                      onChange={(e) =>
                        setTaxSettings((prev) => ({
                          ...prev,
                          taxRate: parseFloat(e.target.value),
                        }))
                      }
                      disabled={!taxSettings.enabled}
                    />
                    <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tax Type</Label>
                <Select
                  value={taxSettings.taxType}
                  onValueChange={(value: "percentage" | "fixed") =>
                    setTaxSettings((prev) => ({ ...prev, taxType: value }))
                  }
                  disabled={!taxSettings.enabled}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="inclusive-tax"
                  checked={taxSettings.inclusiveTax}
                  onCheckedChange={(checked) =>
                    setTaxSettings((prev) => ({
                      ...prev,
                      inclusiveTax: checked,
                    }))
                  }
                  disabled={!taxSettings.enabled}
                />
                <Label htmlFor="inclusive-tax">Tax Inclusive Pricing</Label>
                <div className="text-sm text-muted-foreground">
                  (Tax is included in the displayed price)
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Regional Tax Settings</Label>
                {taxSettings.taxRegions.map((region) => (
                  <div
                    key={region.id}
                    className="flex items-center gap-4 p-3 border rounded-lg"
                  >
                    <Switch
                      checked={region.enabled}
                      onCheckedChange={(checked) =>
                        updateTaxRegion(region.id, "enabled", checked)
                      }
                      disabled={!taxSettings.enabled}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{region.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={region.rate}
                        onChange={(e) =>
                          updateTaxRegion(
                            region.id,
                            "rate",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-20"
                        disabled={!taxSettings.enabled || !region.enabled}
                      />
                      <Percent className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Invoice Details</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={taxSettings.invoiceDetails.companyName}
                      onChange={(e) =>
                        setTaxSettings((prev) => ({
                          ...prev,
                          invoiceDetails: {
                            ...prev.invoiceDetails,
                            companyName: e.target.value,
                          },
                        }))
                      }
                      disabled={!taxSettings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-number">Tax Number</Label>
                    <Input
                      id="tax-number"
                      placeholder="e.g., GSTIN, VAT Number"
                      value={taxSettings.invoiceDetails.taxNumber}
                      onChange={(e) =>
                        setTaxSettings((prev) => ({
                          ...prev,
                          invoiceDetails: {
                            ...prev.invoiceDetails,
                            taxNumber: e.target.value,
                          },
                        }))
                      }
                      disabled={!taxSettings.enabled}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter company address"
                    value={taxSettings.invoiceDetails.address}
                    onChange={(e) =>
                      setTaxSettings((prev) => ({
                        ...prev,
                        invoiceDetails: {
                          ...prev.invoiceDetails,
                          address: e.target.value,
                        },
                      }))
                    }
                    disabled={!taxSettings.enabled}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={taxSettings.invoiceDetails.city}
                      onChange={(e) =>
                        setTaxSettings((prev) => ({
                          ...prev,
                          invoiceDetails: {
                            ...prev.invoiceDetails,
                            city: e.target.value,
                          },
                        }))
                      }
                      disabled={!taxSettings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={taxSettings.invoiceDetails.state}
                      onChange={(e) =>
                        setTaxSettings((prev) => ({
                          ...prev,
                          invoiceDetails: {
                            ...prev.invoiceDetails,
                            state: e.target.value,
                          },
                        }))
                      }
                      disabled={!taxSettings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={taxSettings.invoiceDetails.country}
                      onChange={(e) =>
                        setTaxSettings((prev) => ({
                          ...prev,
                          invoiceDetails: {
                            ...prev.invoiceDetails,
                            country: e.target.value,
                          },
                        }))
                      }
                      disabled={!taxSettings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip-code">ZIP Code</Label>
                    <Input
                      id="zip-code"
                      value={taxSettings.invoiceDetails.zipCode}
                      onChange={(e) =>
                        setTaxSettings((prev) => ({
                          ...prev,
                          invoiceDetails: {
                            ...prev.invoiceDetails,
                            zipCode: e.target.value,
                          },
                        }))
                      }
                      disabled={!taxSettings.enabled}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleTaxSettingsSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Tax Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SMTP Settings */}
        <TabsContent value="smtp" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    Brevo SMTP Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure Brevo SMTP settings for sending transactional
                    emails and notifications
                  </CardDescription>
                </div>
                <Switch
                  checked={smtpSettings.enabled}
                  onCheckedChange={(checked) =>
                    setSMTPSettings((prev) => ({ ...prev, enabled: checked }))
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Connection Status */}
              {smtpSettings.enabled && (
                <div className="p-4 rounded-lg border bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      <span className="font-medium">Connection Status</span>
                    </div>
                    {smtpSettings.connectionVerified ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-600">
                          Not Verified
                        </span>
                      </div>
                    )}
                  </div>

                  {smtpSettings.lastTestResult && (
                    <div className="text-sm">
                      <p
                        className={`mb-1 ${
                          smtpSettings.lastTestResult.success
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {smtpSettings.lastTestResult.message}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Last tested:{" "}
                        {new Date(
                          smtpSettings.lastTestResult.timestamp
                        ).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* SMTP Server Configuration */}
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input
                      id="smtp-host"
                      placeholder="smtp-relay.brevo.com"
                      value={smtpSettings.host}
                      onChange={(e) =>
                        setSMTPSettings((prev) => ({
                          ...prev,
                          host: e.target.value,
                        }))
                      }
                      disabled={!smtpSettings.enabled}
                    />
                    <p className="text-xs text-muted-foreground">
                      Brevo SMTP server address
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Port</Label>
                    <Select
                      value={smtpSettings.port.toString()}
                      onValueChange={(value) =>
                        setSMTPSettings((prev) => ({
                          ...prev,
                          port: parseInt(value),
                        }))
                      }
                      disabled={!smtpSettings.enabled}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select port" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="587">587 (TLS)</SelectItem>
                        <SelectItem value="465">465 (SSL)</SelectItem>
                        <SelectItem value="25">25 (Plain)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">Username</Label>
                    <Input
                      id="smtp-username"
                      placeholder="your-email@domain.com"
                      value={smtpSettings.username}
                      onChange={(e) =>
                        setSMTPSettings((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      disabled={!smtpSettings.enabled}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your Brevo account email
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">SMTP Key / Password</Label>
                    <div className="relative">
                      <Input
                        id="smtp-password"
                        type={showSecrets.smtpPassword ? "text" : "password"}
                        placeholder="Enter SMTP key"
                        value={smtpSettings.password}
                        onChange={(e) =>
                          setSMTPSettings((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        disabled={!smtpSettings.enabled}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => toggleSecretVisibility("smtpPassword")}
                      >
                        {showSecrets.smtpPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your Brevo SMTP key or API key
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Encryption</Label>
                  <Select
                    value={smtpSettings.encryption}
                    onValueChange={(value: "none" | "tls" | "ssl") =>
                      setSMTPSettings((prev) => ({
                        ...prev,
                        encryption: value,
                      }))
                    }
                    disabled={!smtpSettings.enabled}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select encryption" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tls">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          TLS (Recommended)
                        </div>
                      </SelectItem>
                      <SelectItem value="ssl">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          SSL
                        </div>
                      </SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Email Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Email Configuration
                </h4>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="from-email">From Email</Label>
                    <Input
                      id="from-email"
                      type="email"
                      placeholder="noreply@saviour-edutech.com"
                      value={smtpSettings.fromEmail}
                      onChange={(e) =>
                        setSMTPSettings((prev) => ({
                          ...prev,
                          fromEmail: e.target.value,
                        }))
                      }
                      disabled={!smtpSettings.enabled}
                    />
                    <p className="text-xs text-muted-foreground">
                      Email address that appears as sender
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from-name">From Name</Label>
                    <Input
                      id="from-name"
                      placeholder="Saviour EduTech"
                      value={smtpSettings.fromName}
                      onChange={(e) =>
                        setSMTPSettings((prev) => ({
                          ...prev,
                          fromName: e.target.value,
                        }))
                      }
                      disabled={!smtpSettings.enabled}
                    />
                    <p className="text-xs text-muted-foreground">
                      Display name for outgoing emails
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reply-email">Reply-To Email (Optional)</Label>
                  <Input
                    id="reply-email"
                    type="email"
                    placeholder="support@saviour-edutech.com"
                    value={smtpSettings.replyToEmail}
                    onChange={(e) =>
                      setSMTPSettings((prev) => ({
                        ...prev,
                        replyToEmail: e.target.value,
                      }))
                    }
                    disabled={!smtpSettings.enabled}
                  />
                  <p className="text-xs text-muted-foreground">
                    Email address for replies (if different from sender)
                  </p>
                </div>
              </div>

              <Separator />

              {/* Test & Verification */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <TestTube className="w-4 h-4" />
                  Test & Verification
                </h4>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="test-mode"
                    checked={smtpSettings.testMode}
                    onCheckedChange={(checked) =>
                      setSMTPSettings((prev) => ({
                        ...prev,
                        testMode: checked,
                      }))
                    }
                    disabled={!smtpSettings.enabled}
                  />
                  <Label htmlFor="test-mode">Test Mode</Label>
                  {smtpSettings.testMode && (
                    <Badge variant="secondary">Test Mode Active</Badge>
                  )}
                </div>

                <div className="grid gap-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={handleTestConnection}
                      disabled={!smtpSettings.enabled || testingConnection}
                      variant="outline"
                      className="flex-1"
                    >
                      {testingConnection ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2"></div>
                          Testing Connection...
                        </>
                      ) : (
                        <>
                          <Server className="w-4 h-4 mr-2" />
                          Test Connection
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="test-email">Send Test Email</Label>
                    <div className="flex gap-2">
                      <Input
                        id="test-email"
                        type="email"
                        placeholder="test@example.com"
                        value={testEmailAddress}
                        onChange={(e) => setTestEmailAddress(e.target.value)}
                        disabled={
                          !smtpSettings.enabled ||
                          !smtpSettings.connectionVerified
                        }
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendTestEmail}
                        disabled={
                          !smtpSettings.enabled ||
                          !smtpSettings.connectionVerified ||
                          sendingTestEmail ||
                          !testEmailAddress
                        }
                        variant="outline"
                      >
                        {sendingTestEmail ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Test
                          </>
                        )}
                      </Button>
                    </div>
                    {!smtpSettings.connectionVerified && (
                      <p className="text-xs text-muted-foreground">
                        Test connection first before sending test email
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSMTPSettingsSave}
                className="w-full"
                disabled={!smtpSettings.enabled}
              >
                <Save className="w-4 h-4 mr-2" />
                Save SMTP Settings
              </Button>
            </CardContent>
          </Card>

          {/* SMTP Configuration Help */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Brevo SMTP Setup Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <p>
                  <strong>Step 1:</strong> Log in to your Brevo account and
                  navigate to SMTP &amp; API settings
                </p>
                <p>
                  <strong>Step 2:</strong> Generate an SMTP key or use your
                  existing API key
                </p>
                <p>
                  <strong>Step 3:</strong> Use the following default settings:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>
                    Host:{" "}
                    <code className="bg-muted px-1 rounded">
                      smtp-relay.brevo.com
                    </code>
                  </li>
                  <li>
                    Port: <code className="bg-muted px-1 rounded">587</code>{" "}
                    (TLS) or <code className="bg-muted px-1 rounded">465</code>{" "}
                    (SSL)
                  </li>
                  <li>Username: Your Brevo account email</li>
                  <li>Password: Your generated SMTP key</li>
                </ul>
                <p>
                  <strong>Step 4:</strong> Test the connection and verify your
                  setup
                </p>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Make sure your domain is verified in Brevo for better email
                  deliverability
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Settings;
