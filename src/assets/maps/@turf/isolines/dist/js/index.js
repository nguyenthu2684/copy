'use strict';

var bbox = require('@turf/bbox');
var meta = require('@turf/meta');
var invariant = require('@turf/invariant');
var helpers = require('@turf/helpers');
var objectAssign = require('object-assign');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var bbox__default = /*#__PURE__*/_interopDefaultLegacy(bbox);
var objectAssign__default = /*#__PURE__*/_interopDefaultLegacy(objectAssign);

/**
 * @license GNU Affero General Public License.
 * Copyright (c) 2015, 2015 Ronny Lorenz <ronny@tbi.univie.ac.at>
 * v. 1.2.0
 * https://github.com/RaumZeit/MarchingSquares.js
 *
 * MarchingSquaresJS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MarchingSquaresJS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * As additional permission under GNU Affero General Public License version 3
 * section 7, third-party projects (personal or commercial) may distribute,
 * include, or link against UNMODIFIED VERSIONS of MarchingSquaresJS without the
 * requirement that said third-party project for that reason alone becomes
 * subject to any requirement of the GNU Affero General Public License version 3.
 * Any modifications to MarchingSquaresJS, however, must be shared with the public
 * and made available.
 *
 * In summary this:
 * - allows you to use MarchingSquaresJS at no cost
 * - allows you to use MarchingSquaresJS for both personal and commercial purposes
 * - allows you to distribute UNMODIFIED VERSIONS of MarchingSquaresJS under any
 *   license as long as this license notice is included
 * - enables you to keep the source code of your program that uses MarchingSquaresJS
 *   undisclosed
 * - forces you to share any modifications you have made to MarchingSquaresJS,
 *   e.g. bug-fixes
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with MarchingSquaresJS.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Compute the isocontour(s) of a scalar 2D field given
 * a certain threshold by applying the Marching Squares
 * Algorithm. The function returns a list of path coordinates
 */
var defaultSettings = {
  successCallback: null,
  verbose: false,
};

var settings = {};

function isoContours(data, threshold, options) {
  /* process options */
  options = options ? options : {};

  var optionKeys = Object.keys(defaultSettings);

  for (var i = 0; i < optionKeys.length; i++) {
    var key = optionKeys[i];
    var val = options[key];
    val =
      typeof val !== "undefined" && val !== null ? val : defaultSettings[key];

    settings[key] = val;
  }

  if (settings.verbose)
    console.log(
      "MarchingSquaresJS-isoContours: computing isocontour for " + threshold
    );

  var ret = contourGrid2Paths(computeContourGrid(data, threshold));

  if (typeof settings.successCallback === "function")
    settings.successCallback(ret);

  return ret;
}

/*
  Thats all for the public interface, below follows the actual
  implementation
*/

/*
################################
Isocontour implementation below
################################
*/

/* assume that x1 == 1 &&  x0 == 0 */
function interpolateX(y, y0, y1) {
  return (y - y0) / (y1 - y0);
}

