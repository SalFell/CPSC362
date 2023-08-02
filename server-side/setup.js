// setup.js

const fs = require('fs');

const dataFolder = 'data';

// Create the 'data' folder if it doesn't exist
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log(`'${dataFolder}' folder created successfully.`);
} else {
  console.log(`'${dataFolder}' folder already exists.`);
}

// Set appropriate permissions for the 'data' folder (optional, adjust as needed)
try {
  fs.chmodSync(dataFolder, '0755');
  console.log(`Permissions set for '${dataFolder}' folder.`);
} catch (err) {
  console.error(`Error setting permissions for '${dataFolder}' folder:`, err);
}
