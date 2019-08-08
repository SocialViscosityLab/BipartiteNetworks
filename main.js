var edges = [];
var clusterA;
var clusterB;
var clusterC;

var main = function (p5) {



	// Only once
	p5.setup = function () {
		p5.createCanvas(800, 400);
		// create clusters
		clusterA = new Cluster('A', 0, 50, 150);
		clusterB = new Cluster('B', 250, 50, 150);
		clusterC = new Cluster('C', 500, 50, 150);

		// create categories
		let ctgry = new Category(40);
		ctgry.setLabel("Impact of manufacturing & consumption")
		ctgry.addPositiveConnector();

		let ctgry2 = new Category(40);
		ctgry2.setLabel("Controversility of truth")
		ctgry2.addPositiveConnector();

		let ctgry3 = new Category(40);
		ctgry3.setLabel("Global warming and climate change")
		ctgry3.addPositiveConnector();

		let ctgry4 = new Category(40);
		ctgry4.setLabel("Sustainable urban sociality")
		ctgry4.addPositiveConnector();

		// add categories to clusters
		clusterA.addCategory(ctgry);
		clusterA.addCategory(ctgry2);
		clusterA.addCategory(ctgry3);
		clusterA.addCategory(ctgry4);

		//******/

		let ctgry5 = new Category(40, 'BOTH');
		ctgry5.setLabel("Sustainability and conservation")
		ctgry5.setColor('#359245');
		ctgry5.addPositiveConnector();
		ctgry5.addNegativeConnector();

		let ctgry6 = new Category(40, 'BOTH');
		ctgry6.setLabel("Ecology")
		ctgry6.setColor('#b5f483');
		ctgry6.addPositiveConnector();
		ctgry6.addNegativeConnector();

		let ctgry7 = new Category(40, 'BOTH');
		ctgry7.setLabel("Urban social practices")
		ctgry7.setColor('#00b8ff');
		ctgry7.addPositiveConnector();
		ctgry7.addNegativeConnector();

		let ctgry8 = new Category(40, 'BOTH');
		ctgry8.setLabel("Ethics, morals and values")
		ctgry8.setColor('#ff7400');
		ctgry8.addPositiveConnector();
		ctgry8.addNegativeConnector();

		// add categories to clusters
		clusterB.addCategory(ctgry5);
		clusterB.addCategory(ctgry6);
		clusterB.addCategory(ctgry7);
		clusterB.addCategory(ctgry8);

		//******/

		let ctgry9 = new Category(40, 'POSITIVE');
		ctgry9.setLabel("Sytems thinking")
		ctgry9.setColor('#b85c0f');
		ctgry9.addPositiveConnector();
		ctgry9.addNegativeConnector();

		let ctgry10 = new Category(40, 'POSITIVE');
		ctgry10.setLabel("Ethnography")
		ctgry10.setColor('#f0cc87');
		ctgry10.addPositiveConnector();
		ctgry10.addNegativeConnector();

		let ctgry11 = new Category(40, 'POSITIVE');
		ctgry11.setLabel("Ethnomethodology")
		ctgry11.setColor('#8b5a30');
		ctgry11.addPositiveConnector();
		ctgry11.addNegativeConnector();

		// add categories to clusters
		clusterC.addCategory(ctgry9);
		clusterC.addCategory(ctgry10);
		clusterC.addCategory(ctgry11)

		//******/
	}

	//loop
	p5.draw = function () {
		p5.background(250);

		clusterA.show();
		clusterB.show();
		clusterC.show();

		edges.forEach(edge => {
			edge.show();
		});
	}

	p5.mouseMoved = function () {
		clusterA.mouseOverEvents();
		clusterB.mouseOverEvents();
		clusterC.mouseOverEvents();
	}

	p5.mouseClicked = function () {
		clusterA.mouseClickedEvents()
		clusterB.mouseClickedEvents();
		clusterC.mouseClickedEvents();
	}

	p5.keyPressed = function () {

	}
}

var globalP5 = new p5(main, "bipartiteDiagram");