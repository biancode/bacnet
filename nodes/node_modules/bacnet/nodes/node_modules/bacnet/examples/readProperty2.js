
const deviceAddress = process.argv[2]
const deviceId = process.argv[3]
const objectObject = process.argv[4]
const objectName = process.argv[5]

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
    // console.log('doing whois for ' + addressOrId)
    console.log('doing who-is for.. ')
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
console.log('objectName:', objectName)
console.log('reading property', bacnet.propertyKeyToString(objectName))

withAddressOrId(deviceAddress, function (addressOrId) {
  r.readProperty(addressOrId, objectObject, deviceId, objectName, false, function (err, property) {
    if (err) throw console.log('Error', err)
    console.log('Received property /', objectIdToString(property.object), '/', bacnet.propertyKeyToString(property.property))
    console.log(property.value)
  })
})

setTimeout(function () {}, 1000)

