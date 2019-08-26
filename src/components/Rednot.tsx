import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import Notification from '../store/Notification';

interface Props {
  notifications: Notification[]
  componentClassName?: string,
  CustomComponent?: any,
  timeout: 600,
}

const Rednot = (props: Props) => {
  const {
    notifications, componentClassName, timeout, CustomComponent,
  } = props;
  const renderedNotifications = notifications.map((n: Notification) => {
    let innerComponent = (
      <div className={n.className || 'rednot--notification'}>
        {n.message}
      </div>
    );
    if (CustomComponent) {
      innerComponent = (
        <CustomComponent notification={n} />
      );
    }
    return (
      <CSSTransition
        in
        key={n.id}
        classNames={componentClassName}
        timeout={timeout}
      >
        {innerComponent}
      </CSSTransition>
    );
  });

  return (
    <div className={`${componentClassName}--container`}>
      <TransitionGroup>
        {renderedNotifications}
      </TransitionGroup>
    </div>
  );
};

Rednot.defaultProps = {
  componentClassName: 'rednot',
  CustomComponent: null,
  timeout: 600,
};

Rednot.propTypes = {
  componentClassName: PropTypes.string,
  CustomComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
  timeout: PropTypes.number,
};

export const mapStateToProps = (state: any) => ({
  notifications: state.rednot,
});

export default connect(mapStateToProps)(Rednot as any);
