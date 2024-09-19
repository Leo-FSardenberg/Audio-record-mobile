import React, { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import FFT from 'rn-fft';

class AudioContext {
    constructor() {
        this.recording = null; // Armazena a gravação atual
        this.audioData = []; // Armazena amostras de áudio
        this.sampleRate = 44100; // Taxa de amostragem do áudio
    }

    async requestMicrophonePermissions() {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
            throw new Error("Permissão do microfone não concedida.");
        }
    }

    async loadMicInput() {
        await this.requestMicrophonePermissions(); // Pede permissão para usar o microfone

        this.recording = new Audio.Recording(); // Cria uma nova gravação
        await this.recording.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY // Prepara com opções de alta qualidade
        );
        await this.recording.startAsync(); // Inicia a gravação
    }

    async stopRecording() {
        if (this.recording) {
            await this.recording.stopAndUnloadAsync(); // Para a gravação e descarrega os dados
        }
    }

    // Este método simula a obtenção de dados de áudio para o cálculo FFT
    async getAudioFFTData() {
        // Supondo que this.audioData seja preenchido com suas amostras de áudio
        const fft = new FFT(this.audioData.length); // O comprimento deve ser uma potência de 2
        const fftData = fft.createComplexArray(); // Cria um array complexo vazio para FFT

        // Preenche o array complexo com dados de áudio
        for (let i = 0;i < this.audioData.length;i++) {
            fftData[i][0] = this.audioData[i]; // Parte real
            fftData[i][1] = 0; // Parte imaginária
        }

        fft.realTransform(fftData); // Realiza a transformação real
        fft.completeSpectrum(fftData); // Completa o espectro da FFT

        return fftData; // Retorna os resultados da FFT
    }

    // Método para atualizar os dados de áudio
    updateAudioData(newAudioData) {
        this.audioData = newAudioData; // Atualiza as amostras de áudio
    }
}

const audioContextInstance = new AudioContext(); // Cria uma instância da classe AudioContext

export default audioContextInstance; // Exporta a instância para uso em outros componentes