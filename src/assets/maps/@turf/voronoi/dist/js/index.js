'use strict';

var helpers = require('@turf/helpers');
var invariant = require('@turf/invariant');
var d3voronoi = require('d3-voronoi');

/**
 * @private
 * @param {Array<Array<number>>} coords representing a polygon
 * @returns {Feature<Polygon>} polygon
 */
function coordsToPolygon(coords) {
  coords = coords.slice();
  coords.push(coords[0]);
  return helpers.polygon([coords]);
}

/**
 * Takes a FeatureCollection of points, and a bounding box, and returns a FeatureCollection
 * of Voronoi polygons.
 *
 * The Voronoi algorithim used comes from the d3-voronoi package.
 *
 * @name voronoi
 * @param {FeatureCollection<Point>} points to find the Voronoi polygons around.
 * @param {Object} [options={}] Optional parameters
 * @param {number[]} [options.bbox=[-180, -85, 180, -85]] clipping rectangle, in [minX, minY, maxX, MaxY] order.
 * @returns {FeatureCollection<Polygon>} a set of polygons, one per input point.
 * @example
 * var options = {
 *   bbox: [-70, 40, -60, 60]
 * };
 * var points = turf.randomPoint(100, options);
 * var voronoiPolygons = turf.voronoi(points, options);
 *
 * //addToMap
 * var addToMap = [voronoiPolygons, points];
 */
function voronoi(points, options) {
  // Optional params
  options = options || {};
  if (!helpers.isObject(options)) throw new Error("options is invalid");
  var bbox = options.bbox || [-180, -85, 180, 85];

  // Input Validation
  if (!points) throw new Error("points is required");
  if (!Array.isArray(bbox)) throw new Error("bbox is invalid");
  invariant.collectionOf(points, "Point", "points");

  // Main
  return helpers.featureCollection(
    d3voronoi.voronoi()
      .x(function (feature) {
        return feature.geometry.coordinates[0];
      })
      .y(function (feature) {
        return feature.geometry.coordinates[1];
      })
      .extent([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ])
      .polygons(points.features)
      .map(coordsToPolygon)
  );
}

module.exports = voronoi;
module.exports.default = voronoi;
