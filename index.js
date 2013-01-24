"use strict";
var cg = require('colorgrad')()
var at = require('arrayTools')()

module.exports = function (spec) {

  /*
   * Default Options
   */
  if( !at.isObj(spec) )
    spec = {}
  spec.colormap = spec.colormap || "jet"
  spec.nshades = spec.nshades || 72
  spec.format = spec.format || "hex"
     

  /*
   * Supported colormaps
   */
  var cmap = {
    "jet": jet
  } 


  /*
   * apply map and convert result if needed
   */
  var carray = cmap[spec.colormap](spec.nshades)
  var result = []
  if (spec.format === "hex") {
    carray.forEach( function (ar) {
      result.push( cg.rgb2hex(ar) )
    })
  } else result = carray

  

  /*
   * colormap functions
   *
   */
  function jet(n) {
    var divs = [0, 0.125, 0.375, 0.625, 0.875, 1].map(function(x) { return x * n })
      var divs = divs.map( Math.round )

    var r = at.graph( divs, [0.5, 1, 1, 0, 0, 0].map(function(x) { return x * 255})).map(Math.round)
    var g = at.graph( divs, [0, 0, 1, 1, 0, 0].map(function(x) { return x * 255})).map(Math.round)
    var b = at.graph( divs, [0, 0, 0, 1, 1, 0.5].map(function(x) { return x * 255})).map(Math.round)

    return at.zip3(r, g, b)
  }


  return result

}
