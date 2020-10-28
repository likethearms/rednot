import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RednotAction, { NOTIF_CLEAR, NOTIF_DISMISS, NOTIF_SEND } from './RednotAction';

const mockStore = createMockStore([thunk]);

describe('#notifSend', () => {
  test('show notification', () => {
    const store = mockStore();
    store.dispatch(RednotAction.notifSend({ message: 'Foo bar' }) as any);
    const actions = store.getActions();
    expect(actions[0].type).toBe(NOTIF_SEND);
    expect(actions[1]).toEqual(undefined);
  });

  test('show notification with custom id', () => {
    const customId = 1;
    const store = mockStore();
    store.dispatch(RednotAction.notifSend({ message: 'Foo bar', id: customId }) as any);
    const actions = store.getActions();
    expect(actions[0].type).toBe(NOTIF_SEND);
    expect(actions[0].payload.id).toBe(customId);
    expect(actions[1]).toEqual(undefined);
  });

  test('show notification & hide notification', (done) => {
    const store = mockStore();
    store.dispatch(RednotAction.notifSend({ message: 'Foo bar', dismissAfter: 100 }) as any);
    const actions = store.getActions();
    expect(actions[0].type).toBe(NOTIF_SEND);
    setTimeout(() => {
      expect(actions[1].type).toBe(NOTIF_DISMISS);
      expect(actions[2]).toEqual(undefined);
      done();
    }, 200);
  });
});

describe('#notifDismiss', () => {
  test('dismiss notification', () => {
    const store = mockStore();
    store.dispatch(RednotAction.notifSend({ message: 'Foo bar' }) as any);
    let actions = store.getActions();
    store.dispatch(RednotAction.notifDismiss(actions[0].payload.id));
    actions = store.getActions();
    expect(actions[0].type).toBe(NOTIF_SEND);
    expect(actions[1].type).toBe(NOTIF_DISMISS);
    expect(actions[2]).toEqual(undefined);
  });
});

describe('#notifClear', () => {
  test('clear notifications', () => {
    const store = mockStore();
    store.dispatch(RednotAction.notifSend({ message: 'Foo bar' }) as any);
    store.dispatch(RednotAction.notifClear());
    const actions = store.getActions();
    expect(actions[0].type).toBe(NOTIF_SEND);
    expect(actions[1].type).toBe(NOTIF_CLEAR);
    expect(actions[2]).toEqual(undefined);
  });
});
