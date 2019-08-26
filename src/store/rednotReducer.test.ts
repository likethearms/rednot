import rednotReducer from './rednotReducer';
import { NOTIF_SEND, NOTIF_DISMISS, NOTIF_CLEAR } from './rednotActions';

const payload = {
  id: 1,
  message: 'foo bar',
};

const payload2 = {
  id: 2,
  message: 'foo bar 2',
};

describe('projectModelsReducer', () => {
  test('default values are correct', () => {
    const red = rednotReducer(undefined, {});
    expect(typeof red).toBe(typeof []);
  });

  test('return default values if type is invalid', () => {
    const red = rednotReducer(undefined, { type: 'invalid' });
    expect(typeof red).toBe(typeof []);
  });

  test('NOTIF_SEND', () => {
    let red = rednotReducer(undefined, { type: NOTIF_SEND, payload });
    red = rednotReducer(red, { type: NOTIF_SEND, payload: payload2 });
    expect(red.length).toBe(2);
    expect(red[1].message).toBe(payload.message);
    expect(red[0].message).toBe(payload2.message);
  });

  test('NOTIF_DISMISS', () => {
    const red = rednotReducer([payload, payload2], { type: NOTIF_DISMISS, payload: 1 });
    expect(red.length).toBe(1);
    expect(red[0].id).toBe(2);
  });

  test('NOTIF_CLEAR', () => {
    const red = rednotReducer([payload, payload2], { type: NOTIF_CLEAR });
    expect(red.length).toBe(0);
  });
});
