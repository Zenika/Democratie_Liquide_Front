import NotificationArea from '../NotificationArea';

class MessageManager {

  displayMessage(response, messageSuccess) {
    if (response.isInError) {
      NotificationArea.notifyError(response.msg);
    } else {
      NotificationArea.notifySuccess(messageSuccess);
    }
  }
}

export default new MessageManager();
