import './App.css';

import { useEffect, useState } from 'react';

import logo from './logo.svg';

function App() {
  const [output, setOutput] = useState('Presiona el botón para escanear NFC');

    const handleScan = async () => {
        //if ('NDEFReader' in window) {
          // eslint-disable-next-line no-undef
            const ndef = new NDEFReader();
            try {
                await ndef.scan();
                setOutput("Esperando una etiqueta NFC...");
                ndef.onreading = event => {
                    const message = event.message;
                    let newOutput = '';
                    for (const record of message.records) {
                        const textDecoder = new TextDecoder(record.encoding);
                        newOutput += `Tipo de registro: ${record.recordType}\n`;
                        newOutput += `Tipo de medio: ${record.mediaType}\n`;
                        newOutput += `Datos: ${textDecoder.decode(record.data)}\n`;
                    }
                    setOutput(newOutput);
                };
                ndef.onreadingerror = event => {
                    setOutput("Error de lectura.");
                };
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
