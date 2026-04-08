import clsx from "clsx";
import { X } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "../shadcn-ui/ui/typography";

interface FileUploadFieldProps {
    value: File | null;
    onChange: (file: File | null) => void;
    accept: Record<string, string[]>;
    label: string;
    icon: React.ReactNode;
    error?: string;
}

export const FileUploadField = ({
    value,
    onChange,
    accept,
    label,
    icon,
    error,
}: FileUploadFieldProps) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onChange(acceptedFiles[0]);
            }
        },
        [onChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles: 1,
        multiple: false,
    });

    if (value) {
        return (
            <div className="max-w-full min-w-0">
                <div className="relative flex items-center p-4 border rounded-lg bg-green-50 border-green-200 gap-3 h-21">
                    <div className="w-4 h-5 text-green-300 mb-2">{icon}</div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate w-full">
                            {value.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {(value.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => onChange(null)}
                        className="p-1 hover:bg-green-200 rounded-full transition"
                    >
                        <X size={16} className="text-green-700" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div
                {...getRootProps()}
                className={clsx(
                    "flex flex-col items-center justify-center w-full h-21 border rounded-lg cursor-pointer transition-colors",
                    isDragActive
                        ? "border-neutral-600 bg-neutral-800"
                        : "border-neutral-600 bg-neutral-800 hover:bg-neutral-600",
                    error && "border-red-500 bg-neutral-700",
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                    <div className="w-4 h-5 text-white mb-2">{icon}</div>
                    <Typography variant="body3" className="text-neutral-400">
                        Drag & drop
                    </Typography>
                    <Typography variant="body4" className="text-neutral-500 ">
                        {isDragActive ? "Drop here" : label}
                    </Typography>
                </div>
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};