class VConnector extends Button {
    constructor(connector) {
        super(0, 0, 10, 0);
        this.connector = connector;
        this.color = '#d4d4d4';
        connector.subscribeVConnector(this);
    }

    setColor(color) {
        this.color = color;
    }

    updateCoords(pos, catWidth, sequence, height) {
        if (this.connector.polarity == true) {
            // right
            this.setPos(globalP5.createVector(pos.x + catWidth, pos.y + (sequence * height)));
        } else {
            // left
            this.setPos(globalP5.createVector(pos.x - this.width, pos.y + (sequence * height)));
        }
        this.setHeight(height);
    }

    show(builder) {
        builder.fill(this.color);
        builder.stroke(this.color);
        builder.rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    showAsButton(builder) {
        builder.fill(this.color.concat('ff'));
        builder.stroke(200);
        if (this.mouseIsOver) {
            builder.stroke("#333333")
        } else {
            builder.stroke(this.color)
        }
        builder.rect(this.pos.x, this.pos.y, this.width, this.height);
        builder.textAlign(globalP5.CENTER, globalP5.CENTER);
        builder.fill('#000000');
        builder.stroke('#000000');
        builder.blendMode(globalP5.SOFT_LIGHT);
        builder.text('+', this.pos.x + this.width / 2, this.pos.y + this.height / 2);
        builder.blendMode(globalP5.BLEND);
    }


    workOnLastVEdge(edge) {

        let lastVEdge;
        if (document.getElementById("edit").checked) {

            // get the last edge in edges collection.
            lastVEdge = vEdges.slice(-1)[0];

            // If there is at least one edge
            if (lastVEdge) {
                if (lastVEdge.open) {
                    
                    if (edges[edges.length-1] == edge){
                        lastVEdge.setVTarget(this);
                        lastVEdge.open = false;
                    } else {
                        vEdges.pop();
                    }
                    // if edge does not link nodes in the same cluster
                    if (edge.source.id.cluster != this.connector.id.cluster){
                        lastVEdge.setVTarget(this);
                        lastVEdge.open = false;
                    } 

                } else {
                    lastVEdge = new VEdge(edge);
                    lastVEdge.setVSource(this);
                    lastVEdge.open = true;
                    vEdges.push(lastVEdge);

                }
            } else {
                // create the first edge
                lastVEdge = new VEdge(edge);
                lastVEdge.setVSource(this);
                lastVEdge.open = true;
                vEdges.push(lastVEdge);
            }
        }
    }

    mouseClickedEvents() {
        if (this.mouseIsOver) {
            let edge = this.connector.workOnLastEdge();
            this.connector.notifyObserver(edge);
            this.workOnLastVEdge(edge);
        }
    }
}