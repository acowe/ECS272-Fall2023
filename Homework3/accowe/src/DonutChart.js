import {useEffect, useState} from "react";
import * as d3 from "d3";


function processData(data){
    // Sort data by primary type (Type_1) and track the number of pokemon for each.
    // Color is included for future reference when constructing chart
    const types = {
        Normal: {pokemon:[], noPokemon: 0, color:"#A8A77A"},
        Fire: {pokemon:[], noPokemon: 0, color:"#EE8130"},
        Water: {pokemon:[], noPokemon: 0, color:"#6390F0"},
        Grass: {pokemon:[], noPokemon: 0, color:"#7AC74C"},
        Flying: {pokemon:[], noPokemon: 0, color:"#A98FF3"},
        Fighting: {pokemon:[], noPokemon: 0, color:"#C22E28"},
        Poison: {pokemon:[], noPokemon: 0, color:"#A33EA1"},
        Electric: {pokemon:[], noPokemon: 0, color:"#F7D02C"},
        Ground: {pokemon:[], noPokemon: 0, color:"#E2BF65"},
        Rock: {pokemon:[], noPokemon: 0, color:"#B6A136"},
        Psychic: {pokemon:[], noPokemon: 0, color:"#F95587"},
        Ice: {pokemon:[], noPokemon: 0, color:"#96D9D6"},
        Bug: {pokemon:[], noPokemon: 0, color:"#A6B91A"},
        Ghost: {pokemon:[], noPokemon: 0, color:"#735797"},
        Steel: {pokemon:[], noPokemon: 0, color:"#B7B7CE"},
        Dragon: {pokemon:[], noPokemon: 0, color:"#6F35FC"},
        Dark: {pokemon:[], noPokemon: 0, color:"#705746"},
        Fairy: {pokemon:[], noPokemon: 0, color:"#D685AD"}
    };

    // Sort by primary type, increment number of pokemon by one for type
    data.forEach(d => {
        switch (d.Type_1) {
            case "Normal":
                types.Normal.pokemon.push(d)
                types.Normal.noPokemon += 1
                break
            case "Fire":
                types.Fire.pokemon.push(d)
                types.Fire.noPokemon += 1
                break
            case "Water":
                types.Water.pokemon.push(d)
                types.Water.noPokemon += 1
                break
            case "Grass":
                types.Grass.pokemon.push(d)
                types.Grass.noPokemon += 1
                break
            case "Flying":
                types.Flying.pokemon.push(d)
                types.Flying.noPokemon += 1
                break
            case "Fighting":
                types.Fighting.pokemon.push(d)
                types.Fighting.noPokemon += 1
                break
            case "Poison":
                types.Poison.pokemon.push(d)
                types.Poison.noPokemon += 1
                break
            case "Electric":
                types.Electric.pokemon.push(d)
                types.Electric.noPokemon += 1
                break
            case "Ground":
                types.Ground.pokemon.push(d)
                types.Ground.noPokemon += 1
                break
            case "Rock":
                types.Rock.pokemon.push(d)
                types.Rock.noPokemon += 1
                break
            case "Psychic":
                types.Psychic.pokemon.push(d)
                types.Psychic.noPokemon += 1
                break
            case "Ice":
                types.Ice.pokemon.push(d)
                types.Ice.noPokemon += 1
                break
            case "Bug":
                types.Bug.pokemon.push(d)
                types.Bug.noPokemon += 1
                break
            case "Ghost":
                types.Ghost.pokemon.push(d)
                types.Ghost.noPokemon += 1
                break
            case "Steel":
                types.Steel.pokemon.push(d)
                types.Steel.noPokemon += 1
                break
            case "Dragon":
                types.Dragon.pokemon.push(d)
                types.Dragon.noPokemon += 1
                break
            case "Dark":
                types.Dark.pokemon.push(d)
                types.Dark.noPokemon += 1
                break
            case "Fairy":
                types.Fairy.pokemon.push(d)
                types.Fairy.noPokemon += 1
                break
        }
    })

    // Return an array with our data to be used for our chart
    const typeData = []
    Object.keys(types).forEach(t => {
        types[t].name = t;
        typeData.push(types[t]);
    });

    return [types,typeData]
}


