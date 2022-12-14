'use strict';

var bbox = require('@turf/bbox');
var hexGrid = require('@turf/hex-grid');
var pointGrid = require('@turf/point-grid');
var distance = require('@turf/distance');
var centroid = require('@turf/centroid');
var squareGrid = require('@turf/square-grid');
var triangleGrid = require('@turf/triangle-grid');
var clone = require('@turf/clone');
var helpers = require('@turf/helpers');
var meta = require('@turf/meta');
var invariant = require('@turf/invariant');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var bbox__default = /*#__PURE__*/_interopDefaultLegacy(bbox);
var hexGrid__default = /*#__PURE__*/_interopDefaultLegacy(hexGrid);
var pointGrid__default = /*#__PURE__*/_interopDefaultLegacy(pointGrid);
var distance__default = /*#__PURE__*/_interopDefaultLegacy(distance);
var centroid__default = /*#__PURE__*/_interopDefaultLegacy(centroid);
var squareGrid__default = /*#__PURE__*/_interopDefaultLegacy(squareGrid);
var triangleGrid__default = /*#__PURE__*/_interopDefaultLegacy(triangleGrid);
var clone__default = /*#__PURE__*/_interopDefaultLegacy(clone);

/**
 * Takes a set of points and estimates their 'property' values on a grid using the [Inverse Distance Weighting (IDW) method](https://en.wikipedia.org/wiki/Inverse_distance_weighting).
 *
 * @name interpolate
 * @param {FeatureCollection<Point>} points with known value
 * @param {number} cellSize the distance across each grid point
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.gridType='square'] defines the output format based on a Grid Type (options: 'square' | 'point' | 'hex' | 'triangle')
 * @param {string} [options.property='elevation'] the property name in `points` from which z-values will be pulled, zValue fallbacks to 3rd coordinate if no property exists.
 * @param {string} [options.units='kilometers'] used in calculating cellSize, can be degrees, radians, miles, or kilometers
 * @param {number} [options.weight=1] exponent regulating the distance-decay weighting
 * @returns {FeatureCollection<Point|Polygon>} grid of points or polygons with interpolated 'property'
 * @example
 * var points = turf.randomPoint(30, {bbox: [50, 30, 70, 50]});
 *
 * // add a random property to each point
 * turf.featureEach(points, function(point) {
 *     point.properties.solRad = Math.random() * 50;
 * });
 * var options = {gridType: 'points', property: 'solRad', units: 'miles'};
 * var grid = turf.interpolate(points, 100, options);
 *
 * //addToMap
 * var addToMap = [grid];
 */
function interpolate(points, cellSize, options) {
  // Optional parameters
  options = options || {};
  if (typeof options !== "object") throw new Error("options is invalid");
  var gridType = options.gridType;
  var property = options.property;
  var weight = options.weight;

  // validation
  if (!points) throw new Error("points is required");
  invariant.collectionOf(points, "Point", "input must contain Points");
  if (!cellSize) throw new Error("cellSize is required");
  if (weight !== undefined && typeof weight !== "number")
    throw new Error("weight must be a number");

  // default values
  property = property || "elevation";
  gridType = gridType || "square";
  weight = weight || 1;

  var box = bbox__default['default'](points);
  var grid;
  switch (gridType) {
    case "point":
    case "points":
      grid = pointGrid__default['default'](box, cellSize, options);
      break;
    case "square":
    case "squares":
      grid = squareGrid__default['default'](box, cellSize, options);
      break;
    case "hex":
    case "hexes":
      grid = hexGrid__default['default'](box, cellSize, options);
      break;
    case "triangle":
    case "triangles":
      grid = triangleGrid__default['default'](box, cellSize, options);
      break;
    default:
      throw new Error("invalid gridType");
  }
  var results = [];
  meta.featureEach(grid, function (gridFeature) {
    var zw = 0;
    var sw = 0;
    // calculate the distance from each input point to the grid points
    meta.featureEach(points, function (point) {
      var gridPoint =
        gridType === "point" ? gridFeature : centroid__default['default'](gridFeature);
      var d = distance__default['default'](gridPoint, point, options);
      var zValue;
      // property has priority for zValue, fallbacks to 3rd coordinate from geometry
      if (property !== undefined) zValue = point.properties[property];
      if (zValue === undefined) zValue = point.geometry.coordinates[2];
      if (zValue === undefined) throw new Error("zValue is missing");
      if (d === 0) zw = zValue;
      var w = 1.0 / Math.pow(d, weight);
      sw += w;
      zw += w * zValue;
    });
    // write interpolated value for each grid point
    var newFeature = clone__default['default'](gridFeature);
    newFeature.properties[property] = zw / sw;
    results.push(newFeature);
  });
  return helpers.featureCollection(results);
}

module.exports = interpolate;
module.exports.default = interpolate;
