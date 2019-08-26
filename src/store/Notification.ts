interface Notification {
  message: string;
  id?: number;
  className?: string,
  dismissAfter?: number;
}

export default Notification;
