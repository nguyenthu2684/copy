'use strict';

var meta = require('@turf/meta');
var helpers = require('@turf/helpers');
var invariant = require('@turf/invariant');
var clone = require('@turf/clone');
var rhumbDestination = require('@turf/rhumb-destination');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var clone__default = /*#__PURE__*/_interopDefaultLegacy(clone);
var rhumbDestination__default = /*#__PURE__*/_interopDefaultLegacy(rhumbDestination);

/**
 * Moves any geojson Feature or Geometry of a specified distance along a Rhumb Line
 * on the provided direction angle.
 *
 * @name transformTranslate
 * @param {GeoJSON} geojson object to be translated
 * @param {number} distance length of the motion; negative values determine motion in opposite direction
 * @param {number} direction of the motion; angle from North in decimal degrees, positive clockwise
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] in which `distance` will be express; miles, kilometers, degrees, or radians
 * @param {number} [options.zTranslation=0] length of the vertical motion, same unit of distance
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {GeoJSON} the translated GeoJSON object
 * @example
 * var poly = turf.polygon([[[0,29],[3.5,29],[2.5,32],[0,29]]]);
 * var translatedPoly = turf.transformTranslate(poly, 100, 35);
 *
 * //addToMap
 * var addToMap = [poly, translatedPoly];
 * translatedPoly.properties = {stroke: '#F00', 'stroke-width': 4};
 */
function transformTranslate(geojson, distance, direction, options) {
  // Optional parameters
  options = options || {};
  if (!helpers.isObject(options)) throw new Error("options is invalid");
  var units = options.units;
  var zTranslation = options.zTranslation;
  var mutate = options.mutate;

  // Input validation
  if (!geojson) throw new Error("geojson is required");
  if (distance === undefined || distance === null || isNaN(distance))
    throw new Error("distance is required");
  if (zTranslation && typeof zTranslation !== "number" && isNaN(zTranslation))
    throw new Error("zTranslation is not a number");

  // Shortcut no-motion
  zTranslation = zTranslation !== undefined ? zTranslation : 0;
  if (distance === 0 && zTranslation === 0) return geojson;

  if (direction === undefined || direction === null || isNaN(direction))
    throw new Error("direction is required");

  // Invert with negative distances
  if (distance < 0) {
    distance = -distance;
    direction = direction + 180;
  }

  // Clone geojson to avoid side effects
  if (mutate === false || mutate === undefined) geojson = clone__default['default'](geojson);

  // Translate each coordinate
  meta.coordEach(geojson, function (pointCoords) {
    var newCoords = invariant.getCoords(
      rhumbDestination__default['default'](pointCoords, distance, direction, { units: units })
    );
    pointCoords[0] = newCoords[0];
    pointCoords[1] = newCoords[1];
    if (zTranslation && pointCoords.length === 3)
      pointCoords[2] += zTranslation;
  });
  return geojson;
}

module.exports = transformTranslate;
module.exports.default = transformTranslate;
