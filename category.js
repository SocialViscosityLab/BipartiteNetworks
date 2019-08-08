class Category extends Button {
    constructor(height, kind) {
        super(0, 0, 10, height);
        this.idCat = { cluster: undefined, index: undefined };
        this.connectors = [];
        this.color = '#f4f4f4';
        this.label = "void";
        this.description = "void";
        this.categoryGap = 5;
        this.kind = kind;
    }

    addPositiveConnector(n) {
        if (!n) {
            n = 1;
        }
        for (let index = 0; index < n; index++) {
            let tmp = new Connector(true);
            tmp.subscribe(this);
            if (this.kind == 'POSITIVE' | this.kind == 'BOTH') {
                tmp.setColor(this.color);
            }
            this.connectors.push(tmp);
        }
        this.updateConnectorsCoords();
        if (this.idCat) {
            this.updateConnectorsId(this.idCat);
        }
    }

    addNegativeConnector(n) {
        if (!n) {
            n = 1;
        }
        for (let index = 0; index < n; index++) {
            let tmp = new Connector(false);
            tmp.subscribe(this);
            if (this.kind == 'NEGATIVE' | this.kind == 'BOTH') {
                tmp.setColor(this.color);
            }
            this.connectors.push(tmp);
        }
        this.updateConnectorsCoords();
        if (this.idCat) {
            this.updateConnectorsId(this.idCat);
        }
    }

    setLabel(label) {
        this.label = label;
    }

    setDescription(description) {
        this.description = description;
    }

    setColor(color) {
        this.color = color;
        this.setColorConnectors(this.color);
    }

    setColorConnectors(color) {
        if (this.kind == 'POSITIVE') {
            let positives = this.getConnectors(true);
            positives.forEach(connector => {
                connector.setColor(this.color);
            });
        } else if (this.kind == 'NEGATIVE') {
            let negatives = this.getConnectors(true);
            negatives.forEach(connector => {
                connector.setColor(this.color);
            });
        } else if (this.kind == 'BOTH') {
            this.connectors.forEach(connector => {
                connector.setColor(this.color);
            });
        }
    }

    setId(clusterID, index) {
        this.idCat.cluster = clusterID;
        this.idCat.index = index;
        this.updateConnectorsId(this.idCat);
    }

    updateConnectorsId(categoryID) {
        let count = 0;
        let positives = this.getConnectors(true);
        positives.forEach(element => {
            element.setId(categoryID, count);
            count++;
        });

        count = 0;
        let negatives = this.getConnectors(false);
        negatives.forEach(element => {
            element.setId(categoryID, count);
            count++;
        });
    }

    getConnectors(polarity) {
        let rtn = [];
        this.connectors.forEach(connector => {
            if (connector.polarity == polarity) {
                rtn.push(connector);
            }
        });
        return rtn;
    }

    updateCoords(pos, sequence, width) {
        this.setPos(globalP5.createVector(pos.x, pos.y + (sequence * this.height) + (sequence * this.categoryGap)));
        this.width = width;
        this.updateConnectorsCoords();

    }

    updateConnectorsCoords() {
        // right
        let counter = 0;
        let positives = this.getConnectors(true);
        positives.forEach(connector => {
            connector.updateCoords(this.pos, this.width, counter, this.height / positives.length);
            counter++;
        });
        // left
        counter = 0;
        let negatives = this.getConnectors(false);
        negatives.forEach(connector => {
            connector.updateCoords(this.pos, this.width, counter, this.height / negatives.length);
            counter++;
        });
    }

    show() {
        globalP5.noFill();
        globalP5.stroke(250);
        globalP5.rect(this.pos.x, this.pos.y, this.width, this.height);
        globalP5.fill("#000000");
        globalP5.textAlign(globalP5.CENTER, globalP5.CENTER);
        globalP5.noStroke();
        globalP5.textSize(10);
        globalP5.text(this.label, this.pos.x , this.pos.y ,this.width, this.height);

        let positives = this.getConnectors(true);
        for (let index = 0; index < positives.length; index++) {
            const element = positives[index];
            if (index == positives.length - 1) {
                element.showAsButton();
            } else {
                element.show()
            }
        }
        let negatives = this.getConnectors(false);
        for (let index = 0; index < negatives.length; index++) {
            const element = negatives[index];
            if (index == negatives.length - 1) {
                element.showAsButton();
            } else {
                element.show()
            }
        }
    }

    splitConnectors(edge) {
        let source = edge.source;
        let target = edge.target; // might be undefined

        source.observers.forEach(element => {
            if (source.polarity == true) {
                element.addPositiveConnector();
            } else {
                element.addNegativeConnector();
            }
        });

        if (target) {
            target.observers.forEach(element => {
                if (element.idCat == this.idCat) {
                    if (target.polarity == true) {
                        this.addPositiveConnector();
                    } else {
                        this.addNegativeConnector();
                    }
                }
            });
        }
    }

    mouseClickedEvents() {
        this.connectors.forEach(connector => {
            connector.mouseClickedEvents();
        });
    }
}