function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 
var samples = data.samples;
    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
var samplefiltered = samples.filter(sampleObj => sampleObj == sample);
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
var metadata = data.metadata
var metadatafiltered = metadata.filter(sampleObj => sampleObj.id == sample); 
    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
var cleanSample = samplefiltered[0];
    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
var cleanSampleMetadata = metadatafiltered[0];
    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
var otu_ids = cleanSample.otu_ids;
var otu_labels = cleanSample.otu_labels;
var sampleValues = cleanSample.sample_values;

    // Deliverable 3: 3. Create a variable that holds the washing frequency.
var washFreq = parseFloat(cleanSampleMetadata.wFreq);

    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    var yticks =  otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();


    // Deliverable 1: 8. Create the trace for the bar chart. 
    var barData = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text: "Otu_Labels",
      type: "bar",
      orientation: "h"
  }];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacterial Species"

    };

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
Plotly.newPlot ("bar", barData, barLayout);
    // Deliverable 2: 1. Create the trace for the bubble chart.
var bubleTrace = {
  x: otu_ids,
  y: sampleValues,
  text: otu_labels,
  mode: 'markers',
  marker: {
    size: sampleValues,
    color: otu_ids
  }
};
    // Deliverable 2: 2. Create the layout for the bubble chart.
var bubleLayout = {
  title: "Bacteria Cultures",
  xaxis: otu_ids,
  yaxis: sampleValues,
  hovermode: "closest",
  height: 500,
  width: 1000
}
    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
Plotly.newPlot ("buble", bubleTrace, bubleLayout)    
    // Deliverable 3: 4. Create the trace for the gauge chart.
 var gaugeData = {
    value: washFreq,
    type: "indicator",
    mode: "gauge+number",
    title: {text: "Belly Button Washing Frequency<br>Scrubs per Week", font:{size:20}},
    gauge:{
      axis: {range: [0,10]},
      tickwidth: 1,
      tickcolor: "black",
      bar: {color: "blue"},
      steps: [
        {range:[0,2], color: "aqua"},
        {range: [2,4], color: "lavender"},
        {range: [4,6], color: "navy"},
        {range:[6,8], color: "mint"},
        {range: [8,10], color: "magenta"},
    ]
  }
 };

  
    // Deliverable 3: 5. Create the layout for the gauge chart.
var gaugeLayout = {
  width: 500,
  height: 450,
  margin: {t:0, b:0}
};
    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
