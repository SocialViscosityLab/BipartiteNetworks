class ColorFactory {

    static loadPalette(fileName) {
        globalP5.loadStrings(fileName, ColorFactory.splitTokens);
    }

    static splitTokens(data) {
        ColorFactory.palettes.push(data);
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