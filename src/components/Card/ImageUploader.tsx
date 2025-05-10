import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image, Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, currentImage }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5242880, // 5MB
    maxFiles: 1
  });

  return (
    <div className="mt-4 relative">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer
          ${isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-400 hover:bg-pink-50/50'}`}
      >
        <input {...getInputProps()} />
        
        {currentImage ? (
          <div className="relative">
            <img 
              src={currentImage} 
              alt="Uploaded preview" 
              className="mx-auto h-40 object-contain rounded"
            />
            <p className="text-xs text-pink-600 mt-2">
              Drop a new image to replace
            </p>
          </div>
        ) : (
          <div className="py-4">
            <Image className="w-10 h-10 mx-auto mb-2 text-pink-400" />
            <p className="text-sm text-pink-600">
              {isDragActive ? 
                "Drop the image here..." : 
                "Drag & drop an image, or click to select"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG or GIF (max 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;