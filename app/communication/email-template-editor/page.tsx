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
import { Label } from "@/ui/label";
import { Badge } from "@/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Separator } from "@/ui/separator";
import { Switch } from "@/ui/switch";
import {
  ArrowLeft,
  Save,
  Eye,
  Download,
  Send,
  Plus,
  Type,
  Image,
  Square as ButtonIcon,
  Layout,
  Palette,
  Settings,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  Copy,
  Trash2,
  ChevronUp,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  List,
  ListOrdered,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

interface EmailTemplateEditorProps {
  templateId?: string;
  onBack?: () => void;
}

interface EmailBlock {
  id: string;
  type:
    | "header"
    | "text"
    | "image"
    | "button"
    | "spacer"
    | "divider"
    | "footer";
  content: any;
  style: any;
}

interface TemplateSettings {
  name: string;
  subject: string;
  category: string;
  description: string;
  previewText: string;
}

function EmailTemplateEditor({ templateId, onBack }: EmailTemplateEditorProps) {
  const [templateSettings, setTemplateSettings] = useState<TemplateSettings>({
    name: templateId ? "Welcome Email Template" : "",
    subject: templateId ? "Welcome to {{institute_name}}!" : "",
    category: "welcome",
    description: "",
    previewText: "",
  });

  const [emailBlocks, setEmailBlocks] = useState<EmailBlock[]>(
    templateId
      ? [
          {
            id: "1",
            type: "header",
            content: {
              logo: null,
              title: "{{institute_name}}",
              subtitle: "Welcome to our educational platform",
            },
            style: {
              backgroundColor: "#030213",
              textColor: "#ffffff",
              padding: "40px 20px",
            },
          },
          {
            id: "2",
            type: "text",
            content: {
              text: "Dear {{student_name}},\n\nWelcome to our educational platform! We're excited to have you join our community of learners.",
            },
            style: {
              fontSize: "16px",
              color: "#333333",
              lineHeight: "1.6",
              padding: "20px",
            },
          },
        ]
      : []
  );

  const [selectedBlock, setSelectedBlock] = useState<EmailBlock | null>(null);
  const [previewMode, setPreviewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("design");

  const blockTypes = [
    {
      type: "header",
      icon: Layout,
      label: "Header",
      description: "Logo and title section",
    },
    {
      type: "text",
      icon: Type,
      label: "Text Block",
      description: "Rich text content",
    },
    {
      type: "image",
      icon: Image,
      label: "Image",
      description: "Pictures and graphics",
    },
    {
      type: "button",
      icon: ButtonIcon,
      label: "Button",
      description: "Call-to-action button",
    },
    {
      type: "spacer",
      icon: Layout,
      label: "Spacer",
      description: "Add vertical spacing",
    },
    {
      type: "divider",
      icon: Layout,
      label: "Divider",
      description: "Horizontal line separator",
    },
    {
      type: "footer",
      icon: Layout,
      label: "Footer",
      description: "Contact info and links",
    },
  ];

  const addBlock = (type: any) => {
    const newBlock: EmailBlock = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      style: getDefaultStyle(type),
    };
    setEmailBlocks((prev) => [...prev, newBlock]);
    setSelectedBlock(newBlock);
  };

  const getDefaultContent = (type: EmailBlock["type"]) => {
    switch (type) {
      case "header":
        return {
          logo: null,
          title: "Your Title Here",
          subtitle: "Subtitle text",
        };
      case "text":
        return {
          text: "Your text content goes here. You can include variables like {{student_name}} and {{course_name}}.",
        };
      case "image":
        return {
          src: null,
          alt: "Image description",
          width: "100%",
        };
      case "button":
        return {
          text: "Click Here",
          url: "https://example.com",
        };
      case "spacer":
        return {
          height: "20px",
        };
      case "divider":
        return {
          thickness: "1px",
          color: "#e0e0e0",
        };
      case "footer":
        return {
          companyName: "{{institute_name}}",
          address: "Your address here",
          unsubscribeText: "Unsubscribe from these emails",
        };
      default:
        return {};
    }
  };

  const getDefaultStyle = (type: EmailBlock["type"]) => {
    switch (type) {
      case "header":
        return {
          backgroundColor: "#030213",
          textColor: "#ffffff",
          padding: "40px 20px",
          textAlign: "center",
        };
      case "text":
        return {
          fontSize: "16px",
          color: "#333333",
          lineHeight: "1.6",
          padding: "20px",
          textAlign: "left",
        };
      case "image":
        return {
          padding: "20px",
          textAlign: "center",
        };
      case "button":
        return {
          backgroundColor: "#030213",
          textColor: "#ffffff",
          padding: "12px 24px",
          borderRadius: "6px",
          fontSize: "16px",
          textAlign: "center",
          margin: "20px",
        };
      case "footer":
        return {
          backgroundColor: "#f8f9fa",
          textColor: "#666666",
          padding: "30px 20px",
          fontSize: "14px",
          textAlign: "center",
        };
      default:
        return {
          padding: "20px",
        };
    }
  };

  const moveBlock = (blockId: string, direction: "up" | "down") => {
    const currentIndex = emailBlocks.findIndex((block) => block.id === blockId);
    if (
      (direction === "up" && currentIndex > 0) ||
      (direction === "down" && currentIndex < emailBlocks.length - 1)
    ) {
      const newBlocks = [...emailBlocks];
      const targetIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;
      [newBlocks[currentIndex], newBlocks[targetIndex]] = [
        newBlocks[targetIndex],
        newBlocks[currentIndex],
      ];
      setEmailBlocks(newBlocks);
    }
  };

  const deleteBlock = (blockId: string) => {
    setEmailBlocks((prev) => prev.filter((block) => block.id !== blockId));
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
  };

  const duplicateBlock = (blockId: string) => {
    const block = emailBlocks.find((b) => b.id === blockId);
    if (block) {
      const newBlock: EmailBlock = {
        ...block,
        id: Date.now().toString(),
      };
      const index = emailBlocks.findIndex((b) => b.id === blockId);
      const newBlocks = [...emailBlocks];
      newBlocks.splice(index + 1, 0, newBlock);
      setEmailBlocks(newBlocks);
    }
  };

  const updateBlockContent = (blockId: string, content: any) => {
    setEmailBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, content } : block
      )
    );
  };

  const updateBlockStyle = (blockId: string, style: any) => {
    setEmailBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? { ...block, style: { ...block.style, ...style } }
          : block
      )
    );
  };

  const handleSaveTemplate = () => {
    if (!templateSettings.name) {
      toast.error("Please enter a template name");
      return;
    }

    // In a real app, this would save to the backend
    toast.success(
      templateId
        ? "Template updated successfully"
        : "Template saved successfully"
    );
    setShowSaveDialog(false);
    if (onBack) onBack();
  };

  const renderBlock = (block: EmailBlock) => {
    const isSelected = selectedBlock?.id === block.id;

    return (
      <div
        key={block.id}
        className={`relative group cursor-pointer border-2 transition-colors ${
          isSelected
            ? "border-primary"
            : "border-transparent hover:border-muted-foreground/20"
        }`}
        onClick={() => setSelectedBlock(block)}
      >
        {/* Block Controls */}
        <div
          className={`absolute top-0 right-0 z-10 flex gap-1 p-1 bg-white border border-border rounded-bl-md shadow-sm transition-opacity ${
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              moveBlock(block.id, "up");
            }}
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              moveBlock(block.id, "down");
            }}
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              duplicateBlock(block.id);
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              deleteBlock(block.id);
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>

        {/* Block Content */}
        <div style={block.style}>{renderBlockContent(block)}</div>
      </div>
    );
  };

  const renderBlockContent = (block: EmailBlock) => {
    switch (block.type) {
      case "header":
        return (
          <div className="text-center">
            {block.content.logo && (
              <img
                src={block.content.logo}
                alt="Logo"
                className="mb-4 mx-auto"
                style={{ maxHeight: "60px" }}
              />
            )}
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: block.style.textColor }}
            >
              {block.content.title}
            </h1>
            {block.content.subtitle && (
              <p style={{ color: block.style.textColor, opacity: 0.9 }}>
                {block.content.subtitle}
              </p>
            )}
          </div>
        );
      case "text":
        return (
          <div
            style={{
              fontSize: block.style.fontSize,
              color: block.style.color,
              lineHeight: block.style.lineHeight,
              textAlign: block.style.textAlign,
            }}
          >
            {block.content.text
              .split("\n")
              .map((line: string, index: number) => (
                <p key={index} className={index > 0 ? "mt-4" : ""}>
                  {line}
                </p>
              ))}
          </div>
        );
      case "image":
        return (
          <div style={{ textAlign: block.style.textAlign }}>
            {block.content.src ? (
              <img
                src={block.content.src}
                alt={block.content.alt}
                style={{ width: block.content.width, maxWidth: "100%" }}
              />
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/20 p-8 text-center">
                <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to add image
                </p>
              </div>
            )}
          </div>
        );
      case "button":
        return (
          <div style={{ textAlign: block.style.textAlign }}>
            <a
              href={block.content.url}
              style={{
                display: "inline-block",
                backgroundColor: block.style.backgroundColor,
                color: block.style.textColor,
                padding: block.style.padding,
                borderRadius: block.style.borderRadius,
                fontSize: block.style.fontSize,
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              {block.content.text}
            </a>
          </div>
        );
      case "spacer":
        return (
          <div
            style={{
              height: block.content.height,
              backgroundColor: "transparent",
            }}
          >
            <div className="text-center text-xs text-muted-foreground py-2 border border-dashed border-muted-foreground/20">
              Spacer ({block.content.height})
            </div>
          </div>
        );
      case "divider":
        return (
          <div style={{ textAlign: "center" }}>
            <hr
              style={{
                border: "none",
                borderTop: `${block.content.thickness} solid ${block.content.color}`,
                margin: "0 auto",
                width: "100%",
              }}
            />
          </div>
        );
      case "footer":
        return (
          <div style={{ textAlign: block.style.textAlign }}>
            <p className="font-semibold mb-2">{block.content.companyName}</p>
            <p className="mb-4">{block.content.address}</p>
            <p className="text-sm">
              <a href="#" className="underline">
                {block.content.unsubscribeText}
              </a>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderBlockEditor = () => {
    if (!selectedBlock) {
      return (
        <div className="p-6 text-center text-muted-foreground">
          <Settings className="h-8 w-8 mx-auto mb-2" />
          <p>Select a block to edit its properties</p>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded">
            {blockTypes.find((t) => t.type === selectedBlock.type)?.icon &&
              React.createElement(
                blockTypes.find((t) => t.type === selectedBlock.type)!.icon,
                { className: "h-4 w-4" }
              )}
          </div>
          <div>
            <h3 className="font-medium">
              {blockTypes.find((t) => t.type === selectedBlock.type)?.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {
                blockTypes.find((t) => t.type === selectedBlock.type)
                  ?.description
              }
            </p>
          </div>
        </div>

        <Separator />

        {/* Content Editor */}
        <div className="space-y-4">
          <h4 className="font-medium">Content</h4>
          {selectedBlock.type === "text" && (
            <div>
              <Label htmlFor="text-content">Text Content</Label>
              <Textarea
                id="text-content"
                value={selectedBlock.content.text}
                onChange={(e) =>
                  updateBlockContent(selectedBlock.id, { text: e.target.value })
                }
                rows={6}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use variables like {`{{student_name}}`}, {`{{course_name}}`},{" "}
                {`{{institute_name}}`}
              </p>
            </div>
          )}

          {selectedBlock.type === "header" && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="header-title">Title</Label>
                <Input
                  id="header-title"
                  value={selectedBlock.content.title}
                  onChange={(e) =>
                    updateBlockContent(selectedBlock.id, {
                      ...selectedBlock.content,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="header-subtitle">Subtitle</Label>
                <Input
                  id="header-subtitle"
                  value={selectedBlock.content.subtitle}
                  onChange={(e) =>
                    updateBlockContent(selectedBlock.id, {
                      ...selectedBlock.content,
                      subtitle: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {selectedBlock.type === "button" && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="button-text">Button Text</Label>
                <Input
                  id="button-text"
                  value={selectedBlock.content.text}
                  onChange={(e) =>
                    updateBlockContent(selectedBlock.id, {
                      ...selectedBlock.content,
                      text: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="button-url">Button URL</Label>
                <Input
                  id="button-url"
                  value={selectedBlock.content.url}
                  onChange={(e) =>
                    updateBlockContent(selectedBlock.id, {
                      ...selectedBlock.content,
                      url: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Style Editor */}
        <div className="space-y-4">
          <h4 className="font-medium">Style</h4>

          {selectedBlock.type !== "spacer" &&
            selectedBlock.type !== "divider" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="text-color">Text Color</Label>
                  <Input
                    id="text-color"
                    type="color"
                    value={
                      selectedBlock.style.color ||
                      selectedBlock.style.textColor ||
                      "#333333"
                    }
                    onChange={(e) =>
                      updateBlockStyle(selectedBlock.id, {
                        [selectedBlock.style.textColor ? "textColor" : "color"]:
                          e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="bg-color">Background Color</Label>
                  <Input
                    id="bg-color"
                    type="color"
                    value={selectedBlock.style.backgroundColor || "#ffffff"}
                    onChange={(e) =>
                      updateBlockStyle(selectedBlock.id, {
                        backgroundColor: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

          {selectedBlock.type === "text" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="font-size">Font Size</Label>
                <Select
                  value={selectedBlock.style.fontSize || "16px"}
                  onValueChange={(value) =>
                    updateBlockStyle(selectedBlock.id, { fontSize: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12px">12px</SelectItem>
                    <SelectItem value="14px">14px</SelectItem>
                    <SelectItem value="16px">16px</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                    <SelectItem value="24px">24px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="text-align">Text Align</Label>
                <Select
                  value={selectedBlock.style.textAlign || "left"}
                  onValueChange={(value) =>
                    updateBlockStyle(selectedBlock.id, { textAlign: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="outline" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-lg font-semibold">
                {templateId ? "Edit Template" : "Create Template"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Design professional email templates with drag-and-drop editor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPreviewDialog(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={() => setShowSaveDialog(true)}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar - Block Library & Settings */}
        <div className="w-80 border-r bg-background">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-2 m-4">
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent
              value="design"
              className="flex-1 overflow-auto p-4 space-y-6"
            >
              {/* Block Library */}
              <div>
                <h3 className="font-medium mb-3">Add Blocks</h3>
                <div className="grid gap-2">
                  {blockTypes.map((blockType) => (
                    <Button
                      key={blockType.type}
                      variant="outline"
                      className="justify-start h-auto p-3"
                      onClick={() => addBlock(blockType.type)}
                    >
                      <blockType.icon className="h-4 w-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium text-sm">
                          {blockType.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {blockType.description}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Block Editor */}
              <div>
                <h3 className="font-medium mb-3">Block Properties</h3>
                {renderBlockEditor()}
              </div>
            </TabsContent>

            <TabsContent
              value="settings"
              className="flex-1 overflow-auto p-4 space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-name">Template Name *</Label>
                  <Input
                    id="template-name"
                    value={templateSettings.name}
                    onChange={(e) =>
                      setTemplateSettings((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter template name"
                  />
                </div>

                <div>
                  <Label htmlFor="template-subject">Email Subject *</Label>
                  <Input
                    id="template-subject"
                    value={templateSettings.subject}
                    onChange={(e) =>
                      setTemplateSettings((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                    placeholder="Email subject line"
                  />
                </div>

                <div>
                  <Label htmlFor="template-category">Category</Label>
                  <Select
                    value={templateSettings.category}
                    onValueChange={(value) =>
                      setTemplateSettings((prev) => ({
                        ...prev,
                        category: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Welcome</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="course">Course</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="template-description">Description</Label>
                  <Textarea
                    id="template-description"
                    value={templateSettings.description}
                    onChange={(e) =>
                      setTemplateSettings((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe this template"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="preview-text">Preview Text</Label>
                  <Input
                    id="preview-text"
                    value={templateSettings.previewText}
                    onChange={(e) =>
                      setTemplateSettings((prev) => ({
                        ...prev,
                        previewText: e.target.value,
                      }))
                    }
                    placeholder="Preview text shown in inbox"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This text appears in email clients as a preview
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-auto bg-muted/20">
          <div className="p-6">
            {/* Device Preview Controls */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Button
                variant={previewMode === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
              >
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant={previewMode === "tablet" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("tablet")}
              >
                <Tablet className="h-4 w-4 mr-2" />
                Tablet
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile
              </Button>
            </div>

            {/* Email Canvas */}
            <div className="flex justify-center">
              <div
                className={`bg-white shadow-lg ${
                  previewMode === "desktop"
                    ? "w-full max-w-2xl"
                    : previewMode === "tablet"
                    ? "w-96"
                    : "w-80"
                }`}
                style={{ minHeight: "400px" }}
              >
                {emailBlocks.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground border-2 border-dashed border-muted-foreground/20">
                    <Mail className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="font-medium mb-2">
                      Start Building Your Email
                    </h3>
                    <p className="text-sm">
                      Add blocks from the left panel to begin designing your
                      template
                    </p>
                  </div>
                ) : (
                  emailBlocks.map(renderBlock)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Template</DialogTitle>
            <DialogDescription>
              {templateId
                ? "Update this email template with your changes."
                : "Save this email template to your library."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Template Name</Label>
              <Input
                value={templateSettings.name}
                onChange={(e) =>
                  setTemplateSettings((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Enter template name"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select
                value={templateSettings.category}
                onValueChange={(value) =>
                  setTemplateSettings((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Welcome</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTemplate}>
              <Save className="h-4 w-4 mr-2" />
              {templateId ? "Update Template" : "Save Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
            <DialogDescription>
              Preview how your email will look to recipients
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-96 overflow-auto border rounded">
            <div className="bg-white p-4">
              {emailBlocks.map((block) => (
                <div key={block.id} style={block.style}>
                  {renderBlockContent(block)}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPreviewDialog(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                toast.success("Test email sent successfully");
                setShowPreviewDialog(false);
              }}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Test Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmailTemplateEditor;
