import type { DesignFileType } from "@/entities/works/model";

/**
 * Human-readable labels for each design file type.
 */
export function getFileTypeLabel(fileType: DesignFileType): string {
  switch (fileType) {
    case "image": return "Image";
    case "video": return "Video";
    case "psd": return "Photoshop";
    case "ai": return "Illustrator";
    case "figma": return "Figma";
    case "sketch": return "Sketch";
    case "pdf": return "PDF";
    case "other": return "File";
    default: return "File";
  }
}

/**
 * Short uppercase badge label for the card overlay.
 */
export function getFileTypeBadge(fileType: DesignFileType): string {
  switch (fileType) {
    case "image": return "IMG";
    case "video": return "VIDEO";
    case "psd": return "PSD";
    case "ai": return "AI";
    case "figma": return "FIGMA";
    case "sketch": return "SKETCH";
    case "pdf": return "PDF";
    case "other": return "FILE";
    default: return "FILE";
  }
}

/**
 * Format file size in bytes to human-readable string.
 */
export function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Whether the file type can be previewed directly in the browser.
 */
export function isPreviewableInBrowser(fileType: DesignFileType): boolean {
  return fileType === "image" || fileType === "video" || fileType === "pdf";
}

/**
 * Accept configuration for react-dropzone that includes all supported design formats.
 */
export const DESIGN_FILE_ACCEPT: Record<string, string[]> = {
  "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".bmp", ".tiff", ".tif"],
  "video/*": [".mp4", ".mov", ".avi", ".webm", ".mkv", ".wmv"],
  "image/vnd.adobe.photoshop": [".psd"],
  "application/x-photoshop": [".psd"],
  "application/postscript": [".ai", ".eps"],
  "application/pdf": [".pdf"],
  "application/octet-stream": [".fig", ".sketch"],
};
