const burger = document.querySelector('.burger-icon');
const sideMenu = document.querySelector('.side_menu');

burger.addEventListener('click', function() {
    sideMenu.classList.add('open'); // відкриває меню
    burger.style.display = 'none';
});

document.querySelector('.main-title').addEventListener('click', () => {
    sideMenu.classList.remove('open'); // закриває меню
    burger.style.display = 'block';
})