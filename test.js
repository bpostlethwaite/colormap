var colormap = require('.'),
    test = require('tape');


test('is object - object', function(t) {
  t.plan(1);
  var n = 15,
      cg,
      check = true;

    // Display all the colormaps
    var cms = ['jet', 'hsv' ,'hot', 'cool', 'spring', 'summer', 'autumn',
               'winter', 'greys', 'bone', 'copper'];

    for (var i = 0; i < cms.length; i++) {
        cg = colormap({'colormap': cms[i], 'nshades': n });
        check = check & (cg.length == n);
    }

    t.ok(check);
});

test('alpha config creates rgba arrays with correct alpha', function (t) {

    var alpha = 0.5;

    var rgba = colormap({
        colormap: 'greys',
        format: 'rgba',
        alpha: alpha
    });

    var firstRgba = rgba[0];
    var lastRgba = rgba[rgba.length - 1];

    t.equal(firstRgba[3], alpha);
    t.equal(lastRgba[3], alpha);

    t.end();
});

test('user colormap alpha values override alpha config', function (t) {

    var alphaconfig = 0.8;
    var alpha = 0.5;

    var map = [
        {index:0, rgb:[0, 0, 0, alpha]},
        {index:1, rgb:[255, 255, 255, alpha]}
    ];

    var rgba = colormap({
        colormap: map,
        alpha: [alphaconfig, alphaconfig],
        format: 'rgba'
    });

    var firstRgba = rgba[0];
    var lastRgba = rgba[rgba.length - 1];

    t.equal(firstRgba[3], alpha);
    t.equal(lastRgba[3], alpha);

    t.end();
});

test('alphamap values are computed independently between runs', function(t) {
    var blueRed = colormap({
        colormap: "bluered",
        format: "rgba",
        alpha: [0, 1]
    });

    var blueRed2 = colormap({
        colormap: "bluered",
        format: "rgba",
        alpha: [0, 0.5]
    });

    t.same(blueRed[blueRed.length - 1], [ 255, 0, 0, 1 ]);
    t.same(blueRed2[blueRed2.length - 1], [ 255, 0, 0, 0.5 ]);

    t.end();
});

test('supports YlOrRd and YlGnBu colorbrewer names and legacy aliases', function(t) {
    var ylorrd = colormap({ colormap: 'YlOrRd', nshades: 72 });
    var yiorrd = colormap({ colormap: 'YIOrRd', nshades: 72 });
    t.same(ylorrd, yiorrd, 'YlOrRd matches legacy YIOrRd');

    var ylgnbu = colormap({ colormap: 'YlGnBu', nshades: 72 });
    var yignbu = colormap({ colormap: 'YIGnBu', nshades: 72 });
    t.same(ylgnbu, yignbu, 'YlGnBu matches legacy YIGnBu');

    t.end();
});

test('all supported colormaps can be loaded', function(t) {
    var colorScale = require('./colorScale');
    var keys = Object.keys(colorScale);
    for (var i = 0; i < keys.length; i++) {
        var colors = colormap({ colormap: keys[i], nshades: 72 });
        t.equal(colors.length, 72, keys[i] + ' returned correct number of shades');
    }
    t.end();
});
