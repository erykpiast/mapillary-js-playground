import {
  T,
  all,
  always,
  cond,
  converge,
  identity,
  map,
  mergeAll,
  pipe,
  unapply,
  values,
} from 'ramda';
import { isFunction, isObject } from './is';

const hasInChain = propName => obj => propName in obj;
const allKeys = pred => pipe(values, all(pred));
const extractMethod = name => o => (...args) => o[name](...args);
const prepareActions = cond([
  [isFunction, identity],
  [isObject, pipe(cond([
    [allKeys(hasInChain('next')), map(extractMethod('next'))],
    [T, identity],
  ]), always)],
  [T, always],
]);

export default (mapState, mapActions) => converge(unapply(mergeAll), [
  mapState,
  prepareActions(mapActions),
]);
