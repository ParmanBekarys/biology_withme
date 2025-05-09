// Сайт ашылғанда басты бет автоматты түрде актив болады
const currentPage = window.location.pathname;
const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(button => {
    const link = button.querySelector('a').getAttribute('href');
    if (currentPage.includes(link)) {
        button.classList.add('active');
        button.classList.remove('inactive');
    } else {
        button.classList.remove('active');
        button.classList.add('inactive');
    }
});
