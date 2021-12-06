//Draw of graph and noeuds
function drawGraph(data) {

    var list = [];
    //Implementation of graph infrastructure
    for (var i = 0; i < data.length; i++) {
        var now = data[i];
        var obj = {
            "value": now.value,
            "children": [].concat(now.children),
            "parent": now.parent
        }
        list.push(obj)
    }

    var unique = [...new Set(data.map(x => x.value))]

    var margin = {
        top: 50,
        right: 5,
        bottom: 5,
        left: 20
    },
        width = (100 * unique.length) - margin.right - margin.left,
        height = (100 * unique.length) - margin.top - margin.bottom;

    var i = 0;

    var tree = d3.layout.tree().size([height, width]);
    var diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.x, d.y];
    });
    // Create svg tag, insert g tag into it and add some attributes
    var svg = d3.select(".graph").append("svg")
        .attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var root = list[0];

    var nodes = tree.nodes(root),
        links = tree.links(nodes);

    nodes.forEach(function (d) {
        d.y = d.depth * 70;

        if (d.isLeft === true && d.parent.right == null) {
            d.x += d.depth * 10

        }

        if (d.isRight == true && d.parent.left == null) {
            d.x -= d.depth * 10

        }
    });
    
    var gNode = svg.selectAll("g.node")
        .data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });
    // insert g tag into the parent g tag and add some attributes like class, 
    // onclick which takes deletes having the value of the node as parameter
    var nodeEnter = gNode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("id", function (d) {
            return d.value;
        })
        .attr("title", "Click to delete !")
        .attr("onclick", "deletes(this.id)")
    // insert circle tag into the parent g tag 
    var circle = nodeEnter.append("circle")
        .attr("r", 0);

    //animate the node and use color
    circle.transition()
        .delay(function (d, i) {
            return i * 80;
        })
        .attr("r", 25)
        .style("fill", function (d, i) {
            return data[data.length - 1].value === d.value ? '#003153' : d.children || d._children ? 'aqua' : 'aqua';
        })
        .duration(1000)
        .ease('elastic');

    // insert text tag into the parent g tag 
    var charText = nodeEnter.append('text')
        .attr('y', 5)
        .attr("text-anchor", "middle")

    //use color for the text tag
    charText.transition()
        .delay(function (d, i) {
            return i * 90;
        })
        .style("fill", function (d, i) {
            return data[data.length - 1].value === d.value ? 'white' : "black";
        })
        .text(function (d) {
            return d.value;
        });

    //Draw lines connecting the different nodes to each other
    var path = svg.selectAll("path.link")
        .data(links, function (d) {
            return d.target.id;
        });

    var pathT = path.enter().insert("path", "g")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "black");

    pathT.transition()
        .delay(function (d, i) {
            return i * 85;
        })
        .attr("d", diagonal);
}