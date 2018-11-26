import React from 'react';
import styles from './style.less';
import './icons';

export default class Message extends React.Component {
  constructor() {
    super();
    this.transitionTime = 3000;
    this.state = { notices: [] };
    this.removeNotice = this.removeNotice.bind(this);
  }

  getNoticeKey() {
    const { notices } = this.state;
    return `notice-${new Date().getTime()}-${notices.length}`;
  }

  addNotice(notice) {
    const theNotice = notice;
    const { notices } = this.state;
    theNotice.key = this.getNoticeKey();

    notices.push(notice);// 展示所有的提示
    // notices[0] = theNotice;// 仅展示最后一个提示

    this.setState({ notices });
    if (theNotice.duration > 0) {
      setTimeout(() => {
        this.removeNotice(notice.key);
      }, theNotice.duration);
    }
    return () => { this.removeNotice(notice.key); };
  }

  removeNotice(key) {
    const { notices } = this.state;
    this.setState({
      notices: notices.filter((notice) => {
        if (notice.key === key) {
          if (notice.onClose) setTimeout(notice.onClose, this.transitionTime);
          return false;
        }
        return true;
      }),
    });
  }

  render() {
    const { notices } = this.state;
    const icons = {
      info: 'message_info',
      success: 'message_success',
      error: 'message_error',
      warning: 'message_warning',
    };

    return (
      <div className={styles.message_wrap}>
        {
          notices.map((notice) => {
          return (
            <div className={styles.message_bg} key={notice.key}>
              <div className={styles.message_box}>
                <svg className={`${styles.message_icon} ${styles[icons[notice.type]]}`} aria-hidden="true">
                  <use xlinkHref={`#${icons[notice.type]}`} />
                </svg>
                <span className={styles.message_text}>{notice.content}</span>
              </div>
            </div>);
            })
        }
      </div>
    );
  }
}
