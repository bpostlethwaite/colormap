/*
 * Ben Postlethwaite
 * January 2013
 * License MIT
 */
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
      [0.000, 0.376, 0.627, 0.878, 1.000]
      , [0.000, 0.016, 1.000, 0.984, 0.500]
      ]
      , g: [
      [0.000, 0.125, 0.376, 0.627, 0.878, 1.000]
      , [0.000, 0.016, 1.000, 0.984, 0.000, 0.000]
      ]
      , b: [
      [0.000, 0.125, 0.376, 0.627, 1.000]
      , [0.516, 1.000, 0.984, 0.000, 0.000]
      ]

    }
    , hsv: {
      r: [
      [0.000, 0.169, 0.173, 0.337, 0.341, 0.671, 0.675, 0.839, 0.843, 1.000]
      , [1.000, 0.992, 0.969, 0.000, 0.000, 0.008, 0.031, 1.000, 1.000, 1.000]
      ]
      , g: [
      [0.000, 0.169, 0.173, 0.506, 0.671, 0.675, 1.000]
      , [0.000, 1.000, 1.000, 0.977, 0.000, 0.000, 0.000]
      ]
      , b: [
      [0.000, 0.337, 0.341, 0.506, 0.839, 0.843, 1.000]
      , [0.000, 0.016, 0.039, 1.000, 0.984, 0.961, 0.023]
      ]

    }
    , hot: {
      r: [
      [0.000, 0.376, 1.000]
      , [0.010, 1.000, 1.000]
      ]
      , g: [
      [0.000, 0.376, 0.753, 1.000]
      , [0.000, 0.010, 1.000, 1.000]
      ]
      , b: [
      [0.000, 0.753, 1.000]
      , [0.000, 0.016, 1.000]
      ]

    }
    , cool: {
      r: [
      [0.000, 1.000]
      , [0.000, 1.000]
      ]
      , g: [
      [0.000, 1.000]
      , [1.000, 0.000]
      ]
      , b: [
      [0.000, 1.000]
      , [1.000, 1.000]
      ]

    }
    , spring: {
      r: [
      [0.000, 1.000]
      , [1.000, 1.000]
      ]
      , g: [
      [0.000, 1.000]
      , [0.000, 1.000]
      ]
      , b: [
      [0.000, 1.000]
      , [1.000, 0.000]
      ]

    }
    , summer: {
      r: [
      [0.000, 1.000]
      , [0.000, 1.000]
      ]
      , g: [
      [0.000, 1.000]
      , [0.500, 1.000]
      ]
      , b: [
      [0.000, 1.000]
      , [0.400, 0.400]
      ]

    }
    , autumn: {
      r: [
      [0.000, 1.000]
      , [1.000, 1.000]
      ]
      , g: [
      [0.000, 1.000]
      , [0.000, 1.000]
      ]
      , b: [
      [0.000, 1.000]
      , [0.000, 0.000]
      ]

    }
    , winter: {
      r: [
      [0.000, 1.000]
      , [0.000, 0.000]
      ]
      , g: [
      [0.000, 1.000]
      , [0.000, 1.000]
      ]
      , b: [
      [0.000, 1.000]
      , [1.000, 0.500]
      ]

    }
    , gray: {
      r: [
      [0.000, 1.000]
      , [0.000, 1.000]
      ]
      , g: [
      [0.000, 1.000]
      , [0.000, 1.000]
      ]
      , b: [
      [0.000, 1.000]
      , [0.000, 1.000]
      ]

    }
    , bone: {
      r: [
      [0.000, 0.753, 1.000]
      , [0.000, 0.661, 1.000]
      ]
      , g: [
      [0.000, 0.376, 0.753, 1.000]
      , [0.000, 0.331, 0.784, 1.000]
      ]
      , b: [
      [0.000, 0.376, 1.000]
      , [0.001, 0.454, 1.000]
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
   * colormap function
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
       * Build linear values from x axis point to x axis point
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
