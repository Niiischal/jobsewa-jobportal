import { Divider, Modal } from "antd";
import React from "react";

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotification,
  setShowNotifications,
}) {
  return (
    <Modal
      title="Notifications"
      open={showNotification}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div className="flex flex-col border border-solid p-2 border-gray-300 rounded">
            <h1 className="text-gray-700">{notification.title}</h1>
            <span className="text-gray-500">{notification.message}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
