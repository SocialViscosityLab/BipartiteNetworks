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
            let category = this.makeCategory(cluster, data.nodes[index]);
            cluster.addCategory(category);
        }
    }

    static makeCategory = function (cluster, data) {
        let category = new Node(cluster.id, data.id);
        category.setLabel(data.nodeLabel);
        category.setDescription(data.nodeDescription);
        category.setPolarity(data.polarity);
    
        // create connectors
        switch (data.polarity) {
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
        return category;
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

    static getVClusterOf(cluster){
        for (const vClust of ClusterFactory.vClusters) {
            if(vClust.cluster.id == cluster.id)
            return vClust;
        }
    }

    static refreshColors(clusterIndex, palette){
        ClusterFactory.vClusters[clusterIndex].setPalette(palette);
    }

    static resetAllConnectors(){
        for (const cluster of ClusterFactory.clusters) {
            for (const node of cluster.categories) {
                node.resetConnectors();
            }
        }
    }
}

ClusterFactory.clusters = [];
ClusterFactory.vClusters = [];

