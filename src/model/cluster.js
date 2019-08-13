class Cluster {
    constructor(id) {
        this.label;
        this.description;
        this.categories = [];
        this.id = id;
    }

    addCategory(cat) {
        this.categories.push(cat);
    }

    setLabel(label){
        this.label = label;
    }

    setDescription(text){
        this.description = text;
    }
}