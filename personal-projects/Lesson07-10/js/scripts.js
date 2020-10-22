//var mainTitle = document.getElementsByClassName('main-title')[0];
//mainTitle.style.color = 'red';
var hamburgerBtn = document.getElementById('hamburgerBtn');
var hamburgerPanel = document.getElementById('hamburgerPanel');
var hamburgerCloseBtn = document.getElementById('hamburgerCloseBtn');
//hamburgerBtn.style.display = 'none';

function toggleHamburger() {
    if(hamburgerPanel.style.display === 'block') {
        hamburgerPanel.style.display = 'none';
        document.body.style.position = 'static';
    } else {
        hamburgerPanel.style.display = 'block';
        document.body.style.position = 'fixed';
    }
}

/*
function toggleHamburgerClass() {
    hamburgerPanel.classList.toggle('hamburger-expanded');
}
*/
hamburgerBtn.addEventListener('click', toggleHamburger);

hamburgerCloseBtn.addEventListener('click', toggleHamburger);
