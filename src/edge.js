class Edge {
    constructor(source) {
        this.source = source
        this.target;
        this.color;
        this.alpha = 30
        this.id;
        this.open = true;
        //console.log("new edge from " + this.source.id);
    }

    show() {
        if (document.getElementById("forward").checked) {
            if (this.source.observers[0].inPropagation) {
                globalP5.strokeWeight(5);
                this.alpha = '99';
            } else {
                globalP5.strokeWeight(1);
                this.alpha = 30;
            }

        }
        if (document.getElementById("backward").checked) {
            if (this.target && this.target.observers[0].inPropagation) {
                globalP5.strokeWeight(5);
            } else {
                globalP5.strokeWeight(1);
            }
        }

        if (!this.target) {
            globalP5.stroke(this.source.color);
            let org = globalP5.createVector(this.source.pos.x + (this.source.width / 2), this.source.pos.y + (this.source.height / 2));
            let end = globalP5.createVector(globalP5.mouseX, globalP5.mouseY);
            let arm = globalP5.dist(org.x, org.y, end.x, org.y) / 5;
            globalP5.noFill();
            if (end.x <= org.x) {
                globalP5.beginShape();
                globalP5.vertex(org.x, org.y);
                globalP5.vertex(org.x - arm, org.y);
                globalP5.bezierVertex(org.x - (3 * arm), org.y, end.x + (3 * arm), end.y, end.x + arm, end.y);
                globalP5.vertex(end.x, end.y);
                globalP5.endShape();
            } else {
                globalP5.beginShape();
                globalP5.vertex(org.x, org.y);
                globalP5.vertex(org.x + arm, org.y);
                globalP5.bezierVertex(org.x + (3 * arm), org.y, end.x - (3 * arm), end.y, end.x - arm, end.y);
                globalP5.vertex(end.x, end.y);
                globalP5.endShape();
            }
        } else {
            globalP5.stroke(this.source.color.concat(this.alpha));
            let org = globalP5.createVector(this.source.pos.x + (this.source.width / 2), this.source.pos.y + (this.source.height / 2));
            let end = globalP5.createVector(this.target.pos.x + (this.target.width / 2), this.target.pos.y + (this.target.height / 2));
            let arm = globalP5.dist(org.x, org.y, end.x, org.y) / 5;
            globalP5.noFill();
            if (end.x <= org.x) {
                globalP5.beginShape();
                globalP5.vertex(org.x, org.y);
                globalP5.vertex(org.x - arm, org.y);
                globalP5.bezierVertex(org.x - (3 * arm), org.y, end.x + (3 * arm), end.y, end.x + arm, end.y);
                globalP5.vertex(end.x, end.y);
                globalP5.endShape();
            } else {
                globalP5.beginShape();
                globalP5.vertex(org.x, org.y);
                globalP5.vertex(org.x + arm, org.y);
                globalP5.bezierVertex(org.x + (3 * arm), org.y, end.x - (3 * arm), end.y, end.x - arm, end.y);
                globalP5.vertex(end.x, end.y);
                globalP5.endShape();
            }
        }
    }

    setTarget(target) {
        if (target.polarity != this.source.polarity) {
            this.target = target;
            this.target.color = this.source.color;
            this.id = { 'source': this.source.id, 'target': this.target.id };
            return true;
        } else {
            console.log("Impossible edge. Connectors with same polarity");
            edges.slice(-1)[0].source.connectorTaken = false;
            edges.pop();
            return false;
        }
    }
}