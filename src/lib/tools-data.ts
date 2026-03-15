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
  routePath: string;
  icon: React.ComponentType<{ className?: string }>;
  toolCount: number;
  colorClass: string;
  bgClass: string;
}

export const categories: Category[] = [
  { slug: "pdf", name: "PDF Tools", routePath: "/pdf-tools", icon: FileText, toolCount: 16, colorClass: "text-cat-pdf", bgClass: "bg-cat-pdf/10" },
  { slug: "image", name: "Image Tools", routePath: "/image-tools", icon: Image, toolCount: 15, colorClass: "text-cat-image", bgClass: "bg-cat-image/10" },
  { slug: "ai", name: "AI Tools", routePath: "/ai-tools", icon: Sparkles, toolCount: 14, colorClass: "text-cat-ai", bgClass: "bg-cat-ai/10" },
  { slug: "text", name: "Text Tools", routePath: "/text-tools", icon: Type, toolCount: 12, colorClass: "text-cat-text", bgClass: "bg-cat-text/10" },
  { slug: "video", name: "Video & Audio", routePath: "/video-audio-tools", icon: Film, toolCount: 9, colorClass: "text-cat-video", bgClass: "bg-cat-video/10" },
  { slug: "developer", name: "Developer Tools", routePath: "/developer-tools", icon: Code, toolCount: 16, colorClass: "text-cat-dev", bgClass: "bg-cat-dev/10" },
  { slug: "converter", name: "Converters", routePath: "/converter-tools", icon: ArrowLeftRight, toolCount: 8, colorClass: "text-cat-converter", bgClass: "bg-cat-converter/10" },
  { slug: "calculator", name: "Calculators", routePath: "/calculator-tools", icon: Calculator, toolCount: 12, colorClass: "text-cat-calculator", bgClass: "bg-cat-calculator/10" },
  { slug: "seo", name: "SEO & Web", routePath: "/seo-web-tools", icon: Globe, toolCount: 8, colorClass: "text-cat-seo", bgClass: "bg-cat-seo/10" },
];

