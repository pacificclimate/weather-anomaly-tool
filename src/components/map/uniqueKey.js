export default function uniqueKey(station) {
  return station.station_db_id.toString() + station.network_variable_name;
}

export const uniqueStationKey = (type, variable, dataset, date, station) => {
  if (!(type && variable && dataset && date && station)) {
    throw new Error("missing argument")
  }
  const datePart = date.format(dataset === "baseline" ? "YYYY" : "YYYY-MM");
  return `${type}-${variable}-${dataset}-${datePart}-${station.station_db_id}-${station.network_variable_name}`;
}
