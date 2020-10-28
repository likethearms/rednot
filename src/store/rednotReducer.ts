import Notification from './Notification';
import { NOTIF_CLEAR, NOTIF_DISMISS, NOTIF_SEND } from './RednotAction';

export default function notifs(domain: Notification[] = [], action: any): any {
  if (!action || !action.type) return domain;
  switch (action.type) {
    case NOTIF_SEND:
      return [action.payload, ...domain.filter(({ id }) => id !== action.payload.id)];
    case NOTIF_DISMISS:
      return domain.filter((notif: Notification) => notif.id !== action.payload);
    case NOTIF_CLEAR:
      return [];
    default:
      return domain;
  }
}