/* compute the isocontour 4-bit grid */
function computeContourGrid(data, threshold) {
  var rows = data.length - 1;
  var cols = data[0].length - 1;
  var ContourGrid = { rows: rows, cols: cols, cells: [] };

  for (var j = 0; j < rows; ++j) {
    ContourGrid.cells[j] = [];
    for (var i = 0; i < cols; ++i) {
      /* compose the 4-bit corner representation */
      var cval = 0;

      var tl = data[j + 1][i];
      var tr = data[j + 1][i + 1];
      var br = data[j][i + 1];
      var bl = data[j][i];

      if (isNaN(tl) || isNaN(tr) || isNaN(br) || isNaN(bl)) {
        continue;
      }
      cval |= tl >= threshold ? 8 : 0;
      cval |= tr >= threshold ? 4 : 0;
      cval |= br >= threshold ? 2 : 0;
      cval |= bl >= threshold ? 1 : 0;

      /* resolve ambiguity for cval == 5 || 10 via averaging */
      var flipped = false;
      if (cval === 5 || cval === 10) {
        var average = (tl + tr + br + bl) / 4;
        if (cval === 5 && average < threshold) {
          cval = 10;
          flipped = true;
        } else if (cval === 10 && average < threshold) {
          cval = 5;
          flipped = true;
        }
      }

      /* add cell to ContourGrid if it contains edges */
      if (cval !== 0 && cval !== 15) {
        var top, bottom, left, right;
        top = bottom = left = right = 0.5;
        /* interpolate edges of cell */
        if (cval === 1) {
          left = 1 - interpolateX(threshold, tl, bl);
          bottom = 1 - interpolateX(threshold, br, bl);
        } else if (cval === 2) {
          bottom = interpolateX(threshold, bl, br);
          right = 1 - interpolateX(threshold, tr, br);
        } else if (cval === 3) {
          left = 1 - interpolateX(threshold, tl, bl);
          right = 1 - interpolateX(threshold, tr, br);
        } else if (cval === 4) {
          top = interpolateX(threshold, tl, tr);
          right = interpolateX(threshold, br, tr);
        } else if (cval === 5) {
          top = interpolateX(threshold, tl, tr);
          right = interpolateX(threshold, br, tr);
          bottom = 1 - interpolateX(threshold, br, bl);
          left = 1 - interpolateX(threshold, tl, bl);
        } else if (cval === 6) {
          bottom = interpolateX(threshold, bl, br);
          top = interpolateX(threshold, tl, tr);
        } else if (cval === 7) {
          left = 1 - interpolateX(threshold, tl, bl);
          top = interpolateX(threshold, tl, tr);
        } else if (cval === 8) {
          left = interpolateX(threshold, bl, tl);
          top = 1 - interpolateX(threshold, tr, tl);
        } else if (cval === 9) {
          bottom = 1 - interpolateX(threshold, br, bl);
          top = 1 - interpolateX(threshold, tr, tl);
        } else if (cval === 10) {
          top = 1 - interpolateX(threshold, tr, tl);
          right = 1 - interpolateX(threshold, tr, br);
          bottom = interpolateX(threshold, bl, br);
          left = interpolateX(threshold, bl, tl);
        } else if (cval === 11) {
          top = 1 - interpolateX(threshold, tr, tl);
          right = 1 - interpolateX(threshold, tr, br);
        } else if (cval === 12) {
          left = interpolateX(threshold, bl, tl);
          right = interpolateX(threshold, br, tr);
        } else if (cval === 13) {
          bottom = 1 - interpolateX(threshold, br, bl);
          right = interpolateX(threshold, br, tr);
        } else if (cval === 14) {
          left = interpolateX(threshold, bl, tl);
          bottom = interpolateX(threshold, bl, br);
        } else {
          console.log(
            "MarchingSquaresJS-isoContours: Illegal cval detected: " + cval
          );
        }
        ContourGrid.cells[j][i] = {
          cval: cval,
          flipped: flipped,
          top: top,
          right: right,
          bottom: bottom,
          left: left,
        };
      }
    }
  }

  return ContourGrid;
}

function isSaddle(cell) {
  return cell.cval === 5 || cell.cval === 10;
}

function isTrivial(cell) {
  return cell.cval === 0 || cell.cval === 15;
}

function clearCell(cell) {
  if (!isTrivial(cell) && cell.cval !== 5 && cell.cval !== 10) {
    cell.cval = 15;
  }
}

function getXY(cell, edge) {
  if (edge === "top") {
    return [cell.top, 1.0];
  } else if (edge === "bottom") {
    return [cell.bottom, 0.0];
  } else if (edge === "right") {
    return [1.0, cell.right];
  } else if (edge === "left") {
    return [0.0, cell.left];
  }
}

function contourGrid2Paths(grid) {
  var paths = [];
  var path_idx = 0;
  var epsilon = 1e-7;

  grid.cells.forEach(function (g, j) {
    g.forEach(function (gg, i) {
      if (typeof gg !== "undefined" && !isSaddle(gg) && !isTrivial(gg)) {
        var p = tracePath(grid.cells, j, i);
        var merged = false;
        /* we may try to merge paths at this point */
        if (p.info === "mergeable") {
          /*
            search backwards through the path array to find an entry
            that starts with where the current path ends...
          */
          var x = p.path[p.path.length - 1][0],
            y = p.path[p.path.length - 1][1];

          for (var k = path_idx - 1; k >= 0; k--) {
            if (
              Math.abs(paths[k][0][0] - x) <= epsilon &&
              Math.abs(paths[k][0][1] - y) <= epsilon
            ) {
              for (var l = p.path.length - 2; l >= 0; --l) {
                paths[k].unshift(p.path[l]);
              }
              merged = true;
              break;
            }
          }
        }
        if (!merged) paths[path_idx++] = p.path;
      }
    });
  });

  return paths;
}

