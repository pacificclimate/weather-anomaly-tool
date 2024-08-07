import _pick from "lodash/pick";
import curry from "lodash/fp/curry";
import flatten from "lodash/fp/flatten";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import moment from "moment";

export function pick(obj, names) {
  if (typeof names === "string") {
    names = names.split(/\s+/);
  }
  return _pick(obj, names);
}

export const mapWithKey = map.convert({ cap: false });

// Return a list alternating items from a list with a separator object.
// This is in a certain way analogous to `join` for strings.
export const alternate = curry((sep, a) =>
  flow(
    mapWithKey((item, i) => (i === 0 ? [item] : [sep, item])),
    flatten,
  )(a),
);

export const clipMoment = (date, minDate, maxDate) =>
  moment.max(minDate, moment.min(maxDate, date));

export const formatDate = (date, dataset) =>
  date.format(dataset === "baseline" ? "MMM" : "MMM YYYY");
