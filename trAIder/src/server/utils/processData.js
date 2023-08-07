function processData(data) {
    if (
      data.chart &&
      data.chart.result &&
      data.chart.result[0].timestamp &&
      data.chart.result[0].indicators &&
      data.chart.result[0].indicators.quote &&
      data.chart.result[0].indicators.quote[0]
    ) {
      const timestamps = data.chart.result[0].timestamp;
      const quotes = data.chart.result[0].indicators.quote[0];

      return timestamps.map((timestamp, index) => ({
        Date: new Date(timestamp * 1000).toISOString().split('T')[0],
        Open: quotes.open[index],
        High: quotes.high[index],
        Low: quotes.low[index],
        Close: quotes.close[index],
        Volume: quotes.volume[index],
      }));
    } else {
      window.alert('No historical price data received from Yahoo Finance API.');
      return [];
    }
};

export default processData;