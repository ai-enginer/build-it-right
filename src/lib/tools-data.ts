import { FileText, Image, Sparkles, Type, Film, Code, ArrowLeftRight, Calculator, Globe } from "lucide-react";

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  categorySlug: string;
  isAI?: boolean;
  isNew?: boolean;
  usageCount?: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  toolCount: number;
  colorClass: string;
  bgClass: string;
}

export const categories: Category[] = [
  { slug: "pdf", name: "PDF Tools", icon: FileText, toolCount: 16, colorClass: "text-cat-pdf", bgClass: "bg-cat-pdf/10" },
  { slug: "image", name: "Image Tools", icon: Image, toolCount: 15, colorClass: "text-cat-image", bgClass: "bg-cat-image/10" },
  { slug: "ai", name: "AI Tools", icon: Sparkles, toolCount: 14, colorClass: "text-cat-ai", bgClass: "bg-cat-ai/10" },
  { slug: "text", name: "Text Tools", icon: Type, toolCount: 12, colorClass: "text-cat-text", bgClass: "bg-cat-text/10" },
  { slug: "video", name: "Video & Audio", icon: Film, toolCount: 9, colorClass: "text-cat-video", bgClass: "bg-cat-video/10" },
  { slug: "developer", name: "Developer Tools", icon: Code, toolCount: 16, colorClass: "text-cat-dev", bgClass: "bg-cat-dev/10" },
  { slug: "converter", name: "Converters", icon: ArrowLeftRight, toolCount: 8, colorClass: "text-cat-converter", bgClass: "bg-cat-converter/10" },
  { slug: "calculator", name: "Calculators", icon: Calculator, toolCount: 12, colorClass: "text-cat-calculator", bgClass: "bg-cat-calculator/10" },
  { slug: "seo", name: "SEO & Web", icon: Globe, toolCount: 8, colorClass: "text-cat-seo", bgClass: "bg-cat-seo/10" },
];

export const tools: Tool[] = [
  // Text Tools
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, sentences, and paragraphs instantly", category: "Text Tools", categorySlug: "text", usageCount: "2.4M" },
  { slug: "character-counter", name: "Character Counter", description: "Count characters with and without spaces", category: "Text Tools", categorySlug: "text", usageCount: "1.8M" },
  { slug: "case-converter", name: "Case Converter", description: "Convert text to uppercase, lowercase, title case & more", category: "Text Tools", categorySlug: "text", usageCount: "1.2M" },
  { slug: "lorem-ipsum-generator", name: "Lorem Ipsum Generator", description: "Generate placeholder text for design mockups", category: "Text Tools", categorySlug: "text", usageCount: "890K" },
  { slug: "text-diff-checker", name: "Text Diff Checker", description: "Compare two texts and find differences", category: "Text Tools", categorySlug: "text", usageCount: "450K" },
  { slug: "slug-generator", name: "Text to Slug", description: "Convert text to URL-friendly slugs", category: "Text Tools", categorySlug: "text", usageCount: "340K" },

  // Developer Tools
  { slug: "json-formatter", name: "JSON Formatter", description: "Format, validate, and beautify JSON data instantly", category: "Developer Tools", categorySlug: "developer", usageCount: "3.1M" },
  { slug: "password-generator", name: "Password Generator", description: "Generate secure random passwords with custom rules", category: "Developer Tools", categorySlug: "developer", usageCount: "1.5M" },
  { slug: "base64-encoder", name: "Base64 Encoder/Decoder", description: "Encode or decode Base64 strings instantly", category: "Developer Tools", categorySlug: "developer", usageCount: "980K" },
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Generate QR codes for any URL or text", category: "Developer Tools", categorySlug: "developer", usageCount: "2.1M" },
  { slug: "color-picker", name: "Color Picker", description: "Pick colors and convert between HEX, RGB, HSL", category: "Developer Tools", categorySlug: "developer", usageCount: "1.1M" },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate random UUIDs (v4) instantly", category: "Developer Tools", categorySlug: "developer", usageCount: "670K" },

  // Calculators
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate exact age from date of birth", category: "Calculators", categorySlug: "calculator", usageCount: "4.2M" },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Calculate Body Mass Index with health insights", category: "Calculators", categorySlug: "calculator", usageCount: "2.8M" },
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Calculate percentages, increases, and decreases", category: "Calculators", categorySlug: "calculator", usageCount: "1.9M" },
  { slug: "tip-calculator", name: "Tip Calculator", description: "Calculate tips and split bills easily", category: "Calculators", categorySlug: "calculator", usageCount: "1.3M" },

  // PDF Tools (placeholders)
  { slug: "merge-pdf", name: "Merge PDF", description: "Combine multiple PDF files into one document", category: "PDF Tools", categorySlug: "pdf", usageCount: "5.6M" },
  { slug: "compress-pdf", name: "Compress PDF", description: "Reduce PDF file size without losing quality", category: "PDF Tools", categorySlug: "pdf", usageCount: "4.1M" },
  { slug: "pdf-to-word", name: "PDF to Word", description: "Convert PDF documents to editable Word files", category: "PDF Tools", categorySlug: "pdf", usageCount: "6.2M" },

  // AI Tools
  { slug: "ai-summarizer", name: "AI Summarizer", description: "Summarize any text with AI in seconds", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "1.2M" },
  { slug: "ai-grammar-checker", name: "AI Grammar Checker", description: "Fix grammar and improve writing style with AI", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "980K" },

  // Image Tools
  { slug: "image-compressor", name: "Image Compressor", description: "Compress images without losing quality", category: "Image Tools", categorySlug: "image", usageCount: "3.4M" },
  { slug: "image-resizer", name: "Image Resizer", description: "Resize images to any dimension", category: "Image Tools", categorySlug: "image", usageCount: "2.7M" },
];

export const popularTools = tools.slice(0, 8);

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter(t => t.categorySlug === categorySlug);
}
