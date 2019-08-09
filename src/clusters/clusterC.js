class ClusterC {
    constructor(id, x, y, width) {
        this.cluster = new Cluster(id, x, y, width);
        this.cluster.setLabel("Modes of Inquiry")
        this.cluster.setDescription("research traditions used to explore topics of concern")
        this.makeCategories(10);
    }

    makeCategories(n) {
        let catTemp = [];

        // create categories
        for (let index = 0; index < n; index++) {
            const element = new Category(40, 'POSITIVE');
            element.addPositiveConnector();
            element.addNegativeConnector();
            catTemp.push(element);
        }

        catTemp[0].setLabel("Sytems thinking");
        catTemp[1].setLabel("Ethnography");
        catTemp[2].setLabel("Ethnomethodology");
        catTemp[3].setLabel("Emergence and social pattern recognition");
        catTemp[4].setLabel("Urban studies");
        catTemp[5].setLabel("Environmental semantics");
        catTemp[6].setLabel("Feminist studies");
        catTemp[7].setLabel("Game theory");
        catTemp[8].setLabel("Grounded theory");
        catTemp[9].setLabel("Posthumanism and Object Oriented Ontology");

        let palette = ["#90302e",
            "#f5c378", "#735226", "#a9a08e", "#9b717d", "#bdb06d", "#222e32", "#738b92", "#6a6748", "#e88b33"]

        for (let index = 0; index < palette.length; index++) {
            catTemp[index].setColor(palette[index]);
        }

        // add categories to clusters
        for (let index = 0; index < catTemp.length; index++) {
            this.cluster.addCategory(catTemp[index]);
        }
    }
}