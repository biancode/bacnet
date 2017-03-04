README file for BACnet Node-RED
Michigan Tech - IMES Lab

Tested version:
Node-RED version : v0.15.2
node.js version: v6.10.0

*if your version is lower than this, you may have to update the packages. 
*if your version is newer than this, we cannot guarantee its compatibility. You may have to debug!


This project is an attempt to develop BACnet nodes in Node-RED using a BACnet stack. 
Client was developed and tested in Linux Ubuntu 14.04.5 
Test server used was BTS-server link: https://sourceforge.net/projects/bacnetserver/
*** Install the BACnet server if you want to test the BACnet client with it. 
*** We hope that it works with other BACnet devices (like the LG-AC)


---------------------------- Initial SETUP ----------------------------------------

1) Download and unzip "nodes.zip" from google drive and copy paste into directory: .node-red/
2) Next run "npm install" in the .node-red/nodes/ directory. This will load the dependencies from "package.json" and install them as necessary
for running and using the BACnet nodes. (Run cmd as administrator if using Windows OS)
3) Next run "node-red"
4) Open Node-RED in your browser using its default IP address and port number (i.e. 127.0.0.1:1880) (This may change if you have set another IP and/or port number on your system). 
6) Check if there is BACnet Category with all Object nodes (9). If you are unable to find the BACnet category with all the nodes  then the npm install did not work! (You could try again and/or contact us)
7) Import the flow into node-RED. Copy everything from clipboard (below) using CTRL + A and paste using CTRL + C 
8) This should generate a flow with tested properties. These can be directly used for testing with BACnet devices (We have tested with BAC-test (BTS) server)


-------------------- Obtaining the Objects Types and Identifiers ---------------------

This operation is performed to receive all the object types and their id's from the LG-AC.
Steps:
1) Let all the properties remain same as from the "Clipboard-Import" for device.
2) Change the Property Name to "object-list" in Read node of BACnet and add the IP address of the AC in the object_address field.
3) Deploy the node (after successfull setup)
4) Push the switch of Read node, the device node will create a log file "object-list.log" 
   (As the data appends to this file, please check the last entrance of this file if you try multiple times)
   
*** Please send us the object-list.log file. We can then make changes to the flow and resend the new flow for your testing!
*** If you think you would like to test them for your own, kindly read along for test procedure. This file explains details of the fields to modify and test that have been/can be performed.


You could use the test procedure mentioned below to test with other BACnet servers and/or devices
--------------------------------- TEST PROCEDURE --------------------------------------

*** Note: Please be careful for the case used as various parameters are case-sensitive!

// Test Procedure for "device" Node:
	    Read and Write Service are tested for Location property.
        ----------- Read Service:
			1) Open the Read node (double click) and check the Object Type is "device" and Property Name is "location".
			2) Other properties to fill (minimum requirement):
				-Object Address: IP Address of the "LG AC" 
			3) Open device node and input following:
				-Object Address:  IP Address of the BACnet device ("self") (eg: IP address of PC running node-RED)
				-Object Identifier: ID of device in "LG AC"
				-Object Type: device
				-other property can be filled by referencing the "LG AC" property list for the object
			4) Click on Deploy.
			5) Click the push botton switch. (The location current value will be shown in debug tab)

				
        ----------- Write Service: 
			1) Open the Write node (double click) and check the Object Type is "device" and Property Name is "location".
			2) Other properties to fill(minimum reequirement):
				-Object Address: IP Address of the "LG AC"
				-Present Value: The location you want to write eg. USA
			3) Open device node and input following (if filled during read test, go to next step skipping this step  ):
				-Object Address:  IP Address of the BACnet device ("self") (eg: IP address of PC running node-RED)
				-Object Identifier: ID of device in "LG AC"
				-Object Type: device
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch. 
			6) Follow the Read Service procedure to see the new written value(The current location will be shown in debug tab)
				

// Test Procedure for "analog-input" Node:
		Read Service are tested for Present Value property.
        ----------- Read Service:
			1) Open the Read node (double click) and check the Object Type is "analog-input" and Property Name is "present-value".
			2) Fill the following (minimum requirement):
				-Object Address: The LG AC IP Address
			3) Open analog-input node and input following:
				-Object Identifier: ID of analog-input  in LG AC
				-Object Type: analog-input
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch. (The current Present Value will be shown in debug tab)		


