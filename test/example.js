var cmap = require('./..')

var canvas = document.getElementById('canvas')
, c = canvas.getContext('2d')

var cg = cmap({'colormap': 'copper', 'nshades': 64 })

var i
for (i = 0; i < cg.length; ++i) {
  c.fillStyle = cg[i] // start ind at index 0
  c.fillRect(i*10, 1, 10, 40)
  c.fillStyle = cg[i] // start ind at index 0
  c.fillRect(i*10, 41, 10, 40)
}
