"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var meta_1 = require("@turf/meta");
var invariant_1 = require("@turf/invariant");
var line_overlap_1 = __importDefault(require("@turf/line-overlap"));
var line_intersect_1 = __importDefault(require("@turf/line-intersect"));
var geojson_equality_1 = __importDefault(require("geojson-equality"));
/**
 * Compares two geometries of the same dimension and returns true if their intersection set results in a geometry
 * different from both but of the same dimension. It applies to Polygon/Polygon, LineString/LineString,
 * Multipoint/Multipoint, MultiLineString/MultiLineString and MultiPolygon/MultiPolygon.
 *
 * In other words, it returns true if the two geometries overlap, provided that neither completely contains the other.
 *
 * @name booleanOverlap
 * @param  {Geometry|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} feature1 input
 * @param  {Geometry|Feature<LineString|MultiLineString|Polygon|MultiPolygon>} feature2 input
 * @returns {boolean} true/false
 * @example
 * var poly1 = turf.polygon([[[0,0],[0,5],[5,5],[5,0],[0,0]]]);
 * var poly2 = turf.polygon([[[1,1],[1,6],[6,6],[6,1],[1,1]]]);
 * var poly3 = turf.polygon([[[10,10],[10,15],[15,15],[15,10],[10,10]]]);
 *
 * turf.booleanOverlap(poly1, poly2)
 * //=true
 * turf.booleanOverlap(poly2, poly3)
 * //=false
 */
function booleanOverlap(feature1, feature2) {
    var geom1 = invariant_1.getGeom(feature1);
    var geom2 = invariant_1.getGeom(feature2);
    var type1 = geom1.type;
    var type2 = geom2.type;
    if ((type1 === "MultiPoint" && type2 !== "MultiPoint") ||
        ((type1 === "LineString" || type1 === "MultiLineString") &&
            type2 !== "LineString" &&
            type2 !== "MultiLineString") ||
        ((type1 === "Polygon" || type1 === "MultiPolygon") &&
            type2 !== "Polygon" &&
            type2 !== "MultiPolygon")) {
        throw new Error("features must be of the same type");
    }
    if (type1 === "Point")
        throw new Error("Point geometry not supported");
    // features must be not equal
    var equality = new geojson_equality_1.default({ precision: 6 });
    if (equality.compare(feature1, feature2))
        return false;
    var overlap = 0;
    switch (type1) {
        case "MultiPoint":
            for (var i = 0; i < geom1.coordinates.length; i++) {
                for (var j = 0; j < geom2.coordinates.length; j++) {
                    var coord1 = geom1.coordinates[i];
                    var coord2 = geom2.coordinates[j];
                    if (coord1[0] === coord2[0] && coord1[1] === coord2[1]) {
                        return true;
                    }
                }
            }
            return false;
        case "LineString":
        case "MultiLineString":
            meta_1.segmentEach(feature1, function (segment1) {
                meta_1.segmentEach(feature2, function (segment2) {
                    if (line_overlap_1.default(segment1, segment2).features.length)
                        overlap++;
                });
            });
            break;
        case "Polygon":
        case "MultiPolygon":
            meta_1.segmentEach(feature1, function (segment1) {
                meta_1.segmentEach(feature2, function (segment2) {
                    if (line_intersect_1.default(segment1, segment2).features.length)
                        overlap++;
                });
            });
            break;
    }
    return overlap > 0;
}
exports.default = booleanOverlap;
