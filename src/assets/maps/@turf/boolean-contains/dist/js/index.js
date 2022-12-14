"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bbox_1 = __importDefault(require("@turf/bbox"));
var boolean_point_in_polygon_1 = __importDefault(require("@turf/boolean-point-in-polygon"));
var boolean_point_on_line_1 = __importDefault(require("@turf/boolean-point-on-line"));
var invariant_1 = require("@turf/invariant");
/**
 * Boolean-contains returns True if the second geometry is completely contained by the first geometry.
 * The interiors of both geometries must intersect and, the interior and boundary of the secondary (geometry b)
 * must not intersect the exterior of the primary (geometry a).
 * Boolean-contains returns the exact opposite result of the `@turf/boolean-within`.
 *
 * @name booleanContains
 * @param {Geometry|Feature<any>} feature1 GeoJSON Feature or Geometry
 * @param {Geometry|Feature<any>} feature2 GeoJSON Feature or Geometry
 * @returns {boolean} true/false
 * @example
 * var line = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);
 * var point = turf.point([1, 2]);
 *
 * turf.booleanContains(line, point);
 * //=true
 */
function booleanContains(feature1, feature2) {
    var geom1 = invariant_1.getGeom(feature1);
    var geom2 = invariant_1.getGeom(feature2);
    var type1 = geom1.type;
    var type2 = geom2.type;
    var coords1 = geom1.coordinates;
    var coords2 = geom2.coordinates;
    switch (type1) {
        case "Point":
            switch (type2) {
                case "Point":
                    return compareCoords(coords1, coords2);
                default:
                    throw new Error("feature2 " + type2 + " geometry not supported");
            }
        case "MultiPoint":
            switch (type2) {
                case "Point":
                    return isPointInMultiPoint(geom1, geom2);
                case "MultiPoint":
                    return isMultiPointInMultiPoint(geom1, geom2);
                default:
                    throw new Error("feature2 " + type2 + " geometry not supported");
            }
        case "LineString":
            switch (type2) {
                case "Point":
                    return boolean_point_on_line_1.default(geom2, geom1, { ignoreEndVertices: true });
                case "LineString":
                    return isLineOnLine(geom1, geom2);
                case "MultiPoint":
                    return isMultiPointOnLine(geom1, geom2);
                default:
                    throw new Error("feature2 " + type2 + " geometry not supported");
            }
        case "Polygon":
            switch (type2) {
                case "Point":
                    return boolean_point_in_polygon_1.default(geom2, geom1, { ignoreBoundary: true });
                case "LineString":
                    return isLineInPoly(geom1, geom2);
                case "Polygon":
                    return isPolyInPoly(geom1, geom2);
                case "MultiPoint":
                    return isMultiPointInPoly(geom1, geom2);
                default:
                    throw new Error("feature2 " + type2 + " geometry not supported");
            }
        default:
            throw new Error("feature1 " + type1 + " geometry not supported");
    }
}
exports.default = booleanContains;
function isPointInMultiPoint(multiPoint, pt) {
    var i;
    var output = false;
    for (i = 0; i < multiPoint.coordinates.length; i++) {
        if (compareCoords(multiPoint.coordinates[i], pt.coordinates)) {
            output = true;
            break;
        }
    }
    return output;
}
exports.isPointInMultiPoint = isPointInMultiPoint;
function isMultiPointInMultiPoint(multiPoint1, multiPoint2) {
    for (var _i = 0, _a = multiPoint2.coordinates; _i < _a.length; _i++) {
        var coord2 = _a[_i];
        var matchFound = false;
        for (var _b = 0, _c = multiPoint1.coordinates; _b < _c.length; _b++) {
            var coord1 = _c[_b];
            if (compareCoords(coord2, coord1)) {
                matchFound = true;
                break;
            }
        }
        if (!matchFound) {
            return false;
        }
    }
    return true;
}
exports.isMultiPointInMultiPoint = isMultiPointInMultiPoint;
function isMultiPointOnLine(lineString, multiPoint) {
    var haveFoundInteriorPoint = false;
    for (var _i = 0, _a = multiPoint.coordinates; _i < _a.length; _i++) {
        var coord = _a[_i];
        if (boolean_point_on_line_1.default(coord, lineString, { ignoreEndVertices: true })) {
            haveFoundInteriorPoint = true;
        }
        if (!boolean_point_on_line_1.default(coord, lineString)) {
            return false;
        }
    }
    if (haveFoundInteriorPoint) {
        return true;
    }
    return false;
}
exports.isMultiPointOnLine = isMultiPointOnLine;
function isMultiPointInPoly(polygon, multiPoint) {
    for (var _i = 0, _a = multiPoint.coordinates; _i < _a.length; _i++) {
        var coord = _a[_i];
        if (!boolean_point_in_polygon_1.default(coord, polygon, { ignoreBoundary: true })) {
            return false;
        }
    }
    return true;
}
exports.isMultiPointInPoly = isMultiPointInPoly;
function isLineOnLine(lineString1, lineString2) {
    var haveFoundInteriorPoint = false;
    for (var _i = 0, _a = lineString2.coordinates; _i < _a.length; _i++) {
        var coords = _a[_i];
        if (boolean_point_on_line_1.default({ type: "Point", coordinates: coords }, lineString1, {
            ignoreEndVertices: true,
        })) {
            haveFoundInteriorPoint = true;
        }
        if (!boolean_point_on_line_1.default({ type: "Point", coordinates: coords }, lineString1, {
            ignoreEndVertices: false,
        })) {
            return false;
        }
    }
    return haveFoundInteriorPoint;
}
exports.isLineOnLine = isLineOnLine;
function isLineInPoly(polygon, linestring) {
    var output = false;
    var i = 0;
    var polyBbox = bbox_1.default(polygon);
    var lineBbox = bbox_1.default(linestring);
    if (!doBBoxOverlap(polyBbox, lineBbox)) {
        return false;
    }
    for (i; i < linestring.coordinates.length - 1; i++) {
        var midPoint = getMidpoint(linestring.coordinates[i], linestring.coordinates[i + 1]);
        if (boolean_point_in_polygon_1.default({ type: "Point", coordinates: midPoint }, polygon, {
            ignoreBoundary: true,
        })) {
            output = true;
            break;
        }
    }
    return output;
}
exports.isLineInPoly = isLineInPoly;
/**
 * Is Polygon2 in Polygon1
 * Only takes into account outer rings
 *
 * @private
 * @param {Geometry|Feature<Polygon>} feature1 Polygon1
 * @param {Geometry|Feature<Polygon>} feature2 Polygon2
 * @returns {boolean} true/false
 */
