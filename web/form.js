import { server } from './server.js';

const form = document.getElementById('form');
const input = document.getElementById('url');
const content = document.getElementById('content');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    content.classList.add('placeholder');

    const videoUrl = input.value;

    if (!videoUrl.includes('shorts')) 
        return content.textContent = 'URL inválida, tente novamente';

    const [_, params] = videoUrl.split('/shorts/');
    const [videoId] = params.split('?si')

    content.textContent = "Obtendo o texto do audio...";
    const transcription = await server.get(`/sumary/${videoId}`);

    content.textContent = "Realizando o resumo...";

    const summary = await server.post('/sumary', { 
        text: transcription.data.result 
    });

    content.textContent = summary.data.result;
    content.classList.remove('placeholder');
}