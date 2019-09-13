class VNode extends Button {
    constructor(node, width, height) {
        super(0, 0, width, height);
        this.node = node;
        this.color = '#d2d2d2';
        this.clicked = false;
        this.categoryGap = 5;
        this.vPositives = [];
        this.vNegatives = [];
        this.node.subscribe(this);
    }

    addPositiveVConnector(connector) {
        let tmpVConnector = new VConnector(connector);
        tmpVConnector.setColor(this.color);
        this.vPositives.push(tmpVConnector);
        this.updateConnectorsCoords();

    }

    addNegativeVConnector(connector) {
        let tmpVConnector = new VConnector(connector);
        tmpVConnector.setColor(this.color);
        this.vNegatives.push(tmpVConnector);
        this.updateConnectorsCoords();

    }

    setColor(color) {
        this.color = color;
        this.setColorConnectors(this.color);
    }

    setColorConnectors(color) {
        this.vPositives.forEach(connector => {
            connector.setColor(color);
        });
        this.vNegatives.forEach(connector => {
            connector.setColor(color);
        });
    }

    updateCoords(pos, sequence) {
        this.setPos(globalP5.createVector(pos.x, pos.y + this.height + (sequence * this.height) + (sequence * this.categoryGap)));
        this.updateConnectorsCoords();
    }

    updateConnectorsCoords() {
        // right
        let counter = 0;
        //let positives = this.getConnectors(true);
        this.vPositives.forEach(connector => {
            connector.updateCoords(this.pos, this.width, counter, this.height / this.vPositives.length);
            counter++;
        });
        // left
        counter = 0;
        //let negatives = this.getConnectors(false);
        this.vNegatives.forEach(connector => {
            connector.updateCoords(this.pos, this.width, counter, this.height / this.vNegatives.length);
            counter++;
        });
    }

    show(builder) {
        builder.strokeWeight(1);

        if (this.node.inPropagation) {
            builder.fill(this.color.concat('30'));
        } else {
            builder.noFill();
        }
        if (this.clicked | this.mouseIsOver) {
            builder.stroke(200);
        } else {
            builder.stroke(250);
        }

        builder.rect(this.pos.x, this.pos.y, this.width, this.height);
        builder.fill("#000000");
        builder.textAlign(globalP5.CENTER, globalP5.CENTER);
        builder.noStroke();
        builder.textSize(10);
        builder.text(this.node.label, this.pos.x, this.pos.y, this.width, this.height);

        //let positives = this.getConnectors(true);
        for (let index = 0; index < this.vPositives.length; index++) {
            const element = this.vPositives[index];
            if (index == this.vPositives.length - 1) {
                element.showAsButton(builder);
            } else {
                element.show(builder)
            }
        }
        //let negatives = this.getConnectors(false);
        for (let index = 0; index < this.vNegatives.length; index++) {
            const element = this.vNegatives[index];
            if (index == this.vNegatives.length - 1) {
                element.showAsButton(builder);
            } else {
                element.show(builder)
            }
        }

        if (this.mouseIsOver) {
            this.showDescription(builder);
        }
    }

    showDescription(builder) {
        builder.fill("#000000");
        builder.textAlign(globalP5.LEFT, globalP5.TOP);
        builder.strokeWeight(0.5);
        builder.textSize(12);
        builder.text(this.node.label, 95, globalP5.height - 80, globalP5.width - 200, 97);
        builder.noStroke();
        builder.textSize(11);
        builder.text(this.node.description, 100, globalP5.height - 62, globalP5.width - 200, 97);

    }

    // **** EVENTS *****
    mouseMovedEvents() {
        if (this.clicked) {
            this.node.propagate(this.node, this.clicked);
        }
    }

    mouseOverEvents() {

    }

    mouseClickedEvents() {
        if (this.mouseIsOver) {
            this.clicked = !this.clicked;
            this.node.propagate(this.node, this.clicked);
        }
        this.vPositives.forEach(connector => {
            connector.mouseClickedEvents();
        });
        this.vNegatives.forEach(connector => {
            connector.mouseClickedEvents();
        });
        if (!document.getElementById("forward").checked && !document.getElementById("backward").checked) {
            document.getElementById('warning').innerHTML = "";
        }
    }

}