// Test Procedure for "analog-output" Node:
		Read and Write Service are tested for present-value property.
        ----------- Read Service:
			1) Open the Read node (double click) and check the Object Type is "analog-output" and Property Name is "present-value".
			2) Other properties to fill (minimum requirement):
				-Object Address: The LG AC IP Address
			3) Open analog-output node and input following:
				-Object Identifier: ID of analog-output in LG AC
				-Object Type: analog-output
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch. (The current Present Value will be shown in debug tab)

				
        ----------- Write Service: 
			1) Open the Write node (double click) and check the Object Type is "analog-output" and Property Name is "present-value".
			2) Other properties to fill(minimum reequirement):
				-Object Address: The LG AC IP Address eg. 192.168.0.1
				-Present Value: The present-value you want to write eg. 10
			3) Open analog-output node and input following (if filled during read test, go to next step skipping this step  ):
				-Object Identifier: ID of analog-output in LG AC
				-Object Type: analog-output
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch.
			6) Follow the Read Service procedure to see the new written value(The current present-value will be shown in debug tab)
			

// Test Procedure for "analog-value" Node:
		Read and Write Service are tested for present-value property.
        ----------- Read Service:
			1) Open the Read node (double click) and check the Object Type is "analog-value" and Property Name is "present-value".
			2) Other properties to fill (minimum requirement):
				-Object Address: The LG AC IP Address
			3) Open analog-value node and input following:
				-Object Identifier: ID of analog-value in LG AC
				-Object Type: analog-value
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch. (The current Present Value will be shown in debug tab)

				
        ----------- Write Service: 
			1) Open the Write node (double click) and check the Object Type is "analog-value" and Property Name is "present-value".
			2) Other properties to fill(minimum reequirement):
				-Object Address: The LG AC IP Address eg. 192.168.0.1
				-Present Value: The present-value you want to write eg. 10
			3) Open analog-value node and input following (if filled during read test, go to next step skipping this step  ):
				-Object Identifier: ID of analog-value in LG AC
				-Object Type: analog-value
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch.
			6) Follow the Read Service procedure to see the new written value(The current present-value will be shown in debug tab)


// Test Procedure for "binary-input" Node:
		Read Service are tested for Present Value property.
        ----------- Read Service:
			1) Open the Read node (double click) and check the Object Type is "binary-input" and Property Name is "present-value".
			2) Fill the following (minimum requirement):
				-Object Address: The LG AC IP Address
			3) Open binary-input node and input following:
				-Object Identifier: ID of binary-input  in LG AC
				-Object Type: binary-input
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch. (The current Present Value will be shown in debug tab)	


// Test Procedure for "binary-output" Node:
		Read and Write Service are tested for present-value property.
        ----------- Read Service:
			1) Open the Read node (double click) and check the Object Type is "binary-output" and Property Name is "present-value".
			2) Other properties to fill (minimum requirement):
				-Object Address: The LG AC IP Address
			3) Open binary-output node and input following:
				-Object Identifier: ID of binary-output in LG AC
				-Object Type: binary-output
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch. (The current Present Value will be shown in debug tab)

				
        ----------- Write Service: 
			1) Open the Write node (double click) and check the Object Type is "binary-output" and Property Name is "present-value".
			2) Other properties to fill(minimum reequirement):
				-Object Address: The LG AC IP Address eg. 192.168.0.1
				-Present Value: The present-value you want to write eg. 1/0 where "1" represents active and "0" inactive.
			3) Open binary-output node and input following (if filled during read test, go to next step skipping this step  ):
				-Object Identifier: ID of binary-output in LG AC
				-Object Type: binary-output
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch.
			6) Follow the Read Service procedure to see the new written value(The current present-value will be shown in debug tab)


// Test Procedure for "binary-value" Node:
		Read and Write Service are tested for present-value property.
        ----------- Read Service:
			1) Open the Read node (double click) and check the Object Type is "binary-value" and Property Name is "present-value".
			2) Other properties to fill (minimum requirement):
				-Object Address: The LG AC IP Address
			3) Open binary-value node and input following:
				-Object Identifier: ID of binary-value in LG AC
				-Object Type: binary-value
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch. (The current Present Value will be shown in debug tab)

				
        ----------- Write Service: 
			1) Open the Write node (double click) and check the Object Type is "binary-value" and Property Name is "present-value".
			2) Other properties to fill(minimum reequirement):
				-Object Address: The LG AC IP Address eg. 192.168.0.1
				-Present Value: The present-value you want to write eg. 1/0 (1-> active and 0-> inactive)
			3) Open binary-value node and input following (if filled during read test, go to next step skipping this step  ):
				-Object Identifier: ID of binary-value in LG AC
				-Object Type: binary-value
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch.
			6) Follow the Read Service procedure to see the new written value(The current present-value will be shown in debug tab)


