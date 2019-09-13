class ClusterFactory {

    static makeClusters(data) {
        ClusterFactory.clusters = [];
        this.vClusters = [];
        for (let index = 0; index < Object.keys(data).length; index++) {
            this.instantiateCluster(data[index]);
        }

        let gutter = 110;
        let wdth = 140;
        let hght = 35;
        let x = wdth + gutter;

        for (let index = 0; index < ClusterFactory.clusters.length; index++) {
            ClusterFactory.vClusters.push(new VCluster(ClusterFactory.clusters[index], 15 + x * index, 20, wdth, hght));
        }
    }

    static instantiateCluster(data) {
        let cluster = new Cluster(data.clusterID);
        cluster.setLabel(data.clusterLabel);
        cluster.setDescription(data.clusterDescription);
        this.makeCategories(cluster, data);
        ClusterFactory.clusters.push(cluster);
    }


    static makeCategories(cluster, data) {
        // create categories
        for (let index = 0; index < data.nodes.length; index++) {
            const category = new Node(cluster.id, data.nodes[index].id);
            category.setLabel(data.nodes[index].nodeLabel);
            category.setDescription(data.nodes[index].nodeDescription);
            //category.setPolarity(data.polarity);
            category.setPolarity(data.nodes[index].polarity);

            // create connectors
            //switch (data.polarity) {
            switch (data.nodes[index].polarity) {
                case 'LEFT':
                    category.addNegativeConnector(category.negatives.length);
                    break;
                    ;
                case 'RIGHT':
                    category.addPositiveConnector(category.positives.length);
                    break;
                    ;
                default:
                    category.addNegativeConnector(category.negatives.length);
                    category.addPositiveConnector(category.positives.length);
            }

            // add connectors
            cluster.addCategory(category);
        }
    }

    static recordJSON() {
        let filename = "nodes.json";
        let output = [];
        for (let index = 0; index < ClusterFactory.clusters.length; index++) {
            output.push(ClusterFactory.clusters[index].getJSON());
        }
        globalP5.saveJSON(output, filename);
    }

    static reset() {
        console.log("Clusters re-intialized")
        ClusterFactory.clusters = [];
        ClusterFactory.vClusters = [];
    }
}

ClusterFactory.clusters = [];
ClusterFactory.vClusters = [];

