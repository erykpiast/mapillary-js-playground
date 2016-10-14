import { always, curry } from 'ramda';
import { createClass, createElement } from 'react';

import { noop } from './fun';

const wrapStatelessFunction = fn => function proxyMethod() {
  return fn(this.props); // eslint-disable-line no-invalid-this
};

/**
 * @function addLifecycleHooks
 * @access public
 * @description wrap stateless component in statefull one, allowing to use lifecycle methods
 *   they do not have access to component state and methods through this context,
 *   just get props as argument
 *   motivation: we wish to write components as functions when possible, but sometimes we need
 *   to perform when component was rendered first - it's not possible with pure function;
 *   to not introduce some weird logic into the component itself, we can wrap it within a class
 *   and add lifecycle hooks to that class
 * @param {Object} proto - definition of lifecycle methods
 * @param {Function} [proto.componentDidMount=noop]
 * @param {Function} component - stateless component to wrap
 * @returns {ReactComponent} stateful component
 */
export default curry(({ componentDidMount = noop }, component) =>
  createClass({ // eslint-disable-line react/prefer-es6-class
    displayName: `${component.displayName || component.name}StatefullWrapper`,
    propTypes: component.propTypes,
    getDefaultProps: always(component.defaultProps),
    componentDidMount: wrapStatelessFunction(componentDidMount),
    render() {
      return createElement(component, this.props, ...(this.props.children || []));
    },
  }));
