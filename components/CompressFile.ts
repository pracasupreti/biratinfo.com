export const resizeAndCompressImage = (
  file: File,
  targetWidth: number,
  targetHeight: number,
  quality = 0.8 // Compression quality (0 to 1), where 1 = highest quality, no compression
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image(); // Create a new HTMLImageElement
    const reader = new FileReader(); // Used to read the file as a data URL (base64)

    // When file is read, set the result (data URL) as the image source
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    // Once the image is fully loaded
    img.onload = () => {
      // Create a <canvas> element for resizing
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;   // Set desired width
      canvas.height = targetHeight; // Set desired height

      // Get the 2D drawing context of the canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Canvas context error');

      // Draw the image onto the canvas, scaled to the new width & height
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Convert the canvas content to a Blob (compressed image data)
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject('Image compression failed');

          // Convert the Blob back into a File object so it can be uploaded
          const resizedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });

          resolve(resizedFile); // Return the resized + compressed image file
        },
        'image/jpeg', // You can change to 'image/webp' or 'image/png' if needed
        quality       // Compression level (default: 0.8 = 80% quality)
      );
    };

    // Handle errors during image loading
    img.onerror = () => reject('Image load error');

    // Handle errors during file reading
    reader.onerror = () => reject('File read error');

    // Start reading the file as a Data URL (triggers onload above)
    reader.readAsDataURL(file);
  });
};
