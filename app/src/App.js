import logo from './logo.svg';
import './App.css';
import ChatInterface from './components/chat-interface/component';
import { useEffect } from 'react';

// set tittle of the page in react component 
// https://stackoverflow.com/questions/56544400/how-to-set-title-of-the-page-in-react-component

function App() {
  useEffect(() => {
    document.title = "Patient Chatbot"
  }, []);

  return (
    <div className="App">
      <ChatInterface />
    </div>
  );
}

export default App;
