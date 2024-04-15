import { Divider, Modal, message } from "antd";
import moment from "moment";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteNotification } from "../apicalls/notifications";
import { SetLoader } from "../redux/loadersSlice";

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotification,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteNotification = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotification(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <Modal
      title="Notifications"
      open={showNotification}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={500}
    >
      <div className="flex flex-col my-4 gap-2">
        {notifications.map((notification) => (
          <div
            className="p-4 rounded-md border border-gray-200 flex flex-col gap- cursor-pointer"
            key={notification._id}
          >
            <div className="flex justify-between items-center">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
              >
                <h1 className="font-medium text-gray-800">
                  {notification.title}
                </h1>
                <span className="text-gray-600">{notification.message}</span>
                <h1 className="text-gray-600 text-sm">
                  {moment(notification.createdAt).fromNow()}
                </h1>
              </div>
              <RiDeleteBin6Line
                onClick={() => {
                  deleteNotification(notification._id);
                }}
                size={18}
              />
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
