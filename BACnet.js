
module.exports = function(RED) {
	
	var xpath   = require('xpath')  
	//var dom     = require('xmldom').DOMParser
	var request = require('request');
  const bacnet = require('bacnet')

  // Code for Device object
  function device(config) {
  
    RED.nodes.createNode(this, config);

    const object_address                 = config.object_address
    const object_name                    = config.object_name
    const object_identifier              = config.object_identifier
    const object_type                    = config.object_type
    const system_status                  = config.sys_status
    const vendor_name                    = config.vendor_name
    const vendor_identifier              = config.vendor_id
    const model_name                     = config.model_name
    const firmware_revision              = config.firmware_revision
    const application_software_version   = config.application_software_version
    const protocol_version               = config.protocol_version
    const protocol_conformance_class     = config.protocol_conformance_class
    const protocol_service_supported     = config.protocol_service_supported
    const protocol_objecttype_supported  = config.protocol_objecttype_supported
    const object_list                    = config.object_list
    const max_apdu_length_supported      = config.max_apdu_length_supported
    const segmentation_supported         = config.segmentation_supported
    const apdu_timeout                   = config.apdu_timeout
    const apdu_retries                   = config.apdu_retries
    const device_address_binding         = config.device_address_binding

    const property_name                  = config.object_name

    console.log(' ')
    console.log('Conected to...')
    console.log('object_address:    ', object_address)
    console.log('object_name:       ', object_name)
    console.log('object_identifier: ', object_identifier)
    console.log(' ')

    const r = bacnet.init({
      datalink: {
        iface:   'wlan0',
        ip_port: '0xBAC0'
      },
      device: false
    })

    function withAddressOrId (addressOrId, callback) {
      if (addressOrId.match(/^\d+$/)) { // integer - should be a device Id so we have to do a whois
        //console.log('doing whois for ' + addressOrId)
        console.log('doing whois for ')
        r.whois(Number(addressOrId))
        r.on('iam', function (iam) {
          console.log('iam: ', iam)
          callback(Number(addressOrId))
        })
      } 
      else { // something else - should be an address so we dont need to do a whois
        callback(addressOrId)
      }
    }

    function objectIdToString (objectId) {
      return bacnet.objectTypeToString(objectId.type) + '/' + objectId.instance 
    }

    console.log('Reading Property: ',  property_name)

    withAddressOrId(object_address, function (addressOrId) {
      r.readProperty(addressOrId, 
                    'device', 
                    object_identifier,
                    property_name,
                    false, 
                    function (err, property) {
                            if (err) throw console.log('Error', err)
                            console.log('Received property /', objectIdToString(property.object), '/', bacnet.propertyKeyToString(property.property))
                            console.log(property.value)
                    })
    })

    setTimeout(function () {}, 1000)

    //writeProperty

  }

  RED.nodes.registerType("device", device);


  // Code for Analog Input object
  function analog_input(config) {
  
    RED.nodes.createNode(this, config);

    this.on('input', 
           function(msg) {
             console.log(msg.payload)
           })
  
  }

  RED.nodes.registerType("analog_input", analog_input);


  // Code for Analog Output object
  function analog_output(config) {
  
    RED.nodes.createNode(this, config);

  }

  RED.nodes.registerType("analog_output", analog_output);
}
