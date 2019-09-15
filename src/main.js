

// main function
var main = function (p5) {

	// variables
	let edgesTemp;
	let nodesTemp;
	let graphics;

	// Control rendering loop
	let renderGate;
	let rendered;

	// form
	let button,fieldA, fieldB;

	p5.preload = function () {
		// Load edge and node files
		nodesTemp = p5.loadJSON('./files/nodes.json');
		edgesTemp = [];//p5.loadJSON('./files/edges.json');

		// Load color palettes
		ColorFactory.loadPalette("./files/colorPalettes/palette1.txt");
		ColorFactory.loadPalette("./files/colorPalettes/palette3.txt");
	}

	// Only once
	p5.setup = function () {
		// Create cavas
		p5.createCanvas(920, 700);
		graphics = p5.createGraphics(p5.width * p5.pixelDensity(), p5.height * p5.pixelDensity());

		// Create edges and vEdges
		if (edgesTemp) {
			EdgeFactory.buildEdges(edgesTemp, ClusterFactory.clusters);
		}

		// Connect with HTML GUI
		document.getElementById("clearEdges").onclick = clearEdges;
		let model = document.getElementById("model");
		model.addEventListener('change', () => {
			switchModel(model.value);
		})
		// Create clusters of nodes and VNod
		//buildClusters(nodesTemp);
		switchModel(model.value);

		// form
		addCategoryModalForm();
		exportNetworkModalForm();
		importNetworkModalForm();
	}

	// In a loop
	p5.draw = function () {
		p5.background(250);

		if (renderGate) {
			renderOnP5();
		} else {
			renderOnGraphics();
			p5.image(graphics, 0, 0, p5.width, p5.height);
		}
		renderGate = false;
	}

	/** Delete edges and re-initialize nodes */
	clearEdges = function () {
		EdgeFactory.reset();
		ClusterFactory.resetAllConnectors();
	}

	// Move events
	p5.mouseMoved = function () {
		renderGate = true;

		ClusterFactory.vClusters.forEach(element => {
			element.mouseOverEvents();
		});
	}

	// click events
	p5.mouseClicked = function () {
		renderGate = true;

		ClusterFactory.vClusters.forEach(element => {
			element.mouseClickedEvents();
		});
	}

	switchModel = function (currentModel) {
		buildClusters(nodesTemp)
		switch (currentModel) {
			case 'empty':
				edgesTemp = [];
				buildEdges(edgesTemp);
				break;
			// Masters
			case 'sustainable':
				edgesTemp = p5.loadJSON('./files/ResponsibleInnovationScans/sustainable.json', buildEdges);
				break;
			case 'race':
				edgesTemp = p5.loadJSON('./files/ResponsibleInnovationScans/criticalRace.json', buildEdges);
				break;
			case 'visual':
				edgesTemp = p5.loadJSON('./files/ResponsibleInnovationScans/visualAndCultural.json', buildEdges);
				break;
			case 'applied':
				edgesTemp = p5.loadJSON('./files/ResponsibleInnovationScans/appliedResearch.json', buildEdges);
				break;
			case 'full':
				edgesTemp = p5.loadJSON('./files/edges.json', buildEdges);
				break;
			// Faculty
			case 'briggs':
				edgesTemp = p5.loadJSON('./files/ResponsibleInnovationScans/briggsEdges.json', buildEdges);
				break;
			case 'salamanca':
				edgesTemp = p5.loadJSON('./files/ResponsibleInnovationScans/salamanca.json', buildEdges);
				break;
			case 'mercer':
				edgesTemp = p5.loadJSON('./files/ResponsibleInnovationScans/mercer.json', buildEdges);
				break;

				case 'ruecker':
					edgesTemp = p5.loadJSON('./files/ResponsibleInnovationScans/ruecker.json', buildEdges);
					break;
			// Students
			case 'moon':
				edgesTemp = p5.loadJSON('./files/ResponsibleInnovationScans/moon.json', buildEdges);
				break;
		}
	}

	buildEdges = function (result) {
		EdgeFactory.reset();
		EdgeFactory.buildEdges(result, ClusterFactory.clusters)
		renderGate = true;
	}

	buildClusters = function (result) {
		ClusterFactory.reset();
		ClusterFactory.makeClusters(result);
		ClusterFactory.refreshColors(1,ColorFactory.palettes[0]);
		ClusterFactory.refreshColors(2,ColorFactory.palettes[1]);
	}

	// render on original p5.Renderer
	renderOnP5 = function () {
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

		rendered = false;
	}

	// render on custom p5.Renderer
	renderOnGraphics = function () {

		if (!rendered) {
			graphics.background(250);

			// draw description box
			graphics.fill(250);
			graphics.noStroke();
			graphics.rect(0, p5.height - 90, p5.width, 90)

			// draw hem
			graphics.fill(150);
			graphics.noStroke();
			graphics.rect(0, p5.height - 15, p5.width, 15)
			graphics.fill(210);

			// show clusters
			ClusterFactory.vClusters.forEach(element => { element.show(graphics) });

			// show edges
			EdgeFactory.vEdges.forEach(element => { element.show(graphics) });

			rendered = true;
		}
	}
}
var globalP5 = new p5(main, "firstDiagram");
