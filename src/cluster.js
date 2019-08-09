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

    setLabel(label){
        this.label = label;
    }

    setDescription(text){
        this.description = text;
    }

    show() {
        globalP5.textAlign(globalP5.LEFT, globalP5.TOP);
        if (this.label) {
            globalP5.textSize(12);
            globalP5.fill(0);
            globalP5.noStroke();
            globalP5.text(this.label, this.pos.x , this.pos.y, this.width, 20);
            globalP5.textSize(9);
            globalP5.text(this.description, this.pos.x , this.pos.y+15, this.width, 30);
        }

        this.categories.forEach(cat => {
            cat.show();
        });
    }

    mouseOverEvents() {
        this.categories.forEach(cat => {
            cat.mouseOver();
            cat.mouseOverEvents();
            cat.mouseMovedEvents();
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