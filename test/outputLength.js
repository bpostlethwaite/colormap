var cmap = require('./..')
  , test = require("tape")


test('is object - object', function(t) {
  t.plan(1)
  var n = 10
  , cg
  , check = true

  // Display all the colormaps
  var cms = ['jet', 'hsv' ,'hot', 'cool', 'spring', 'summer', 'autumn',
           'winter', 'gray', 'bone', 'copper']

  for (var i = 0; i < cms.length; i++) {
    cg = cmap({'colormap': cms[i], 'nshades': n })
    check = check & (cg.length == n)
  }

  t.ok(check)
})
