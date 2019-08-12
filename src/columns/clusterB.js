class ClusterB {
    constructor(id, x, y, width) {
        this.cluster = new Cluster(id, x, y, width);
        this.cluster.setLabel("Topics of Concern")
        this.cluster.setDescription("Central topics at the core of unsettling issues of awareness")
        this.makeCategories(8);
    }

    makeCategories(n) {
        let catTemp = [];

        // create categories
        for (let index = 0; index < n; index++) {
            const element = new Category(40, 'BOTH');
            element.addPositiveConnector();
            element.addNegativeConnector();
            catTemp.push(element);
        }

        // add labels
        catTemp[0].setLabel("Sustainability and conservation")
        catTemp[1].setLabel("Ecology")
        catTemp[2].setLabel("Urban social practices")
        catTemp[3].setLabel("Ethics, morals and values")
        catTemp[4].setLabel("Honesty and trust ")
        catTemp[5].setLabel("Justice")
        catTemp[6].setLabel("Identity")
        catTemp[7].setLabel("Infrastructures")

        // add colors
        let palette = ["#91c05b", "#0e5b3b", "#20a6cc", "#de5337", "#802c7d", "#d1267b", "#967554", "#edaa53"]

        for (let index = 0; index < palette.length; index++) {
            catTemp[index].setColor(palette[index]);
        }

        // add categories to clusters
        for (let index = 0; index < catTemp.length; index++) {
            this.cluster.addCategory(catTemp[index]);
        }
    }
}