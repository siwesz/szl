// fileUpload.js
export const getFileExtension = (file) => {
  // Get file extension from mime type
  const mimeToExt = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/heic': 'heic',
    'image/heif': 'heif'
  };
  
  return mimeToExt[file.type] || 'jpg'; // Default to jpg if unknown
};

export const validateImageFile = (file) => {
  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/heic',
    'image/heif'
  ];

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload an image file.');
  }

  // 10MB size limit
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    throw new Error('File too large. Maximum size is 10MB.');
  }

  return true;
};

export const dataURLtoBlob = async (dataUrl) => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return blob;
};