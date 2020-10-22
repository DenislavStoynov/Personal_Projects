var zones = document.getElementById('zones');
var platform = document.getElementById('platform');
var dropdownOne = document.getElementById('dropdownOne');
var dropdownTwo = document.getElementById('dropdownTwo');
var arrowDownOne = document.getElementById('arrowDownOne');
var arrowDownTwo = document.getElementById('arrowDownTwo');
var searchIcon = document.getElementById('searchIcon');
var mozillaMenu = document.getElementById('mozillaMenu');
var mozillaHeader = document.getElementById('mozillaHeader');
var closeBtn = document.getElementById('closeBtn');
var mozillaContent = document.getElementById('mozillaContent').children;

function openMozillaMenu() {
    mozillaMenu.style.visibility = 'visible';
    mozillaMenu.style.left = '0';
}

mozillaHeader.addEventListener('click', openMozillaMenu);

function closeMozillaMenu() {
    mozillaMenu.style.visibility = 'hidden';
    mozillaMenu.style.left = '-2000px';
}

closeBtn.addEventListener('click', closeMozillaMenu);

function toggleDropDownOne(event) {
    if(event.target !== zones && event.target !== arrowDownOne) {
        dropdownOne.style.opacity = '0';
        dropdownOne.style.pointerEvents = 'none'
        arrowDownOne.style.transform = 'rotate(0deg)';
    } else {
        dropdownOne.style.opacity = '1';
        dropdownOne.style.pointerEvents = 'all'
        arrowDownOne.style.transform = 'rotate(-180deg)';
        arrowDownOne.style.transition = '1s';
    }
}

window.addEventListener('click', toggleDropDownOne);

function toggleDropDownTwo(event) {
    if(event.target !== platform && event.target !== arrowDownTwo) {
        dropdownTwo.style.opacity = '0';
        dropdownTwo.style.pointerEvents = 'none';
        arrowDownTwo.style.transform = 'rotate(0deg)';
    } else {
        dropdownTwo.style.opacity = '1';
        dropdownTwo.style.pointerEvents = 'all';
        arrowDownTwo.style.transform = 'rotate(-180deg)';
        arrowDownTwo.style.transition = '1s';
    }
}

window.addEventListener('click', toggleDropDownTwo);

/* Dynamic form */

    // Create the form
    var searchForm = document.createElement('form');
    searchForm.setAttribute('action', '#');
    searchForm.setAttribute('method', 'post');
    searchForm.style.display = 'none';
    searchForm.style.marginLeft = '15px';

    // Create the input
    var searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('name', 'searchBar');
    searchInput.setAttribute('placeholder', 'Search...');

    // Add the input as a child in the form
    searchForm.appendChild(searchInput);

    // Add the final form to the 'search-bar' class
    document.getElementsByClassName('search-bar')[0].appendChild(searchForm);

function toggleSearchBar() {
    if(searchForm.style.display === 'block') {
        searchForm.style.display = 'none';
    } else {
        searchForm.style.display = 'block';
    }
}

searchIcon.addEventListener('click', toggleSearchBar);

