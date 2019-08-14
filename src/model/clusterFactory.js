class ClusterFactory {
    constructor() {
    }

    static makeClusters(clusters, vClusters, data){
        for (let index = 0; index < Object.keys(data).length; index++) {
            this.instantiateCluster(clusters, data[index]);
        }

        let gutter = 110;
        let wdth = 140;
        let hght = 20;
        let x = wdth + gutter;
        
        for (let index = 0; index < clusters.length; index++) {
            vClusters.push(new VCluster(clusters[index], 15 + x*index, 20, wdth, hght));
        }
    }

    static instantiateCluster(clusters, data) {
        let cluster = new Cluster(data.clusterID);
        cluster.setLabel(data.clusterLabel);
        cluster.setDescription(data.clusterDescription);
        this.makeCategories(cluster, data);
       clusters.push(cluster);
    }


    static makeCategories(cluster, data) {
        // create categories
        for (let index = 0; index < data.nodes.length; index++) {
            const category = new Node(cluster.id, data.nodes[index].id);
            category.setLabel(data.nodes[index].nodeLabel);
            category.setDescription(data.nodes[index].nodeDescription);

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

            // add connectors
            cluster.addCategory(category);
        }
    }
}

