/*
 * Ben Postlethwaite
 * January 2013
 * License MIT
 */
'use strict';
var at = require('arraytools');
var tinycolor = require('tinycolor2');
var colorScale = require('./colorScales2.json');


module.exports = function (spec) {

  /*
   * Default Options
   */
    var indicies, fromrgb, torgb,
        nsteps, cmap, colormap, format,
        nshades, colors, badscale, highestVal,
        r = [],
        g = [],
        b = [];


    if ( !at.isPlainObject(spec) ) spec = {};

    if (typeof spec.colormap === 'string') {
        if (!(colormap in colorScale)) {
            throw Error(colormap + ' not a supported colorscale');
        }
        colormap = spec.colormap || 'jet';
        cmap = colorScale[colormap];

    } else if (Array.isArray(colormap)) {
        badscale = colormap.some(function(si){
            if(si.length!==2) return true;
            if(si[0]<highestVal) return true;
            highestVal = si[0];
            return !tinycolor(si[1]).ok;
        });


    }



    nshades = spec.nshades || 72;
    format = spec.format || 'hex';

    colormap = colormap.toLowerCase();


    if (cmap.length > nshades) {
        throw new Error(colormap +
                        ' map requires nshades to be at least size ' +
                        cmap.length);
    }

    /*
     * map index points from 0->1 to 0 -> n-1
     */
    var INDEX = 0;
    var RGB = 1;

    indicies = cmap.map(function(c) {
        return Math.round(c[INDEX] * nshades);
    });


    /*
     * interpolate by mapping increasing linear values
     * between indicies to linear steps in colorvalues
     */
    for (var i = 0; i < indicies.length-1; ++i) {
        nsteps = indicies[i+1] - indicies[i];
        fromrgb = cmap[i][RGB];
        torgb = cmap[i+1][RGB];
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
