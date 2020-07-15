class ColorFactory {

    // static loadPalette(fileName) {
    //     return Promise.resolve(globalP5.loadStrings(fileName,
    //         data => Promise.resolve(ColorFactory.palettes.push(data)).then(p => {
    //             if (data.length > 0) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         })
    //     ))
    // }

    // static async loadPalette2(fileName) {
    //     let fileData = await globalP5.loadStrings(fileName);
    //     ColorFactory.palettes.push(fileData);
    //     return fileData;
    // }

    static loadPalettes(path, names, thenFunction) {
        return new Promise(resolve => {
            resolve(
                // First palette
                globalP5.loadStrings(path + names[0], data => {
                    ColorFactory.palettes.push(data);
                    console.log(0 + ", :" + ColorFactory.palettes.length);
                    // Second palette
                    globalP5.loadStrings(path + names[1], data => {
                        ColorFactory.palettes.push(data);
                        console.log(1 + ", :" + ColorFactory.palettes.length);
                        // Third palette
                        globalP5.loadStrings(path + names[2], data => {
                            ColorFactory.palettes.push(data);
                            console.log(3 + ", :" + ColorFactory.palettes.length);
                            // Fourth palette
                            globalP5.loadStrings(path + names[3], data => {
                                ColorFactory.palettes.push(data);
                                console.log(4 + ", :" + ColorFactory.palettes.length);
                                // Call the "then" function once all the palettes are completed
                                thenFunction();
                            });
                        });
                    });
                }))
        })
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