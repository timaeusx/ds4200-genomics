//create SVG
let width=600, height = 400;

let margin = {
  top: 20, 
  bottom: 30,
  left: 100,
  right: 30
};

// select the svg container
let svg = d3.select('body')
  .append('svg')  
  .attr('width', width)
  .attr('height', height);

//Define data
const crime = d3.csv('./Crime_Data_from_2020_to_Present.csv');

// Path to the CSV file
const csvFilePath = './Crime_Data_from_2020_to_Present.csv';
// Loading the CSV file
// const crime = d3.csv(csvFilePath).then(function(data) {
//   console.log(data); // Display the data in the console
// }).catch(function(error) {
//   console.error('Error loading the CSV file: ', error);
// });


crime.then(function(data) {
  // define count object that holds count for each crime type
  var countObj = {};

  // count how much each crime description occurs in list and store in countObj
  data.forEach(function(d) {
    var typeCount = d['AREA NAME']; // Accessing the property of d
    if (countObj[typeCount] === undefined) {
        countObj[typeCount] = 0; // Initialize count to 1 if it's the first occurrence
    } else {
        countObj[typeCount]++; // Increment count for subsequent occurrences
    }
  });
  
    // Now store the count in each data member
  data.forEach(function(d) {
    var typeCount = d['AREA NAME']; // Accessing the property of each data member
    d.count = countObj[typeCount]; // Store the count from countObj in the 'count' property of each data member
  });

  // Define scales for the horizontal and vertical axes
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
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
    .attr("width", d => xScale(d.count) - margin.left)
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
    .call(d3.axisBottom(xScale).ticks(5));

  // Add axis labels
  svg.append("text")
    .attr("transform", `translate(${width / 2},${height - margin.bottom / 10})`)
    .style("text-anchor", "middle")
    .text("Number of Incidents");

  svg.append("text")
    .attr("transform", `translate(${margin.left / 5},${height / 2})rotate(-90)`)
    .style("text-anchor", "middle")
    .text("Neighbourhoods of LA");
    
  });

