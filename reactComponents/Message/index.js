/**
 * Meaage
 * content: 提示内容(string|ReactNode)
 * duration: 自动关闭的延时，单位秒。设为 0 时不自动关闭(number)
 * onClose: 关闭时触发的回调函数(Function)
 * 类型：info,error,warning,success
 * eg:
 * import message from 'components/Message';
 * message.error('主题已选');
*/
import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message';
import './style.less';


const createNotification = async () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const noticeCompoment = await ReactDOM.render(
    <Message />,
    div);
  return {
    addNotice(notice) {
      return noticeCompoment.addNotice(notice);
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  };
};


let notification;
const notice = async (type, content, duration = 2000, onClose) => {
  if (!notification) {
    notification = await createNotification();
  }
  return notification.addNotice({ type, content, duration, onClose });
};

export default {
  info(content, duration, onClose) {
    return notice('info', content, duration, onClose);
  },
  success(content = '操作成功', duration, onClose) {
    return notice('success', content, duration, onClose);
  },
  error(content, duration, onClose) {
    return notice('error', content, duration, onClose);
  },
  warning(content, duration, onClose) {
    return notice('warning', content, duration, onClose);
  },

};
