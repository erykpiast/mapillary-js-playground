import { is } from 'ramda';

export const isFunction = is(Function);
export const isNull = v => v === null;
export const isNumber = is(Number);
export const isObject = is(Object);
export const isUndefined = v => typeof v === 'undefined';
export const isDefined = v => typeof v !== 'undefined';
