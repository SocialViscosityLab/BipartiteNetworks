var edges = [];

var main = function (p5) {

	var clusterA;
	var clusterB;
	var clusterC;
	var clusterD;

	// Only once
	p5.setup = function () {
		p5.createCanvas(900, 700);
		let gutter = 110;
		let wdth = 130;
		let x = wdth + gutter;
		// create clusters
		clusterA = new ClusterA('A', 15, 20, wdth);
		clusterB = new ClusterB('B', 15 + x, 20, wdth);
		clusterC = new ClusterC('C', 15 + 2 * x, 20, wdth);
		clusterD = new ClusterD('D', 15 + 3 * x, 20, wdth);
	}

	//loop
	p5.draw = function () {
		p5.background(255);

		// description box
		p5.fill(250);
		p5.noStroke();
		p5.rect(0, p5.height - 90, p5.width, 90)

		// hem
		p5.fill(150);
		p5.noStroke();
		p5.rect(0, p5.height - 15, p5.width, 15)
		p5.fill(210);
		p5.textAlign(p5.LEFT, p5.BOTTOM)
		p5.textSize(9)
		p5.text("Salamanca, Briggs, Mercer  |  University of Illinois at Urbana-Champaign  |  2019  |  Made with p5.js    ", 100, p5.height - 3)

		clusterA.cluster.show();
		clusterB.cluster.show();
		clusterC.cluster.show();
		clusterD.cluster.show();

		edges.forEach(edge => {
			edge.show();
		});

	}

	p5.mouseMoved = function () {
		clusterA.cluster.mouseOverEvents();
		clusterB.cluster.mouseOverEvents();
		clusterC.cluster.mouseOverEvents();
		clusterD.cluster.mouseOverEvents();
	}

	p5.mouseClicked = function () {
		clusterA.cluster.mouseClickedEvents()
		clusterB.cluster.mouseClickedEvents();
		clusterC.cluster.mouseClickedEvents();
		clusterD.cluster.mouseClickedEvents();
	}
}

var globalP5 = new p5(main, "bipartiteDiagram");