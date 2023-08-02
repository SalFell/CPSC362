# trAIder

Cleaned up Sal's repo after reading through some React documentation and started to put files in MVC structure. Haven't done much yet but might make it easier to understand what's going on and implement other functions.

Running the program is the same as before, with `node proxy.js` used to start the server and `npm start` used to run the client.

# React/File Structure Overview and Misc.

As you may know (because I sure didn't lmao) React is a front end library that mainly works around items called components. These are primarily used to create UI "modules" which can be repeated for easy implementation. 

To start, the program begins with both `index.js` in `src` and `index.html` in `public`. While `index.html` functions like a normal html file, its body contains only the div with the id `root`. This is "filled out" by `index.js` which inserts the `App` component, itself created in `App.js` in `src/view`. Usage of components boils down to writing HTML markup and/or javascript to make up a component which then gets filled into `index.html` wherever that component is called.

The `App` component loads onto the page a header and data form - both created using components in `src/view` - and also begins the `controller()` module located in `src/controller`. Here I've implemented interactivity with the forms, though no actual call to download the data yet, but this can be done with an import to an as of yet written `downloadData()` module and a regular call to it like normal.

I've separated the files into folders to fit the MVC pattern:

- `controller` will contain the modules which handle things like general logic, strategy implementation, and user interaction, as well as being the only one interacting with the other two module types
- `model` handles the data, downloading it according to calls from any `controller` modules and their arguments, and returning the results back to `controller` modules
- `view` handles what the user sees, including html, css, and any charts and results, getting the data from `controller` modules rather than `model` modules and without accessing the data on its own

One thing of note is the `00 working` folder which contains previous files we've already written but - apart from partially implementing some of the data form - still need to be rewritten in separate modules, again according to the MVC pattern.