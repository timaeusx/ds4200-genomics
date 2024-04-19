// Create SVG
let width = 600, height = 400;
let margin = { top: 20, bottom: 30, left: 100, right: 30 };
let svg = d3.select('body')
  .append('svg')  
  .attr('width', width)
  .attr('height', height);

// Define data
const crime = d3.csv('./Crime_Data_from_2020_to_Present.csv');

crime.then(function(data) {
  // Define count object that holds count for each crime type
  var countObj = {};

  // Count how much each crime description occurs in list and store in countObj
  data.forEach(function(d) {
    var typeCount = d['AREA NAME']; // Accessing the property of d
    if (countObj[typeCount] === undefined) {
      countObj[typeCount] = 0; // Initialize count to 1 if it's the first occurrence
    }
    countObj[typeCount]++; // Increment count for each occurrence
  });
  
  // Calculate total number of incidents
  const totalIncidents = Object.values(countObj).reduce((acc, count) => acc + count, 0);

  // Define scales for the horizontal and vertical axes
  const xScale = d3.scaleLinear()
    .domain([0, 0.15]) // x-axis now represents ratio or percentage, so domain is from 0 to 1
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleBand()
    .domain(Object.keys(countObj)) // Use crime types as domain
    .range([margin.top, height - margin.bottom])
    .paddingOuter(0.2) // Adjust the outer padding here
    .paddingInner(0.3); // Adjust the inner padding here

  // Create and append the bars
  svg.selectAll("rect")
    .data(Object.entries(countObj)) // Use entries of countObj to create bars
    .enter()
    .append("rect")
    .attr("x", margin.left)
    .attr("y", d => yScale(d[0])) // Use crime type as y position
    .attr("width", d => xScale(d[1] / totalIncidents) - margin.left) // Adjust width based on proportion
    .attr("height", yScale.bandwidth())
    .attr("fill", "steelblue")
    .on("click", function(d) {
      // Toggle color on click
      const currentColor = d3.select(this).attr("fill");
      if (currentColor === "steelblue") {
        d3.select(this).attr("fill", "red");
      } else {
        d3.select(this).attr("fill", "steelblue");
      }
    });

  // Add vertical axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));

  // Add horizontal axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format(".0%"))); // Format ticks as percentage

  // Add axis labels
  svg.append("text")
    .attr("transform", `translate(${width / 2},${height - margin.bottom / 10})`)
    .style("text-anchor", "middle")
    .text("Percentage of Total Incidents");

  svg.append("text")
    .attr("transform", `translate(${margin.left / 5},${height / 2})rotate(-90)`)
    .style("text-anchor", "middle")
    .text("Police Departments of LA");
});
