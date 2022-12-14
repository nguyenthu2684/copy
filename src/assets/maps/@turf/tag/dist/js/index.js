'use strict';

var booleanPointInPolygon = require('@turf/boolean-point-in-polygon');
var clone = require('@turf/clone');
var meta = require('@turf/meta');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var booleanPointInPolygon__default = /*#__PURE__*/_interopDefaultLegacy(booleanPointInPolygon);
var clone__default = /*#__PURE__*/_interopDefaultLegacy(clone);

/**
 * Takes a set of {@link Point|points} and a set of {@link Polygon|polygons} and/or {@link MultiPolygon|multipolygons} and performs a spatial join.
 *
 * @name tag
 * @param {FeatureCollection<Point>} points input points
 * @param {FeatureCollection<Polygon|MultiPolygon>} polygons input (multi)polygons
 * @param {string} field property in `polygons` to add to joined {<Point>} features
 * @param {string} outField property in `points` in which to store joined property from `polygons`
 * @returns {FeatureCollection<Point>} points with `containingPolyId` property containing values from `polyId`
 * @example
 * var pt1 = turf.point([-77, 44]);
 * var pt2 = turf.point([-77, 38]);
 * var poly1 = turf.polygon([[
 *   [-81, 41],
 *   [-81, 47],
 *   [-72, 47],
 *   [-72, 41],
 *   [-81, 41]
 * ]], {pop: 3000});
 * var poly2 = turf.polygon([[
 *   [-81, 35],
 *   [-81, 41],
 *   [-72, 41],
 *   [-72, 35],
 *   [-81, 35]
 * ]], {pop: 1000});
 *
 * var points = turf.featureCollection([pt1, pt2]);
 * var polygons = turf.featureCollection([poly1, poly2]);
 *
 * var tagged = turf.tag(points, polygons, 'pop', 'population');
 *
 * //addToMap
 * var addToMap = [tagged, polygons]
 */
function tag(points, polygons, field, outField) {
  // prevent mutations
  points = clone__default['default'](points);
  polygons = clone__default['default'](polygons);
  meta.featureEach(points, function (pt) {
    if (!pt.properties) pt.properties = {};
    meta.featureEach(polygons, function (poly) {
      if (pt.properties[outField] === undefined) {
        if (booleanPointInPolygon__default['default'](pt, poly))
          pt.properties[outField] = poly.properties[field];
      }
    });
  });
  return points;
}

module.exports = tag;
module.exports.default = tag;
