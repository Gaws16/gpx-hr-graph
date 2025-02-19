"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const FileUpload = ({
  onFileUpload,
}: {
  onFileUpload: (files: FileList) => void;
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
      onFileUpload(event.target.files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border border-dashed rounded-lg">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".gpx"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Button to Trigger File Upload */}
      <Button onClick={handleButtonClick}>Upload GPX Files</Button>

      {files && <p>{files.length} file(s) selected</p>}
    </div>
  );
};

export default FileUpload;
