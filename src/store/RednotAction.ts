import { getErrorMessage } from 'loopback-error-parser';
import { Dispatch } from 'redux';
import Notification from './Notification';

export const NOTIF_SEND = 'NOTIF_SEND';
export const NOTIF_DISMISS = 'NOTIF_DISMISS';
export const NOTIF_CLEAR = 'NOTIF_CLEAR';

const dismissAfter = 3500;

export default class RednotAction {
  static notif(className: string) {
    return (message: string) => (dispatch: Function) => {
      dispatch(RednotAction.notifSend({ message, dismissAfter, className }));
    };
  }

  static error = RednotAction.notif('alert alert-danger');

  static success = RednotAction.notif('alert alert-primary');

  static onError = (e: Error, dispatch: Function) =>
    dispatch(RednotAction.error(getErrorMessage(e)));

  /**
   * Clear all notifications
   */
  static notifClear() {
    return { type: NOTIF_CLEAR };
  }

  /**
   * Dismiss a notification by the given id.
   */
  static notifDismiss(id: number) {
    return { type: NOTIF_DISMISS, payload: id };
  }

  /**
   * Publish a notification,
   * - if `dismissAfter` was set, the notification will be auto dismissed after the given period.
   * - if id wasn't specified, a time based id will be generated.``
   */
  static notifSend(notif: Notification) {
    const payload = notif;
    if (!payload.id) payload.id = new Date().getTime();
    return (dispatch: Dispatch) => {
      dispatch({ type: NOTIF_SEND, payload });

      if (payload.dismissAfter) {
        setTimeout(() => {
          dispatch({
            type: NOTIF_DISMISS,
            payload: payload.id,
          });
        }, payload.dismissAfter);
      }
    };
  }
}
