import Alert from "src/design-system/atoms/Alert";
import { useNotifications } from "../../providers/NotificationsContext";

export const NotificationManager = () => {
  const { notifications, clearNotification } = useNotifications();
  return (
    <>
      {notifications.map(({ id, message, variant }) => (
        <Alert key={id} status={variant} onClick={() => clearNotification(id)}>
          {message}
        </Alert>
      ))}
    </>
  );
};