/*
  construct consecutive line segments from starting cell by
  walking arround the enclosed area clock-wise
  */
function tracePath(grid, j, i) {
  var maxj = grid.length;
  var p = [];
  var dxContour = [0, 0, 1, 1, 0, 0, 0, 0, -1, 0, 1, 1, -1, 0, -1, 0];
  var dyContour = [0, -1, 0, 0, 1, 1, 1, 1, 0, -1, 0, 0, 0, -1, 0, 0];
  var dx, dy;
  var startEdge = [
    "none",
    "left",
    "bottom",
    "left",
    "right",
    "none",
    "bottom",
    "left",
    "top",
    "top",
    "none",
    "top",
    "right",
    "right",
    "bottom",
    "none",
  ];
  var nextEdge = [
    "none",
    "bottom",
    "right",
    "right",
    "top",
    "top",
    "top",
    "top",
    "left",
    "bottom",
    "right",
    "right",
    "left",
    "bottom",
    "left",
    "none",
  ];
  var edge;

  var currentCell = grid[j][i];

  var cval = currentCell.cval;
  var edge = startEdge[cval];

  var pt = getXY(currentCell, edge);

  /* push initial segment */
  p.push([i + pt[0], j + pt[1]]);
  edge = nextEdge[cval];
  pt = getXY(currentCell, edge);
  p.push([i + pt[0], j + pt[1]]);
  clearCell(currentCell);

  /* now walk arround the enclosed area in clockwise-direction */
  var k = i + dxContour[cval];
  var l = j + dyContour[cval];
  var prev_cval = cval;

  while (k >= 0 && l >= 0 && l < maxj && (k != i || l != j)) {
    currentCell = grid[l][k];
    if (typeof currentCell === "undefined") {
      /* path ends here */
      //console.log(k + " " + l + " is undefined, stopping path!");
      break;
    }
    cval = currentCell.cval;
    if (cval === 0 || cval === 15) {
      return { path: p, info: "mergeable" };
    }
    edge = nextEdge[cval];
    dx = dxContour[cval];
    dy = dyContour[cval];
    if (cval === 5 || cval === 10) {
      /* select upper or lower band, depending on previous cells cval */
      if (cval === 5) {
        if (currentCell.flipped) {
          /* this is actually a flipped case 10 */
          if (dyContour[prev_cval] === -1) {
            edge = "left";
            dx = -1;
            dy = 0;
          } else {
            edge = "right";
            dx = 1;
            dy = 0;
          }
        } else {
          /* real case 5 */
          if (dxContour[prev_cval] === -1) {
            edge = "bottom";
            dx = 0;
            dy = -1;
          }
        }
      } else if (cval === 10) {
        if (currentCell.flipped) {
          /* this is actually a flipped case 5 */
          if (dxContour[prev_cval] === -1) {
            edge = "top";
            dx = 0;
            dy = 1;
          } else {
            edge = "bottom";
            dx = 0;
            dy = -1;
          }
        } else {
          /* real case 10 */
          if (dyContour[prev_cval] === 1) {
            edge = "left";
            dx = -1;
            dy = 0;
          }
        }
      }
    }
    pt = getXY(currentCell, edge);
    p.push([k + pt[0], l + pt[1]]);
    clearCell(currentCell);
    k += dx;
    l += dy;
    prev_cval = cval;
  }

  return { path: p, info: "closed" };
}

