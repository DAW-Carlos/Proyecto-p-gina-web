document.addEventListener('DOMContentLoaded', () => {
    const jsonData = JSON.parse(sessionStorage.getItem('pageContent'));

    if (jsonData) {
        createPageFromJSON(jsonData);
    } else {
        console.error("No se encontraron datos para cargar la página.");
    }
});

function createPageFromJSON(jsonData) {
    const container = document.getElementById('contenido');

    const link1 = document.querySelector('link[rel="stylesheet"]');
    const link2 = document.createElement('link');
    link2.rel = "stylesheet";
    link2.href = "../CSS/terraria-content.css";

    document.head.appendChild(link1);
    document.head.appendChild(link2);

    const titleElement = document.querySelector('title');
    titleElement.textContent = jsonData.pagina.nombre;

    function createElement(elementData) {
        const element = document.createElement(elementData.tipo);

        if (elementData.class) {
            element.classList.add(...elementData.class.split(' '));
        }

        switch (elementData.tipo) {
            case 'section':
                element.classList.add('container', 'mb-4');
                break;
            case 'div':
                element.classList.add('row', 'mb-3');
                if (elementData.class === 'video-container') {
                    element.classList.add('video-wrapper'); 
                }
                break;
            case 'h2':
                element.classList.add('text-center', 'display-4');
                break;
            case 'p':
                element.classList.add('card-text');
                break;
            case 'video':
                element.classList.add('embed-responsive', 'embed-responsive-16by9');
                break;
        }

        if (elementData.contenido) {
            if (Array.isArray(elementData.contenido)) {
                elementData.contenido.forEach(childData => {
                    const childElement = createElement(childData);
                    element.appendChild(childElement);
                });
            } else {
                element.textContent = elementData.contenido;
            }
        }

        for (let key in elementData) {
            if (!['tipo', 'contenido', 'class'].includes(key)) {
                element.setAttribute(key, elementData[key]);
            }
        }

        return element;
    }

    jsonData.pagina.contenido.forEach(sectionData => {
        const section = createElement(sectionData);
        container.appendChild(section);
    });

    $('#contenido').addClass('container');
}
