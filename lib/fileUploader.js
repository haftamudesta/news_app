import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_PROJECT_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});
export default async function fileUploader(file, fileType) {
  try {
    if (!file || !fileType) {
      throw new Error('Both file and fileType parameters are required');
    }

    let buffer;
    if (file.arrayBuffer) {
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
    } else if (Buffer.isBuffer(file)) {
      buffer = file;
    } else {
      throw new Error('Unsupported file type. Expected File or Buffer');
    }
    const timestamp = Date.now();
    const originalName = file.name || `file-${timestamp}`;
    const sanitizedName = originalName
      .replace(/[^\w.-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    const ext = originalName.split('.').pop() || '';
    const publicId = `${fileType}/${sanitizedName}-${timestamp}${ext ? `.${ext}` : ''}`;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          folder: fileType,
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto'
          },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(new Error(`Failed to upload file: ${error.message}`));
          } else {
            resolve(result.secure_url);
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error(`File upload failed: ${error.message}`);
  }
}