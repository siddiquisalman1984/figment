import Alert from "../../../design-system/atoms/Alert";
import { useNotifications } from "../../providers/NotificationsContext";
import { NotificationIcon } from "./NotificationIcon";

export const NotificationManager = () => {
  const { notifications, clearNotification } = useNotifications();
  return (
    <div className="mb-4">
      {notifications.map(({ id, message, variant }) => (
        <Alert
          key={id}
          status={variant}
          onClick={() => clearNotification(id)}
          icon={<NotificationIcon variant={variant} />}
        >
          {message}
        </Alert>
      ))}
    </div>
  );
};
