const path = require('path'),
      uglifyplugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'colormap': './src/index.js',
        'colormap.min': './src/index.js',
    },

    output: {
        library: 'colormap',
        libraryTarget: 'var',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    
    plugins: [
        new uglifyplugin({
            include: /\.min\.js$/
        })
    ]    

};
