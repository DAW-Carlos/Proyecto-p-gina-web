document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes de Bootstrap
    const dropdowns = new bootstrap.Dropdown('[data-bs-toggle="dropdown"]');
    
    const icons = document.querySelectorAll('.icon-item img');
    const menuItems = document.querySelectorAll('nav.menu ul li a');
    const iconoPage = document.querySelector('.icon');
  
    iconoPage.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
  
    [...menuItems, ...icons].forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const ruta = el.getAttribute('ruta');
            if (ruta) fetchContent(ruta);
        });
    });
  });
  
  function fetchContent(ruta) {
    fetch(ruta)
        .then(response => response.json())
        .then(jsonData => {
            sessionStorage.setItem('pageContent', JSON.stringify(jsonData));
            window.location.href = '../content/template.html';
        })
        .catch(error => console.error('Error:', error));
  }