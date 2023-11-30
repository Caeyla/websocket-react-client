import React, { useRef } from 'react';
import SockJsClient from 'react-stomp';

const App = () => {
  const clientRef = useRef(null);

  const [text, setText] = React.useState('');

  const [myMsg, setMyMsg] = React.useState('');

  const sendMessage = (msg) => {
    if (clientRef.current && clientRef.current.client) {
      const msgStr = JSON.stringify({
        type: 'Yes',
        message: msg
      });
      clientRef.current.sendMessage('/app/bob', msgStr);
    } else {
      console.error('SockJsClient is disconnected. Cannot send message.');
    }
  };

  return (
    <div>
      <SockJsClient
        url='http://192.168.88.38:8080/ws'
        topics={['/all/messages']}
        onMessage={(msg) => {
          setMyMsg(msg);
        }}
        ref={(client) => {
          clientRef.current = client;
        }}
      />
      <input type='text' onChange={(e) => setText(e.target.value)} />
      <button onClick={() => sendMessage(text)}>Send Message</button>
      <h2>{myMsg}</h2>
    </div>
  );
};

export default App;