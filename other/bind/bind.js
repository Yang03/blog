//this.x = 9;
console.log(process); 
var module = {
  x: 81,
  getX: function() { //console.log(this === global);
  	return this.x; }
};

//console.log(module.getX()); // 81

var retrieveX = module.getX;
//console.log(retrieveX()); // 9, because in this case, "this" refers to the global object

// Create a new function with 'this' bound to module
//New programmers (like myself) might confuse the global var getX with module's property getX
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81