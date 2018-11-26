/**
 * show: 是否展示遮罩(Boolean)
 * title: 标题(string|ReactNode)
 * zIndex: 设置 Modal 的 z-index。(Number)
 * onOk: 点击确定回调(function(e))
 * onCancel: 点击遮罩层或右上角叉或取消按钮的回调(function(e))
 * cancelText：取消按钮文字(string)
 * okText：确定按钮文字(string)
*/
import React from 'react';
import styles from './style.less';

const defaultProps = {
  show: false,
  title: '',
  zIndex: 1000,
  onOk: () => {},
  onCancel: () => {},
  cancelText: '取消',
  okText: '确定',
};

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }

  render() {
    const { title, zIndex, onOk, onCancel, okText, cancelText } = this.props;
    document.body.style = this.state.show ? 'overflow: hidden' : '';
    return (
      <div
        style={{ display: this.state.show ? null : 'none' }}
      >
        <div className={styles['m-mask']} style={{ zIndex: zIndex - 1 }} />
        <div className={styles['m-dialog']} style={{ zIndex: zIndex }}>
          <div className={styles['md-dialog']}>
            <div className={styles['md-dialog-title']}>
              <h4>{title}</h4>
              <span className={styles.btn}>
                <i className={styles.iconfont} onClick={onCancel.bind(this)}>&times;</i>
              </span>
            </div>
            <div className={styles['md-dialog-content']}>
              {this.props.children}
            </div>
            <div className={styles['md-dialog-foot']}>
              <button className={styles.btns} onClick={onCancel.bind(this)}><span>{cancelText}</span></button>
              <button className={`${styles.btns} ${styles['btns-blue']}`} onClick={onOk.bind(this)}><span>{okText}</span></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = defaultProps;
