document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadChampionships(data.championships);
        })
        .catch(error => console.error('Error loading data:', error));
});

function loadChampionships(championships) {
    const championshipsList = document.getElementById('championships-list');
    const championshipInfo = document.getElementById('championship-info');
    
    championshipsList.innerHTML = ''; // Limpia la lista antes de cargar
    
    championships.forEach(championship => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = championship.name;
        link.href = '#';
        link.dataset.id = championship.id; // Usa el ID para cargar detalles
        link.addEventListener('click', (event) => {
            event.preventDefault();
            loadChampionshipDetails(championship.id);
        });
        
        listItem.appendChild(link);
        championshipsList.appendChild(listItem);
    });
}

function loadChampionshipDetails(id) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const championship = data.championships.find(c => c.id === id);
            displayChampionshipInfo(championship);
        })
        .catch(error => console.error('Error loading data:', error));
}

function displayChampionshipInfo(championship) {
    const championshipInfo = document.getElementById('championship-info');
    
    if (championship) {
        championshipInfo.innerHTML = `
            <h2>${championship.name}</h2>
            <p>${championship.description}</p>
            <h3>Detalles</h3>
            <p>Fecha: ${championship.date}</p>
            <p>Ubicación: ${championship.location}</p>
        `;
    } else {
        championshipInfo.innerHTML = '<p>Información no disponible.</p>';
    }
    document.addEventListener('DOMContentLoaded', () => {
        const headers = document.querySelectorAll('h3');
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                // Primero quita la clase 'active' de todos los <h3>
                headers.forEach(h => h.classList.remove('active'));
    
                // Añade la clase 'active' al <h3> clickeado
                header.classList.add('active');
            });
        });
    });
}




