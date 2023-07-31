# trAIder
Hey guys. This is a fork of Sal's React project, and by "fork" I mean "I deleted everything and used my own files made from scratch" lol.

I was too lazy to figure out how to both get React working and as well as how to develop in that environment - and I knocked out after class Thursday before doing much anyways - so this was an easier option. Feel free to just take things from this and move them over to Sal's/your own files!

# Installation and Running
So far with this and other test I've been doing the past few weeks I've tried to use cdn's as much as possible so that nothing has to be installed or downloaded. 

Because of this, you should be able to just clone this repo and run `npx http-server` in the root folder, then use chrome to navigate to one of the urls it's available on as reported in the terminal under "Available On:". No other packages or dependencies required, ideally at least.

Note: In some cases I've had to hard refresh the page (`ctrl+F5`) if changes aren't being made due to cached files. Mostly for when I was changing data.json to test if it updated the chart, but just in case you need this info.

# Completed
Below are some things I got done with what's here. It's not much but it ~~mostly~~ works.

- Webpage with title, graph, and credits similar to my mockup including gradient and small animations
- Chart which reads from data.JSON and can be updated when any changes are made to that file
- ...
- Honestly that's kind of it really, my bad lol

# To Do
Below are some things I'm planning to do when I'm able to as well as stuff that needs to be done for assignment 4.

- Provide better documentation
- Separate script.js into individual modules, taking MVC into account
- Make better usage of variables rather than hardcoding (i.e. data.json's path) so that things can be changed easier
- Implement your modules including:
  - Download historical data using dropdown menus
  - Download historical data using the downloader Sal wrote (if required)
  - Backtest using the two trading strategies
- Create test cases:
  - One unit test case
  - One integration test case
