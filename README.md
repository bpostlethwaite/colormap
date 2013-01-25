# colormap

<<<<<<< HEAD
Output colormaps in hex or rgb. Note: these are based on [Matlab's colormaps](http://www.mathworks.com/help/matlab/ref/colormap.html)

![all colormap output](http://img89.imageshack.us/img89/9401/newcolourthing.png)

Super simple just do,

```javascript
options = {
  colormap: "jet"
, nshades: 72
, format: "hex"
}

=======
Output colormaps in hex or rgb. Super simple just do,
```javascript
options = {
  colormap: "jet"
, nshades: 72
, format: "hex"
}

>>>>>>> origin/master
cg = colormap(options)
```
where leaving `options = {}` or `undefined` results in the defaults given above.

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
<<<<<<< HEAD
Then just [browserify](https://github.com/substack/node-browserify) it and throw it in some html and it will output the image above!
=======
which outputs

![all colormap output](http://img89.imageshack.us/img89/9401/newcolourthing.png)


Then just [browserify](https://github.com/substack/node-browserify) it and throw it in some html!
>>>>>>> origin/master
