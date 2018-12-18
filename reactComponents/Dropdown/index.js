/**
 * @export
 * @class Dropdown
 * @extends {React.PureComponent}
 * className: 类名(string|null)
 * data: 数据数组(Array|null)
 * defaultValue: 指定默认选中的条目(string | number),类型需与data中name字段类型保持一致。
 * onChange: 选中下拉列表中某一项时调用此函数(function(value))
 * animateType: 下拉列表展开动画效果(string|null)
*/
import React from 'react';
import './style.less';
import styles from './animate.less';

export default class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataList: this.props.data,
      isChoose: false,
      curWord: this.props.defaultValue || '',
      open: false,
      direction: 'top',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickSelect = this.handleClickSelect.bind(this);
  }

  handleBlur = () => {
    this.setState({
      open: false,
    });
  }

  handleClickSelect = () => {
    const { open } = this.state;
    const { id } = this.props;
    const windowHeight = 768;
    const itemHeight = 20;
    const padding = 12;
    const border = 4;
    const ele = document.getElementById(id);
    const top = ele.getBoundingClientRect().bottom;
    const dataListHeight = this.state.dataList ? this.state.dataList.length : 0;
    const wrapperHeight = (dataListHeight * itemHeight) + (padding * 2) + border;
    console.log(top);
    console.log(wrapperHeight);
    const direction = (windowHeight - top) > wrapperHeight ? 'top' : 'bottom';
    this.setState({
      open: !open,
      direction: direction,
    });
  }

  handleClick = (value) => {
    const { open } = this.state;
    this.setState({
      curWord: value.name,
      open: !open,
    });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleData = (value) => {
    let { data } = this.props;
    let returnData = '';
    if (data && data.length > 0) {
      data = data.map((val) => {
        return val.name;
      });
      returnData = data.includes(value) ? value : data[0];
    }
    return returnData;
  }

  renderList = () => {
    const { data, animateType } = this.props;
    const haveData = data && data.length > 0;
    const { direction } = this.state;
    const animate = this.state.open ? styles[animateType || 'flipInX'] : '';
    let { curWord } = this.state;
    curWord = this.handleData(curWord);
    let node;
    if (haveData) {
      node = (
        <div className={`drop-down-content ${direction} ${animate}`}>
          {
            data.map((value) => {
              return (
                <div className="item" key={value.key} onClick={() => { this.handleClick(value); }}>
                  <span className={curWord === value.name ? 'checked' : ''} />
                  <span className="item-word" title={value.name} key={value.key}>{value.name}</span>
                </div>
              );
            })
          }
        </div>
      );
    } else {
      node = (
        <div className={`drop-down-content ${direction} ${animate}`}>
          <span className="nodata">暂无数据</span>
        </div>
      );
    }
    return node;
  }

  render() {
    /* eslint-disable */
    const { className, id } = this.props;
    const open = this.state.open ? 'open' : '';
    let { curWord } = this.state;
    curWord = this.handleData(curWord);
    return (
      <div className={`drop-down ${open} ${className || ''}`} onBlur={this.handleBlur} tabIndex={0} >
        <div id={id} className="drop-down-word" onClick={this.handleClickSelect}>
          <span title={curWord}>{curWord}</span>
        </div>
        {this.renderList()}
      </div>
    );
    /* eslint-disable */
  }
}
