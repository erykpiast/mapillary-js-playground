/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import chai, { assert } from 'chai';
import spies from 'chai-spies';
import spiesTdd from 'chai-spies-tdd';
import { createRenderer } from 'react-addons-test-utils';
import { createClass, createElement, PropTypes } from 'react';

import addLifecycleHooks from '../lifecycle-hooks';

chai.use(spies);
chai.use(spiesTdd);

suite('utils - React component lifecycle hooks', () => {
  test('api', () => {
    assert.isFunction(addLifecycleHooks);
     // TODO: check if it's an instance of React Component somehow
    assert.isFunction(addLifecycleHooks({}, chai.spy()));
  });

  suite('component definition', () => {
    let props;
    let componentFn;
    let componentDidMount;
    let Class;
    let instance;
    let rendererOutput;
    const className = 'myStatelessComponentClass';

    setup(() => {
      props = { a: 1 };
      componentDidMount = chai.spy();
      componentFn = chai.spy(() => createClass('div', { className })); // eslint-disable-line react/prefer-es6-class
      componentFn.displayName = 'MyStatelessComponent';
      componentFn.propTypes = { a: PropTypes.number };
      componentFn.defaultProps = { a: 0 };
      Class = addLifecycleHooks({ componentDidMount }, componentFn);
      instance = new Class(props);
      const renderer = createRenderer();
      renderer.render(createElement(Class, props));
      rendererOutput = renderer.getRenderOutput();
    });

    test('propTypes are passed to wrapper component', () => {
      assert.equal(Class.propTypes.a, componentFn.propTypes.a);
    });

    test('defaultProps of component function are passed to wrapper', () => {
      assert.equal(Class.defaultProps.a, componentFn.defaultProps.a);
    });

    test('instance displayName contains displayName of component function', () => {
      assert.match(Class.displayName, new RegExp(`^${componentFn.displayName}`));
    });

    test('component function is called with props once render method of wrapper is called', () => {
      assert.equal(rendererOutput.type, componentFn);
      assert.equal(rendererOutput.props.a, props.a);
    });

    test('componentDidMount hook is called with props once componentDidMount method of wrapper is called', () => {
      instance.componentDidMount();
      assert.calledOnce(componentDidMount);
      assert.calledWith(componentDidMount, props);
    });
  });
});