/**
 * Takes a {@link Point} grid and returns a correspondent matrix {Array<Array<number>>}
 * of the 'property' values
 *
 * @name gridToMatrix
 * @param {FeatureCollection<Point>} grid of points
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.zProperty='elevation'] the property name in `points` from which z-values will be pulled
 * @param {boolean} [options.flip=false] returns the matrix upside-down
 * @param {boolean} [options.flags=false] flags, adding a `matrixPosition` array field ([row, column]) to its properties,
 * the grid points with coordinates on the matrix
 * @returns {Array<Array<number>>} matrix of property values
 * @example
 *   var extent = [-70.823364, -33.553984, -70.473175, -33.302986];
 *   var cellSize = 3;
 *   var grid = turf.pointGrid(extent, cellSize);
 *   // add a random property to each point between 0 and 60
 *   for (var i = 0; i < grid.features.length; i++) {
 *     grid.features[i].properties.elevation = (Math.random() * 60);
 *   }
 *   gridToMatrix(grid);
 *   //= [
 *     [ 1, 13, 10,  9, 10, 13, 18],
 *     [34,  8,  5,  4,  5,  8, 13],
 *     [10,  5,  2,  1,  2,  5,  4],
 *     [ 0,  4, 56, 19,  1,  4,  9],
 *     [10,  5,  2,  1,  2,  5, 10],
 *     [57,  8,  5,  4,  5,  0, 57],
 *     [ 3, 13, 10,  9,  5, 13, 18],
 *     [18, 13, 10,  9, 78, 13, 18]
 *   ]
 */
function gridToMatrix(grid, options) {
  // Optional parameters
  options = options || {};
  if (!helpers.isObject(options)) throw new Error("options is invalid");
  var zProperty = options.zProperty || "elevation";
  var flip = options.flip;
  var flags = options.flags;

  // validation
  invariant.collectionOf(grid, "Point", "input must contain Points");

  var pointsMatrix = sortPointsByLatLng(grid, flip);

  var matrix = [];
  // create property matrix from sorted points
  // looping order matters here
  for (var r = 0; r < pointsMatrix.length; r++) {
    var pointRow = pointsMatrix[r];
    var row = [];
    for (var c = 0; c < pointRow.length; c++) {
      var point = pointRow[c];
      // Check if zProperty exist
      if (point.properties[zProperty]) row.push(point.properties[zProperty]);
      else row.push(0);
      // add flags
      if (flags === true) point.properties.matrixPosition = [r, c];
    }
    matrix.push(row);
  }

  return matrix;
}

/**
 * Sorts points by latitude and longitude, creating a 2-dimensional array of points
 *
 * @private
 * @param {FeatureCollection<Point>} points GeoJSON Point features
 * @param {boolean} [flip=false] returns the matrix upside-down
 * @returns {Array<Array<Point>>} points ordered by latitude and longitude
 */
function sortPointsByLatLng(points, flip) {
  var pointsByLatitude = {};

  // divide points by rows with the same latitude
  meta.featureEach(points, function (point) {
    var lat = invariant.getCoords(point)[1];
    if (!pointsByLatitude[lat]) pointsByLatitude[lat] = [];
    pointsByLatitude[lat].push(point);
  });

  // sort points (with the same latitude) by longitude
  var orderedRowsByLatitude = Object.keys(pointsByLatitude).map(function (lat) {
    var row = pointsByLatitude[lat];
    var rowOrderedByLongitude = row.sort(function (a, b) {
      return invariant.getCoords(a)[0] - invariant.getCoords(b)[0];
    });
    return rowOrderedByLongitude;
  });

  // sort rows (of points with the same latitude) by latitude
  var pointMatrix = orderedRowsByLatitude.sort(function (a, b) {
    if (flip) return invariant.getCoords(a[0])[1] - invariant.getCoords(b[0])[1];
    else return invariant.getCoords(b[0])[1] - invariant.getCoords(a[0])[1];
  });

  return pointMatrix;
}

/**
 * Takes a grid {@link FeatureCollection} of {@link Point} features with z-values and an array of
 * value breaks and generates [isolines](https://en.wikipedia.org/wiki/Contour_line).
 *
 * @name isolines
 * @param {FeatureCollection<Point>} pointGrid input points
 * @param {Array<number>} breaks values of `zProperty` where to draw isolines
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.zProperty='elevation'] the property name in `points` from which z-values will be pulled
 * @param {Object} [options.commonProperties={}] GeoJSON properties passed to ALL isolines
 * @param {Array<Object>} [options.breaksProperties=[]] GeoJSON properties passed, in order, to the correspondent isoline;
 * the breaks array will define the order in which the isolines are created
 * @returns {FeatureCollection<MultiLineString>} a FeatureCollection of {@link MultiLineString} features representing isolines
 * @example
 * // create a grid of points with random z-values in their properties
 * var extent = [0, 30, 20, 50];
 * var cellWidth = 100;
 * var pointGrid = turf.pointGrid(extent, cellWidth, {units: 'miles'});
 *
 * for (var i = 0; i < pointGrid.features.length; i++) {
 *     pointGrid.features[i].properties.temperature = Math.random() * 10;
 * }
 * var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 *
 * var lines = turf.isolines(pointGrid, breaks, {zProperty: 'temperature'});
 *
 * //addToMap
 * var addToMap = [lines];
 */
