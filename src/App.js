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
        //if ('NDEFReader' in window) {
          // eslint-disable-next-line no-undef
            const ndef = new NDEFReader();
            try {
                const tarjeta = await read();
                setOutput(`Tarjeta leída: ${tarjeta}`);
            } catch (error) {
              alert(error.message);
                setOutput(`Error al iniciar la lectura NFC: ${error}`);
            }
        /* } else {
            setOutput("La API de Web NFC no es compatible con este navegador.");
        } */
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
