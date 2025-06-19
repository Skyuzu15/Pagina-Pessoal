// Intro animation
window.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.intro');
    const container = document.querySelector('.container');
    const bio = document.querySelector('.bio');

    setTimeout(() => {
        intro.classList.add('fade-out');

        setTimeout(() => {
            container.classList.remove('hidden');

            // Ativa apenas a seção Home após a intro
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
                section.classList.add('hidden');
            });

            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.classList.add('active');
                homeSection.classList.remove('hidden');
            }

            // Exibe a Bio junto com a Home
            if (bio) {
                bio.classList.remove('hidden');
            }

        }, 1000); // espera o fade-out terminar (1s)
    }, 2500); // tempo da intro (2.5s)
});

// Menu interativo
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('data-target');

        // Oculta todas as seções
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });

        // Ativa a seção clicada
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.classList.remove('hidden');
        }

        // Controla visibilidade da bio
        const bio = document.querySelector('.bio');
        if (bio) {
            if (targetId === 'home') {
                bio.classList.remove('hidden');
            } else {
                bio.classList.add('hidden');
            }
        }
    });
});