export const tools: Tool[] = [
  // ── PDF Tools (16) ──
  { slug: "merge-pdf", name: "Merge PDF", description: "Combine multiple PDF files into one document", category: "PDF Tools", categorySlug: "pdf", usageCount: "5.6M" },
  { slug: "split-pdf", name: "Split PDF", description: "Split a PDF into individual pages or sections", category: "PDF Tools", categorySlug: "pdf", usageCount: "3.2M" },
  { slug: "compress-pdf", name: "Compress PDF", description: "Reduce PDF file size without losing quality", category: "PDF Tools", categorySlug: "pdf", usageCount: "4.1M" },
  { slug: "pdf-to-word", name: "PDF to Word", description: "Convert PDF documents to editable Word files", category: "PDF Tools", categorySlug: "pdf", usageCount: "6.2M" },
  { slug: "word-to-pdf", name: "Word to PDF", description: "Convert Word documents to PDF format", category: "PDF Tools", categorySlug: "pdf", usageCount: "4.8M" },
  { slug: "pdf-to-excel", name: "PDF to Excel", description: "Extract tables from PDF to Excel spreadsheets", category: "PDF Tools", categorySlug: "pdf", usageCount: "2.1M" },
  { slug: "excel-to-pdf", name: "Excel to PDF", description: "Convert Excel spreadsheets to PDF format", category: "PDF Tools", categorySlug: "pdf", usageCount: "1.9M" },
  { slug: "pdf-to-ppt", name: "PDF to PowerPoint", description: "Convert PDF files to editable presentations", category: "PDF Tools", categorySlug: "pdf", usageCount: "1.5M" },
  { slug: "ppt-to-pdf", name: "PowerPoint to PDF", description: "Convert presentations to PDF format", category: "PDF Tools", categorySlug: "pdf", usageCount: "1.8M" },
  { slug: "pdf-to-jpg", name: "PDF to JPG", description: "Convert PDF pages to high-quality JPG images", category: "PDF Tools", categorySlug: "pdf", usageCount: "3.4M" },
  { slug: "jpg-to-pdf", name: "JPG to PDF", description: "Convert JPG images to a single PDF file", category: "PDF Tools", categorySlug: "pdf", usageCount: "2.9M" },
  { slug: "rotate-pdf", name: "Rotate PDF", description: "Rotate PDF pages to any orientation", category: "PDF Tools", categorySlug: "pdf", usageCount: "1.2M" },
  { slug: "unlock-pdf", name: "Unlock PDF", description: "Remove password protection from PDF files", category: "PDF Tools", categorySlug: "pdf", usageCount: "890K" },
  { slug: "protect-pdf", name: "Protect PDF", description: "Add password protection to your PDF files", category: "PDF Tools", categorySlug: "pdf", usageCount: "760K" },
  { slug: "pdf-page-numbers", name: "Add Page Numbers", description: "Add page numbers to your PDF documents", category: "PDF Tools", categorySlug: "pdf", usageCount: "540K" },
  { slug: "pdf-watermark", name: "Add Watermark", description: "Add text or image watermarks to PDF files", category: "PDF Tools", categorySlug: "pdf", usageCount: "480K" },

  // ── Image Tools (15) ──
  { slug: "image-compressor", name: "Image Compressor", description: "Compress images without losing quality", category: "Image Tools", categorySlug: "image", usageCount: "3.4M" },
  { slug: "image-resizer", name: "Image Resizer", description: "Resize images to any dimension", category: "Image Tools", categorySlug: "image", usageCount: "2.7M" },
  { slug: "image-cropper", name: "Image Cropper", description: "Crop images to custom dimensions or aspect ratios", category: "Image Tools", categorySlug: "image", usageCount: "2.1M" },
  { slug: "image-converter", name: "Image Converter", description: "Convert between PNG, JPG, WebP, and more", category: "Image Tools", categorySlug: "image", usageCount: "1.9M" },
  { slug: "image-to-png", name: "Image to PNG", description: "Convert any image format to PNG", category: "Image Tools", categorySlug: "image", usageCount: "1.6M" },
  { slug: "image-to-jpg", name: "Image to JPG", description: "Convert any image format to JPG", category: "Image Tools", categorySlug: "image", usageCount: "1.5M" },
  { slug: "png-to-webp", name: "PNG to WebP", description: "Convert PNG images to WebP for faster loading", category: "Image Tools", categorySlug: "image", usageCount: "980K" },
  { slug: "svg-to-png", name: "SVG to PNG", description: "Convert SVG vector files to PNG raster images", category: "Image Tools", categorySlug: "image", usageCount: "870K" },
  { slug: "remove-background", name: "Remove Background", description: "Remove image backgrounds automatically with AI", category: "Image Tools", categorySlug: "image", isAI: true, usageCount: "4.2M" },
  { slug: "image-upscaler", name: "Image Upscaler", description: "Upscale and enhance image resolution with AI", category: "Image Tools", categorySlug: "image", isAI: true, usageCount: "1.8M" },
  { slug: "blur-image", name: "Blur Image", description: "Apply blur effects to images or specific areas", category: "Image Tools", categorySlug: "image", usageCount: "650K" },
  { slug: "rotate-image", name: "Rotate Image", description: "Rotate and flip images easily", category: "Image Tools", categorySlug: "image", usageCount: "540K" },
  { slug: "add-text-to-image", name: "Add Text to Image", description: "Overlay text on images with custom fonts", category: "Image Tools", categorySlug: "image", usageCount: "1.1M" },
  { slug: "meme-generator", name: "Meme Generator", description: "Create memes with custom text and templates", category: "Image Tools", categorySlug: "image", usageCount: "2.3M" },
  { slug: "screenshot-to-code", name: "Screenshot to Code", description: "Convert screenshots to HTML/CSS code with AI", category: "Image Tools", categorySlug: "image", isAI: true, isNew: true, usageCount: "320K" },

  // ── AI Tools (14) ──
  { slug: "ai-summarizer", name: "AI Summarizer", description: "Summarize any text with AI in seconds", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "1.2M" },
  { slug: "ai-grammar-checker", name: "AI Grammar Checker", description: "Fix grammar and improve writing style with AI", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "980K" },
  { slug: "ai-paraphraser", name: "AI Paraphraser", description: "Rewrite text in different styles and tones", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "870K" },
  { slug: "ai-translator", name: "AI Translator", description: "Translate text between 50+ languages with AI", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "1.5M" },
  { slug: "ai-essay-writer", name: "AI Essay Writer", description: "Generate well-structured essays on any topic", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "760K" },
  { slug: "ai-email-writer", name: "AI Email Writer", description: "Draft professional emails in seconds", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "650K" },
  { slug: "ai-code-generator", name: "AI Code Generator", description: "Generate code snippets from natural language", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "540K" },
  { slug: "ai-image-generator", name: "AI Image Generator", description: "Create images from text descriptions", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "2.1M" },
  { slug: "ai-chatbot", name: "AI Chatbot", description: "Chat with an AI assistant for any task", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "3.4M" },
  { slug: "ai-plagiarism-checker", name: "AI Plagiarism Checker", description: "Check text for plagiarism and originality", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "890K" },
  { slug: "ai-hashtag-generator", name: "AI Hashtag Generator", description: "Generate relevant hashtags for social media", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "430K" },
  { slug: "ai-bio-generator", name: "AI Bio Generator", description: "Create professional bios for social profiles", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "380K" },
  { slug: "ai-caption-generator", name: "AI Caption Generator", description: "Generate engaging captions for social media posts", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "520K" },
  { slug: "ai-text-to-speech", name: "AI Text to Speech", description: "Convert text to natural-sounding speech", category: "AI Tools", categorySlug: "ai", isAI: true, usageCount: "670K" },

  // ── Text Tools (12) ──
  { slug: "word-counter", name: "Word Counter", description: "Count words, characters, sentences, and paragraphs instantly", category: "Text Tools", categorySlug: "text", usageCount: "2.4M" },
  { slug: "character-counter", name: "Character Counter", description: "Count characters with and without spaces", category: "Text Tools", categorySlug: "text", usageCount: "1.8M" },
  { slug: "case-converter", name: "Case Converter", description: "Convert text to uppercase, lowercase, title case & more", category: "Text Tools", categorySlug: "text", usageCount: "1.2M" },
  { slug: "lorem-ipsum-generator", name: "Lorem Ipsum Generator", description: "Generate placeholder text for design mockups", category: "Text Tools", categorySlug: "text", usageCount: "890K" },
  { slug: "text-diff-checker", name: "Text Diff Checker", description: "Compare two texts and find differences", category: "Text Tools", categorySlug: "text", usageCount: "450K" },
  { slug: "slug-generator", name: "Text to Slug", description: "Convert text to URL-friendly slugs", category: "Text Tools", categorySlug: "text", usageCount: "340K" },
  { slug: "text-repeater", name: "Text Repeater", description: "Repeat text multiple times with custom separators", category: "Text Tools", categorySlug: "text", usageCount: "280K" },
  { slug: "whitespace-remover", name: "Whitespace Remover", description: "Remove extra whitespace and blank lines from text", category: "Text Tools", categorySlug: "text", usageCount: "320K" },
  { slug: "text-reverser", name: "Text Reverser", description: "Reverse text, words, or sentences instantly", category: "Text Tools", categorySlug: "text", usageCount: "210K" },
  { slug: "find-and-replace", name: "Find & Replace", description: "Find and replace text with regex support", category: "Text Tools", categorySlug: "text", usageCount: "560K" },
  { slug: "line-counter", name: "Line Counter", description: "Count lines and remove duplicates", category: "Text Tools", categorySlug: "text", usageCount: "190K" },
  { slug: "text-to-binary", name: "Text to Binary", description: "Convert text to binary code and vice versa", category: "Text Tools", categorySlug: "text", usageCount: "340K" },

  // ── Video & Audio (9) ──
  { slug: "video-compressor", name: "Video Compressor", description: "Compress video files without losing quality", category: "Video & Audio", categorySlug: "video", usageCount: "1.8M" },
  { slug: "video-converter", name: "Video Converter", description: "Convert between MP4, AVI, MOV, WebM and more", category: "Video & Audio", categorySlug: "video", usageCount: "1.5M" },
  { slug: "video-trimmer", name: "Video Trimmer", description: "Trim and cut video clips to exact length", category: "Video & Audio", categorySlug: "video", usageCount: "1.2M" },
  { slug: "audio-converter", name: "Audio Converter", description: "Convert between MP3, WAV, OGG, AAC formats", category: "Video & Audio", categorySlug: "video", usageCount: "980K" },
  { slug: "audio-trimmer", name: "Audio Trimmer", description: "Trim audio files to exact timestamps", category: "Video & Audio", categorySlug: "video", usageCount: "670K" },
  { slug: "video-to-gif", name: "Video to GIF", description: "Convert video clips to animated GIFs", category: "Video & Audio", categorySlug: "video", usageCount: "2.1M" },
  { slug: "video-to-audio", name: "Video to Audio", description: "Extract audio track from video files", category: "Video & Audio", categorySlug: "video", usageCount: "890K" },
  { slug: "screen-recorder", name: "Screen Recorder", description: "Record your screen directly in the browser", category: "Video & Audio", categorySlug: "video", isNew: true, usageCount: "540K" },
  { slug: "voice-recorder", name: "Voice Recorder", description: "Record audio from your microphone", category: "Video & Audio", categorySlug: "video", usageCount: "430K" },

  // ── Developer Tools (16) ──
  { slug: "json-formatter", name: "JSON Formatter", description: "Format, validate, and beautify JSON data instantly", category: "Developer Tools", categorySlug: "developer", usageCount: "3.1M" },
  { slug: "password-generator", name: "Password Generator", description: "Generate secure random passwords with custom rules", category: "Developer Tools", categorySlug: "developer", usageCount: "1.5M" },
  { slug: "base64-encoder", name: "Base64 Encoder/Decoder", description: "Encode or decode Base64 strings instantly", category: "Developer Tools", categorySlug: "developer", usageCount: "980K" },
  { slug: "qr-code-generator", name: "QR Code Generator", description: "Generate QR codes for any URL or text", category: "Developer Tools", categorySlug: "developer", usageCount: "2.1M" },
  { slug: "color-picker", name: "Color Picker", description: "Pick colors and convert between HEX, RGB, HSL", category: "Developer Tools", categorySlug: "developer", usageCount: "1.1M" },
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate random UUIDs (v4) instantly", category: "Developer Tools", categorySlug: "developer", usageCount: "670K" },
  { slug: "html-formatter", name: "HTML Formatter", description: "Format and beautify HTML code", category: "Developer Tools", categorySlug: "developer", usageCount: "780K" },
  { slug: "css-minifier", name: "CSS Minifier", description: "Minify CSS code to reduce file size", category: "Developer Tools", categorySlug: "developer", usageCount: "540K" },
  { slug: "js-minifier", name: "JS Minifier", description: "Minify JavaScript code for production", category: "Developer Tools", categorySlug: "developer", usageCount: "620K" },
  { slug: "sql-formatter", name: "SQL Formatter", description: "Format and beautify SQL queries", category: "Developer Tools", categorySlug: "developer", usageCount: "450K" },
  { slug: "regex-tester", name: "Regex Tester", description: "Test and debug regular expressions", category: "Developer Tools", categorySlug: "developer", usageCount: "890K" },
  { slug: "unix-timestamp", name: "Unix Timestamp Converter", description: "Convert Unix timestamps to readable dates", category: "Developer Tools", categorySlug: "developer", usageCount: "380K" },
  { slug: "markdown-preview", name: "Markdown Preview", description: "Preview and edit Markdown with live rendering", category: "Developer Tools", categorySlug: "developer", usageCount: "720K" },
  { slug: "jwt-decoder", name: "JWT Decoder", description: "Decode and inspect JSON Web Tokens", category: "Developer Tools", categorySlug: "developer", usageCount: "430K" },
  { slug: "hash-generator", name: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256 hashes", category: "Developer Tools", categorySlug: "developer", usageCount: "560K" },
  { slug: "url-encoder", name: "URL Encoder/Decoder", description: "Encode or decode URLs and query strings", category: "Developer Tools", categorySlug: "developer", usageCount: "490K" },

  // ── Converters (8) ──
  { slug: "csv-to-json", name: "CSV to JSON", description: "Convert CSV data to JSON format", category: "Converters", categorySlug: "converter", usageCount: "780K" },
  { slug: "json-to-csv", name: "JSON to CSV", description: "Convert JSON data to CSV format", category: "Converters", categorySlug: "converter", usageCount: "650K" },
  { slug: "xml-to-json", name: "XML to JSON", description: "Convert XML documents to JSON format", category: "Converters", categorySlug: "converter", usageCount: "540K" },
  { slug: "yaml-to-json", name: "YAML to JSON", description: "Convert YAML to JSON and vice versa", category: "Converters", categorySlug: "converter", usageCount: "430K" },
  { slug: "hex-to-rgb", name: "HEX to RGB", description: "Convert hex color codes to RGB values", category: "Converters", categorySlug: "converter", usageCount: "890K" },
  { slug: "px-to-rem", name: "PX to REM", description: "Convert pixel values to REM units", category: "Converters", categorySlug: "converter", usageCount: "670K" },
  { slug: "number-base-converter", name: "Number Base Converter", description: "Convert between binary, octal, decimal, hex", category: "Converters", categorySlug: "converter", usageCount: "380K" },
  { slug: "temperature-converter", name: "Temperature Converter", description: "Convert between Celsius, Fahrenheit, Kelvin", category: "Converters", categorySlug: "converter", usageCount: "1.2M" },

  // ── Calculators (12) ──
  { slug: "age-calculator", name: "Age Calculator", description: "Calculate exact age from date of birth", category: "Calculators", categorySlug: "calculator", usageCount: "4.2M" },
  { slug: "bmi-calculator", name: "BMI Calculator", description: "Calculate Body Mass Index with health insights", category: "Calculators", categorySlug: "calculator", usageCount: "2.8M" },
  { slug: "percentage-calculator", name: "Percentage Calculator", description: "Calculate percentages, increases, and decreases", category: "Calculators", categorySlug: "calculator", usageCount: "1.9M" },
  { slug: "tip-calculator", name: "Tip Calculator", description: "Calculate tips and split bills easily", category: "Calculators", categorySlug: "calculator", usageCount: "1.3M" },
  { slug: "loan-calculator", name: "Loan Calculator", description: "Calculate monthly payments and total interest", category: "Calculators", categorySlug: "calculator", usageCount: "2.1M" },
  { slug: "mortgage-calculator", name: "Mortgage Calculator", description: "Calculate mortgage payments and amortization", category: "Calculators", categorySlug: "calculator", usageCount: "1.7M" },
  { slug: "compound-interest", name: "Compound Interest Calculator", description: "Calculate compound interest over time", category: "Calculators", categorySlug: "calculator", usageCount: "980K" },
  { slug: "discount-calculator", name: "Discount Calculator", description: "Calculate sale prices and savings", category: "Calculators", categorySlug: "calculator", usageCount: "1.5M" },
  { slug: "gpa-calculator", name: "GPA Calculator", description: "Calculate GPA from your grades", category: "Calculators", categorySlug: "calculator", usageCount: "870K" },
  { slug: "calorie-calculator", name: "Calorie Calculator", description: "Calculate daily calorie needs based on activity", category: "Calculators", categorySlug: "calculator", usageCount: "1.1M" },
  { slug: "time-zone-converter", name: "Time Zone Converter", description: "Convert times between different time zones", category: "Calculators", categorySlug: "calculator", usageCount: "760K" },
  { slug: "date-calculator", name: "Date Calculator", description: "Calculate days between dates or add/subtract days", category: "Calculators", categorySlug: "calculator", usageCount: "650K" },

  // ── SEO & Web (8) ──
  { slug: "meta-tag-generator", name: "Meta Tag Generator", description: "Generate SEO meta tags for your website", category: "SEO & Web", categorySlug: "seo", usageCount: "890K" },
  { slug: "open-graph-generator", name: "Open Graph Generator", description: "Create Open Graph tags for social sharing", category: "SEO & Web", categorySlug: "seo", usageCount: "650K" },
  { slug: "robots-txt-generator", name: "Robots.txt Generator", description: "Generate robots.txt files for search engines", category: "SEO & Web", categorySlug: "seo", usageCount: "430K" },
  { slug: "sitemap-generator", name: "Sitemap Generator", description: "Create XML sitemaps for your website", category: "SEO & Web", categorySlug: "seo", usageCount: "540K" },
  { slug: "keyword-density", name: "Keyword Density Checker", description: "Analyze keyword density in your content", category: "SEO & Web", categorySlug: "seo", usageCount: "380K" },
  { slug: "word-density", name: "Word Density Analyzer", description: "Analyze word frequency and distribution", category: "SEO & Web", categorySlug: "seo", usageCount: "290K" },
  { slug: "ssl-checker", name: "SSL Certificate Checker", description: "Check SSL certificate status and expiry", category: "SEO & Web", categorySlug: "seo", usageCount: "670K" },
  { slug: "favicon-generator", name: "Favicon Generator", description: "Generate favicons for all platforms and sizes", category: "SEO & Web", categorySlug: "seo", usageCount: "780K" },
];

export const popularTools = tools.filter(t =>
  ["word-counter", "json-formatter", "merge-pdf", "image-compressor", "ai-summarizer", "qr-code-generator", "age-calculator", "password-generator"].includes(t.slug)
);

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter(t => t.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getCategoryByRoutePath(routePath: string): Category | undefined {
  return categories.find(c => c.routePath === routePath);
}
