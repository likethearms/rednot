import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Notification from '../store/Notification';

interface Props {
  componentClassName?: string;
  CustomComponent?: any;
  timeout: 600;
}

const Rednot = (props: Props): JSX.Element => {
  const { componentClassName, timeout, CustomComponent } = props;

  const notifications = useSelector((state: any) => state.rednot);

  const renderedNotifications = notifications.map((n: Notification) => {
    let innerComponent = <div className={n.className || 'rednot--notification'}>{n.message}</div>;
    if (CustomComponent) {
      innerComponent = <CustomComponent notification={n} />;
    }
    return (
      <CSSTransition in key={n.id} classNames={componentClassName} timeout={timeout}>
        {innerComponent}
      </CSSTransition>
    );
  });

  return (
    <div className={`${componentClassName}--container`}>
      <TransitionGroup>{renderedNotifications}</TransitionGroup>
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
  CustomComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.element]),
  timeout: PropTypes.number,
};

export default Rednot;
