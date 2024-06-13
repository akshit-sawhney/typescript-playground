const fs = require('fs');
const path = require('path');

// Define the paths to the directories
const solidDir = path.join(__dirname, '..', 'files', 'solid');
const regularDir = path.join(__dirname, '..', 'files', 'regular');
const lightDir = path.join(__dirname, '..', 'files', 'light');

console.log('here: ', solidDir, regularDir);
// Function to get all SVG file names in a directory
function getSvgFiles(dir) {
    return fs.readdirSync(dir)
        .filter(file => path.extname(file) === '.svg')
        .map(file => path.basename(file, '.svg'));
}

// Get SVG file names from both directories
const solidFiles = new Set(getSvgFiles(solidDir));
const regularFiles = new Set(getSvgFiles(regularDir));
const lightFiles = new Set(getSvgFiles(lightDir));

// Calculate the union of both sets
const union = new Set([...solidFiles, ...regularFiles, ...lightFiles]);

// Calculate the difference from regular to solid
const diffRegularToSolid = new Set([...regularFiles].filter(file => !solidFiles.has(file)));

// Calculate the difference from solid to regular
const diffSolidToRegular = new Set([...solidFiles].filter(file => !regularFiles.has(file)));

const diffLightToRegular = new Set([...lightFiles].filter(file => !regularFiles.has(file)));

const diffLightToSolid = new Set([...lightFiles].filter(file => !solidFiles.has(file)));

const diffRegularToLight = new Set([...regularFiles].filter(file => !lightFiles.has(file)));

const diffSolidToLight = new Set([...solidFiles].filter(file => !lightFiles.has(file)));

// Convert sets to arrays for easier readability
const unionArray = [...union];
const diffRegularToSolidArray = [...diffRegularToSolid];
const diffSolidToRegularArray = [...diffSolidToRegular];
const diffLightToRegularArray = [...diffLightToRegular];
const diffLightToSolidArray = [...diffLightToSolid];
const diffRegularToLightArray = [...diffRegularToLight];
const diffSolidToLightArray = [...diffSolidToLight];

// Define output data
const outputData = {
    union: unionArray,
    diffRegularToSolid: diffRegularToSolidArray,
    diffSolidToRegular: diffSolidToRegularArray,
    diffLightToRegular: diffLightToRegularArray,
    diffLightToSolid: diffLightToSolidArray,
    diffRegularToLight: diffRegularToLightArray,
    diffSolidToLight: diffSolidToLightArray,
};

// Write output data to a JSON file
fs.writeFileSync('output.json', JSON.stringify(outputData, null, 2), 'utf-8');

console.log('Results have been written to output.json');
