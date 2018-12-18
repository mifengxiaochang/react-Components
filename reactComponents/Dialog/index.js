import React from 'react';
import DialogContent from './dialog';

class Dialog extends React.Component {
  render() {
    return (
      <DialogContent {...this.props}>
        {this.props.children}
      </DialogContent>
    );
  }
}
export default Dialog;

