import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import audioContext from './contexts/AudioContext';

const App = () => {
  const [recording, setRecording] = useState(false); // Estado que define se está gravando
  const [fftResults, setFftResults] = useState([]); // Estado para armazenar os resultados da FFT

  const startRecording = async () => {
    try {
      await audioContext.loadMicInput(); // Inicia a gravação do microfone
      setRecording(true); // Atualiza o estado para indicar que está gravando
    } catch (error) {
      console.error(error);
      alert("Acesso ao microfone negado."); // Alerta em caso de erro
    }
  };

  const stopRecording = async () => {
    try {
      await audioContext.stopRecording(); // Para a gravação
      setRecording(false); // Atualiza o estado para indicar que não está mais gravando

      // Simulando a obtenção de dados de áudio para o cálculo da FFT
      const simulatedAudioData = new Float32Array(1024); // Substitua pelos dados reais capturados
      for (let i = 0;i < simulatedAudioData.length;i++) {
        simulatedAudioData[i] = Math.random(); // Dados aleatórios como espaço reservado; substitua pelos dados reais
      }
      audioContext.updateAudioData(simulatedAudioData); // Atualiza os dados de áudio na instância do contexto
      const results = await audioContext.getAudioFFTData(); // Obtém os resultados da FFT
      setFftResults(results); // Armazena os resultados da FFT no estado
    } catch (error) {
      console.error(error); // Log de erro em caso de falha
    }
  };

  return (
    <View>
      <Button title={recording ? "Parar Gravação" : "Iniciar Gravação"} onPress={recording ? stopRecording : startRecording} />
      <Text>Resultados da FFT: {JSON.stringify(fftResults)}</Text> {/* Mostra os resultados da FFT */}
    </View>
  );
};

export default App;