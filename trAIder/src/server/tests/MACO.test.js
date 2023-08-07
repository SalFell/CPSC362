const MACOmain = require('../MACO'); // Import the main function
const mock = require('mock-fs');
const fs = require('fs');

// Sample historical data for testing
const sampleData = [
  {
    "Date": "2023-07-03",
    "Open": 8.789999961853027,
    "High": 8.880999565124512,
    "Low": 8.619999885559082,
    "Close": 8.729999542236328,
    "Volume": 4042200
  },
  {
    "Date": "2023-07-05",
    "Open": 8.819999694824219,
    "High": 8.850000381469727,
    "Low": 8.531000137329102,
    "Close": 8.6899995803833,
    "Volume": 7091000
  },
  {
    "Date": "2023-07-06",
    "Open": 8.960000038146973,
    "High": 9.210000038146973,
    "Low": 8.829999923706055,
    "Close": 8.890000343322754,
    "Volume": 9257900
  },
  {
    "Date": "2023-07-07",
    "Open": 8.84000015258789,
    "High": 9,
    "Low": 8.600000381469727,
    "Close": 8.989999771118164,
    "Volume": 7068800
  },
  {
    "Date": "2023-07-10",
    "Open": 9.050000190734863,
    "High": 9.550000190734863,
    "Low": 8.989999771118164,
    "Close": 9.210000038146973,
    "Volume": 7071000
  },
  {
    "Date": "2023-07-11",
    "Open": 9.220000267028809,
    "High": 9.420000076293945,
    "Low": 9.069999694824219,
    "Close": 9.140000343322754,
    "Volume": 5194700
  },
  {
    "Date": "2023-07-12",
    "Open": 8.760000228881836,
    "High": 8.9399995803833,
    "Low": 8.550000190734863,
    "Close": 8.65999984741211,
    "Volume": 10908100
  },
  {
    "Date": "2023-07-13",
    "Open": 8.34000015258789,
    "High": 8.380000114440918,
    "Low": 7.909999847412109,
    "Close": 7.96999979019165,
    "Volume": 9890900
  },
  {
    "Date": "2023-07-14",
    "Open": 7.900000095367432,
    "High": 8.140000343322754,
    "Low": 7.550000190734863,
    "Close": 8.050000190734863,
    "Volume": 10559700
  },
  {
    "Date": "2023-07-17",
    "Open": 7.889999866485596,
    "High": 8.010000228881836,
    "Low": 7.710000038146973,
    "Close": 7.769999980926514,
    "Volume": 6972000
  },
  {
    "Date": "2023-07-18",
    "Open": 7.78000020980835,
    "High": 8.020000457763672,
    "Low": 7.360000133514404,
    "Close": 7.449999809265137,
    "Volume": 12014400
  },
  {
    "Date": "2023-07-19",
    "Open": 7.300000190734863,
    "High": 7.570000171661377,
    "Low": 7.260000228881836,
    "Close": 7.5,
    "Volume": 19088600
  },
  {
    "Date": "2023-07-20",
    "Open": 7.889999866485596,
    "High": 8.609999656677246,
    "Low": 7.822000026702881,
    "Close": 8.539999961853027,
    "Volume": 17445300
  },
  {
    "Date": "2023-07-21",
    "Open": 8.329999923706055,
    "High": 8.840999603271484,
    "Low": 8.3100004196167,
    "Close": 8.770000457763672,
    "Volume": 17382500
  },
  {
    "Date": "2023-07-24",
    "Open": 8.739999771118164,
    "High": 8.989999771118164,
    "Low": 8.630000114440918,
    "Close": 8.710000038146973,
    "Volume": 8783900
  },
  {
    "Date": "2023-07-25",
    "Open": 8.550000190734863,
    "High": 8.600000381469727,
    "Low": 8.319999694824219,
    "Close": 8.460000038146973,
    "Volume": 7407600
  },
  {
    "Date": "2023-07-26",
    "Open": 8.5,
    "High": 8.880000114440918,
    "Low": 8.430000305175781,
    "Close": 8.619999885559082,
    "Volume": 11145900
  },
  {
    "Date": "2023-07-27",
    "Open": 8.029999732971191,
    "High": 8.779000282287598,
    "Low": 7.929999828338623,
    "Close": 8.680000305175781,
    "Volume": 11734600
  },
  {
    "Date": "2023-07-28",
    "Open": 8.34000015258789,
    "High": 8.420000076293945,
    "Low": 7.889999866485596,
    "Close": 7.96999979019165,
    "Volume": 10954300
  },
  {
    "Date": "2023-07-31",
    "Open": 7.920000076293945,
    "High": 8,
    "Low": 7.78000020980835,
    "Close": 7.840000152587891,
    "Volume": 6011700
  }
  // Add more sample data as needed for testing
];

// Create a mock for the file system before running the test
beforeAll(() => {
  mock({
    // Define the mock file system structure
    '/server-side': {
      // You can include any necessary files and directories here
    },
  });
});

// Clean up the mock file system after running the test
afterAll(() => {
  mock.restore();
});

// Mock fs module to simulate readFileSync
jest.mock('fs', () => ({
  readFileSync: jest.fn().mockReturnValue(JSON.stringify(sampleData)),
  writeFile: jest.fn((filename, data, callback) => callback()),
}));

describe('main function', () => {
  test('should simulate trades and write trades to file', () => {
    MACOmain(sampleData); // Call the main function with the sample data

    // Assertions to check if fs functions were called correctly
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledWith('MACO.json', expect.any(String), expect.any(Function));
    // Add assertions here to check if the file was written correctly
    expect(fs.readFileSync('MACO.json', 'utf-8')).toBe(sampleData);
  });
});
