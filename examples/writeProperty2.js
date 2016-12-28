
const deviceAddress = process.argv[2]
const deviceId      = process.argv[3]
const objectObject  = process.argv[4]
const objectName    = process.argv[5]
const objectValue   = process.argv[6]

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
    //console.log('doing whois for ' + addressOrId)
    console.log('doing whois for ')
    r.whois(Number(addressOrId))
    r.on('iam', function (iam) {
      console.log('iam: ', iam)
      callback(Number(addressOrId))
    })
  } else { // something else - should be an address so we dont need to do a whois
    callback(addressOrId)
  }
}

//var value = objectValue
console.log('writing property', bacnet.propertyKeyToString(objectName), 'value', objectValue)

withAddressOrId(deviceAddress, function (addressOrId) {
  r.writeProperty(addressOrId, 'device', deviceId, objectName, false, objectValue, function (err) {
  if (err) console.log('error', err)
    else console.log('success')
  })
})

setTimeout(function () {}, 1000)
