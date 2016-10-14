import { isUndefined } from './is';

export const noop = () => {}; // eslint-disable-line import/prefer-default-export

export const randomInt = (min, max) => min + Math.round(Math.random() * (max - min));

export const randomItem = coll => (coll.length === 1 ?
  coll[0] :
  coll[randomInt(0, coll.length - 1)]
);

export const setArraySize = (size, arr) => {
  arr.length = size; // eslint-disable-line no-param-reassign
  return arr;
};

// const NOT_EMPTY = Symbol('not_empty');

// Array -> any -> any -> Array
export const shuffle = (acc, item, _, origColl) => {
  // I works perfectly for Immutable lists and setSize
  // but that setArraySize hack doesn't really work, setting length
  // produces "the other kind" of undefined which is not mapped nor filtered
  const emptySlots = [];
  for (let i = 0; i < origColl.length; i += 1) {
    if (isUndefined(acc[i])) {
      emptySlots.push(i);
    }
  }

  // const emptySlots = setArraySize(origColl.length, acc)
  //   .map((v, i) => (!isUndefined(v) ? NOT_EMPTY : i))
  //   .filter(v => v !== NOT_EMPTY);
  const randomIndex = randomItem(emptySlots);
  acc[randomIndex] = item; // eslint-disable-line no-param-reassign

  return acc;
};
