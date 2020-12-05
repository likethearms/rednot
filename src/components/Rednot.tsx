import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Notification from '../store/Notification';

interface Props {
  componentClassName?: string;
  CustomComponent?: any;
  timeout: number;
}

const Rednot = (props: Props): JSX.Element => {
  const nodeRef = React.useRef(null);

  const { componentClassName, timeout, CustomComponent } = props;

  const notifications = useSelector((state: any) => state.rednot);

  const renderedNotifications = notifications.map((n: Notification) => {
    let innerComponent = <div className={n.className || 'rednot--notification'}>{n.message}</div>;
    if (CustomComponent) {
      innerComponent = <CustomComponent notification={n} />;
    }
    return (
      <CSSTransition
        nodeRef={nodeRef}
        in
        key={n.id}
        classNames={componentClassName}
        timeout={timeout || 600}
      >
        <div ref={nodeRef}>{innerComponent}</div>
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
