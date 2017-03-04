// BACnet.js for node-RED
// MTU-IMES Lab (2016 - 2017)
// 
// Authors: Akhil Kurup < amkurup@mtu.edu >
//          Sumit Srestha < sumits@mtu.edu >
//

module.exports = function(RED) {
	
  // required packages
  var xpath   = require('xpath');
  // var dom  = require('xmldom').DOMParser;
  var request = require('request');
  var cron    = require("cron");
  var bacnet  = require('bacnet'); // bacnet stack with Js wrapper
  
  // Global variables
  // const object_address = '141.219.245.136';  // Server in IMES Lab
  // const object_address = '192.168.1.145';  // Server Akhil-PC
  var readReturnValue = 0; // return read value from readProperty service

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
      readReturnValue = property.value;
    });
    return readReturnValue;
  }

  // BACnet Write-Property service
  function BACwrite (object_address, object_type, object_identifier, property_name, property_value){
    // check property to write to
    if (property_name  == 'present-value'){
      // check for object type and form packet appropriately
      if (object_type == 'analog-output' || object_type == 'analog-value')
        var value = new bacnet.BacnetValue(property_value, 4); // BACNET_APPLICATION_TAG_REAL = 4
      else if (object_type == 'binary-output' || object_type == 'binary-value')
        var value = new bacnet.BacnetValue(property_value, 9); // BACNET_APPLICATION_TAG_ENUMERATED = 9
      else if (object_type == 'multi-state-output')
        var value = new bacnet.BacnetValue(property_value, 2); // BACNET_APPLICATION_TAG_UNSIGNED_INT = 2
      else
        console.log('Error! Unknown BACnet object!\n');
    }
    else{
      var value = property_value;
    }
    console.log('Writing Property: ',  value);
    r.writeProperty(object_address, object_type, object_identifier, property_name, false, value, function (err) {
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

    // node.status({fill:"green",shape:"dot",text:"Requesting"});
    // console.log('\n Date: ', new Date().toDateString());
    
    // check input of node
    node.on('input', 
      function(msg) {
        if (msg.object_type == 'device'){
          console.log('\n', msg.object_type, msg.service, ' service ');
          // BACnet Write Property service
          if (msg.service == 'read'){
            BACread(msg.object_address, object_type, object_identifier, msg.property_name)
            if (msg.property_name == 'object-list') setTimeout(function(){msg.payload = Array(readReturnValue)}, 275);
            else setTimeout(function(){msg.payload = 'Successfully read value: ' + readReturnValue}, 275);
          }
          // BACnet Write Property service
          else if (msg.service == 'write'){
            BACwrite (msg.object_address, object_type, object_identifier, msg.property_name, msg.present_value);
            msg.payload = 'Writing value ' + msg.present_value + ' to '+ msg.property_name;
          }
          // BACnet Time Synchronize service
          else if (msg.service == 'sync'){
            r.timeSync();
            msg.payload = 'Sending Time Synchronize to BACnet device...';
          }
          // Undefined or not supported BACnet service
          else {
            console.log('Error! Undefined Service!');
            msg.payload = 'Error! Undefined Service!';
          }
          // throw msg to output
          setTimeout(function(){node.send(msg)}, 300);
        }
      });
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

    // check input of node
    node.on('input', 
      function(msg) {
        if (msg.object_type == 'analog-input'){
          console.log('\n', msg.object_type, msg.service, ' service ');
          // BACnet Write Property service
          if (msg.service == 'read'){
            BACread(msg.object_address, object_type, object_identifier, msg.property_name)
            setTimeout(function(){msg.payload = 'Successfully read value: ' + readReturnValue}, 275);
          }
          // BACnet Write Property service
          else if (msg.service == 'write'){
            msg.payload = 'Denied! '+ object_type +' object does not have write access...';
            console.log('Denied! '+ object_type +' object does not have write access...');
          }
          // Undefined or not supported BACnet service
          else {
            console.log('Error! Undefined Service!');
            msg.payload = 'Error! Undefined Service!';
          }
          // throw msg to output
          setTimeout(function(){node.send(msg)}, 300);
        }
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
    
    // check input of node
    node.on('input', 
      function(msg) {
        if (msg.object_type == 'analog-output'){
          console.log('\n', msg.object_type, msg.service, ' service ');
          // BACnet Write Property service
          if (msg.service == 'read'){
            BACread(msg.object_address, object_type, object_identifier, msg.property_name)
            setTimeout(function(){msg.payload = 'Successfully read value: ' + readReturnValue}, 275);
          }
          // BACnet Write Property service
          else if (msg.service == 'write'){
            BACwrite (msg.object_address, object_type, object_identifier, msg.property_name, msg.present_value);
            msg.payload = 'Writing value ' + msg.present_value + ' to '+ msg.property_name;
          }
          // Undefined or not supported BACnet service
          else {
            console.log('Error! Undefined Service!');
            msg.payload = 'Error! Undefined Service!';
          }
          // throw msg to output
          setTimeout(function(){node.send(msg)}, 300);
        }
      });
  }

  RED.nodes.registerType("analog_output", analog_output);


  // Code for Analog Value object
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
    
    // check input of node
    node.on('input', 
      function(msg) {
        if (msg.object_type == 'analog-value'){
          console.log('\n', msg.object_type, msg.service, ' service ');
          // BACnet Write Property service
          if (msg.service == 'read'){
            BACread(msg.object_address, object_type, object_identifier, msg.property_name)
            setTimeout(function(){msg.payload = 'Successfully read value: ' + readReturnValue}, 275);
          }
          // BACnet Write Property service
          else if (msg.service == 'write'){
            BACwrite (msg.object_address, object_type, object_identifier, msg.property_name, msg.present_value);
            msg.payload = 'Writing value ' + msg.present_value + ' to '+ msg.property_name;
          }
          // Undefined or not supported BACnet service
          else {
            console.log('Error! Undefined Service!');
            msg.payload = 'Error! Undefined Service!';
          }
          // throw msg to output
          setTimeout(function(){node.send(msg)}, 300);
        }
      });
  }

  RED.nodes.registerType("analog_value", analog_value);


  // Code for Binary Input object
  function binary_input(config) {
    
    RED.nodes.createNode(this, config);
    
    var node = this;

    const object_name       = config.object_name;
    const object_identifier = config.object_identifier;
    const object_type       = config.object_type;
    const present_value     = config.present_value;
    const status_flag       = config.status_flag;
    const event_state       = config.event_state;
    const out_of_service    = config.out_of_service;
    const polarity          = config.polarity;
    const property_list     = config.property_list;

    // check input of node
    node.on('input', 
      function(msg) {
        if (msg.object_type == 'binary-input'){
          console.log('\n', msg.object_type, msg.service, ' service ');
          // BACnet Write Property service
          if (msg.service == 'read'){
            BACread(msg.object_address, object_type, object_identifier, msg.property_name)
            setTimeout(function(){msg.payload = 'Successfully read value: ' + readReturnValue}, 275);
          }
          // BACnet Write Property service
          else if (msg.service == 'write'){
            msg.payload = 'Denied! '+ object_type +' object does not have write access...';
            console.log('Denied! '+ object_type +' object does not have write access...');
          }
          // Undefined or not supported BACnet service
          else {
            console.log('Error! Undefined Service!');
            msg.payload = 'Error! Undefined Service!';
          }
          // throw msg to output
          setTimeout(function(){node.send(msg)}, 300);
        }
      });
  }

  RED.nodes.registerType("binary_input", binary_input);


  // Code for Binary Output object
  function binary_output(config) {
    
    RED.nodes.createNode(this, config);
    
    var node = this;

    const object_name              = config.object_name;
    const object_identifier        = config.object_identifier;
    const object_type              = config.object_type;
    const present_value            = config.present_value;
    const status_flag              = config.status_flag;
    const event_state              = config.event_state;
    const out_of_service           = config.out_of_service;
    const polarity                 = config.polarity;
    const property_list            = config.property_list;
    const priority_array           = config.priority_array;
    const relinquish_default       = config.relinquish_default;
    const current_command_priority = config.current_command_priority;
    
    // check input of node
    node.on('input', 
      function(msg) {
        if (msg.object_type == 'binary-output'){
          console.log('\n', msg.object_type, msg.service, ' service ');
          // BACnet Write Property service
          if (msg.service == 'read'){
            BACread(msg.object_address, object_type, object_identifier, msg.property_name)
            setTimeout(function(){msg.payload = 'Successfully read value: ' + readReturnValue}, 275);
          }
          // BACnet Write Property service
          else if (msg.service == 'write'){
            BACwrite (msg.object_address, object_type, object_identifier, msg.property_name, msg.present_value);
            msg.payload = 'Writing value ' + msg.present_value + ' to '+ msg.property_name;
          }
          // Undefined or not supported BACnet service
          else {
            console.log('Error! Undefined Service!');
            msg.payload = 'Error! Undefined Service!';
          }
          // throw msg to output
          setTimeout(function(){node.send(msg)}, 300);
        }
      });
  }

  RED.nodes.registerType("binary_output", binary_output);


  // Code for Binary Value object
  function binary_value(config) {
    
    RED.nodes.createNode(this, config);
    
    var node = this;
    
    const object_name       = config.object_name;
    const object_identifier = config.object_identifier;
    const object_type       = config.object_type;
    const present_value     = config.present_value;
    const status_flag       = config.status_flag;
    const event_state       = config.event_state;
    const out_of_service    = config.out_of_service;
    const polarity          = config.polarity;
    const property_list     = config.property_list;

    // check input of node
    node.on('input', 
      function(msg) {
        if (msg.object_type == 'binary-value'){
          console.log('\n', msg.object_type, msg.service, ' service ');
          // BACnet Write Property service
          if (msg.service == 'read'){
            BACread(msg.object_address, object_type, object_identifier, msg.property_name)
            setTimeout(function(){msg.payload = 'Successfully read value: ' + readReturnValue}, 275);
          }
          // BACnet Write Property service
          else if (msg.service == 'write'){
            BACwrite (msg.object_address, object_type, object_identifier, msg.property_name, msg.present_value);
            msg.payload = 'Writing value ' + msg.present_value + ' to '+ msg.property_name;
          }
          // Undefined or not supported BACnet service
          else {
            console.log('Error! Undefined Service!');
            msg.payload = 'Error! Undefined Service!';
          }
          // throw msg to output
          setTimeout(function(){node.send(msg)}, 300);
        }
      });
  }

  RED.nodes.registerType("binary_value", binary_value);


  // Code for multistate_input object
  function multistate_input(config) {
    
    RED.nodes.createNode(this, config);
    
    var node = this;

    const object_name       = config.object_name;
    const object_identifier = config.object_identifier;
    const object_type       = config.object_type;
    const present_value     = config.present_value;
    const status_flag       = config.status_flag;
    const event_state       = config.event_state;
    const out_of_service    = config.out_of_service;
    const number_of_states  = config.number_of_states;
    const property_list     = config.property_list;
    
    // check input of node
    node.on('input', 
      function(msg) {
        if (msg.object_type == 'multi-state-input'){
          console.log('\n', msg.object_type, msg.service, ' service ');
          // BACnet Write Property service
          if (msg.service == 'read'){
            BACread(msg.object_address, object_type, object_identifier, msg.property_name)
            setTimeout(function(){msg.payload = 'Successfully read value: ' + readReturnValue}, 275);
          }
          // BACnet Write Property service
          else if (msg.service == 'write'){
            msg.payload = 'Denied! '+ object_type +' object does not have write access...';
            console.log('Denied! '+ object_type +' object does not have write access...');
          }
          // Undefined or not supported BACnet service
          else {
            console.log('Error! Undefined Service!');
            msg.payload = 'Error! Undefined Service!';
          }
          // throw msg to output
          setTimeout(function(){node.send(msg)}, 300);
        }
      });
  }

  RED.nodes.registerType("multistate_input", multistate_input);


  // Code for multistate_output object
  function multistate_output(config) {
    
    RED.nodes.createNode(this, config);
    
    var node = this;
    
    const object_name              = config.object_name;
    const object_identifier        = config.object_identifier;
    const object_type              = config.object_type;
    const present_value            = config.present_value;
    const status_flag              = config.status_flag;
    const event_state              = config.event_state;
    const out_of_service           = config.out_of_service;
    const number_of_states         = config.number_of_states;
    const property_list            = config.property_list;
    const priority_array           = config.priority_array;
    const relinquish_default       = config.relinquish_default;
    const current_command_priority = config.current_command_priority;
    
    // check input of node
    node.on('input', 
      function(msg) {
        if (msg.object_type == 'multi-state-output'){
          console.log('\n', msg.object_type, msg.service, ' service ');
          // BACnet Write Property service
          if (msg.service == 'read'){
            BACread(msg.object_address, object_type, object_identifier, msg.property_name)
            setTimeout(function(){msg.payload = 'Successfully read value: ' + readReturnValue}, 275);
          }
          // BACnet Write Property service
          else if (msg.service == 'write'){
            BACwrite (msg.object_address, object_type, object_identifier, msg.property_name, msg.present_value);
            msg.payload = 'Writing value ' + msg.present_value + ' to '+ msg.property_name;
          }
          // Undefined or not supported BACnet service
          else {
            console.log('Error! Undefined Service!');
            msg.payload = 'Error! Undefined Service!';
          }
          // throw msg to output
          setTimeout(function(){node.send(msg)}, 300);
        }
      });
  }
  
  RED.nodes.registerType("multistate_output", multistate_output);
  
  // Custom built Inject Node
  function ServiceInjectNode(n) {

    RED.nodes.createNode(this,n);
    
    this.topic          = n.topic;
    this.object_type    = n.object_type;
    this.property_name  = n.property_name;
    this.present_value  = n.present_value;
    this.payload        = n.payload;
    this.payloadType    = n.payloadType;
    this.repeat         = n.repeat;
    this.crontab        = n.crontab;
    this.once           = n.once;
    this.interval_id    = null;
    this.cronjob        = null;
    this.object_address = n.topic;
    this.service        = n.payload;
    
    var node = this;
    
    if (this.repeat && !isNaN(this.repeat) && this.repeat > 0) {
        this.repeat = this.repeat * 1000;
        if (RED.settings.verbose) { this.log(RED._("inject.repeat",this)); }
        this.interval_id = setInterval( function() {
            node.emit("input",{});
        }, this.repeat );
    } else if (this.crontab) {
        if (RED.settings.verbose) { this.log(RED._("inject.crontab",this)); }
        this.cronjob = new cron.CronJob(this.crontab,
            function() {
                node.emit("input",{});
            },
            null, true);
    }

    if (this.once) {
        setTimeout( function() { node.emit("input",{}); }, 100 );
    }

    this.on("input",function(msg) {
        try {
            //msg.topic = this.topic;
            if ( (this.payloadType == null && this.payload === "") || this.payloadType === "date") {
                msg.payload = Date.now();
            } else if (this.payloadType == null) {
                msg.service        = this.service;
                msg.object_address = this.object_address;
                msg.object_type    = this.object_type;
                msg.property_name  = this.property_name;
                msg.present_value  = this.present_value;
            // console.log('Here is the message send! \n',msg);
            } else if (this.payloadType == 'none') {
                msg.payload = "";
            } else {
                msg.payload = RED.util.evaluateNodeProperty(this.payload,this.payloadType,this,msg);
            }
            this.send(msg);
            msg = null;
        } catch(err) {
            this.error(err,msg);
        }
    });
  }

  RED.nodes.registerType("ServiceInject", ServiceInjectNode);

  ServiceInjectNode.prototype.close = function() {
      if (this.interval_id != null) {
          clearInterval(this.interval_id);
          if (RED.settings.verbose) { this.log(RED._("inject.stopped")); }
      } else if (this.cronjob != null) {
          this.cronjob.stop();
          if (RED.settings.verbose) { this.log(RED._("inject.stopped")); }
          delete this.cronjob;
      }
  }

  RED.httpAdmin.post("/ServiceInject/:id", RED.auth.needsPermission("inject.write"), function(req,res) {
      var node = RED.nodes.getNode(req.params.id);
      if (node != null) {
          try {
              node.receive();
              res.sendStatus(200);
          } catch(err) {
              res.sendStatus(500);
              node.error(RED._("inject.failed",{error:err.toString()}));
          }
      } else {
          res.sendStatus(404);
      }
  });

}
