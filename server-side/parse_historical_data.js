function readHistoricalDataFile(filename) {
    const data = fs.readFileSync(filename);
    return JSON.parse(data);
  }
