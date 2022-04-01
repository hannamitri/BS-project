import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mantine/core";

export default function MyDropzone({ uplImage }) {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <Button
      {...getRootProps()}
      variant="outline"
      fullWidth
      style={{ marginTop: 28 }}
    >
      <input
        aria-label=""
        onChange={(event) => {
          console.log("hi");
          console.log(event);
          uplImage(event);
        }}
        type="file"
      />
      <p>Input files here</p>
    </Button>
  );
}
