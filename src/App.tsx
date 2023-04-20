import { CompatClient, IFrame, IMessage, Stomp } from '@stomp/stompjs';
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import './App.css';
import logo from './logo.svg';

const SOCKET_URL = 'http://localhost:8082/websocket';

function App() {
  let stompClient: CompatClient;
  useEffect(() => {
    const socket = new SockJS(SOCKET_URL)
    stompClient = Stomp.over(() => socket);
    stompClient.activate();
    stompClient.onConnect = onConnected;
    stompClient.onDisconnect = onDisconnected;
    stompClient.debug = (msg) => console.log(msg)


    return () => {
      stompClient.disconnect();
    }
  }, []);

  function onConnected(frame: IFrame) {
    stompClient.send('/app/hello', {}, 'hello');
    stompClient.subscribe('/topics/sales', (msg: IMessage) => console.log(JSON.parse(msg.body)))
  }

  function onSubscribeSaleFile(message: IMessage) {
    console.log(message);
  }

  function onDisconnected() {
    console.log('disconnected');

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
