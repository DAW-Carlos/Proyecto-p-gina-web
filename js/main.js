document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.icon-item img');
  const menuItems = document.querySelectorAll('nav.menu ul li a');
  const iconoPage = document.querySelector('.icon');

  iconoPage.addEventListener('click', () => {
      window.location.href = '../index.html';
  });

  [...menuItems, ...icons].forEach(el => {
      el.addEventListener('click', () => {
          const altText = el.getAttribute('is') || el.getAttribute('ruta');
          fetchContent(altText);
      });
  });
});

function fetchContent(ruta) {
  fetch(ruta)
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData);
          const pageData = jsonData;
          if (pageData) {
              sessionStorage.removeItem('pageContent');
              sessionStorage.setItem('pageContent', JSON.stringify(pageData));
              window.location.href = '../content/template.html';
          } else {
              console.error('Contenido no encontrado para:', altText);
          }
      })
      .catch(error => console.error('Error al cargar el JSON:', error));
}