// Test Procedure for "multi-state-input" Node:
		Read Service are tested for Present Value property.
        ----------- Read Service:
			1) Open the Read node (double click) and check the Object Type is "multi-state-input" and Property Name is "present-value".
			2) Fill the following (minimum requirement):
				-Object Address: The LG AC IP Address
			3) Open multi-state-input node and input following:
				-Object Identifier: ID of multi-state-input  in LG AC
				-Object Type: multi-state-input
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch. (The current Present Value will be shown in debug tab)	
			

// Test Procedure for "multi-state-output" Node:
		Read and Write Service are tested for present-value property.
        ----------- Read Service:
			1) Open the Read node (double click) and check the Object Type is "multi-state-output" and Property Name is "present-value".
			2) Other properties to fill (minimum requirement):
				-Object Address: The LG AC IP Address
			3) Open multi-state-output node and input following:
				-Object Identifier: ID of multi-state-output in LG AC
				-Object Type: multi-state-output
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch. (The current Present Value will be shown in debug tab)

				
        ----------- Write Service: 
			1) Open the Write node (double click) and check the Object Type is "multi-state-output" and Property Name is "present-value".
			2) Other properties to fill(minimum reequirement):
				-Object Address: The LG AC IP Address eg. 192.168.0.1
				-Present Value: The present-value you want to write eg. 10
			3) Open multi-state-output node and input following (if filled during read test, go to next step skipping this step  ):
				-Object Identifier: ID of multi-state-output in LG AC
				-Object Type: multi-state-output
				-other property can be filled by referencing the LG AC property list for the object
			4) Click on Deploy.
			5) Click the push botton switch.
			6) Follow the Read Service procedure to see the new written value(The current present-value will be shown in debug tab)				
			

