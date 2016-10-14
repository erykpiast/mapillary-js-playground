/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import chai, { assert } from 'chai';
import spies from 'chai-spies';
import spiesTdd from 'chai-spies-tdd';

import selectState from '../select-state';

chai.use(spies);
chai.use(spiesTdd);

suite('utils - selectState', () => {
  test('api', () => {
    assert.isFunction(selectState);
    assert.isFunction(selectState(chai.spy(), {}));
    assert.isObject(selectState(chai.spy(), {})({}));
  });

  suite('creating properties', () => {
    let state;
    let action1;
    let action2;

    setup(() => {
      state = {
        prop: {
          a: 1,
          b: 2,
        },
      };
      action1 = { next: chai.spy() };
      action2 = { next: chai.spy() };
    });

    test('include all properties from state selector in the result', () => {
      const selector = selectState(s => s.prop, {});
      const result = selector(state);

      assert.equal(result.a, state.prop.a);
      assert.equal(result.b, state.prop.b);
    });

    test('include all properties from actions selector in the result when hash map of subject-like objects is provided', () => {
      const selector = selectState(s => s.prop, { action1, action2 });
      const result = selector(state);

      assert.isFunction(result.action1);
      result.action1(1);
      assert.calledOnce(action1.next);
      assert.calledWith(action1.next, 1);

      assert.isFunction(result.action2);
      result.action2(1);
      assert.calledOnce(action2.next);
      assert.calledWith(action2.next, 1);
    });

    test('include all properties from actions selector in the result when hash map of functions is provided', () => {
      const selector = selectState(s => s.prop, {
        action1: action1.next,
        action2: action2.next,
      });
      const result = selector(state);

      assert.isFunction(result.action1);
      result.action1(1);
      assert.calledOnce(action1.next);
      assert.calledWith(action1.next, 1);

      assert.isFunction(result.action2);
      result.action2(1);
      assert.calledOnce(action2.next);
      assert.calledWith(action2.next, 1);
    });

    test('include all properties from actions selector in the result when function returning hash map of functions is provided', () => {
      const selector = selectState(s => s.prop, () => ({
        action1: action1.next,
        action2: action2.next,
      }));
      const result = selector(state);

      assert.isFunction(result.action1);
      result.action1(1);
      assert.calledOnce(action1.next);
      assert.calledWith(action1.next, 1);

      assert.isFunction(result.action2);
      result.action2(1);
      assert.calledOnce(action2.next);
      assert.calledWith(action2.next, 1);
    });
  });
});
