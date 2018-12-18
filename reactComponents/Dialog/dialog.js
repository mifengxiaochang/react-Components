/**
 * open: 是否展示遮罩(Boolean)
 * title: 标题(string|ReactNode)
 * zIndex: 设置 Modal 的 z-index。(Number)
 * width: dialog宽度，默认500px(String)
 * height ：dialog高度，默认500px(String)
 * hasOkBtn: 是否有确定按钮(Boolean)
 * hasCancelBtn ：是否有取消按钮(Boolean)
 * onOk: 点击确定回调(function(e))
 * onCancel: 点击遮罩层或右上角叉或取消按钮的回调(function(e))
 * cancelText ：取消按钮文字(string)
 * closeFun: 关闭遮罩按钮
 * okText ：确定按钮文字(string)
*/
import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const defaultProps = {
  zIndex: 500,
  width: '500px',
  height: '500px',
  hasOkBtn: false,
  hasCancelBtn: false,
};
const propTypes = {
  zIndex: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  hasOkBtn: PropTypes.bool,
  hasCancelBtn: PropTypes.bool,
};

class DialogContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.open,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.open });
  }

  render() {
    const { zIndex } = this.props;// title, onOk, onCancel, okText, cancelText
    return (
      <div
        style={{ display: this.state.show ? null : 'none' }}
      >
        <div className={styles['m-mask']} style={{ zIndex: zIndex - 1 }} />
        <div className={styles.dialogDiv} style={{ width: `${this.props.width}`, height: `${this.props.height}` }}>
          <div className={styles.dialogTitle}>  {this.props.title}
            <span className={styles.closeBtn} onClick={this.props.closeFun}>&times;</span>
          </div>
          <div className={styles.dialogContent}>
            {this.props.children}
          </div>
          <div className={styles.dialogAction}>
            {this.props.hasOkBtn && <button onClick={this.props.onOk}>{this.props.okText}</button>}
            {this.props.hasCancelBtn && <button onClick={this.props.onCancel}>{this.props.cancelText}</button>}
          </div>
        </div>
      </div>
    );
  }
}
export default DialogContent;
DialogContent.defaultProps = defaultProps;
DialogContent.propTypes = propTypes;

