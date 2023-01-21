const input = document.getElementById("input");
const p = document.getElementById('p')
const translate = document.getElementById('translate')
const title = document.querySelector('.title')
const meaning = document.querySelector('.meaning')
const audio = document.getElementById('audio')

async function fetchAPI(word) {
    
    try {
        p.style.display = "block"
        translate.style.display = 'none'


        p.innerText = `Searching the meaning of '${word}'`
        const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(URL).then((res) => res.json());
        console.log(result);

        if(result.title){
            translate.style.display = 'block'
            p.style.display = "none" 
            title.innerText = word
            meaning.innerText = "Not Found"
            audio.style.display = 'none'
        }else{
            p.style.display = "none"
            translate.style.display = 'block'
            audio.style.display = 'inline-flex'

            title.innerText = result[0].word
            meaning.innerText = result[0].meanings[0].definitions[0].definition
            audio.src = result[0].phonetics[0].audio
        }

    } catch (error) {
        console.log(error);
        p.innerText = `Error happened`

    }
}

input.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
