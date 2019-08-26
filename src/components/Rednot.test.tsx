import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import rednotReducer from '../store/rednotReducer';
import Rednot, { mapStateToProps } from './Rednot';
import { notifSend } from '../store/rednotActions';

describe('Rednot', () => {
  test('test notification render', () => {
    const store = createStore(combineReducers({ rednot: rednotReducer }),
      applyMiddleware(thunk));
    store.dispatch(notifSend({ message: 'Foo bar' }) as any);
    const c = mount((
      <Provider store={store}>
        <Rednot />
      </Provider>
    ));
    const comp = c.find('.rednot--notification');
    expect(comp.length).toBe(1);
  });

  test('test custom component render', () => {
    const store = createStore(combineReducers({ rednot: rednotReducer }),
      applyMiddleware(thunk));
    store.dispatch(notifSend({ message: 'Foo bar' }) as any);
    const customComponent = () => <div className="custom-component">Foo bar</div>;
    const C = Rednot as any;
    const c = mount((
      <Provider store={store}>
        <C CustomComponent={customComponent as any} />
      </Provider>
    ));
    const buildInComp = c.find('.rednot--notification');
    expect(buildInComp.length).toBe(0);
    const comp = c.find('.custom-component');
    expect(comp.length).toBe(1);
  });

  test('mapStateToProps', () => {
    const props = mapStateToProps({ rednot: ['foo'] });
    expect(props.notifications[0]).toBe('foo');
  });
});
