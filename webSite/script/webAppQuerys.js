/** @addtogroup querys
 *  @{
 */

/**
 * requests local MAC address.
 * from httpServer via http and calls the callback function with the data.
 * @param callback  fn(data)
 */
function requestMyMac(callback){
	$.get("http://localhost:1188/my_mac",
			function(data){
		callback(data);
	},"json");
}

/**
 * requests the latest CAM from each station ID.
 *  from httpServer via http and calls the callback function with the data.
 * @param callback fn(data)
 */
function requestCam(callback){
	$.post("http://localhost:1188/request_cam",JSON.stringify({condition:"latest"}),
			function(data/*status,xhr*/){
		//console.log("data: "+data);
		//console.log("status: "+status);
		callback(data);
	},"json");
}

/**
 * requests the latest Information about the latest local CAM.
 * from httpServer via http and calls the callback function with the data.
 * @param callback fn(data)
 */
function requestCamInfo(callback){
	$.post("http://localhost:1188/request_caminfo",JSON.stringify({condition:"latest"}),
			function(data){
		callback(data.msgs[data.msgs.length-1]);
	},"json");
}

/**
 * requests the latest DENM from each station ID.
 * from httpServer via http and calls the callback function with the data.
 * @param callback fn(data)
 */
function requestDenm(callback){
	$.post("http://localhost:1188/request_denm",JSON.stringify({condition:"latest"}),
			function(data){
                            var latestTime = 0;
                            var latestDenm;
                            data.msgs.forEach(function(denm){
                                if (denm.createTime > latestTime){
                                    latestDenm = denm;
                                    latestTime = denm.createTime;
                                }
                            });
		callback(latestDenm);
	},"json");
}

/**
 * requests gps data.
 * from httpServer via http and calls the callback function with the data.
 * @deprecated untested
 * 
 * @param callback fn(data)
 */
function requestGps(callback){
	$.post("http://localhost:1188/request_gps",JSON.stringify({condition:""}),
			function(data){
		callback(data.msgs[data.msgs.length-1]);
	},"json");
}

/**
 * requests obd2 data.
 * from httpServer via http and calls the callback function with the data.
 * @deprecated untested
 * 
 * @param callback fn(data)
 */
function requestObd2(callback){
	$.post("http://localhost:1188/request_obd2",JSON.stringify({condition:""}),
			function(data){
		callback(data.msgs[data.msgs.length-1]);
	},"json");
}

/**
 * requests the latest dcc information.
 * about all 4 access categorys from httpServer via http and calls the callback function with the data.
 * @param callback fn(data)
 */
function requestDccInfo(callback){
	$.post("http://localhost:1188/request_dccinfo",JSON.stringify({condition:"latest"}),
			function(data){
		callback(data.msgs[data.msgs.length-1]);
	},"json");
}

/**
 * triggers the creation of a DEN message.
 * via http request to httpServer
 */
function triggerDenm(){
	$.post("http://localhost:1188/trigger_denm",JSON.stringify({content: "triggered by GUI"}),	
			function(data,status,xhr){
		console.log("data: "+data);
		console.log("status: "+status);
	});
}

/** @} */ // end of group