var colormap = require('../.'),
    test = require('tape');

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
        {"index":0,"rgb":[0,0,0, alpha]},
        {"index":1,"rgb":[255,255,255, alpha]}
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
