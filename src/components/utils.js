import _pick from 'lodash/pick';
import curry from 'lodash/fp/curry';
import flatten from 'lodash/fp/flatten';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';


export function pick(obj, names) {
  if (typeof names === 'string') {
    names = names.split(/\s+/);
  }
  return _pick(obj, names);
}


export const mapWithKey = map.convert({ 'cap': false });

// Return a list alternating items from a list with a separator object.
// This is in a certain way analogous to `join` for strings.
export const alternate = curry((sep, a) =>
  flow(
    mapWithKey((item, i) => i === 0 ? [item] : [sep, item]),
    flatten,
  )(a));

