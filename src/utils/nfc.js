if ('NDEFReader' in window) {
    const reader = new NDEFReader();
  
    reader.scan().then(() => {
      console.log("Esperando una etiqueta NFC...");
  
      reader.onreading = (event) => {
        const message = event.message;
  
        for (const record of message.records) {
          console.log("Tipo de registro: ", record.recordType);
          console.log("Tipo de medio: ", record.mediaType);
  
          const textDecoder = new TextDecoder(record.encoding);
          console.log("Datos: ", textDecoder.decode(record.data));
        }
      };
  
      reader.onreadingerror = (event) => {
        console.log("Error de lectura: ", event);
      };
  
    }).catch(error => {
      console.log("Error al iniciar la lectura NFC: ", error);
    });
  } else {
    console.log("La API de Web NFC no es compatible con este navegador.");
  }