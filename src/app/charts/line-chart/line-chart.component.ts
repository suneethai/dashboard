import { Component, OnInit, ElementRef, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-line-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
	@ViewChild('chart', { static: true })
	private chartContainer: ElementRef;

	private width: number;
	private height: number;
	private margin = {top: 50, right: 50, bottom: 50, left: 50};

	private x: any;
	private y: any;
	private svg: any;
	private g: any;

  constructor(private appService: AppService) { }

  ngOnInit() {

  	this.getLinesStationsData();
  	
  	let element = this.chartContainer.nativeElement;

  	this.svg = d3.select(element);
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

		// The number of datapoints
		var n = 21;

		// 5. X scale will use the index of our data
		var xScale = d3.scaleLinear()
		    .domain([0, n-1]) // input
		    .range([0, this.width]); // output

		// 6. Y scale will use the randomly generate number 
		var yScale = d3.scaleLinear()
		    .domain([0, 1]) // input 
		    .range([this.height, 0]); // output 

		// 7. d3's line generator
		var line = d3.line()
		    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
		    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
		    .curve(d3.curveMonotoneX) // apply smoothing to the line

		// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
		var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })


		// 3. Call the x axis in a group tag
		this.g.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + this.height + ")")
		    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

		// 4. Call the y axis in a group tag
		this.g.append("g")
		    .attr("class", "y axis")
		    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

		// 9. Append the path, bind the data, and call the line generator 
		this.g.append("path")
		    .datum(dataset) // 10. Binds data to the line 
		    .attr("class", "line") // Assign a class for styling 
		    .attr("d", line); // 11. Calls the line generator 

		// 12. Appends a circle for each datapoint 
		this.g.selectAll(".dot")
		    .data(dataset)
		  	.enter().append("circle") // Uses the enter().append() method
		    .attr("class", "dot") // Assign a class for styling
		    .attr("cx", function(d, i) { return xScale(i) })
		    .attr("cy", function(d) { return yScale(d.y) })
		    .attr("r", 5);
	}

	getLinesStationsData() {
		this.appService.change.subscribe(data => {
      console.log(data)
    });
	}

}

