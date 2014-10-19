/*
 * Ben Postlethwaite
 * January 2013
 * License MIT
 */
'use strict';
var at = require('arraytools');
var colorScale = require('./colorScales.json');


module.exports = function (spec) {

  /*
   * Default Options
   */
    var indicies, fromrgb, torgb,
        nsteps, cmap, colormap, format,
        nshades, colors,
        r = [],
        g = [],
        b = [];


    if ( !at.isPlainObject(spec) ) spec = {};

    if (!spec.colormap) colormap = 'jet';

    if (typeof spec.colormap === 'string') {
        colormap = spec.colormap.toLowerCase();

        if (!(colormap in colorScale)) {
            throw Error(colormap + ' not a supported colorscale');
        }
        cmap = colorScale[colormap];

    } else if (Array.isArray(spec.colormap)) {
        cmap = spec.colormap;
    }

    nshades = spec.nshades || 72;
    format = spec.format || 'hex';

    if (cmap.length > nshades) {
        throw new Error(colormap +
                        ' map requires nshades to be at least size ' +
                        cmap.length);
    }

    /*
     * map index points from 0->1 to 0 -> n-1
     */
    indicies = cmap.map(function(c) {
        return Math.round(c.index * nshades);
    });


    /*
     * map increasing linear values between indicies to
     * linear steps in colorvalues
     */
    for (var i = 0; i < indicies.length-1; ++i) {
        nsteps = indicies[i+1] - indicies[i];
        fromrgb = cmap[i].rgb;
        torgb = cmap[i+1].rgb;
        r = r.concat(at.linspace(fromrgb[0], torgb[0], nsteps ) );
        g = g.concat(at.linspace(fromrgb[1], torgb[1], nsteps ) );
        b = b.concat(at.linspace(fromrgb[2], torgb[2], nsteps ) );
    }

    r = r.map( Math.round );
    g = g.map( Math.round );
    b = b.map( Math.round );

    colors = at.zip3(r, g, b);

    if (format === 'hex') colors = colors.map( rgb2hex );

    return colors;
};


/*
 * RGB2HEX
 */
function rgb2hex(rgb) {
    var dig, hex = '#';
    for (var i = 0; i < 3; ++i) {
        dig = rgb[i];
        dig = dig.toString(16);
        hex += ('00' + dig).substr( dig.length );
    }
    return hex;
}
