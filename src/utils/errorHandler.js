// Error handling utilities

/**
 * Shows a user-friendly error message
 * @param {string} message - Error message to display
 * @param {string} _type - Type of error (error, warning, info) - currently unused
 */
// eslint-disable-next-line no-unused-vars
export const showError = (message, _type = "error") => {
  // For now, using alert. Can be replaced with toast notifications later
  alert(message);
};

/**
 * Validates file before upload
 * @param {File} file - File to validate
 * @returns {Object} { isValid: boolean, error: string | null }
 */
export const validateFile = (file) => {
  if (!file) {
    return { isValid: false, error: "No file selected." };
  }

  // Check file type
  if (file.type !== "application/pdf") {
    return { isValid: false, error: "Please upload a PDF file only." };
  }

  // Check file size (5MB max)
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    return { isValid: false, error: "File size must be less than 5MB." };
  }

  return { isValid: true, error: null };
};

/**
 * Formats file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

