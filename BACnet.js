
module.exports = function(RED) {
	
	var xpath   = require('xpath');
	// var dom  = require('xmldom').DOMParser;
	var request = require('request');
  var bacnet  = require('bacnet');

  // Initialize BACnet with desired interface and port
  const r = bacnet.init({
    datalink: {
      iface:   'wlan0',
      ip_port: '0xBAC0'
    },
    device: false
  });

  // BACnet Read-Property service
  function BACread (object_address, object_type, object_identifier, property_name){
    console.log('Reading Property: ',  property_name);
    r.readProperty(object_address, object_type, object_identifier, property_name, false, function (err, property){
      if (err) throw console.log('BACnet Read Error!', err);
      console.log('Value:', property.value);
      // return property.value;
      });
  }

  // BACnet Write-Property service
  function BACwrite (object_address, object_type, object_identifier, property_name, property_value){
    r.writeProperty(object_address, object_type, object_identifier, property_name, false, property_value, function (err) {
      if (err) throw console.log('BACnet Write Error!!', err);
      else console.log('BACnet Write Successful!');
    });
  }

  // Code for Device object
  function device(config) {
    
    RED.nodes.createNode(this, config);
    
    var node = this;
    
    const object_address                  = config.object_address;
    const object_name                     = config.object_name;
    const object_identifier               = config.object_identifier;
    const object_type                     = config.object_type;
    const system_status                   = config.sys_status;
    const vendor_name                     = config.vendor_name;
    const vendor_identifier               = config.vendor_id;
    const model_name                      = config.model_name;
    const firmware_revision               = config.firmware_revision;
    const application_software_version    = config.application_software_version;
    const protocol_version                = config.protocol_version;
    const protocol_conformance_class      = config.protocol_conformance_class;
    const protocol_service_supported      = config.protocol_service_supported;
    const protocol_objecttype_supported   = config.protocol_objecttype_supported;
    const object_list                     = config.object_list;
    const max_apdu_length_supported       = config.max_apdu_length_supported;
    const segmentation_supported          = config.segmentation_supported;
    const apdu_timeout                    = config.apdu_timeout;
    const apdu_retries                    = config.apdu_retries;
    const device_address_binding          = config.device_address_binding;
    const location                        = config.location;
    const description                     = config.description;
    const vt_classes_supported            = config.vt_classes_supported;
    const active_vt_sessions              = config.active_vt_sessions;
    const local_time                      = config.local_time;
    const local_date                      = config.local_date;
    const utc_offset                      = config.utc_offset;
    const daylight_savings_status         = config.daylight_savings_status;
    const apdu_segment_timeout            = config.apdu_segment_timeout;
    const list_of_session_keys            = config.list_of_session_keys;
    const time_synchronization_recipients = config.time_synchronization_recipients;
    const max_master                      = config.max_master;
    const max_info_frames                 = config.max_info_frames;
    
    const property_name  = 'Location';
    const property_value = 'India';

    // node.status({fill:"green",shape:"dot",text:"Requesting"});

    console.log('\n Date: ', new Date().toDateString());
    console.log('\nConected to...');
    console.log('object_address:    ', object_address);
    console.log('object_name:       ', object_name);
    console.log('object_type:       ', object_type);
    console.log('object_identifier: ', object_identifier, '\n');
    
    // variable to count number of requests
    var count = 0;
    
    // Accept input to device object
    node.on('input', 
       function(msg) {
          count += 1;
          console.log('input to device: ', msg.payload);
          // BACnet Read Property service
          if (msg.payload == 'read'){
            BACread (object_address, object_type, object_identifier, property_name);
          }
          // BACnet Write Property service
          if (msg.payload == 'write'){
            BACwrite (object_address, object_type, object_identifier, property_name, property_value);
          }
          //node.send(msg);
       });
        
    setTimeout(function () {}, 1000)
    
  }

  RED.nodes.registerType("device", device);


  // Code for Analog Input object
  function analog_input(config) {
    
    RED.nodes.createNode(this, config);
    
    var node = this;
    
    const object_name       = config.object_name;
    const object_identifier = config.object_identifier;
    const object_type       = config.object_type;
    const present_value     = config.present_value;
    const status_flag       = config.status_flag;
    const event_state       = config.event_state;
    const out_of_service    = config.out_of_service;
    const units             = config.units;
    
    var object_address = '141.219.245.136';
    var property_name  = 'present-value';
    
    console.log('\n analog_input: ');
    console.log('object_address    : ', object_address);
    console.log('object_type       : ', object_type);
    console.log('object_identifier : ', object_identifier);
    console.log('property_name     : ', property_name);

    node.on('input', 
            function(msg) {
              console.log('input to analog_input: ', msg.payload);
              // BACnet Read Property service
              if (msg.payload == 'read'){
                BACread (object_address, object_type, object_identifier, property_name);
              }
              // BACnet Write Property service
              if (msg.payload == 'write'){
                console.log('Denied! Analog Input object does not have write access...');
              }
              //node.send(msg);
           });
  }
  
  RED.nodes.registerType("analog_input", analog_input);
  
  // Code for Analog Output object
  function analog_output(config) {
    
    RED.nodes.createNode(this, config);
    
    var node = this;
        
    const object_name       = config.object_name;
    const object_identifier = config.object_identifier;
    const object_type       = config.object_type;
    const present_value     = config.present_value;
    const status_flag       = config.status_flag;
    const event_state       = config.event_state;
    const out_of_service    = config.out_of_service;
    const units             = config.units;
    
    var object_address = '141.219.245.136';
    var property_name  = 'present-value';
    var property_value = 27;
    var value = new bacnet.BacnetValue(property_value, BACNET_APPLICATION_TAG_REAL);
    
    node.on('input', 
           function(msg) {
              console.log('input to analog_output: ', msg.payload);
              // BACnet Read Property service
              if (msg.payload == 'read'){
                BACread (object_address, object_type, object_identifier, property_name);
              }
              // BACnet Write Property service
              if (msg.payload == 'write'){
                BACwrite (object_address, object_type, object_identifier, property_name, value);
              }
              //node.send(msg);
           });

  }

  RED.nodes.registerType("analog_output", analog_output);


  // Code for Analog Input object
  function analog_value(config) {
    
    RED.nodes.createNode(this, config);
    
    var node = this;

    const object_name       = config.object_name;
    const object_identifier = config.object_identifier;
    const object_type       = config.object_type;
    const present_value     = config.present_value;
    const status_flag       = config.status_flag;
    const event_state       = config.event_state;
    const out_of_service    = config.out_of_service;
    const units             = config.units;
    const property_list     = config.property_list;

    var object_address = '141.219.245.136';
    var property_name  = 'present-value';
    var property_value = 29;
    var value = new bacnet.BacnetValue(property_value, BACNET_APPLICATION_TAG_REAL);

    console.log('property_value: ', property_value, '\n' ,'value: ', value);

    console.log('\n analog_value: ');
    console.log('object_address    : ', object_address);
    console.log('object_type       : ', object_type);
    console.log('object_identifier : ', object_identifier);
    console.log('property_name     : ', property_name);

    node.on('input', 
            function(msg) {
              console.log('input to analog_value: ', msg.payload);
              // BACnet Read Property service
              if (msg.payload == 'read'){
                BACread (object_address, object_type, object_identifier, property_name);
              }
              // BACnet Write Property service
              if (msg.payload == 'write'){
                BACwrite (object_address, object_type, object_identifier, property_name, value);
              }
              //node.send(msg);
           });
  }

  RED.nodes.registerType("analog_value", analog_value);

}