function isPolyInPoly(feature1, feature2) {
    // Handle Nulls
    if (feature1.type === "Feature" && feature1.geometry === null) {
        return false;
    }
    if (feature2.type === "Feature" && feature2.geometry === null) {
        return false;
    }
    var poly1Bbox = bbox_1.default(feature1);
    var poly2Bbox = bbox_1.default(feature2);
    if (!doBBoxOverlap(poly1Bbox, poly2Bbox)) {
        return false;
    }
    var coords = invariant_1.getGeom(feature2).coordinates;
    for (var _i = 0, coords_1 = coords; _i < coords_1.length; _i++) {
        var ring = coords_1[_i];
        for (var _a = 0, ring_1 = ring; _a < ring_1.length; _a++) {
            var coord = ring_1[_a];
            if (!boolean_point_in_polygon_1.default(coord, feature1)) {
                return false;
            }
        }
    }
    return true;
}
exports.isPolyInPoly = isPolyInPoly;
function doBBoxOverlap(bbox1, bbox2) {
    if (bbox1[0] > bbox2[0]) {
        return false;
    }
    if (bbox1[2] < bbox2[2]) {
        return false;
    }
    if (bbox1[1] > bbox2[1]) {
        return false;
    }
    if (bbox1[3] < bbox2[3]) {
        return false;
    }
    return true;
}
exports.doBBoxOverlap = doBBoxOverlap;
/**
 * compareCoords
 *
 * @private
 * @param {Position} pair1 point [x,y]
 * @param {Position} pair2 point [x,y]
 * @returns {boolean} true/false if coord pairs match
 */
function compareCoords(pair1, pair2) {
    return pair1[0] === pair2[0] && pair1[1] === pair2[1];
}
exports.compareCoords = compareCoords;
function getMidpoint(pair1, pair2) {
    return [(pair1[0] + pair2[0]) / 2, (pair1[1] + pair2[1]) / 2];
}
exports.getMidpoint = getMidpoint;
