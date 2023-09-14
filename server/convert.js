import fs from 'fs';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

const filePath = "./tmp/audio.mp4";
const outputPath = filePath.replace(".mp4", ".wav");

export const convert = () => 
    new Promise((resolve, reject) => {
        console.log('Converting...');

        ffmpeg.setFfmpegPath(ffmpegStatic);
        ffmpeg()
            .input(filePath)
            .audioFrequency(16000)
            .audioChannels(1)
            .format('wav')
            .on('end', () => {
                const file = fs.readFileSync(outputPath);
                const fileDecoded = wav.decode(file);

                const auidoData = fileDecoded.channelData[0];
                const floatArray = new Float32Array(auidoData);

                console.log('convert finished!');

                resolve(floatArray);
                fs.unlinkSync(filePath);
            })
            .on('error', (error) => {
                console.log('Não foi possível converter o arquivo: ', error);
                reject(error);
            })
            .save(outputPath);
    });