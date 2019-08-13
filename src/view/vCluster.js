class VCluster {
    constructor(cluster, x, y, width, height, palette) {
        this.pos = globalP5.createVector(x, y);
        this.width = width;
        this.height = height;
        this.vCategories = [];
        this.cluster = cluster;
        this.populateVCategories(cluster);
        this.palette = palette;
        this.setPalette();
    }

    populateVCategories(cluster) {
        for (let index = 0; index < cluster.categories.length; index++) {

            // Create vCategory
            let vCatTemp = new VNode(cluster.categories[index], this.width, this.height);

            for (const connector of vCatTemp.node.positives) {
                vCatTemp.addPositiveVConnector(connector);
            }

            for (const connector of vCatTemp.node.negatives) {
                vCatTemp.addNegativeVConnector(connector);
            }

            // set color
            vCatTemp.setColor('#d2d2d2');

            // add to colecction
            this.addVCategory(vCatTemp);
        }
    }

    addVCategory(vCat) {
        vCat.updateCoords(this.pos, this.vCategories.length + 1, this.width);
        this.vCategories.push(vCat);
    }

    setPalette(palette) {
        if (palette) {
            this.palette = palette;
        }

        if (this.palette) {
            let counter = 0;
            this.vCategories.forEach(element => {
                element.setColor(this.palette[counter]);
                counter ++;
            });
        }
    }

    show(builder) {
        builder.textAlign(globalP5.LEFT, globalP5.TOP);
        if (this.cluster.label) {
            builder.textSize(12);
            builder.fill(0);
            builder.noStroke();
            builder.text(this.cluster.label, this.pos.x, this.pos.y, this.width, 35);
            builder.textSize(9);
            builder.text(this.cluster.description, this.pos.x, this.pos.y + 15, this.width, 30);
        }

        this.vCategories.forEach(cat => {
            cat.show(builder);
        });
    }

    //**** EVENTS ******/
    mouseOverEvents() {
        this.vCategories.forEach(cat => {
            cat.mouseOver();
            cat.mouseOverEvents();
            cat.mouseMovedEvents();
            cat.vPositives.forEach(connector => {
                connector.mouseOver();
            });
            cat.vNegatives.forEach(connector => {
                connector.mouseOver();
            });
        });
    }

    mouseClickedEvents() {
        this.vCategories.forEach(cat => {
            cat.mouseClickedEvents();
        });
    }
}