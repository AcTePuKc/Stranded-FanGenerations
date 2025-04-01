
async function loadCharacters() {
    const res = await fetch('data/en.json');
    const data = await res.json();
    const list = document.getElementById('character-list');
    const details = document.getElementById('character-details');

    data.characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `<h2>${char.name}</h2><p>${char.prompt_name}</p>`;
        card.onclick = async () => {
            details.innerHTML = '';
            const promptRes = await fetch(`${char.folder}/${char.prompt_details_file}`);
            const promptText = await promptRes.text();
            char.images.forEach(img => {
                const image = document.createElement('img');
                image.src = `${char.folder}/${img}`;
                image.loading = "lazy";
                details.appendChild(image);
            });
            const promptDiv = document.createElement('pre');
            promptDiv.textContent = promptText;
            details.appendChild(promptDiv);
        };
        list.appendChild(card);
    });
}
loadCharacters();
