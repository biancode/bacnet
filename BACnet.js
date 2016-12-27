
module.exports = function(RED) {
	
	var xpath   = require('xpath')  
	//var dom     = require('xmldom').DOMParser
	var request = require('request');

// Code for Device object
function device(config) {
  
  RED.nodes.createNode(this, config);

   readProperty
   writeProperty

  }

  RED.nodes.registerType("device", device);
}

// Code for Analog Input object
function analog_input(config) {
  
  RED.nodes.createNode(this, config);

  }

  RED.nodes.registerType("analog_input", analogInput);
}

// Code for Analog Output object
function analog_output(config) {
  
  RED.nodes.createNode(this, config);

  }

  RED.nodes.registerType("analog_output", analogOutput);
}
