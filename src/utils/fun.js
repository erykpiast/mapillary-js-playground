import { isUndefined } from './is';

export const noop = () => {}; // eslint-disable-line import/prefer-default-export

export const randomInt = (min, max) => min + Math.round(Math.random() * (max - min));

export const randomItem = coll => (coll.size === 1 ?
  coll.get(0) :
  coll.get(randomInt(0, coll.size - 1))
);

const NOT_EMPTY = Symbol('not_empty');
// ImmutableList -> any -> any -> ImmutableList
export const shuffle = (acc, item, _, origColl) => {
  const emptySlots = acc
    .setSize(origColl.size)
    .map((v, i) => (!isUndefined(v) ? NOT_EMPTY : i))
    .filter(v => v !== NOT_EMPTY);

  return acc.set(randomItem(emptySlots), item);
};
