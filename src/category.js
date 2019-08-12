class Category extends Button {
    constructor(height, kind) {
        super(0, 0, 10, height);
        this.idCat = { cluster: undefined, index: undefined };
        this.connectors = [];
        this.positives = [];
        this.negatives = [];
        this.color = '#d2d2d2';
        this.label = "void";
        this.description = "No description yet";
        this.categoryGap = 5;
        this.kind = kind;
        this.inPropagation = false;
        this.clicked = false;
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
            this.positives.push(tmp);
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
            this.negatives.push(tmp);
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
            //let positives = this.getConnectors(true);
            this.positives.forEach(connector => {
                connector.setColor(this.color);
            });
        } else if (this.kind == 'NEGATIVE') {
            //let negatives = this.getConnectors(true);
            this.negatives.forEach(connector => {
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
        //let positives = this.getConnectors(true);
        this.positives.forEach(element => {
            element.setId(categoryID, count);
            count++;
        });

        count = 0;
        //let negatives = this.getConnectors(false);
        this.negatives.forEach(element => {
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
        //let positives = this.getConnectors(true);
        this.positives.forEach(connector => {
            connector.updateCoords(this.pos, this.width, counter, this.height / this.positives.length);
            counter++;
        });
        // left
        counter = 0;
        //let negatives = this.getConnectors(false);
        this.negatives.forEach(connector => {
            connector.updateCoords(this.pos, this.width, counter, this.height / this.negatives.length);
            counter++;
        });
    }

    show() {
        globalP5.strokeWeight(1);
        if (this.inPropagation) {
            globalP5.fill(this.color.concat('30'));
        } else {
            globalP5.noFill();
        }
        if (this.clicked | this.mouseIsOver) {
            globalP5.stroke(200);
        } else {
            globalP5.stroke(250);
        }

        globalP5.rect(this.pos.x, this.pos.y, this.width, this.height);
        globalP5.fill("#000000");
        globalP5.textAlign(globalP5.CENTER, globalP5.CENTER);
        globalP5.noStroke();
        globalP5.textSize(10);
        globalP5.text(this.label, this.pos.x, this.pos.y, this.width, this.height);

        //let positives = this.getConnectors(true);
        for (let index = 0; index < this.positives.length; index++) {
            const element = this.positives[index];
            if (index == this.positives.length - 1) {
                element.showAsButton();
            } else {
                element.show()
            }
        }
        //let negatives = this.getConnectors(false);
        for (let index = 0; index < this.negatives.length; index++) {
            const element = this.negatives[index];
            if (index == this.negatives.length - 1) {
                element.showAsButton();
            } else {
                element.show()
            }
        }

        if (this.mouseIsOver) {
            this.showDescription();
        }
    }

    showDescription() {
        globalP5.fill("#000000");
        globalP5.textAlign(globalP5.LEFT, globalP5.TOP);
        globalP5.strokeWeight(0.5);
        globalP5.textSize(12);
        globalP5.text(this.label, 95, globalP5.height - 80, globalP5.width - 200, 97);
        globalP5.noStroke();
        globalP5.textSize(11);
        globalP5.text(this.description, 100, globalP5.height - 62, globalP5.width - 200, 97);

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

    propagateForward(cat, prop) {
        let issuesAt;
        try {
            // i) retrive a subset of edges whose SOURCE is this category
            let edgesTmp = [];
            cat.inPropagation = prop;
            edges.forEach(edg => {
                let observers = edg.source.observers;
                observers.forEach(obs => {
                    if (obs.idCat == cat.idCat) {
                        // console.log(obs.label);
                        edgesTmp.push(edg);
                    }
                });
            });
            // ii) retrieve the list of target categories linked to this category
            edgesTmp.forEach(edg => {
                if (edg.target == undefined) {
                    return false;
                }
                let observers = edg.target.observers;
                observers.forEach(obs => {
                    issuesAt = obs.label;
                    //console.log(obs.label);
                    obs.inPropagation = prop;
                    // for each of those categories, repeat i), ii)
                    this.propagateForward(obs, prop);
                });
            });
        } catch (error) {
            if (error instanceof RangeError) {
                console.log("WARNING: INFINTE RECURSION. The path of edges draw a closed loop. Check: "+ issuesAt)
            }
        }
    }

    propagateBackward(cat, prop) {
        let issuesAt;
        try {
            // i) retrive a subset of edges whose TARGET is this category
            let edgesTmp = [];
            cat.inPropagation = prop;
            edges.forEach(edg => {
                let observers = edg.target.observers;
                observers.forEach(obs => {
                    if (obs.idCat == cat.idCat) {
                        // console.log(obs.label);
                        edgesTmp.push(edg);
                    }
                });
            });
            // ii) retrieve the list of source categories linked to this category
            edgesTmp.forEach(edg => {
                if (edg.target == undefined) {
                    return false;
                }
                let observers = edg.source.observers;
                observers.forEach(obs => {
                    issuesAt = obs.label;
                    // console.log(obs.label);
                    obs.inPropagation = prop;
                    // for each of those categories, repeat i), ii)
                    this.propagateBackward(obs, prop);
                });
            });
        } catch (error) {
            if (error instanceof RangeError) {
                console.log("WARNING: INFINTE RECURSION. The path of edges draw a closed loop. Check Category: " + issuesAt)
            }
        }
    }

    mouseMovedEvents() {
        if (this.clicked) {
            if (document.getElementById("forward").checked) {
                this.propagateForward(this, this.clicked);
            }
            if (document.getElementById("backward").checked) {
                this.propagateBackward(this, this.clicked);
            }
        }
    }

    mouseOverEvents() {

    }

    mouseClickedEvents() {
        if (this.mouseIsOver) {
            this.clicked = !this.clicked;
            if (document.getElementById("forward").checked) {
               this.propagateForward(this, this.clicked);
            }
            if (document.getElementById("backward").checked) {
                this.propagateBackward(this, this.clicked);
            }
        }
        this.connectors.forEach(connector => {
            connector.mouseClickedEvents();
        });
    }
}