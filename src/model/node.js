class Node {
    constructor(clusterID, _index) {
        this.idCat = { cluster: clusterID, index: _index }
        this.positives = [];
        this.negatives = [];
        this.label = "void";
        this.description = "No description yet";
        this.inFwdPropagation = false;
        this.inBkwPropagation = false;
        this.vNodeObserver;
        this.polarity;
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

    popLastConnector(polarity) {
        if (polarity == true) {
            this.positives.pop();
        } else {
            this.negatives.pop();
        }
        this.vNodeObserver.popLastVConnector(polarity)
    }

    setPolarity(polarity) {
        this.polarity = polarity;
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
        this.updatePropagation()
    }

    resetConnectors() {
        this.positives = [];
        this.negatives = [];

        if (this.polarity == "RIGHT") {
            this.addPositiveConnector(0);
        }
        if (this.polarity == "LEFT") {
            this.addNegativeConnector(0);
        }
        if (this.polarity == "BOTH") {
            this.addPositiveConnector(0);
            this.addNegativeConnector(0);
        }
        this.vNodeObserver.resetVConnectors();
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

    propagate(node, clicked) {
        this.propagateForward(node, clicked);
        this.propagateBackward(node, clicked);
    }

    updatePropagation() {
        if (this.inFwdPropagation) {
            this.inFwdPropagation = false;
            this.propagateForward(this, true);
        }
        if (this.inBkwPropagation) {
            this.inBkwPropagation = false;
            this.propagateBackward(this, true);
        }
    }

    propagateForward(cat, clicked) {
        let warningAt;
        if (!cat.inFwdPropagation || !clicked) {
            // console.log("-> 1 In prop " + cat.label)
            try {
                // i) retrive a subset of edges whose SOURCE is this category
                cat.inFwdPropagation = clicked;
                let edgesTmp = this.getForwardEdges(cat);

                // ii) retrieve the list of TARGET categories linked to this category
                edgesTmp.forEach(edg => {
                    if (edg.target == undefined) {
                        return false;
                    } else {
                        let obs = edg.target.nodeObserver;
                        warningAt = obs.label;

                        // for each of those categories, repeat i), ii)
                        obs.propagateForward(obs, clicked);
                    }
                });
            } catch (error) {
                if (error instanceof RangeError) {
                    console.log("WARNING: INFINTE RECURSION. The path of edges draw a closed loop. Check: " + warningAt)
                    document.getElementById('warning').innerHTML = "WARNING: Infinite Recursion. Dissable propagation";
                } else {
                    console.log(error)
                }
            }
        }
        // else { console.log("Blocked forward propagation from "  + cat.label) }
    }

    propagateBackward(cat, clicked) {
        let warningAt;
        if (!cat.inBkwPropagation || !clicked) {
            try {
                // i) retrive a subset of edges whose TARGET is this category
                cat.inBkwPropagation = clicked;
                let edgesTmp = this.getBackwardEdges(cat)

                // ii) retrieve the list of source categories linked to this category
                edgesTmp.forEach(edg => {
                    if (edg.target == undefined) {
                        return false;
                    } else {
                        let obs = edg.source.nodeObserver;
                        warningAt = obs.label;

                        // for each of those categories, repeat i), ii)
                        obs.propagateBackward(obs, clicked);
                    }
                });
            } catch (error) {
                if (error instanceof RangeError) {
                    console.log("WARNING: INFINTE RECURSION. The path of edges draw a closed loop. Check Category: " + warningAt)
                    document.getElementById('warning').innerHTML = "WARNING: Infinite Recursion. Dissable propagation";
                } else {
                    console.log(error)
                }
            }
        }
        // else {console.log("Blocked backward propagation from " + cat.label) }
    }

    getForwardEdges(cat) {
        let edgesTmp = [];
        EdgeFactory.edges.forEach(edg => {
            let obs = edg.source.nodeObserver;
            if (obs.idCat === cat.idCat) {
                // console.log(obs.label);
                edgesTmp.push(edg);
            }
        });
        return edgesTmp;
    }

    getBackwardEdges(cat) {
        let edgesTmp = [];
        EdgeFactory.edges.forEach(edg => {
            let obs = edg.target.nodeObserver;
            if (obs.idCat === cat.idCat) {
                // console.log(obs.label);
                edgesTmp.push(edg);
            }
        });
        return edgesTmp;
    }

    getJSON() {
        let rtn = {
            id: this.idCat.index,
            nodeLabel: this.label,
            nodeDescription: this.description,
            polarity: this.polarity,
        }
        return rtn;
    }
}