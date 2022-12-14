import { Feature, FeatureCollection, MultiLineString, LineString, Properties } from "@turf/helpers";
/**
 * Converts (Multi)LineString(s) to Polygon(s).
 *
 * @name lineToPolygon
 * @param {FeatureCollection|Feature<LineString|MultiLineString>} lines Features to convert
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] translates GeoJSON properties to Feature
 * @param {boolean} [options.autoComplete=true] auto complete linestrings (matches first & last coordinates)
 * @param {boolean} [options.orderCoords=true] sorts linestrings to place outer ring at the first position of the coordinates
 * @param {boolean} [options.mutate=false] mutate the original linestring using autoComplete (matches first & last coordinates)
 * @returns {Feature<Polygon|MultiPolygon>} converted to Polygons
 * @example
 * var line = turf.lineString([[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]);
 *
 * var polygon = turf.lineToPolygon(line);
 *
 * //addToMap
 * var addToMap = [polygon];
 */
declare function lineToPolygon<G extends LineString | MultiLineString>(lines: Feature<G> | FeatureCollection<G> | G, options?: {
    properties?: Properties;
    autoComplete?: boolean;
    orderCoords?: boolean;
    mutate?: boolean;
}): Feature<import("@turf/helpers").MultiPolygon, Properties> | Feature<import("@turf/helpers").Polygon, Properties>;
export default lineToPolygon;
