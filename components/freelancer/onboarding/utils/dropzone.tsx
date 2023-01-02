import { useEffect } from "react";
import { useDropzone } from "React-dropzone";

function Dropzone({ open, setAcceptedImage }: any) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});

  useEffect(() => {
    setAcceptedImage(acceptedFiles);
  }, [acceptedFiles]);

  return (
    <div
      {...getRootProps({
        className: "w-20 h-20 rounded-full bg-gray-200 relative",
      })}
    >
      <input className="input-zone" {...getInputProps()} />
      <div className="flex absolute top-0 bottom-0 left-0 right-0 items-center justify-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5  text-teal-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>
    </div>
  );
}

export default Dropzone;
