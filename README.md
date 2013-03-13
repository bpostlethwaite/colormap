# colormap

Output predefined color maps in hex or rgb. Note: these are based on [Matlab's colormaps](http://www.mathworks.com/help/matlab/ref/colormap.html)

[![browser support](http://ci.testling.com/bpostlethwaite/colormap.png)](http://ci.testling.com/bpostlethwaite/colormap)
[![Build Status](https://travis-ci.org/bpostlethwaite/colormap.png)](https://travis-ci.org/bpostlethwaite/colormap)

![all colormap output](http://img195.imageshack.us/img195/5052/colormap.png)

Super simple just do,
```javascript
options = {
  colormap: "jet"   // pick your colormap
, nshades: 72       // how many divisions
, format: "hex"     // "hex" or "rgb"
}
cg = colormap(options)
```
where leaving `options = {}` or `undefined` results in the defaults given above. There is a minimum number of `nshades` divisions you can select since the algorithms for each colormap have different requirements. `colormap` throws an error if there are too few divisions for the chosen colormap and gives the minimum number required. You should be safe with `n > 10` for all the colormaps, though some require much less (much simpler to implemenent).

Here is a more complete example which also defines all the currently available color maps.

## Example
```javascript
var cmap = require('colormap')

var canvas = document.getElementById('canvas')
  , c = canvas.getContext('2d')

var n = 48

// Display all the colormaps
var cms = ['jet', 'hsv' ,'hot', 'cool', 'spring', 'summer', 'autumn',
           'winter', 'gray', 'bone', 'copper']

var i, j, cg
for (i = 0; i < cms.length; i++) {
  /*
   * Call colormap with each type
   */
  cg = cmap({'colormap': cms[i], 'nshades': n })

  /*
   * Build up the color ranges and add text
   */
  for (j = 0; j < n; j++) {
    c.fillStyle = cg[j] // start ind at index 0
    c.fillRect(j*10, i*40, 10, 40)

  }
  c.fillStyle = "#262626"
  c.font = "16px Helvetica";
  c.fillText( cms[i], n*10 + 10, i * 40 + 26);
}
```

Then just [browserify](https://github.com/substack/node-browserify) it and throw it in some html and it will output the image above!
