function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

window.onclick = function (event) {
    if (!event.target.matches('.user-avatar')) {
        const dropdownMenu = document.getElementById('dropdown-menu');
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        }
    }
}
 
/*
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.video-vip');
    const gallery = document.getElementById('image-gallery');
    const image = document.getElementById('imghome');
    const imagesContainer = document.getElementById('images-container');
    const backButton = document.getElementById('back-button');
    const videoTitle = document.getElementById('video-title'); // Título del video
    const categoryCards = document.getElementById('category-cards');

    let selectedCategoryTitle = '';


    // Manejo del clic en el contenedor de categorías
    categoryCards.addEventListener('click', (event) => {
        if (event.target.closest('.category-card')) {
            const categoryTitle = event.target.closest('.category-card').querySelector('.category-title').textContent;
            selectedCategoryTitle = categoryTitle; // Guardar el título de la categoría seleccionada
            videoTitle.textContent = categoryTitle; // Cambiar el texto del título por el título de la categoría
        }
    });
    // Al hacer clic en un video
    videos.forEach(video => {
        const videoLink = video.querySelector('.video-link');

        videoLink.addEventListener('click', (e) => {
            e.preventDefault();

            const images = video.getAttribute('data-images').split(',');

            if (images.length > 0 && images[0].trim() !== '') {
                videoTitle.textContent = video.querySelector('nav').textContent;
                imagesContainer.innerHTML = ''; // Limpiar contenedor de imágenes

                images.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl.trim();
                    imagesContainer.appendChild(img);

                    img.addEventListener('click', () => {
                        if (img.classList.contains('selected-img')) {
                            img.classList.remove('selected-img');
                        } else {
                            document.querySelectorAll('#images-container img').forEach(img => img.classList.remove('selected-img'));
                            img.classList.add('selected-img');
                        }
                    });
                });

                // Mostrar la galería y ocultar los videos
                document.querySelector('.videos-vips').style.display = 'none';
                image.style.display = 'none';
                gallery.style.display = 'block';

                // Desplazar hacia la parte superior
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Redirigir al enlace del video si no hay imágenes
                window.location.href = videoLink.href;
            }
        });
    });

      // Botón para volver
      backButton.addEventListener('click', () => {
        gallery.style.display = 'none';
        document.querySelector('.videos-vips').style.display = 'flex';

        // Restaurar el título a la categoría seleccionada
        videoTitle.textContent = selectedCategoryTitle;

        // Desplazar hacia la parte superior
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // Filtrado de videos por categoría
    const categoryButtons = document.querySelectorAll('.category-button');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.getAttribute('data-category');

            // Mostrar u ocultar los videos según la categoría seleccionada
            videos.forEach(video => {
                const videoCategories = video.getAttribute('data-category').split(',');
                if (videoCategories.includes(selectedCategory)) {
                    video.style.display = 'block'; // Mostrar video
                } else {
                    video.style.display = 'none'; // Ocultar video
                }
            });
        });
    });

    // Filtrado al hacer clic en las tarjetas de categoría
    const categoryCard = document.querySelectorAll('.category-card');
    
    categoryCard.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.getAttribute('data-category');
            const cards = document.getElementById('category-cards');

            // Mostrar u ocultar los videos según la categoría seleccionada
            videos.forEach(video => {
                const videoCategories = video.getAttribute('data-category').split(',');
                if (videoCategories.includes(selectedCategory)) {
                    cards.style.display = 'none';
                    video.style.display = 'block';
                    image.style.display = 'none';
                } else {
                    video.style.display = 'none'; // Ocultar video
                }
            });
        });
    });
});
*/