class Connector extends Button {
    constructor(polarity) {
        super(0, 0, 10, 0);
        this.polarity = polarity;
        this.id = { cluster: undefined, cat: undefined, index: undefined, polarity: this.polarity };
        this.color = '#d4d4d4';
        this.taken = false;
        // observer pattern
        this.observers = [];
    }

    subscribe(category) {
        this.observers.push(category);
    }

    notifyObservers(data) {
        this.observers.forEach(element => {
            if (data instanceof Edge) {
                element.splitConnectors(data)
            }
        });
    }

    setColor(color) {
        this.color = color;
    }

    setId(cat, index) {
        this.id.cluster = cat.cluster;
        this.id.cat = cat.index;
        this.id.index = index;
    }

    updateCoords(pos, catWidth, sequence, height) {
        if (this.polarity == true) {
            // right
            this.setPos(globalP5.createVector(pos.x + catWidth, pos.y + (sequence * height)));
        } else {
            // left
            this.setPos(globalP5.createVector(pos.x - this.width, pos.y + (sequence * height)));
        }
        this.setHeight(height);
    }

    show() {
        globalP5.fill(this.color);
        globalP5.stroke(this.color);
        globalP5.rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    showAsButton() {
        globalP5.fill(this.color.concat('ff'));
        globalP5.stroke(200);
        if (this.mouseIsOver) {
            globalP5.stroke("#333333")
        } else {
            globalP5.stroke(this.color)
        }
        globalP5.rect(this.pos.x, this.pos.y, this.width, this.height);
        globalP5.textAlign(globalP5.CENTER, globalP5.CENTER);
        globalP5.fill('#000000');
        globalP5.stroke('#000000');
        globalP5.blendMode(globalP5.SOFT_LIGHT);
        globalP5.text('+', this.pos.x + this.width / 2, this.pos.y + this.height / 2);
        globalP5.blendMode(globalP5.BLEND);
    }

    sproutEdge() {
        if (document.getElementById("edit").checked) {

            if (!this.connectorTaken) { //this.mouseIsOver && 

                // get the last edge in edges collection.
                let lastEdge = edges.slice(-1)[0];

                // if the retrieved edge is open then close it
                if (lastEdge) {
                    if (lastEdge.open) {
                        // evaluate source and target cluster difference
                        if (lastEdge.source.id.cluster != this.id.cluster) {
                            // set target
                            if (lastEdge.setTarget(this)) {
                                // disable connector
                                this.connectorTaken = true;
                                // close edge
                                lastEdge.open = false;
                                // return polarity object
                                return lastEdge;
                            }
                        } else {
                            console.log("Impossible edge. Equal source and target category. Source: "
                                + lastEdge.source.id.cluster
                                + " target: "
                                + this.id.cluster);
                            // Enable source connector
                            lastEdge.source.connectorTaken = false;
                            // remove temporary edge
                            edges.pop();
                            this.connectorTaken = false;
                        }
                        // If the edge is not open
                    } else {
                        // create a new one
                        edges.push(new Edge(this));
                        // dissable this connector
                        this.connectorTaken = true;
                        // return polarity object
                        return false;
                    }
                }

                // If this is the first edge, create a new open one
                if (!lastEdge) {
                    // create a new one
                    edges.push(new Edge(this));
                    // dissable this connector
                    this.connectorTaken = true;
                    // return polarity object
                    return false;
                }
            } else {
                console.log("Connector taken, click on the + to add one connector to that category");
            }

            return false;
        }
    }

    mouseClickedEvents() {
        if (this.mouseIsOver) {
            this.notifyObservers(this.sproutEdge());
        }
    }
}