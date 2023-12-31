import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId, isShorts) =>
    new Promise((resolve, reject) => {
        console.log('Downloading...');
        let stringYoutube = '';

        if(isShorts)
            stringYoutube = '/shorts/';
        else stringYoutube = '/watch?v=';

        const [videoIdOrganizado] = videoId.split('?si')[0].split('&')
        console.log(videoIdOrganizado)

        const videoUrl = `https://www.youtube.com${stringYoutube}${videoIdOrganizado}`

        ytdl(videoUrl, { filter: "audioonly", quality: "lowestaudio" })
            .on("info", (infos) => {
                const seconds = infos.formats[0].approxDurationMs / 1000;
                console.log(seconds);

                // if (seconds > 60)
                //     throw new Error("This video is too long! Please, send a video with less than 60 seconds.");
            }).on("end", () => {
                console.log('download finished!');
                resolve();
            }).on("error", (error) => {
                console.log('Não foi possível realizar o download: ', error);
                reject(error);
            }).pipe(
                fs.createWriteStream(`./tmp/audio.mp4`)
                // fs.createWriteStream(`./tmp/${videoId}.mp4`)
            )
    });