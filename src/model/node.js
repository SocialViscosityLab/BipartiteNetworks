class Node {
    constructor(clusterID, _index) {
        this.idCat = { cluster: clusterID, index: _index }
        this.positives = [];
        this.negatives = [];
        this.label = "void";
        this.description = "No description yet";
        this.inPropagation = false;
        this.vNodeObserver;
    }

    subscribe(vNode) {
        this.vNodeObserver = vNode;
    }


    addPositiveConnector(index) {
        let tmpConnector = new Connector(this.idCat, index, true);
        tmpConnector.subscribeNode(this);
        this.positives.push(tmpConnector);
        return tmpConnector;
    }

    addNegativeConnector(index) {
        let tmpConnector = new Connector(this.idCat, index, false);
        tmpConnector.subscribeNode(this);
        this.negatives.push(tmpConnector);
        return tmpConnector;
    }

    setLabel(label) {
        this.label = label;
    }

    setDescription(description) {
        this.description = description;
    }

    getConnectors(polarity) {
        if (polarity) {
            return this.positives;
        } else {
            return this.negatives;
        }
    }

    splitConnectors(edge) {
        let connSource = edge.source;
        let connTarget = edge.target; // might be undefined

        if (!connSource.taken) {
            this.recallConnectors(connSource);
        } else {

            if (edge.open) {

                if (connSource.polarity == true) {
                    let conctr = connSource.nodeObserver.addPositiveConnector(this.positives.length);
                    this.vNodeObserver.addPositiveVConnector(conctr);
                } else {
                    let conctr = connSource.nodeObserver.addNegativeConnector(this.negatives.length);
                    this.vNodeObserver.addNegativeVConnector(conctr);
                }

            } else {
                if (connTarget) {
                    if (connTarget.nodeObserver.idCat == this.idCat) {
                        if (connTarget.polarity == true) {
                            let conctr = this.addPositiveConnector(this.positives.length);
                            this.vNodeObserver.addPositiveVConnector(conctr);
                        } else {
                            let conctr = this.addNegativeConnector(this.negatives.length);
                            this.vNodeObserver.addNegativeVConnector(conctr);
                        }
                    }
                }
            }
        }
    }

    recallConnectors(connSource) {
        if (connSource.polarity) {
            this.positives.pop();
            connSource.nodeObserver.vNodeObserver.vPositives.pop();
        } else {
            this.negatives.pop();
            connSource.nodeObserver.vNodeObserver.vNegatives.pop();
        }
        connSource.nodeObserver.vNodeObserver.updateConnectorsCoords();
    }

    propagate(node, clicked){
        if (document.getElementById("forward").checked) {
            this.propagateForward(node, clicked);
        }
        if (document.getElementById("backward").checked) {
            this.propagateBackward(node, clicked);
        }

    }

    propagateForward(cat, clicked) {
        let issuesAt;
        try {
            // i) retrive a subset of edges whose SOURCE is this category
            let edgesTmp = [];
            cat.inPropagation = clicked;
            edges.forEach(edg => {
                let obs = edg.source.nodeObserver;
                    if (obs.idCat == cat.idCat) {
                        // console.log(obs.label);
                        edgesTmp.push(edg);
                    }
            });
            // ii) retrieve the list of target categories linked to this category
            edgesTmp.forEach(edg => {
                if (edg.target == undefined) {
                    return false;
                }
                let obs = edg.target.nodeObserver;
                    issuesAt = obs.label;
                    //console.log(obs.label);
                    obs.inPropagation = clicked;
                    // for each of those categories, repeat i), ii)
                    this.propagateForward(obs, clicked);
            });
        } catch (error) {
            if (error instanceof RangeError) {
                console.log("WARNING: INFINTE RECURSION. The path of edges draw a closed loop. Check: " + issuesAt)
            }
        }
    }

    propagateBackward(cat, clicked) {
        let issuesAt;
        try {
            // i) retrive a subset of edges whose TARGET is this category
            let edgesTmp = [];
            cat.inPropagation = clicked;
            edges.forEach(edg => {
                let obs = edg.target.nodeObserver;
                    if (obs.idCat == cat.idCat) {
                        // console.log(obs.label);
                        edgesTmp.push(edg);
                    }
            });
            // ii) retrieve the list of source categories linked to this category
            edgesTmp.forEach(edg => {
                if (edg.target == undefined) {
                    return false;
                }
                let obs = edg.source.nodeObserver;
                    issuesAt = obs.label;
                    // console.log(obs.label);
                    obs.inPropagation = clicked;
                    // for each of those categories, repeat i), ii)
                    this.propagateBackward(obs, clicked);
            });
        } catch (error) {
            if (error instanceof RangeError) {
                console.log("WARNING: INFINTE RECURSION. The path of edges draw a closed loop. Check Category: " + issuesAt)
            }
        }
    }
}