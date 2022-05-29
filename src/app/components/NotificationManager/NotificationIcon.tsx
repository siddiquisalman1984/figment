import { ComponentStatus } from "../../../design-system/types";
import {
  ExclamationIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";

export interface NotificationIconProps {
  readonly variant: ComponentStatus;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  variant,
}) => {
  return (
    <>
      {variant === "warning" && <ExclamationIcon className="h-5 w-5" />}
      {variant === "info" && <InformationCircleIcon className="h-5 w-5" />}
      {variant === "error" && <ExclamationCircleIcon className="h-5 w-5" />}
      {variant === "success" && <CheckCircleIcon className="h-5 w-5" />}
    </>
  );
};
