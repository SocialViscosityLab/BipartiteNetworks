

// main function
var main = function (p5) {

	// variables
	let edgesTemp;
	let nodesTemp;
	let graphics;

	// Control rendering loop
	let renderGate;
	let rendered;

	// files path
	let pathEdges = './files/Edges/';
	let pathNodes = './files/Nodes/';
	let pathNetworks = './files/Networks/';
	let pathPalettes = './files/colorPalettes/';

	// current model
	let model;

	// current background
	let backColor = 250;

	// Only once
	p5.setup = function () {
		// Create cavas
		p5.createCanvas(970, 700);
		graphics = p5.createGraphics(p5.width * p5.pixelDensity(), p5.height * p5.pixelDensity());

		// Enable the model dorpdown selector
		model = document.getElementById("modelChoice");
		preload(model.value);
		model.addEventListener('change', () => {
			switchModel(model.value);
		})

		// Connect with HTML GUI
		document.getElementById("clearEdges").onclick = clearEdges;

		// Add elements form
		addCategoryModalForm();
		exportNetworkModalForm();
		importNetworkModalForm();
	}

	// In a loop
	p5.draw = function () {
		p5.background(backColor);

		if (document.getElementById("backgroundContrast").checked) {
			backColor = 150;
		} else {
			backColor = 250;
		}

		if (renderGate) {
			renderOnP5();
		} else {
			renderOnGraphics();
			p5.image(graphics, 0, 0);
		}
		renderGate = false;
	}

	switchModel = function (value) {
		try {
			/* Some projects have a separate file named customPathParser.js
			That file serves to parse url paths
			*/
			if (CustomPathParser) {
				pathNodes = CustomPathParser.getURLNodes(value);
				pathEdges = CustomPathParser.getURLEdges(value);
				nodesTemp = p5.loadJSON(pathNodes, function (val) {
					buildClusters(val);
					edgesTemp = p5.loadJSON(pathEdges, buildEdges);
				});
			}
		} catch {
			//console.log("No CustomPathParser for this multipartite network");
			console.log("Switched to " + value + " network");
			let json = p5.loadJSON(pathNetworks + value + '_network.json', onLoadNetwork);
		}

	}

	preload = function (value) {
		// Load color palettes
		ColorFactory.loadPalette(pathPalettes + "palette1.txt")
			.then(ColorFactory.loadPalette(pathPalettes + "palette2.txt"))
			.then(ColorFactory.loadPalette(pathPalettes + "palette3.txt"))
			.then(ColorFactory.loadPalette(pathPalettes + "palette4.txt"))
			.catch((err) => console.log(err))

		// Load edge and node files
		try {
			let json = p5.loadJSON(pathNetworks + value +'_network.json', onLoadNetwork);
		} catch (error) {
			console.log("Wrong path to file " + pathNetworks + value +'_network.json')
		}
	}

	onLoadNetwork = function (data,name) {
		nodesTemp = data.nodes;
		buildClusters(nodesTemp);

		edgesTemp = data.edges;
		buildEdges(edgesTemp);

		//convertJSONtoPajek(data, model.value);
		
	}

	// onLoadNodes = function (data) {
	// 	nodesTemp = data;
	// 	buildClusters(nodesTemp);

	// 	// Connect with HTML GUI
	// 	document.getElementById("clearEdges").onclick = clearEdges;
	// 	model = document.getElementById("modelChoice");
	// 	model.addEventListener('change', () => {
	// 		switchModel(model.value);
	// 	})

	// 	p5.loadJSON(pathEdges + '0_edges.json', onLoadEdges);
	// }

	// onLoadEdges = function (data) {
	// 	edgesTemp = data;
	// 	EdgeFactory.buildEdges(edgesTemp, ClusterFactory.clusters);
	// 	switchModel(model.value);
	// }

	buildClusters = function (result) {
		ClusterFactory.reset();
		ClusterFactory.makeClusters(result);
		ClusterFactory.refreshColors(0, ColorFactory.palettes[0]);
		ClusterFactory.refreshColors(1, ColorFactory.palettes[1]);
		ClusterFactory.refreshColors(2, ColorFactory.palettes[2]);
		ClusterFactory.refreshColors(3, ColorFactory.palettes[3]);
	}

	buildEdges = function (result) {
		EdgeFactory.reset();
		EdgeFactory.buildEdges(result, ClusterFactory.clusters)
		renderGate = true;
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

	// key events
	p5.keyTyped = function () {
		if (p5.key == 'E') {
			EdgeFactory.deleteLastEdge();
			renderGate = true;
		}
	}

	// render on original p5.Renderer
	renderOnP5 = function () {
		// draw description box
		p5.fill(250, 150);
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
			graphics.background(backColor);

			// draw description box
			graphics.fill(250, 150);
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
var globalP5 = new p5(main, "model");
