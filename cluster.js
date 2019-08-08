class Cluster {
    constructor(id, x, y, width) {
        this.pos = globalP5.createVector(x, y);
        this.label;
        this.description;
        this.width = width;
        this.categories = [];
        this.id = id;
    }

    addCategory(cat) {
        cat.setId(this.id, this.categories.length);
        cat.updateCoords(this.pos, this.categories.length + 1, this.width);
        this.categories.push(cat);
    }

    show() {
        globalP5.textAlign(globalP5.CENTER, globalP5.CENTER);
        if (this.label) {
            globalP5.text(this.label, this.pos.x + this.width / 2, this.pos.y);
        }

        this.categories.forEach(cat => {
            cat.show();
        });
    }

    mouseOverEvents() {
        this.categories.forEach(cat => {
            cat.mouseOver();
            cat.connectors.forEach(connector => {
                connector.mouseOver();
            });
        });
    }

    mouseClickedEvents() {
        this.categories.forEach(cat => {
            cat.mouseClickedEvents();
        });
    }
}