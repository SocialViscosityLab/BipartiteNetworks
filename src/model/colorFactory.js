class ColorFactory {

    static loadPalette(fileName) {
        return new Promise(function(resolve,reject){
            resolve(globalP5.loadStrings(fileName, ColorFactory.splitTokens));
        }); 
    }

    static splitTokens(data) {
        ColorFactory.palettes.push(data);
        return true;
    }

    static getPalette(n) {
        if (0 >= n && n < ColorFactory.palettes.length) {
            return ColorFactory.palettes[n];
        } else {
            console.log("Check palette index");
        }
    }
}
ColorFactory.palettes = [];