> BACnet Nodes :

  --device : BACnet Device object type
		//------------------- device Node Setup ------------//
		   The device Node accepts input from the user and sets various self parameters
	        user input parameters:
	           object_address: Ip adress of "self" BACnet device eg. 192.168.1.148
	           object_name: Name of BACnet device eg. BAC Test
	           object_identifier: Identifier of device object of the BACnet device eg. 260002
	           object_type: Type of device object ("device")

  --analog-input : BACnet Analog Input object type
		//------------------- analog-input Node Setup ------------//
		   The analog-input Node accepts input from the user and sets various self parameters
   	        user input parameters:
			   object_name: Name of analog-input  eg. AI 01
	           object_identifier: Identifier of analog-input object eg. 1 (Depends on the channel)
	           object_type: Type of object ("analog-input")


  --analog-output : BACnet Analog Output object type
		//------------------- analog-output Node Setup ------------//
           The analog-output Node accepts input from the user and sets various self parameters
            user input parameters:
			   object_name: Name of analog-output  eg. AO 01
			   object_identifier: Identifier of analog-output object eg. 1 (Depends on the channel)
	           object_type: Type of object ("analog-output")
			   present_value: Value you want to set to control output eg. 68.0

  --analog-value : BACnet Analog Value object type
		//------------------- analog-value Node Setup ------------//
           The analog-value Node accepts input from the user and sets various self parameters\
            user input parameters:
			   object_name: Name of analog-value  eg. AV 01
			   object_identifier: Identifier of analog-value object eg. 1 (Depends on the channel)
	           object_type: Type of object ("analog-value")
			   present_value: Value you want to set eg. 68.0


  --binary-input : BACnet Binary Input object type
		//------------------- binary-input Node Setup ------------//
		   The binary-input Node accepts input from the user and sets various self parameters
				   object_name: Name of Binary Input  eg. BI 01
				   object_identifier: Identifier of Binary Input object eg. 1 (Depends on the number of same object)
	               object_type: Type of object ("Binary Input")


  --binary-output : BACnet Binary Output object type
		//------------------- binary-output Node Setup ------------//
		   The binary-output Node accepts input from the user and sets various self parameters
				   object_name: Name of binary-output  eg. BO 01
				   object_identifier: Identifier of binary-output object eg. 1 (Depends on the number of same object)
	               object_type: Type of object ("Binary Output")
				   present_value: Value you want to set eg. "1" for active and "0" for inactive


  --binary-value : BACnet Binary Value object type
		//------------------- binary-value Node Setup ------------//
		   The binary-value Node accepts input from the user and sets various self parameters
				   object_name: Name of binary-value  eg. BV 01
				   object_identifier: Identifier of binary-value object eg. 1 (Depends on the number of same object)
	               object_type: Type of object ("Binary Value")
				   present_value: Value you want to set eg. 1

  --multi-state-input : BACnet Multistate Input object type
		//------------------- multi-state-input Node Setup ------------//
		   The multi-state-input Node accepts input from the user and sets various self parameters
				   object_name: Name of multi-state-input  eg. MI 01
				   object_identifier: Identifier of multi-state-input object eg. 1 (Depends on the number of same object)
	               object_type: Type of object ("Multistate Input")
				   present_value: Value you want to set eg. 68.0


  --multi-state-output : BACnet Multistate Output object type
		//------------------- multi-state-output Node Setup ------------//
		   The multi-state-output Node accepts input from the user and sets various self parameters
				   object_name: Name of multi-state-output  eg. MO 01
				   object_identifier: Identifier of multi-state-output object eg. 1 (Depends on the number of same object)
	               object_type: Type of object ("Multistate Output")
				   present_value: Value you want to set  eg. 68.0


  --serviceInject : Node to inject BACnet requests
		//------------------- ServiceInject Node Setup ------------//
		   The serviceInject Node accepts input from the user and implements various services.

		//------------Read Property Service------------------------
		1) Drag and drop the ServiceInject Node.
		2) Fill the division according to your requirements (devices, objects, properties, etc):
			a) Service : "read"
			b) Object Address: "IP Address" (IP address of the device you want to read the property from)
			c) Object Type: "Object Name" (Name of the object that you want to read)
			d) Property Name: "Property Name" (Property that you want to read)
			e) Present Value: "NA" (It is the value to be written in the property mentioned above)
			f) Repeat: It will repeatedly send the request at the specified time (It has all the option as provided inject node by the Node-Red)
			g) Name: "Read" (It will display the Read on the Node Block)
			* inject once at start - Tick (Pushes the data via ServiceInject node when deployed)


		//------------Write Property Service------------------------
		1) Drag and drop the ServiceInject Node
		2) Fill the division according to your requirements (devices, objects, properties, etc)
			a) Service : "wrtie"
			b) Object Address: "IP Address" (IP address of the device you want to write the property)
			c) Object Type: "Object Name" (Name of the object that you want to write)
			d) Property Name: "Property Name" (Property that you want to write)
			e) Present Value: "Actual Value" (string or number depending on the above mentioned property name)
			f) Repeat: It will repeatedly send the request at the specified time (It has all the option as provided inject node by the Node-Red)
			g) Name: "Write" (It will display the Write on the Node Block)
			* inject once at start - Tick (Pushes the data via ServiceInject node when deployed)


		//------------TimeSync Service---------------------
		1) Drag and drop the ServiceInject Node
		2) Fill the division according to your requirements (devices, objects, properties, etc)
			a) Service : "sync"
			b) Object Address: "IP Address" (IP address of the device you want to sync with)
			c) Object Type: "Device" (Only device object can be time synchronized)
			d) Property Name: "NA" (It is not applicable as the time is automatically be synched to the device)
			e) Present Value: "NA"(Not Applicable because time is automatically  synced to the device)
			f) Repeat: It will repeatedly send the request at the specified time (It has all the option as provided inject node by the Node-Red)
			g) Name: "Time Sync" (It will display the Time Sync on the Node Block)
			* inject once at start - Tick (Pushes the data via ServiceInject node when deployed)
			


*** You are free to perform additional tests (with these two services) and submit bug reports so that we can work on them.
*** Thank You



----------------------- Clipboard node-RED Flow -----------------------------------
You could directly import this section into node-RED and get started

** Begins here ----

