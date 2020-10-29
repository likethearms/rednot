import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Rednot } from '../index';
import RednotAction from '../store/RednotAction';
import rednotReducer from '../store/rednotReducer';

describe('Rednot', () => {
  test('test notification render', () => {
    const store = createStore(combineReducers({ rednot: rednotReducer }), applyMiddleware(thunk));
    store.dispatch(RednotAction.notifSend({ message: 'Foo bar' }) as any);
    render(
      <Provider store={store}>
        <Rednot />
      </Provider>
    );
    expect(screen.queryByText('Foo bar')).not.toBeNull();
  });

  test('test custom component render', () => {
    const store = createStore(combineReducers({ rednot: rednotReducer }), applyMiddleware(thunk));
    store.dispatch(RednotAction.notifSend({ message: 'Foo bar' }) as any);
    const customComponent = () => <div className="custom-component">Foo bar</div>;
    const C = Rednot as any;
    const { container } = render(
      <Provider store={store}>
        <C CustomComponent={customComponent as any} />
      </Provider>
    );
    expect(container.querySelector('.custom-component')).not.toBeNull();
    expect(container.querySelector('.rednot--notification')).toBeNull();
    expect(screen.queryByText('Foo bar')).not.toBeNull();
  });
});
