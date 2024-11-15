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

      for (let key in elementData) {
          if (key === 'contenido') {
              if (Array.isArray(elementData[key])) {
                  elementData[key].forEach(childData => {
                      const childElement = createElement(childData);
                      element.appendChild(childElement);
                  });
              } else {
                  element.textContent = elementData[key];
              }
          } else if (key !== 'tipo') {
              element.setAttribute(key, elementData[key]);
          }
      }

      return element;
  }

  jsonData.pagina.contenido.forEach(sectionData => {
      const section = createElement(sectionData);
      container.appendChild(section);
  });
}