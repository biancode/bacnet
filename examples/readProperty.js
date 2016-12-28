const bacnet = require('../bacnet.js')
const r = bacnet.init({
  datalink: {
    iface: 'wlan0',
    ip_port: '0xBAC0'
  },
  device: false
})

function withAddressOrId (addressOrId, callback) {
  if (addressOrId.match(/^\d+$/)) { // integer - should be a device Id so we have to do a whois
    console.log('doing whois for ' + addressOrId)
    r.whois(Number(addressOrId))
    r.on('iam', function (iam) {
      console.log('iam: ', iam)
      callback(Number(addressOrId))
    })
  } else { // something else - should be an address so we dont need to do a whois
    callback(addressOrId)
  }
}

function objectIdToString (objectId) {
  return bacnet.objectTypeToString(objectId.type) + '/' + objectId.instance
}

console.log('reading property', bacnet.propertyKeyToString('object-list'))

withAddressOrId('141.219.179.177', function (addressOrId) {
  r.readProperty('141.219.179.177', 'device', '260002', 'object-list', false, function (err, property) {
  if (err) throw console.log('Error', err)
    console.log('Received property /', objectIdToString(property.object), '/', bacnet.propertyKeyToString(property.property))
    console.log(property.value)
  })
})

setTimeout(function () {}, 1000)
