import cors from 'cors';
import express from 'express';

import { download } from './download.js';
import { transcribe } from './transcribe.js';
import { summarize } from './summarize.js';
import { convert } from './convert.js';

const app = express();
app.use(express.json());
app.use(cors());

// Fazer com que o Node sirva os arquivos do app em React criado
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/sumary/:id', async (request, response) => {
    try {
        await download(request.params.id, request.query.isShorts);
        const audioConverted = await convert();

        const result = await transcribe(audioConverted);

        // response.send("ID do vídeo " + request.params.id)
        return response.json({ result });
    } catch (error) {
        console.log(error)
        return response.status(400).json({ result: error.message });
    }
});

app.post('/sumary', async (request, response) => {
    try {
        const result = await summarize(request.body.text)

        return response.json({ result });
    }
    catch (error) {
        console.log(error)
        return response.status(400).json({ result: error.message });
    }
})

// Todas as outras solicitações GET não tratadas retornarão nosso app em React
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(3333, () => console.log('Server running on port 3333!'));