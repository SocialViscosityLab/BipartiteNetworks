class ClusterD {
    constructor(id, x, y, width) {
        this.cluster = new Cluster(id, x, y, width);
        this.cluster.setLabel("Methods of Design Action");
        this.cluster.setDescription("How designers instantiate solutions");
        this.makeCategories(9);
    }

    makeCategories(n) {
        let catTemp = [];

        // create categories
        for (let index = 0; index < n; index++) {
            const element = new Category(40);
            element.addNegativeConnector();
            catTemp.push(element);
        }
        // set Labels
        catTemp[0].setLabel("Participatory design");
        catTemp[1].setLabel("Empirical interventions");
        catTemp[2].setLabel("Modeling and simulation");
        catTemp[3].setLabel("Interaction design");
        catTemp[4].setLabel("Visual and cultural studies");
        catTemp[5].setLabel("Information design");
        catTemp[6].setLabel("Visual narratives");
        catTemp[7].setLabel("Information visualization");
        catTemp[8].setLabel("Critical design");

        // add categories to clusters
        for (let index = 0; index < catTemp.length; index++) {
            this.cluster.addCategory(catTemp[index]);
        } 
    }
}