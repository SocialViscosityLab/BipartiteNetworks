// global variables
var edges = [];
var vEdges = [];
var clusters = [];
var vClusters = [];

var main = function (p5) {

	let edgesTemp;

	p5.preload = function () {
		edgesTemp = p5.loadJSON('../files/edges.json', gotData);
	}

	// Only once
	p5.setup = function () {
		p5.createCanvas(920, 700);
		let gutter = 110;
		let wdth = 140;
		let x = wdth + gutter;

		// create clusters
		clusters.push(new ClusterA('A'));
		clusters.push(new ClusterB('B'));
		clusters.push(new ClusterC('C'));
		clusters.push(new ClusterD('D'));

		vClusters.push(new VCluster(clusters[0].cluster, 15, 20, wdth, 40));

		let paletteB = ["#91c05b", "#0e5b3b", "#20a6cc", "#de5337", "#802c7d", "#d1267b", "#967554", "#edaa53"]
		vClusters.push(new VCluster(clusters[1].cluster, 15 + x, 20, wdth, 40, paletteB));

		let paletteC = ["#90302e","#f5c378", "#735226", "#a9a08e", "#9b717d", "#bdb06d", "#222e32", "#738b92", "#6a6748", "#e88b33"]
		vClusters.push(new VCluster(clusters[2].cluster, 15 + 2 * x, 20, wdth, 40, paletteC));

		vClusters.push(new VCluster(clusters[3].cluster, 15 + 3 * x, 20, wdth, 40));

		if (edgesTemp) {
			EdgeFactory.buildEdges(edgesTemp, clusters);
		}

		document.getElementById("saveEdges").onclick = EdgeFactory.recordJSON;
	}

	p5.draw = function () {
		p5.background(250);

		// description box
		p5.fill(250);
		p5.noStroke();
		p5.rect(0, p5.height - 90, p5.width, 90)

		// hem
		p5.fill(150);
		p5.noStroke();
		p5.rect(0, p5.height - 15, p5.width, 15)
		p5.fill(210);

		// show clusters
		vClusters.forEach(element => {element.show(p5)});

		// show edges
		vEdges.forEach(element => {element.show(p5)});
	}

	p5.mouseMoved = function () {
		vClusters.forEach(element => {
			element.mouseOverEvents();
		});
	}

	p5.mouseClicked = function () {
		vClusters.forEach(element => {
			element.mouseClickedEvents();
		});
		recordJSON();
	}

	recordJSON = function () {
        let filename = "output.json";
        globalP5.saveJSON(clusters[0].cluster,filename);
    }

	gotData = function () {
		console.log("file loaded");
	}

	noData = function () {
		console.log("No file")
	}
}

var globalP5 = new p5(main, "bipartiteDiagram");