
document.querySelector('.burger-icon').addEventListener('click', function() {
    const burger = document.querySelector('.burger-icon');
    const sideMenu = document.querySelector('.side_menu');
    sideMenu.classList.toggle('open'); // відкриває або закриває меню
    burger.style.display = 'none';
});
document.querySelector('.main-title').addEventListener('click', () => {
    const burger = document.querySelector('.burger-icon');
    const sideMenu = document.querySelector('.side_menu');
    sideMenu.classList.remove('open');
    burger.style.display = 'block';
})