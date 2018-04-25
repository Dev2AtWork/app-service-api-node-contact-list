'use strict';

//var contacts = require('./contacts.json');
//var jp = require('jsonpath')

module.exports = {
    get: function () {
		var inputString = [];
		inputString[0] = '{"temperature":73.462118016189,"temperature_unit":"F","humidity":69.1534327737304,"humidity_unit":"%","pressure":163.964092586638,"pressure_unit":"psig","EventProcessedUtcTime":"2018-04-24T14:35:13.1445112Z","PartitionId":0,"EventEnqueuedUtcTime":"2018-04-24T14:33:52.9310000Z","IoTHub":{"MessageId":null,"CorrelationId":null,"ConnectionDeviceId":"Simulated.chiller-01.2","ConnectionDeviceGenerationId":"636601607674698166","EnqueuedTime":"2018-04-24T14:33:52.4210000Z","StreamId":null}}';
		inputString[1] = '{"temperature":78.4990218816088,"temperature_unit":"F","humidity":69.2367571479346,"humidity_unit":"%","pressure":163.67515460992,"pressure_unit":"psig","EventProcessedUtcTime":"2018-04-24T14:35:31.5975238Z","PartitionId":3,"EventEnqueuedUtcTime":"2018-04-24T14:33:52.9330000Z","IoTHub":{"MessageId":null,"CorrelationId":null,"ConnectionDeviceId":"Simulated.chiller-01.9","ConnectionDeviceGenerationId":"636601607673728485","EnqueuedTime":"2018-04-24T14:33:52.3240000Z","StreamId":null}}';
		var sensorLocation = '{"Simulated.chiller-01.2":{"Latitude":"6.554593","Longitude":"46.521503"},"Simulated.chiller-01.9":{"Latitude":"6.554696","Longitude":"46.521403"}}';
		var outJsonObj = formatJsonDatafromInput(inputString,sensorLocation);
        return outJsonObj;
    },
    all: function () {
		var inputString = [];
		inputString[0] = '{"temperature":73.462118016189,"temperature_unit":"F","humidity":69.1534327737304,"humidity_unit":"%","pressure":163.964092586638,"pressure_unit":"psig","EventProcessedUtcTime":"2018-04-24T14:35:13.1445112Z","PartitionId":0,"EventEnqueuedUtcTime":"2018-04-24T14:33:52.9310000Z","IoTHub":{"MessageId":null,"CorrelationId":null,"ConnectionDeviceId":"Simulated.chiller-01.2","ConnectionDeviceGenerationId":"636601607674698166","EnqueuedTime":"2018-04-24T14:33:52.4210000Z","StreamId":null}}';
		inputString[1] = '{"temperature":78.4990218816088,"temperature_unit":"F","humidity":69.2367571479346,"humidity_unit":"%","pressure":163.67515460992,"pressure_unit":"psig","EventProcessedUtcTime":"2018-04-24T14:35:31.5975238Z","PartitionId":3,"EventEnqueuedUtcTime":"2018-04-24T14:33:52.9330000Z","IoTHub":{"MessageId":null,"CorrelationId":null,"ConnectionDeviceId":"Simulated.chiller-01.9","ConnectionDeviceGenerationId":"636601607673728485","EnqueuedTime":"2018-04-24T14:33:52.3240000Z","StreamId":null}}';
		var sensorLocation = '{"Simulated.chiller-01.2":{"Latitude":"6.554593","Longitude":"46.521503"},"Simulated.chiller-01.9":{"Latitude":"6.554696","Longitude":"46.521403"}}';
		var outJsonObj = formatJsonDatafromInput(inputString,sensorLocation);
        return outJsonObj;
    }
};

function formatJsonDatafromInput(inputString,sensorLocation){
    var sensorDataArr = [];
    var sensorLocationObj = JSON.parse(sensorLocation);
    for(var count = 0;count<inputString.length;count++){
        var jsonObj = JSON.parse(inputString[count]);
        sensorDataArr.push({"type": "Feature","properties":{"title": jsonObj.IoTHub.ConnectionDeviceId,"description": '<strong>Temperature - '+jsonObj.temperature+ ' '+ jsonObj.temperature_unit + ', Humidity - '+ jsonObj.humidity + jsonObj.humidity_unit +'</strong>'},"geometry": {"coordinates": [sensorLocationObj[jsonObj.IoTHub.ConnectionDeviceId].Latitude,sensorLocationObj[jsonObj.IoTHub.ConnectionDeviceId].Longitude],"type": "Point"}});
    }
    var obj = {"features":sensorDataArr,"type": "FeatureCollection"};
    return obj;
}