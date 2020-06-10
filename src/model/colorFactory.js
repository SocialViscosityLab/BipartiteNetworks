class ColorFactory {

    static loadPalette(fileName) {
        return Promise.resolve(globalP5.loadStrings(fileName, 
            data => Promise.resolve(ColorFactory.palettes.push(data)).then(p => {
            if (data.length > 0) {
                return true
            } else {
                return false
            }
        })
        )
        )
    }

    static getPalette(n) {
        if (0 <= n && n < ColorFactory.palettes.length) {
            return ColorFactory.palettes[n];
        } else {
            console.log("Check palette index " + n);
        }
    }
}
ColorFactory.palettes = [];