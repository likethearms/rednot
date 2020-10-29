import React from 'react';
import { connect } from 'react-redux';
import { RednotAction } from '../index';

class App extends React.PureComponent<any> {
  render() {
    const { showMessage, showCustomMessage, showSuccessMessage } = this.props;

    return (
      <div>
        <h1>Hello World!</h1>
        <button type="button" onClick={showMessage}>
          showMessage
        </button>
        <button type="button" onClick={showCustomMessage}>
          showCustomMessage
        </button>
        <button type="button" onClick={showSuccessMessage}>
          showSuccessMessage
        </button>
      </div>
    );
  }
}

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nibh mauris, dapibus non tristique et, lobortis at ipsum. Duis eget libero sit amet lacus scelerisque viverra.';

const mapDispatchToProps = (dispatch: any) => ({
  showMessage: () =>
    dispatch(
      RednotAction.notifSend({
        message: text,
        dismissAfter: 5000,
        className: 'alert alert-primary',
      })
    ),
  showCustomMessage: () => dispatch(RednotAction.notifSend({ message: text, dismissAfter: 5000 })),
  showSuccessMessage: () => dispatch(RednotAction.success(text)),
});

export default connect(null, mapDispatchToProps)(App);
