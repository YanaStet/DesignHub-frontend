import { toast } from "sonner";
import { Icon } from "../shadcn-ui/ui/icon";
import { Typography } from "../shadcn-ui/ui/typography";

const iconMap = {
  success: (
    <Icon name="TickOutlined" className="text-green-2 min-w-6" fontSize={24} />
  ),
  error: (
    <Icon name="CrossOutlined" className="text-red-2 min-w-6" fontSize={24} />
  ),
  warning: (
    <Icon name="Warning" className="text-yellow-2 min-w-6" fontSize={24} />
  ),
};

type ToastType = keyof typeof iconMap;

interface CustomToastProps {
  type: ToastType;
  message: string;
  action?: { label: string; onClick: () => void };
  id: string | number;
}

const CustomToastContent = ({
  type,
  message,
  action,
  id,
}: CustomToastProps) => {
  const iconElement = iconMap[type];

  return (
    <div className="flex justify-between sm:items-center pl-2 shadow-lg w-full bg-gray-1 text-gray-8 min-w-[149px] min-h-[40px] rounded-[8px]">
      <div className="flex items-center gap-3 py-2">
        {iconElement}
        <Typography variant="body3" className="text-gray-8 pr-2">
          {message}
        </Typography>
      </div>
      <div className="flex items-center gap-2 h-10">
        {action && (
          <button
            onClick={action.onClick}
            className="text-gray-8 cursor-pointer bg-gray-2 text-sm font-medium px-2 py-1 rounded-md hover:bg-gray-3 transition-colors duration-200"
          >
            {action.label}
          </button>
        )}
        <button
          onClick={() => toast.dismiss(id)}
          className="flex items-center justify-center h-full hover:text-gray-8 transition-colors duration-200 ml-2 border-l border-gray-2 cursor-pointer px-3"
        >
          <Icon
            name="Cross"
            className="w-4 h-4 text-gray-3 hover:text-gray-4 transition-colors duration-200"
            color="gray-2"
          />
        </button>
      </div>
    </div>
  );
};

export const showToast = (
  type: ToastType,
  message: string,
  action?: { label: string; onClick: () => void }
) => {
  toast.custom(
    (id) => (
      <CustomToastContent
        type={type}
        message={message}
        action={action}
        id={id}
      />
    ),
    {
      position: "bottom-center",
    }
  );
};
