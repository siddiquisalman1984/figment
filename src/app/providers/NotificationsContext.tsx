import * as React from "react";
import { ComponentStatus } from "../../design-system/types";
import { v4 as uuid } from "uuid";

import useInterval from "../hooks/useInterval";
import { DEFAULT_TIMEOUT, INTERVAL } from "../constants";
// Based on eng.tatari.tv
interface Notification {
  id: string;
  message: string | React.ReactNode;
  variant: ComponentStatus;
  timestamp: number;
  timeout?: number | null; // pass in null for no timeout
}

type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> &
  Pick<T, TRequired>;
type AddNotification = OptionalExceptFor<Notification, "message">;

const defaultApi = {
  notifications: [] as Notification[],
  setNotification: (_: AddNotification) => null,
  clearNotification: (_?: string | string[]) => null,
};

export type NotificationsContextApi = typeof defaultApi;

/**
 * Create Context
 */
export const NotificationsContext =
  React.createContext<NotificationsContextApi>(defaultApi);

/**
 * Custom Notifications Provider
 */
export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = React.useState<Notification[]>(
    defaultApi.notifications
  );

  // Append a new notification (or override existing by id)
  const setNotification = React.useCallback(
    (notification: AddNotification) => {
      const existing = notifications.find((n) => n.id === notification.id);
      const nextNotifications = existing
        ? notifications.map((n) =>
            n.id === notification.id ? { ...existing, ...notification } : n
          )
        : notifications.concat({
            id: uuid(),
            timestamp: new Date().getTime(),
            variant: "error",
            ...notification,
          });
      setNotifications(nextNotifications);
    },
    [notifications, setNotifications]
  );

  // Clear notification(s) by id, or clear ALL notifications
  const clearNotification = React.useCallback(
    (id?: string | string[]) => {
      if (!id) {
        setNotifications([]);
      } else {
        const ids = Array.isArray(id) ? id : [id];
        const nextNotifications = notifications.filter(
          ({ id }) => !ids.includes(id)
        );
        setNotifications(nextNotifications);
      }
    },
    [notifications, setNotifications]
  );

  // Set up interval to auto-expire notifications
  const handleExpireNotifications = React.useCallback(() => {
    const currentTime = new Date().getTime();
    if (notifications.length) {
      const expiredIds = notifications.reduce((acc, n) => {
        const isExpired =
          n.timestamp <= currentTime - (n.timeout || DEFAULT_TIMEOUT);
        return isExpired && n.timeout !== null ? acc.concat(n.id) : acc;
      }, []);
      if (expiredIds.length) {
        clearNotification(expiredIds);
      }
    }
  }, [notifications, clearNotification]);

  useInterval(handleExpireNotifications, INTERVAL);

  // Return Provider with Notifications API
  return (
    <NotificationsContext.Provider
      value={
        {
          notifications,
          setNotification,
          clearNotification,
        } as NotificationsContextApi
      }
    >
      {children}
    </NotificationsContext.Provider>
  );
}

// Convenience import hook
export function useNotifications() {
  return React.useContext(NotificationsContext);
}
