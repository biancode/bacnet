
const bacnet = require('../bacnet.js')
const r = bacnet.init({
  datalink: {
    iface: 'wlan0',
    ip_port: '0xBAC0'
  },
  device: false
})

// function withAddressOrId (addressOrId, callback) {
//   if (addressOrId.match(/^\d+$/)) { // integer - should be a device Id so we have to do a whois
//     console.log('doing whois for ' + addressOrId)
//     console.log('doing who-is for.. ')
//     r.whois(Number(addressOrId))
//     r.on('iam', function (iam) {
//       console.log('iam: ', iam)
//       callback(Number(addressOrId))
//     })
//   } else { // something else - should be an address so we dont need to do a whois
//     callback(addressOrId)
//   }
// }

// function objectIdToString (objectId) {
//   return bacnet.objectTypeToString(objectId.type) + '/' + objectId.instance
// }

// withAddressOrId(deviceAddress, function (addressOrId) {
// console.log('Checkpoint 1\n')
r.timeSync() // function (err, property) {
  // console.log('Checkpoint 2\n')
  // if (err) throw console.log('Time Sync Error!', err)
  // console.log('timeSync: ', property.value)
// })
// })

setTimeout(function () {}, 1000)