function isolines(pointGrid, breaks, options) {
  // Optional parameters
  options = options || {};
  if (!helpers.isObject(options)) throw new Error("options is invalid");
  var zProperty = options.zProperty || "elevation";
  var commonProperties = options.commonProperties || {};
  var breaksProperties = options.breaksProperties || [];

  // Input validation
  invariant.collectionOf(pointGrid, "Point", "Input must contain Points");
  if (!breaks) throw new Error("breaks is required");
  if (!Array.isArray(breaks)) throw new Error("breaks must be an Array");
  if (!helpers.isObject(commonProperties))
    throw new Error("commonProperties must be an Object");
  if (!Array.isArray(breaksProperties))
    throw new Error("breaksProperties must be an Array");

  // Isoline methods
  var matrix = gridToMatrix(pointGrid, { zProperty: zProperty, flip: true });
  var createdIsoLines = createIsoLines(
    matrix,
    breaks,
    zProperty,
    commonProperties,
    breaksProperties
  );
  var scaledIsolines = rescaleIsolines(createdIsoLines, matrix, pointGrid);

  return helpers.featureCollection(scaledIsolines);
}

/**
 * Creates the isolines lines (featuresCollection of MultiLineString features) from the 2D data grid
 *
 * Marchingsquares process the grid data as a 3D representation of a function on a 2D plane, therefore it
 * assumes the points (x-y coordinates) are one 'unit' distance. The result of the isolines function needs to be
 * rescaled, with turfjs, to the original area and proportions on the map
 *
 * @private
 * @param {Array<Array<number>>} matrix Grid Data
 * @param {Array<number>} breaks Breaks
 * @param {string} zProperty name of the z-values property
 * @param {Object} [commonProperties={}] GeoJSON properties passed to ALL isolines
 * @param {Object} [breaksProperties=[]] GeoJSON properties passed to the correspondent isoline
 * @returns {Array<MultiLineString>} isolines
 */
function createIsoLines(
  matrix,
  breaks,
  zProperty,
  commonProperties,
  breaksProperties
) {
  var results = [];
  for (var i = 1; i < breaks.length; i++) {
    var threshold = +breaks[i]; // make sure it's a number

    var properties = objectAssign__default['default']({}, commonProperties, breaksProperties[i]);
    properties[zProperty] = threshold;
    var isoline = helpers.multiLineString(isoContours(matrix, threshold), properties);

    results.push(isoline);
  }
  return results;
}

/**
 * Translates and scales isolines
 *
 * @private
 * @param {Array<MultiLineString>} createdIsoLines to be rescaled
 * @param {Array<Array<number>>} matrix Grid Data
 * @param {Object} points Points by Latitude
 * @returns {Array<MultiLineString>} isolines
 */
function rescaleIsolines(createdIsoLines, matrix, points) {
  // get dimensions (on the map) of the original grid
  var gridBbox = bbox__default['default'](points); // [ minX, minY, maxX, maxY ]
  var originalWidth = gridBbox[2] - gridBbox[0];
  var originalHeigth = gridBbox[3] - gridBbox[1];

  // get origin, which is the first point of the last row on the rectangular data on the map
  var x0 = gridBbox[0];
  var y0 = gridBbox[1];

  // get number of cells per side
  var matrixWidth = matrix[0].length - 1;
  var matrixHeight = matrix.length - 1;

  // calculate the scaling factor between matrix and rectangular grid on the map
  var scaleX = originalWidth / matrixWidth;
  var scaleY = originalHeigth / matrixHeight;

  var resize = function (point) {
    point[0] = point[0] * scaleX + x0;
    point[1] = point[1] * scaleY + y0;
  };

  // resize and shift each point/line of the createdIsoLines
  createdIsoLines.forEach(function (isoline) {
    meta.coordEach(isoline, resize);
  });
  return createdIsoLines;
}

module.exports = isolines;
module.exports.default = isolines;
