var cmap = require('./..')

var n = 5

// Display all the colormaps
var cms = ['jet', 'hsv' ,'hot', 'cool', 'spring', 'summer', 'autumn',
           'winter', 'gray', 'bone', 'copper']

var cg = cmap({'colormap': cms[6], 'nshades': n })

