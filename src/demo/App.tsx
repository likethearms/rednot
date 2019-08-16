import React from 'react';
import { connect } from 'react-redux';
import { notifSend } from '../index';

class App extends React.PureComponent<any> {
  render() {
    const { showMessage } = this.props;
    return (
      <div>
        <h1>Hello World!</h1>
        <button type="button" onClick={showMessage}>click</button>
      </div>
    );
  }
}

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nibh mauris, dapibus non tristique et, lobortis at ipsum. Duis eget libero sit amet lacus scelerisque viverra.';

const mapDispatchToProps = (dispatch: any) => ({
  showMessage: () => dispatch(notifSend({ message: text, dismissAfter: 5000, className: 'alert alert-primary' })),
  showCustomMessage: () => dispatch(notifSend({ message: text, dismissAfter: 5000 })),
});

export default connect(null, mapDispatchToProps)(App);
