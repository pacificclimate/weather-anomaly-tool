export default function uniqueKey(station) {
  return station.station_db_id.toString() + station.network_variable_name;
}