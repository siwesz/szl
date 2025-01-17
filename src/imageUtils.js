// src/utils/fileUtils.js
export const getFileExtension = (file) => {
  const mimeToExt = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/heic': 'heic'
  };
  return mimeToExt[file.type] || 'jpg';
};

export const dataURLtoBlob = async (dataUrl) => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return blob;
};

export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic'];
  
  if (!validTypes.includes(file.type)) {
    throw new Error('Please upload an image file (JPEG, PNG, GIF, WebP, or HEIC)');
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('Image must be smaller than 10MB');
  }
  
  return true;
};