[{"id":"ba2c99c2.e573c8","type":"device","z":"90487ad1.7a2978","object_address":"192.168.1.148","object_name":"XYZ","object_identifier":"260002","object_type":"Device","system_status":"Operational","vendor_name":"LG","vendor_identifier":"","model_name":"","firmware_revision":"1","application_software_version":"","location":"USA","description":"","protocol_version":"1","protocol_conformance_class":"","protocol_services_supported":"","protocol_objecttype_supported":"","object_list":"analog_input, analog_output, analog_value, binary_input, binary_output, binary_value, multistate_input, multistate_output","max_apdu_length_supported":"1476","segmentation_supported":"","vt_classes_supported":"","active_vt_sessions":"","local_time":"","local_date":"","utc_offset":"","daylight_savings_status":"","apdu_segment_timeout":"","apdu_timeout":"3000","apdu_retries":"","list_of_session_keys":"","time_synchronization_recipients":"","max_master":"","max_info_frames":"","device_address_binding":"","x":430.933349609375,"y":73,"wires":[["a3e75073.467d88","aa8d265d.a04a68"]]},{"id":"aa8d265d.a04a68","type":"file","z":"90487ad1.7a2978","name":"File Log","filename":"./object-list.log","appendNewline":true,"createDir":true,"overwriteFile":"false","x":741.88330078125,"y":224.88333129882812,"wires":[]},{"id":"c40cd34c.4a6608","type":"analog_input","z":"90487ad1.7a2978","object_name":"AN0","object_identifier":"0","object_type":"analog-input","present_value":"21","description":"Temperature","device_type":"","status_flag":"Operational","event_state":"","reliability":"","out_of_service":"","update_interval":"","units":"F","min_pres_value":"","max_pres_value":"","resolution":"","cov_increment":"","time_delay":"","notification_class":"","high_limit":"","low_limit":"","deadband":"","limit_enable":"","event_enable":"","acked_transitions":"","notify_type":"","x":431.933349609375,"y":159,"wires":[["a3e75073.467d88"]]},{"id":"2c4df98e.fa129e","type":"analog_output","z":"90487ad1.7a2978","object_name":"AN0","object_identifier":"0","object_type":"analog-output","present_value":"","status_flag":"Operational","event_state":"","out_of_service":"","units":"F","priority_array":"","relinquish_default":"","property_list":"","current_command_priority":"","x":432.933349609375,"y":242.00001525878906,"wires":[["a3e75073.467d88"]]},{"id":"4e686845.22f34","type":"analog_value","z":"90487ad1.7a2978","object_name":"AV0","object_identifier":"0","object_type":"analog-value","present_value":"23","status_flag":"","event_state":"","out_of_service":"","units":"F","property_list":"","x":433.933349609375,"y":350,"wires":[["a3e75073.467d88"]]},{"id":"e4e2afca.52c0e8","type":"binary_input","z":"90487ad1.7a2978","object_name":"BI0","object_identifier":"0","object_type":"binary-input","present_value":"0101","status_flag":"","event_state":"","out_of_service":"","polarity":"","property_list":"","x":441.933349609375,"y":441,"wires":[["a3e75073.467d88"]]},{"id":"b68130c8.53c408","type":"binary_output","z":"90487ad1.7a2978","object_name":"BO0","object_identifier":"0","object_type":"binary-output","present_value":"0000","status_flag":"","event_state":"","out_of_service":"","polarity":"","priority_array":"","relinquish_default":"","property_list":"","current_command_priority":"","x":444.933349609375,"y":521,"wires":[["a3e75073.467d88"]]},{"id":"be3ec668.4621c","type":"binary_value","z":"90487ad1.7a2978","object_name":"BV0","object_identifier":"0","object_type":"binary-value","present_value":"0000","status_flag":"","event_state":"","out_of_service":"","property_list":"","x":445.933349609375,"y":611,"wires":[["a3e75073.467d88"]]},{"id":"a3e75073.467d88","type":"debug","z":"90487ad1.7a2978","name":"","active":true,"console":"false","complete":"payload","x":731.933349609375,"y":427,"wires":[]},{"id":"2a746b97.03aacc","type":"multistate_input","z":"90487ad1.7a2978","object_name":"MI0","object_identifier":"0","object_type":"multi-state-input","present_value":"","status_flag":"","event_state":"","out_of_service":"","number_of_states":"","property_list":"","x":446.933349609375,"y":686,"wires":[["a3e75073.467d88"]]},{"id":"be6a39fd.1d51c8","type":"multistate_output","z":"90487ad1.7a2978","object_name":"MO0","object_identifier":"0","object_type":"multi-state-output","present_value":"","status_flag":"","event_state":"","out_of_service":"","number_of_states":"","priority_array":"","relinquish_default":"","property_list":"","current_command_priority":"","x":449.933349609375,"y":774,"wires":[["a3e75073.467d88"]]},{"id":"4cb9ee04.0847d","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"device","property_name":"location","present_value":"","name":"Read","topic":"141.219.245.136","payload":"read","repeat":"","crontab":"","once":false,"x":146.93338012695312,"y":38,"wires":[["ba2c99c2.e573c8"]]},{"id":"8cf6b441.c7d1d8","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"device","property_name":"Location","present_value":"USA","name":"Write","topic":"141.219.245.136","payload":"write","repeat":"","crontab":"","once":false,"x":147.93338012695312,"y":88,"wires":[["ba2c99c2.e573c8"]]},{"id":"4120fd33.36fe5c","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"analog-input","property_name":"present-value","present_value":"","name":"Read","topic":"141.219.245.136","payload":"read","repeat":"","crontab":"","once":false,"x":152.433349609375,"y":159,"wires":[["c40cd34c.4a6608"]]},{"id":"9393e838.5db9b","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"analog-output","property_name":"present-value","present_value":"39","name":"Write","topic":"141.219.245.136","payload":"write","repeat":"","crontab":"","once":false,"x":145.43336486816406,"y":227.00001525878906,"wires":[["2c4df98e.fa129e"]]},{"id":"dd2ef1e5.adb178","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"analog-output","property_name":"present-value","present_value":"","name":"Read","topic":"141.219.245.136","payload":"read","repeat":"","crontab":"","once":false,"x":145.43336486816406,"y":272.00001525878906,"wires":[["2c4df98e.fa129e"]]},{"id":"4575f52f.64346c","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"analog-value","property_name":"present-value","present_value":"87","name":"Write","topic":"141.219.245.136","payload":"write","repeat":"","crontab":"","once":false,"x":153.43336486816406,"y":334,"wires":[["4e686845.22f34"]]},{"id":"fd3213a9.7e6ab8","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"analog-value","property_name":"present-value","present_value":"","name":"Read","topic":"141.219.245.136","payload":"read","repeat":"","crontab":"","once":false,"x":151.433349609375,"y":374,"wires":[["4e686845.22f34"]]},{"id":"128ae625.91d332","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"binary-output","property_name":"present-value","present_value":"1","name":"Write","topic":"141.219.245.136","payload":"write","repeat":"","crontab":"","once":false,"x":155.43336486816406,"y":498,"wires":[["b68130c8.53c408"]]},{"id":"1e96bee.e720841","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"binary-output","property_name":"present-value","present_value":"","name":"Read","topic":"141.219.245.136","payload":"read","repeat":"","crontab":"","once":false,"x":153.433349609375,"y":536,"wires":[["b68130c8.53c408"]]},{"id":"e0666499.358118","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"binary-input","property_name":"present-value","present_value":"","name":"Read","topic":"141.219.245.136","payload":"read","repeat":"","crontab":"","once":false,"x":152.43336486816406,"y":439,"wires":[["e4e2afca.52c0e8"]]},{"id":"a6f14492.700c58","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"binary-value","property_name":"present-value","present_value":"1","name":"Write","topic":"141.219.245.136","payload":"write","repeat":"","crontab":"","once":false,"x":156.18336486816406,"y":596.25,"wires":[["be3ec668.4621c"]]},{"id":"16f704c9.3b8d93","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"binary-value","property_name":"present-value","present_value":"","name":"Read","topic":"141.219.245.136","payload":"read","repeat":"","crontab":"","once":false,"x":154.18336486816406,"y":636.25,"wires":[["be3ec668.4621c"]]},{"id":"93a982c4.c87748","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"multi-state-input","property_name":"present-value","present_value":"","name":"Read","topic":"141.219.245.136","payload":"read","repeat":"","crontab":"","once":false,"x":158.18336486816406,"y":701.25,"wires":[["2a746b97.03aacc"]]},{"id":"e09ac8be.fb02f","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"multi-state-output","property_name":"present-value","present_value":"45","name":"Write","topic":"141.219.245.136","payload":"write","repeat":"","crontab":"","once":false,"x":155.00001525878906,"y":759.7666625976562,"wires":[["be6a39fd.1d51c8"]]},{"id":"aae5e7e7.c0f5f","type":"ServiceInject","z":"90487ad1.7a2978","object_address":"141.219.245.136","object_type":"multi-state-output","property_name":"present-value","present_value":"","name":"Read","topic":"141.219.245.136","payload":"read","repeat":"","crontab":"","once":false,"x":155.00001525878906,"y":802.7666625976562,"wires":[["be6a39fd.1d51c8"]]}]

** Ends here ----