function DonutChart(props){
    const [selectType, setSelectType] = useState(props.selectType)
    // Creates and returns the donut chart SVG to be displayed

    // Process data
    let processedData = processData(props.data)
    const types = processedData[0]
    processedData = processedData[1]

    // Set up dimensional constants for svg
    const width = 460, height = 400;
    const margin = 40;
    const radius = Math.min(width, height) / 2;

    // Create donut chart SVG within useEffect
    useEffect(() => {

        // Donut chart set up
        const pie = d3.pie()
            .padAngle(1 / radius)
            .sort(null)
            .value(d => d.noPokemon)
            .sortValues(function (a, b) {
                return a - b;
            })

        // Donut chart's inner and outer radii
        const arc = d3.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.5)

        // The invisible outer ring surrounding the actual donut chart
        // (We will place the text for the smaller portions of the chart on this outerArc)
        const outerArc = d3.arc()
            .innerRadius(radius * 0.92)
            .outerRadius(radius * 0.92)

        function handleClick(type){
            d3.selectAll(".piePieces").transition().duration(350).attr("fill-opacity", 0.3)
            d3.selectAll(".pieText").transition().duration(350).attr("fill-opacity", 0.3)
            d3.selectAll(".polylines").transition().duration(350).attr("stroke-opacity", 0.3)
            d3.selectAll(".ribbons").transition().duration(350).attr("fill-opacity", 0.07).attr("stroke-opacity", 0)
            d3.selectAll(".pplines").transition().duration(350).style("stroke","#e6e6e6")
            d3.selectAll(".piePieces").filter("#p" + type).transition().duration(350).attr("fill-opacity", 1)
            d3.selectAll(".pieText").filter("#t" + type).transition().duration(350).attr("fill-opacity", 1)
            d3.selectAll(".polylines").filter("#l" + type).transition().duration(350).attr("stroke-opacity", 1)
            d3.selectAll(".ribbons").filter("#r" + type).transition().duration(350).attr("fill-opacity", 0.7).attr("stroke-opacity", 1)
            d3.selectAll(".pplines").filter("#ppl" + type).transition().duration(350).style("stroke",types[type].color).style("opacity",1)
            d3.selectAll(".pplines").filter("#ppl" + type).raise()
            d3.selectAll(".axis").raise();
        }

        function handleDblClick(){
            props.resetCharts()
        }

        // Set up the SVG display
        // Link d3 svg instance with the svg element whose id is "donutchart"
        let svg = d3.select('#donutchart')
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto;");


        // Generate the donut chart itself
        svg.append("g")
            .selectAll()
            .data(pie(processedData))
            .join("path")
            .attr("class", "piePieces")
            .attr("id", d => "p" + d.data.name)
            .attr("fill", d => d.data.color) // This is where the type colors come in
            .attr("d", arc)
            .on("click", function(event) {
                let type = event.target.id.substring(1)
                handleClick(type)
            })
            .on("dblclick", function(event) {
                handleDblClick()
            })

        // Generate the donut chart text
        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .selectAll()
            .data(pie(processedData))
            .join("text")
            .attr("transform",
                    d => `translate(
                    ${(d.endAngle - d.startAngle) > 0.3 ? arc.centroid(d) : outerArc.centroid(d)})`) // text for larger pieces go inside of the chart, else outside
            .attr("text-anchor", d => (d.endAngle - d.startAngle) > 0.3 ? "middle" : "start")
            .call(text => text.append("tspan")
                .attr("y", "-0.4em")
                .attr("font-weight", "bold")
                .attr("class", "pieText")
                .attr("id", d => "t" + d.data.name)
                .on("click", function(event) {
                    let type = event.target.id.substring(1)
                    handleClick(type)
                })
                .on("dblclick", function(event) {
                    handleDblClick()
                })
                .text(d => d.data.name))
            .call(text => text.append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .attr("class", "pieText")
                .attr("id", d => "t" + d.data.name)
                .on("click", function(event) {
                    let type = event.target.id.substring(1)
                    handleClick(type)
                })
                .on("dblclick", function(event) {
                    handleDblClick()
                })
                .text(d => d.data.noPokemon.toLocaleString("en-US")));

        // Generate the polylines connecting the donut chart text to the pieces for pieces w/
        // an arc angle smaller than 0.3
        svg.append("g")
            .selectAll()
            .data(pie(processedData))
            .join("polyline").filter(d => (d.endAngle - d.startAngle) < 0.3)
            .attr("class","polylines")
            .attr("id",d => "l" + d.data.name)
        .attr("points", d => ` ${arc.centroid(d)} ${[0.95 * outerArc.centroid(d)[0], 0.95 * outerArc.centroid(d)[1]]}}`)
        .style("stroke", "black")
        .style("stroke-width", "2px")
        .style("fill", "none")

        // Add title text
        svg.append("text")
            .attr("x", -(width * 0.5))
            .attr("y", -(height * 0.45))
            .attr("font-weight", "bold")
            .attr("font-size", 15)
            .text("No. Pokemon");
        svg.append("text")
            .attr("x", -(width * 0.5))
            .attr("y", -(height * 0.4))
            .attr("font-weight", "bold")
            .attr("font-size", 15)
            .text("of Primary Type X");

        svg.append("text")
            .attr("x", -(width * 0.075))
            .attr("y", height * 0.01)
            .attr("font-weight", "bold")
            .attr("font-size", 15)
            .text("Total: 721");
    })

    // Return the svg chart
    return(
            <svg width={width} height={height} id={"donutchart"} />
    )

}

export default DonutChart;