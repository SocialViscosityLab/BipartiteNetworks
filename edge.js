class Edge{
    constructor(source){
        this.source = source
        this.target;
        this.color;
        this.alpha = 50
        this.id;
        this.open = true;
        console.log("new edge from "+this.source.id);
    }

    show(){
        if (!this.target){
            globalP5.stroke(this.source.color);
            globalP5.line(this.source.pos.x + (this.source.width/2), 
            this.source.pos.y + (this.source.height/2), 
            globalP5.mouseX, 
            globalP5.mouseY);
        } else {
            globalP5.stroke(this.source.color.concat(this.alpha));
            globalP5.line(this.source.pos.x + (this.source.width/2), 
            this.source.pos.y + (this.source.height/2), 
            this.target.pos.x + (this.target.width/2), 
            this.target.pos.y + (this.target.height/2));
        }
    }

    setTarget(target){
        if (target.polarity != this.source.polarity){
            this.target = target;
            this.target.color = this.source.color;
            this.id = {'source':this.source.id, 'target':this.target.id};
            return true;
        } else {
            console.log("Impossible edge. Connectors with same polarity");
            edges.slice(-1)[0].source.connectorTaken=false;
            edges.pop();
            return false;
        }
    }
}