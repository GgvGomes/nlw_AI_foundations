import { server } from './server.js';

const form = document.getElementById('form');
const input = document.getElementById('url');
const content = document.getElementById('content');
const select = document.getElementById('type_action');
let select2;

$(document).ready(function () {
    select2 = $('#type_action').select2();
});

let transcriptionText = '';
let sumarizeText = '';

form.addEventListener('submit', handleSubmit);
// select.addEventListener('change', handleChange);
$('#type_action').on('change', handleChange);

async function handleSubmit(event) {
    event.preventDefault();
    content.classList.add('placeholder');
    transcriptionText = '';
    sumarizeText = '';

    // 1 = Sumarizar
    // 2 = Transcrever
    const selectVal = select.value;
    const videoUrl = input.value;

    let isShorts = false;
    let stringSplit;

    if (videoUrl.includes('shorts')) {
        stringSplit = '/shorts/';
        isShorts = true;
    }
    else if (videoUrl.includes('watch?v='))
        stringSplit = '/watch?v=';

    const [_, videoId] = videoUrl.split(stringSplit)

    content.textContent = "Obtendo o texto do audio...";
    const transcription = await server.get(`/sumary/${videoId}?isShorts=${isShorts}`);
    transcriptionText = transcription.data.result;

    if (selectVal == 1) await sumarize();
    else content.textContent = transcriptionText;

    content.classList.remove('placeholder');
}

async function sumarize() {
    content.classList.add('placeholder');

    content.textContent = "Realizando o resumo...";

    if (sumarizeText == '') {
        const summary = await server.post('/sumary', {
            text: transcriptionText
        });

        sumarizeText = summary.data.result;
    }
    content.textContent = sumarizeText

    content.classList.remove('placeholder');
}

async function handleChange() {
    if (transcriptionText != '') {
        if (select.value == 2) content.textContent = transcriptionText;
        else await sumarize();
    }

}