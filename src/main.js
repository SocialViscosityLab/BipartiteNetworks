
// main function
var main = function (p5) {

	// global variables

	let edgesTemp;
	let nodesTemp;

	p5.preload = function () {
		// Load edge and node files
		edgesTemp = p5.loadJSON('./files/edges.json', gotData('edges.json'));
		nodesTemp = p5.loadJSON('./files/nodes.json', gotData('nodes.json'));

		// Load color palettes
		ColorFactory.loadPalette("./files/colorPalettes/palette1.txt");
		ColorFactory.loadPalette("./files/colorPalettes/palette3.txt");
	}

	// Only once
	p5.setup = function () {
		// Create cavas
		p5.createCanvas(920, 700);

		// Create clustres of nodes and VNodes
		ClusterFactory.makeClusters(nodesTemp);

		// Set colors to clusters
		ClusterFactory.vClusters[1].setPalette(ColorFactory.palettes[0]);
		ClusterFactory.vClusters[2].setPalette(ColorFactory.palettes[1]);

		// Create edges and vEdges
		if (edgesTemp) {
			EdgeFactory.buildEdges(edgesTemp, ClusterFactory.clusters);
		}

		// Connect with HTML GUI
		document.getElementById("saveEdges").onclick = EdgeFactory.recordJSON;
		document.getElementById("saveNodes").onclick = ClusterFactory.recordJSON;
		document.getElementById("clearEdges").onclick = clearEdges;
	}

	p5.draw = function () {
		p5.background(250);

		// draw description box
		p5.fill(250);
		p5.noStroke();
		p5.rect(0, p5.height - 90, p5.width, 90)

		// draw hem
		p5.fill(150);
		p5.noStroke();
		p5.rect(0, p5.height - 15, p5.width, 15)
		p5.fill(210);

		// show clusters
		ClusterFactory.vClusters.forEach(element => { element.show(p5) });

		// show edges
		EdgeFactory.vEdges.forEach(element => { element.show(p5) });
	}

	/** Delete edges and re-initialize nodes */
	clearEdges = function () {
		EdgeFactory.edges = [];
		EdgeFactory.vEdges = [];

		ClusterFactory.makeClusters(nodesTemp);

		ClusterFactory.vClusters[1].setPalette(ColorFactory.palettes[0]);
		ClusterFactory.vClusters[2].setPalette(ColorFactory.palettes[1]);
	}

	p5.mouseMoved = function () {
		ClusterFactory.vClusters.forEach(element => {
			element.mouseOverEvents();
		});
	}

	p5.mouseClicked = function () {
		ClusterFactory.vClusters.forEach(element => {
			element.mouseClickedEvents();
		});
	}

	gotData = function (data) {
		console.log(data + " loaded");
	}
}
var globalP5 = new p5(main, "firstDiagram");
