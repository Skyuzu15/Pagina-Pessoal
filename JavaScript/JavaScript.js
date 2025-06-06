// Intro animation
window.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.intro');
    const container = document.querySelector('.container');

    setTimeout(() => {
        intro.classList.add('fade-out');
        // Aguarda a animação terminar antes de exibir o container
        setTimeout(() => {
            container.classList.remove('hidden');
        }, 1000); // espera o fade-out terminar (1s)
    }, 2500); // tempo da intro (2.5s)
});

// Menu interativo
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('data-target');

        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

