import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mantine/core";

export default function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log("Works");
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Button
      {...getRootProps()}
      variant="outline"
      fullWidth
      style={{ marginTop: 28 }}
    >
      <input {...getInputProps()} />
      <p>Input files here</p>
    </Button>
  );
}
