// Calculate total number of incidents
const totalIncidents = data.reduce((acc, d) => acc + d.count, 0);

// Define scales for the horizontal and vertical axes
const xScale = d3.scaleLinear()
  .domain([0, 1]) // x-axis now represents ratio or percentage, so domain is from 0 to 1
  .range([margin.left, width - margin.right]);

const yScale = d3.scaleBand()
  .domain(data.map(d => d['AREA NAME']))
  .range([margin.top, height - margin.bottom])
  .paddingOuter(0.2) // Adjust the outer padding here
  .paddingInner(0.3); // Adjust the inner padding here

// Create and append the bars
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", margin.left)
  .attr("y", d => yScale(d['AREA NAME']))
  .attr("width", d => xScale(d.count / totalIncidents) - margin.left) // Adjust width based on proportion
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
