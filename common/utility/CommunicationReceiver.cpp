#include "CommunicationReceiver.h"

CommunicationReceiver::CommunicationReceiver(string portIn, string envelope){
	mEnvelope = envelope;

	mContext = new zmq::context_t(1);
	//subscriber for receiving
  	mSubscriber = new zmq::socket_t(*mContext, ZMQ_SUB);

  	mSubscriber->connect(("tcp://localhost:"+portIn).c_str());
  	if(envelope == "") {
  	  	mSubscriber->setsockopt(ZMQ_SUBSCRIBE, "", 0);	//subscribe to all messages
  	} else {
  		mSubscriber->setsockopt(ZMQ_SUBSCRIBE, envelope.c_str(), 1);
  	}
}

pair<string, string> CommunicationReceiver::receive(){
	string envelope = s_recv(*mSubscriber);
	string message = s_recv(*mSubscriber);
	return make_pair(envelope, message);
}
