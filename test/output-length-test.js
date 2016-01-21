var cmap = require('./..'),
    tap = require('tap');


tap.test('is object - object', function(t) {
  t.plan(1);
  var n = 15,
      cg,
      check = true;

    // Display all the colormaps
    var cms = ['jet', 'hsv' ,'hot', 'cool', 'spring', 'summer', 'autumn',
               'winter', 'greys', 'bone', 'copper'];

    for (var i = 0; i < cms.length; i++) {
        cg = cmap({'colormap': cms[i], 'nshades': n });
        check = check & (cg.length == n);
    }

    t.ok(check);
});
