import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../shadcn-ui/ui/alert-dialog";

type CustomAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  loading?: boolean;
};

export function CustomAlertDialog({
  open,
  title,
  description,
  confirmLabel,
  onConfirm,
  onOpenChange,
  cancelLabel,
  loading,
}: CustomAlertDialogProps) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-primary-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-4">{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} className="bg-gray-3">
            {cancelLabel || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-500"
          >
            {confirmLabel || "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
