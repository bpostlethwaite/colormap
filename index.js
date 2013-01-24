"use strict";
var cg = require('colorgrad')()
var at = require('arraytools')()

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
  var cmaps = {
    jet: {
      r: [
        [0, 0.125, 0.375, 0.625, 0.875, 1] // division
      , [0.5, 1, 1, 0, 0, 0]  // value
      ]
    , g: [
        [0, 0.125, 0.375, 0.625, 0.875, 1] // division
      , [0, 0, 1, 1, 0, 0]  // value
      ]
    , b: [
        [0, 0.125, 0.375, 0.625, 0.875, 1] // division
      , [0, 0, 0, 1, 1, 0.5]  // value
    ]
    }
    , copper: {
      r: [
        [0.000, 0.804, 1.000]
      , [0.000, 1.000, 1.000]
      ]
      , g: [
        [0.000, 1.000]
      , [0.000, 0.781]
      ]
      , b: [
        [0.000, 1.000]
      , [0.000, 0.497]
      ]
    }
  } 


  /*
   * apply map and convert result if needed
   */
  var carray = buildmap(cmaps[spec.colormap], spec.nshades)
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
  function buildmap(cmap, n) {

    var div, val, res = []
    var key = ['r', 'g', 'b']
    for (var i = 0; i < 3; i++) {
      /*
       * map x axis point from 0->1 to 0 -> n 
       */
      div = cmap[key[i]][0].map(function(x) { return x * n }).map( Math.round )
      /*
       * map 0 -> 1 rgb value to 0 -> 255
       */
      val = cmap[key[i]][1].map(function(x) { return x * 255 })

      /*
       * Then build linear values from x axis point to x axis point
       * and from rgb value to value
       */
       res[i] = at.graph( div, val ).map( Math.round )
    }
    /*
     * Then zip up 3xn vectors into nx3 vectors
     */
    return at.zip3(res[0], res[1], res[2])
  }


  return result

}
