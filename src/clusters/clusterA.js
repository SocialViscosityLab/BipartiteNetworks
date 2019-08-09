class ClusterA {
    constructor(id, x, y, width) {
        this.cluster = new Cluster(id, x, y, width);
        this.cluster.setLabel("Categories of Awareness")
        this.cluster.setDescription("Reasons that justify the design of improved futures")
        this.makeCategories(11);
    }

    makeCategories(n) {
        let catTemp = [];

        // create categories
        for (let index = 0; index < n; index++) {
            const element = new Category(40);
            element.addPositiveConnector();
            catTemp.push(element);
        }

        // set labels
        catTemp[0].setLabel("Impact of manufacturing & consumption")
        catTemp[1].setLabel("Controversiality of truth")
        catTemp[2].setLabel("Global warming and climate change")
        catTemp[3].setLabel("Sustainable urban sociality")
        catTemp[4].setLabel("Respect of beliefs")
        catTemp[5].setLabel("Commodification and exploitation")
        catTemp[6].setLabel("Reduction of agency")
        catTemp[7].setLabel("Imbalance of power")
        catTemp[8].setLabel("Subjectification & stigmatization")
        catTemp[9].setLabel("Opacity of accessibility")
        catTemp[10].setLabel("Narrow social mobility and inequity")

        // set descriptions
        catTemp[0].setDescription("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.");

        // add categories to clusters
        for (let index = 0; index < catTemp.length; index++) {
            this.cluster.addCategory(catTemp[index]);
        }
    }
}