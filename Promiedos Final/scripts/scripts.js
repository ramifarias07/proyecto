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


const newsItems = [
    { title: "Farias y Pistoleso llevan al primer titulo nacional de Defensa y Justicia", url: "../copa_liga.html", image: "https://tntsports.com.ar/__export/1611447885602/sites/tntsports/img/2021/01/23/campeon_copa_sudamericana_defensa_y_justicia.jpg_2008533093.jpg" },
    { title: "Milan y Livepool repiten una gran final", url: "../champions.html", image: "https://th.bing.com/th/id/R.0bd0a753c799e999d420ed621ca6204a?rik=KrKECUpid8I6Iw&riu=http%3a%2f%2fimages.performgroup.com%2fdi%2flibrary%2fgoal_uk%2f56%2f2a%2fpaolo-maldini-ac-milan-champions-league_s5e12qxajanb1lxqyf1oy4orb.jpg%3ft%3d-714224137&ehk=yMbAcfETiW3CUBAAojhOSRQy1VVZNRCkUfmF27CBTFs%3d&risl=&pid=ImgRaw&r=0" },
    { title: "Nigeria sorprende y deja monstruos en el camino", url: "https://example.com/noticia3", image: "https://www.elespectador.com/resizer/v2/NBSY4NDYAVDKXC2PO7LIFGR4DM.jpg?auth=8c520d9a5fb3fc337c7abbdd231bc2714805430bdac21e48082c1522ac536066&width=920&height=613&smart=true&quality=60" },
    { title: "Club Olimpia se lleva la Libertadores", url: "https://example.com/noticia4", image: "https://images.daznservices.com/di/library/Goal_Argentina/1b/1e/libertadores-olimpia_z5pqpwnlxstz1r1qcy9wcevba.jpg?t=-1472942581&quality=60&w=1400" },
    { title: "Chicago lo intenta pero no alcanza y desciende", url: "https://example.com/noticia5", image: "https://media.lacapital.com.ar/p/cf6f52eb379de585f473b5edb37b9a60/adjuntos/203/imagenes/004/853/0004853728/1200x675/smart/chicagojpg.jpg"}
];

let currentIndex = 0;
const changeInterval = 5000; // 5 segundos
const progressBar = document.getElementById('progressBar');
let progressInterval;

function updateNews() {
    const newsLink = document.getElementById('newsLink');
    const newsImage = document.getElementById('newsImage');
    
    newsLink.href = newsItems[currentIndex].url;
    newsLink.textContent = newsItems[currentIndex].title;
    newsImage.src = newsItems[currentIndex].image;

    // Reiniciar la barra de progreso
    resetProgressBar();
}

// Cambiar noticia cada 5 segundos
setInterval(() => {
    currentIndex = (currentIndex + 1) % newsItems.length;
    updateNews();
}, changeInterval);

// Funciones para navegar con los botones
document.getElementById('prevButton').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + newsItems.length) % newsItems.length;
    updateNews();
});

document.getElementById('nextButton').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % newsItems.length;
    updateNews();
});

// Llamar a updateNews al inicio
updateNews();

// Función para reiniciar y controlar el progreso de la barra
function resetProgressBar() {
    clearInterval(progressInterval);
    progressBar.style.width = '0%';

    // Llenar la barra de progreso
    progressBar.style.transition = 'none'; // Sin transición inicial
    setTimeout(() => {
        progressBar.style.transition = 'width 5s linear'; // Aplicar la transición
        progressBar.style.width = '100%';
    }, 10); // Retraso corto para permitir el reinicio de la animación

    // Reiniciar el intervalo de progreso
    progressInterval = setTimeout(resetProgressBar, changeInterval);
}

// Iniciar la barra de progreso al cargar la primera noticia
resetProgressBar();


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
    document.querySelectorAll('ul#Jugadores2 li').forEach(item => {
        item.addEventListener('click', () => {
            window.location.href = item.getAttribute('data-url');
        });
    });
}