# @turf/helpers

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## earthRadius

Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.

## factors

Unit of measurement factors using a spherical (non-ellipsoid) earth radius.

## unitsFactors

Units of measurement factors based on 1 meter.

## areaFactors

Area of measurement factors based on 1 square meter.

## feature

Wraps a GeoJSON [Geometry](https://tools.ietf.org/html/rfc7946#section-3.1) in a GeoJSON [Feature](https://tools.ietf.org/html/rfc7946#section-3.2).

**Parameters**

-   `geometry` **[Geometry](https://tools.ietf.org/html/rfc7946#section-3.1)** input geometry
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an Object of key-value pairs to add as properties (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Feature
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the Feature

**Examples**

```javascript
var geometry = {
  "type": "Point",
  "coordinates": [110, 50]
};

var feature = turf.feature(geometry);

//=feature
```

Returns **[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)** a GeoJSON Feature

## geometry

Creates a GeoJSON [Geometry](https://tools.ietf.org/html/rfc7946#section-3.1) from a Geometry string type & coordinates.
For GeometryCollection type use `helpers.geometryCollection`

**Parameters**

-   `type` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Geometry Type
-   `coordinates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Coordinates
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Geometry

**Examples**

```javascript
var type = 'Point';
var coordinates = [110, 50];

var geometry = turf.geometry(type, coordinates);

//=geometry
```

Returns **[Geometry](https://tools.ietf.org/html/rfc7946#section-3.1)** a GeoJSON Geometry

## point

Creates a [Point](https://tools.ietf.org/html/rfc7946#section-3.1.2) [Feature](https://tools.ietf.org/html/rfc7946#section-3.2) from a Position.

**Parameters**

-   `coordinates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** longitude, latitude position (each in decimal degrees)
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an Object of key-value pairs to add as properties (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Feature
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the Feature

**Examples**

```javascript
var point = turf.point([-75.343, 39.984]);

//=point
```

Returns **[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)&lt;[Point](https://tools.ietf.org/html/rfc7946#section-3.1.2)>** a Point feature

## points

Creates a [Point](https://tools.ietf.org/html/rfc7946#section-3.1.2) [FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3) from an Array of Point coordinates.

**Parameters**

-   `coordinates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>** an array of Points
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Translate these properties to each Feature (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the FeatureCollection
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the FeatureCollection

**Examples**

```javascript
var points = turf.points([
  [-75, 39],
  [-80, 45],
  [-78, 50]
]);

//=points
```

Returns **[FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)&lt;[Point](https://tools.ietf.org/html/rfc7946#section-3.1.2)>** Point Feature

## polygon

Creates a [Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6) [Feature](https://tools.ietf.org/html/rfc7946#section-3.2) from an Array of LinearRings.

**Parameters**

-   `coordinates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>>** an array of LinearRings
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an Object of key-value pairs to add as properties (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Feature
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the Feature

**Examples**

```javascript
var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });

//=polygon
```

Returns **[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)&lt;[Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6)>** Polygon Feature

## polygons

Creates a [Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6) [FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3) from an Array of Polygon coordinates.

**Parameters**

-   `coordinates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>>>** an array of Polygon coordinates
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an Object of key-value pairs to add as properties (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Feature
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the FeatureCollection

**Examples**

```javascript
var polygons = turf.polygons([
  [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
  [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
]);

//=polygons
```

Returns **[FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)&lt;[Polygon](https://tools.ietf.org/html/rfc7946#section-3.1.6)>** Polygon FeatureCollection

## lineString

Creates a [LineString](https://tools.ietf.org/html/rfc7946#section-3.1.4) [Feature](https://tools.ietf.org/html/rfc7946#section-3.2) from an Array of Positions.

**Parameters**

-   `coordinates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>** an array of Positions
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an Object of key-value pairs to add as properties (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Feature
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the Feature

**Examples**

```javascript
var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});

//=linestring1
//=linestring2
```

Returns **[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)&lt;[LineString](https://tools.ietf.org/html/rfc7946#section-3.1.4)>** LineString Feature

## lineStrings

Creates a [LineString](https://tools.ietf.org/html/rfc7946#section-3.1.4) [FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3) from an Array of LineString coordinates.

**Parameters**

-   `coordinates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>** an array of LinearRings
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an Object of key-value pairs to add as properties (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the FeatureCollection
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the FeatureCollection

**Examples**

```javascript
var linestrings = turf.lineStrings([
  [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
  [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
]);

//=linestrings
```

Returns **[FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)&lt;[LineString](https://tools.ietf.org/html/rfc7946#section-3.1.4)>** LineString FeatureCollection

## featureCollection

Takes one or more [Features](https://tools.ietf.org/html/rfc7946#section-3.2) and creates a [FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3).

**Parameters**

-   `features` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)>** input features
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Feature
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the Feature

**Examples**

```javascript
var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});

var collection = turf.featureCollection([
  locationA,
  locationB,
  locationC
]);

//=collection
```

Returns **[FeatureCollection](https://tools.ietf.org/html/rfc7946#section-3.3)** FeatureCollection of Features

## multiLineString

Creates a [Feature&lt;MultiLineString>](Feature<MultiLineString>) based on a
coordinate array. Properties can be added optionally.

**Parameters**

-   `coordinates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>>** an array of LineStrings
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an Object of key-value pairs to add as properties (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Feature
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the Feature

**Examples**

```javascript
var multiLine = turf.multiLineString([[[0,0],[10,10]]]);

//=multiLine
```

-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** if no coordinates are passed

Returns **[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)&lt;[MultiLineString](https://tools.ietf.org/html/rfc7946#section-3.1.5)>** a MultiLineString feature

## multiPoint

Creates a [Feature&lt;MultiPoint>](Feature<MultiPoint>) based on a
coordinate array. Properties can be added optionally.

**Parameters**

-   `coordinates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>** an array of Positions
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an Object of key-value pairs to add as properties (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Feature
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the Feature

**Examples**

```javascript
var multiPt = turf.multiPoint([[0,0],[10,10]]);

//=multiPt
```

-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** if no coordinates are passed

Returns **[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)&lt;[MultiPoint](https://tools.ietf.org/html/rfc7946#section-3.1.3)>** a MultiPoint feature

## multiPolygon

Creates a [Feature&lt;MultiPolygon>](Feature<MultiPolygon>) based on a
coordinate array. Properties can be added optionally.

**Parameters**

-   `coordinates` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>>>** an array of Polygons
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an Object of key-value pairs to add as properties (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Feature
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the Feature

**Examples**

```javascript
var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);

//=multiPoly
```

-   Throws **[Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)** if no coordinates are passed

Returns **[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)&lt;[MultiPolygon](https://tools.ietf.org/html/rfc7946#section-3.1.7)>** a multipolygon feature

## geometryCollection

Creates a [Feature&lt;GeometryCollection>](Feature<GeometryCollection>) based on a
coordinate array. Properties can be added optionally.

**Parameters**

-   `geometries` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Geometry](https://tools.ietf.org/html/rfc7946#section-3.1)>** an array of GeoJSON Geometries
-   `properties` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** an Object of key-value pairs to add as properties (optional, default `{}`)
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Optional Parameters (optional, default `{}`)
    -   `options.bbox` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>?** Bounding Box Array [west, south, east, north] associated with the Feature
    -   `options.id` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))?** Identifier associated with the Feature

**Examples**

```javascript
var pt = {
    "type": "Point",
      "coordinates": [100, 0]
    };
var line = {
    "type": "LineString",
    "coordinates": [ [101, 0], [102, 1] ]
  };
var collection = turf.geometryCollection([pt, line]);

//=collection
```

Returns **[Feature](https://tools.ietf.org/html/rfc7946#section-3.2)&lt;[GeometryCollection](https://tools.ietf.org/html/rfc7946#section-3.1.8)>** a GeoJSON GeometryCollection Feature

## round

Round number to precision

**Parameters**

-   `num` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Number
-   `precision` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Precision (optional, default `0`)

**Examples**

```javascript
turf.round(120.4321)
//=120

turf.round(120.4321, 2)
//=120.43
```

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** rounded number

## radiansToLength

Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet

**Parameters**

-   `radians` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** in radians across the sphere
-   `units` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers. (optional, default `'kilometers'`)

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** distance

## lengthToRadians

Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet

**Parameters**

-   `distance` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** in real units
-   `units` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers. (optional, default `'kilometers'`)

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** radians

## lengthToDegrees

Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet

**Parameters**

-   `distance` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** in real units
-   `units` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers. (optional, default `'kilometers'`)

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** degrees

## bearingToAzimuth

Converts any bearing angle from the north line direction (positive clockwise)
and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line

**Parameters**

-   `bearing` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** angle, between -180 and +180 degrees

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** angle between 0 and 360 degrees

## radiansToDegrees

Converts an angle in radians to degrees

**Parameters**

-   `radians` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** angle in radians

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** degrees between 0 and 360 degrees

## degreesToRadians

Converts an angle in degrees to radians

**Parameters**

-   `degrees` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** angle between 0 and 360 degrees

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** angle in radians

## convertLength

Converts a length to the requested unit.
Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet

**Parameters**

-   `length` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** to be converted
-   `originalUnit` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the length
-   `finalUnit` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** returned unit (optional, default `'kilometers'`)

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the converted length

## convertArea

Converts a area to the requested unit.
Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches

**Parameters**

-   `area` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** to be converted
-   `originalUnit` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the distance (optional, default `'meters'`)
-   `finalUnit` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** returned unit (optional, default `'kilometers'`)

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the converted distance

## isNumber

isNumber

**Parameters**

-   `num` **any** Number to validate

**Examples**

```javascript
turf.isNumber(123)
//=true
turf.isNumber('foo')
//=false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true/false

## isObject

isObject

**Parameters**

-   `input` **any** variable to validate

**Examples**

```javascript
turf.isObject({elevation: 10})
//=true
turf.isObject('foo')
//=false
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true/false

<!-- This file is automatically generated. Please don't edit it directly:
if you find an error, edit the source file (likely index.js), and re-run
./scripts/generate-readmes in the turf project. -->

---

This module is part of the [Turfjs project](http://turfjs.org/), an open source
module collection dedicated to geographic algorithms. It is maintained in the
[Turfjs/turf](https://github.com/Turfjs/turf) repository, where you can create
PRs and issues.

### Installation

Install this module individually:

```sh
$ npm install @turf/helpers
```

Or install the Turf module that includes it as a function:

```sh
$ npm install @turf/turf
```