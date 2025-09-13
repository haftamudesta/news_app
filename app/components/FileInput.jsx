import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import Image from "next/image";

const FileInput = ({ name, required, selectedFile, setSelectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
        };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
 const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className={`flex flex-col items-center justify-center w-full border-2 rounded-lg ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-700"
        } border-dashed min-h-[200px] cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="p-2">
             <Image
              src={selectedFile}
              alt="Preview"
              width={192}
              height={192}
              className="w-48 h-48 object-cover rounded-lg shadow-lg shadow-black"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-gray-400">
            <MdCloudUpload className="w-12 h-12 mb-2" />
            <span className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and drop
               </span>
            <span className="text-xs">PNG, JPG (Max. 5MB)</span>
          </div>
        )}
        <input
          type="file"
          id={name}
          name={name}
          ccept="image/png,image/jpeg,imaage/jpg"
          onChange={handleFileChange}
          required={required}
          className="sr-only"
        />
      </label>
      
    </div>
  );
  };

export default FileInput;