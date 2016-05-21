# Easy Javascript Colormaps

[![Build Status](https://travis-ci.org/bpostlethwaite/colormap.png)](https://travis-ci.org/bpostlethwaite/colormap)

![all colormap output](./example/colormaps.png)

## Simple example

```javascript
var colormap = require('colormap')
options = {
  colormap: 'jet',   // pick a builtin colormap or add your own
  nshades: 72,       // how many divisions
  format: 'hex',     // "hex" or "rgb" or "rgbaString"
  alpha: 1           // set an alpha value or a linear alpha mapping [start, end]
}
cg = colormap(options)
```

where leaving `options = {}` or `undefined` results in the defaults given above. There is a minimum number of `nshades` divisions you can select since the algorithms for each colormap have different requirements. `colormap` throws an error if there are too few divisions for the chosen colormap and gives the minimum number required. You should be safe with `n > 10` for all the colormaps, though some require much less (much simpler to implemenent).

## Options
The colormap can be any of the supported builtin colormaps. Or you can add your own. For an example of how to add your own see the json format available at:

```javascript
colorscales = require('colormap/colorScales')
```

Colorscales are a sequence of objects containing an `index` and `rgb` key. The index defines how fast or slow the `rgb` values will change from one segment to the next. Ie.the steepness of the gradient between two segments. The `rgb` parameter can hold a length 3 or 4 array, depending if alpha values are included in the mapping.

## Return values
An array of hex values ('hex') or an array of length 4 arrays containing rgba values ('rgb') or an rgba css string ('rgbaString').

## Complete Example
This example will produce the colormap image used at top of this README. It uses all built in color maps and utilizes alpha channel mapping.

```javascript
var cmap = require('./..'),
    canvas = document.getElementById('canvas'),
    img = document.getElementById('background'),
    c = canvas.getContext('2d'),
    n = 48,
    colormaps = [
        'jet', 'hsv','hot','cool','spring','summer','autumn','winter','bone',
        'copper','greys','YIGnBu','greens','YIOrRd','bluered','RdBu','picnic',
        'rainbow','portland','blackbody','earth','electric'
    ];

img.onload = run;

function drawColorMaps (colormap, name, height) {
    /*
     * Build up the color ranges and add text
     */
    for (var j = 0; j < n; j++) {
        c.fillStyle = colormap[j];      // start ind at index 0
        c.fillRect(j*10, height, 10, 40);

    }
    c.fillStyle = '#262626';
    c.font = '16px Helvetica';
    c.fillText( name, n*10 + 10, height + 26);
}

function run() {
    var height, colormap;
    c.canvas.height = colormaps.length * 40 + img.height;
    c.canvas.width = 648;

    for (var i = 0; i < colormaps.length; i++) {
        height = i*40;
        colormap = cmap({
            colormap: colormaps[i],
            nshades: n,
            format: 'rgbaString'
        });
        drawColorMaps(colormap, colormaps[i], height);
    }

    /*
     * Now lets try some alpha maps overtop an image!
     */
    var ilast = i;
    c.drawImage(img, 0, i*40, 480, 240);

    // remove background img
    img.parentElement.removeChild(img);

    for (var i = 0; i < colormaps.length; i++) {
        height = (ilast + i)*40;
        colormap = cmap({
            colormap: colormaps[i],
            nshades: n,
            format: 'rgbaString',
            alpha: [0, 1]
        });
        drawColorMaps(colormap, colormaps[i] + ' with transparency', height);
    }
}
```

Then just [browserify](https://github.com/substack/node-browserify) it and throw it in some html and it will output the image above!


## Credits

Color maps are inspired by [matplotlib](https://github.com/d3/d3-scale#sequential-color-scales) color scales, [cmocean](https://github.com/matplotlib/cmocean) oceanographic colormaps, [cosine gradients](https://github.com/thi-ng/color/blob/master/src/gradients.org) and others. Thanks to authors of these libs for their invaluable work.