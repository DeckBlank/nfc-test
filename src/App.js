import './App.css';

import { useEffect, useState } from 'react';

import logo from './logo.svg';

function App() {
  const [output, setOutput] = useState('Presiona el botón para escanear NFC');

  

const  read = () =>{
  // eslint-disable-next-line no-undef
  const ndef = new NDEFReader();
  return new Promise((resolve, reject) => {
    const ctlr = new AbortController();
    ctlr.signal.onabort = reject;
    ndef.addEventListener("reading", event => {
      ctlr.abort();
      resolve(event);
    }, { once: true });
    ndef.scan({ signal: ctlr.signal }).catch(err => reject(err));
  });
}
    const handleScan = async () => {
      // eslint-disable-next-line no-undef
      const ndef = new NDEFReader();
      try {
          await ndef.scan();
          setOutput("Esperando una etiqueta NFC...");
          //ndef.onreading = async ({ message }) => {
          ndef.onreading = async event => {
              const message = event.message;
              setOutput(message)
              let newOutput = '';
              for (const record of message.records) {
                  const textDecoder = new TextDecoder(record.encoding);
                  newOutput += `Tipo de registro: ${record.recordType}\n`;
                  newOutput += `Tipo de medio: ${record.mediaType}\n`;
                  newOutput += `Datos: ${textDecoder.decode(record.data)}\n`;
              }
              setOutput(newOutput);
          };
          ndef.onreadingerror = async  () => {
              setOutput("Error de lectura.");
          };
      } catch (error) {
          setOutput(`Error al iniciar la lectura NFC: ${error}`);
      }
    };
    useEffect(() => {
      try {
        // eslint-disable-next-line no-undef
        const ndef = new NDEFReader();
      setOutput(JSON.stringify(ndef));
      } catch (error) {
        setOutput(`${error.message}`);
      }
    }, []);
  return (
    <div className="App">
      <h1>Leer NFC</h1>
            <button onClick={handleScan}>Escanear NFC</button>
            <pre>{output}</pre>
    </div>
  );

}

export default App;
