/* Registration Modal */

var registerBtn = document.getElementById('registerBtn'),
regModal = document.getElementById('regModal'),
closeRegModalBtn = document.getElementById('closeRegModalBtn');

function openRegModal() {
    regModal.style.display = 'block';
}

registerBtn.addEventListener('click', openRegModal);

function closeRegModal() {
    regModal.style.display = 'none';
}

closeRegModalBtn.addEventListener('click', closeRegModal);

function closeRegModalValidation(event) {
    if(event.target === regModal && event.target !== registerBtn) {
        regModal.style.display = 'none';
    }
}

window.addEventListener('click', closeRegModalValidation);

/* Login Modal */

var loginBtn = document.getElementById('loginBtn'),
loginModal = document.getElementById('loginModal'),
closeLoginModalBtn = document.getElementById('closeLoginModalBtn');

function openLoginModal() {
    loginModal.style.display = 'block';
}

loginBtn.addEventListener('click', openLoginModal);

function closeLoginModal() {
    loginModal.style.display = 'none';
}

closeLoginModalBtn.addEventListener('click', closeLoginModal);

function closeLoginModalValidation(event) {
    if(event.target === loginModal && event.target !== loginBtn) {
        loginModal.style.display = 'none';
    }
}

window.addEventListener('click', closeLoginModalValidation);

/* Hamburger Menu */

var hamburgerPanel = document.getElementById('hamburgerPanel');
var hamburgerCloseBtn = document.getElementById('hamburgerCloseBtn');
var hamburgerBtn = document.getElementById('hamburgerBtn');

function openHamburgerMenu() {
    hamburgerPanel.style.display = 'block';
}

hamburgerBtn.addEventListener('click', openHamburgerMenu);

function closeHamburgerMenu() {
    hamburgerPanel.style.display = 'none';
}

hamburgerCloseBtn.addEventListener('click', closeHamburgerMenu);

function closeHamburgerMenuWithoutBtn(event) {
    if(hamburgerPanel.style.display === 'block' && event.target !== hamburgerPanel) {
        hamburgerPanel.style.display = 'none';
    }
}

window.addEventListener('mouseup', closeHamburgerMenuWithoutBtn);

function validateHamburgerMenu() {
    if(hamburgerPanel.style.display === 'block') {
        window.scrollTo(0,0);
    }
}

window.addEventListener("scroll", validateHamburgerMenu);

/* Change color in every 0.9 seconds */

var specialDiscount = document.getElementById('specialDiscount'),
specialDiscountTwo = document.getElementById('specialDiscountTwo'),
specialDiscountThree = document.getElementById('specialDiscountThree'),
specialDiscountFour = document.getElementById('specialDiscountFour');

setInterval(changeColor,900);

function changeColor() {
    if(specialDiscount.style.color === 'white' && specialDiscountTwo.style.color === 'white' && specialDiscountThree.style.color === 'white' && specialDiscountFour.style.color === 'white') {
        specialDiscount.style.color = 'red';
        specialDiscountTwo.style.color = 'red';
        specialDiscountThree.style.color = 'red';
        specialDiscountFour.style.color = 'red';
    } else{
    specialDiscount.style.color = 'white';
    specialDiscountTwo.style.color = 'white';
    specialDiscountThree.style.color = 'white';
    specialDiscountFour.style.color = 'white';
    }
}

/* Dropdown Menu */

var dropdownMenu = document.getElementById('dropdownMenu');
var dropdownOffers = document.getElementById('dropdownOffers');

function displayDropdown() { 
        dropdownMenu.style.display = 'block';
}

dropdownOffers.addEventListener('click', displayDropdown);

function closeDropDown(event) {
    if(event.target !== dropdownMenu) {
        dropdownMenu.style.display = 'none';
    }
}

window.addEventListener('mouseup', closeDropDown);

function withBackgroundColor() {
    dropdownOffers.style.backgroundColor = 'rgb(129, 123, 123)';
    dropdownOffers.style.borderRadius = '5px';
}

dropdownOffers.addEventListener('mouseover', withBackgroundColor);

function withoutBackgroundColor() {
    dropdownOffers.style.backgroundColor = 'white';
}

dropdownOffers.addEventListener('mouseout', withoutBackgroundColor);

/* Cart Counter */

var changer=0;
var orangeCircle = document.getElementById('orange');
var removeItems = document.getElementById('removeItems');
var minus = document.getElementById('minus');

function changeText() {
    orangeCircle.innerHTML = ++changer;
    
    if(changer>100) {
        document.getElementById('orange').style.width = '33px';
        document.getElementById('orange').style.height = '21px';
        document.getElementById('orange').style.top = '5%';
        document.getElementById('orange').style.right = '15%';
    } else {
        document.getElementById('orange').style.width = '18px';
        document.getElementById('orange').style.height = '18px';
        document.getElementById('orange').style.top = '10%';
        document.getElementById('orange').style.right = '35%';
    }

    minus.onclick = function removeItems() {
        orangeCircle.innerHTML = --changer;
    }

    if(orangeCircle.innerText >= 1) {
        removeItems.style.display = 'block';
    }
}

function closeRemoveItemsBtn(event) {
    if(event.target === minus && changer === 1) {
        removeItems.style.display = 'none';
    }
}

minus.addEventListener('click', closeRemoveItemsBtn);


/* Toggle Search Bar */

var toggleSearchBar = document.getElementById('search');
var searchIcon = document.getElementById('firstIcon');
var verticalLine = document.getElementById('verticalLine');

function toggleSearch() {
    if(toggleSearchBar.style.display === 'inline-block') {
        toggleSearchBar.style.display = 'none'
        verticalLine.style.display = 'inline-block';
    } else {
        toggleSearchBar.style.display = 'inline-block';
        verticalLine.style.display = 'none';
    }
}

searchIcon.addEventListener('click', toggleSearch);

/* Additional Description About Merchandise */
var accordion = document.getElementById('accordion');
var productDescription = document.getElementById('productDescription');
var accordionTop = document.getElementById('accordionTop');
var accordionMiddle = document.getElementById('accordionMiddle');
var accordionBottom = document.getElementById('accordionBottom');
function toggleAccordion() {
productDescription.classList.toggle('additional-product-description');
}

accordion.addEventListener('click', toggleAccordion);

function validateAccordion() {
    if(productDescription.classList.contains('additional-product-description')) {
       productDescription.children[0].style.display = 'block';
       productDescription.children[1].style.display = 'block';
       accordionMiddle.style.display = 'none';
       accordionTop.style.display = 'block';
       accordionTop.style.position = 'absolute';
       accordionTop.style.transform = 'rotate(45deg)';
       accordionTop.style.top = "11px";
       accordionBottom.style.display = 'block';
       accordionBottom.style.position = 'absolute';
       accordionBottom.style.transform = 'rotate(-45deg)';
       accordionBottom.style.top = "11px";
    } else {
        productDescription.children[0].style.display = 'none';
        productDescription.children[1].style.display = 'none';
        accordionMiddle.style.display = "block";
        accordionTop.style.position = 'initial';
        accordionTop.style.transform = 'initial';
        accordionBottom.style.position = 'initial';
        accordionBottom.style.transform = 'initial';
    }
}

accordion.addEventListener('click', validateAccordion);

var accordion2 = document.getElementById('accordion2');
var productDescription2 = document.getElementById('productDescription2');
var accordionTop2 = document.getElementById('accordionTop2');
var accordionMiddle2 = document.getElementById('accordionMiddle2');
var accordionBottom2 = document.getElementById('accordionBottom2');
function toggleAccordion2() {
productDescription2.classList.toggle('additional-product-description');
}

accordion2.addEventListener('click', toggleAccordion2);

function validateAccordion2() {
    if(productDescription2.classList.contains('additional-product-description')) {
       productDescription2.children[0].style.display = 'block';
       productDescription2.children[1].style.display = 'block';
       accordionMiddle2.style.display = 'none';
       accordionTop2.style.display = 'block';
       accordionTop2.style.position = 'absolute';
       accordionTop2.style.transform = 'rotate(45deg)';
       accordionTop2.style.top = "11px";
       accordionBottom2.style.display = 'block';
       accordionBottom2.style.position = 'absolute';
       accordionBottom2.style.transform = 'rotate(-45deg)';
       accordionBottom2.style.top = "11px";
    } else {
        productDescription2.children[0].style.display = 'none';
        productDescription2.children[1].style.display = 'none';
        accordionMiddle2.style.display = "block";
        accordionTop2.style.position = 'initial';
        accordionTop2.style.transform = 'initial';
        accordionBottom2.style.position = 'initial';
        accordionBottom2.style.transform = 'initial';
    }
}

accordion2.addEventListener('click', validateAccordion2);

var accordion3 = document.getElementById('accordion3');
var productDescription3 = document.getElementById('productDescription3');
var accordionTop3 = document.getElementById('accordionTop3');
var accordionMiddle3 = document.getElementById('accordionMiddle3');
var accordionBottom3 = document.getElementById('accordionBottom3');
function toggleAccordion3() {
productDescription3.classList.toggle('additional-product-description');
}

accordion3.addEventListener('click', toggleAccordion3);

function validateAccordion3() {
    if(productDescription3.classList.contains('additional-product-description')) {
       productDescription3.children[0].style.display = 'block';
       productDescription3.children[1].style.display = 'block';
       accordionMiddle3.style.display = 'none';
       accordionTop3.style.display = 'block';
       accordionTop3.style.position = 'absolute';
       accordionTop3.style.transform = 'rotate(45deg)';
       accordionTop3.style.top = "11px";
       accordionBottom3.style.display = 'block';
       accordionBottom3.style.position = 'absolute';
       accordionBottom3.style.transform = 'rotate(-45deg)';
       accordionBottom3.style.top = "11px";
    } else {
        productDescription3.children[0].style.display = 'none';
        productDescription3.children[1].style.display = 'none';
        accordionMiddle3.style.display = "block";
        accordionTop3.style.position = 'initial';
        accordionTop3.style.transform = 'initial';
        accordionBottom3.style.position = 'initial';
        accordionBottom3.style.transform = 'initial';
    }
}

accordion3.addEventListener('click', validateAccordion3);





var accordion4 = document.getElementById('accordion4');
var productDescription4 = document.getElementById('productDescription4');
var accordionTop4 = document.getElementById('accordionTop4');
var accordionMiddle4 = document.getElementById('accordionMiddle4');
var accordionBottom4 = document.getElementById('accordionBottom4');
function toggleAccordion4() {
productDescription4.classList.toggle('additional-product-description');
}

accordion4.addEventListener('click', toggleAccordion4);

function validateAccordion4() {
    if(productDescription4.classList.contains('additional-product-description')) {
       productDescription4.children[0].style.display = 'block';
       productDescription4.children[1].style.display = 'block';
       accordionMiddle4.style.display = 'none';
       accordionTop4.style.display = 'block';
       accordionTop4.style.position = 'absolute';
       accordionTop4.style.transform = 'rotate(45deg)';
       accordionTop4.style.top = "11px";
       accordionBottom4.style.display = 'block';
       accordionBottom4.style.position = 'absolute';
       accordionBottom4.style.transform = 'rotate(-45deg)';
       accordionBottom4.style.top = "11px";
    } else {
        productDescription4.children[0].style.display = 'none';
        productDescription4.children[1].style.display = 'none';
        accordionMiddle4.style.display = "block";
        accordionTop4.style.position = 'initial';
        accordionTop4.style.transform = 'initial';
        accordionBottom4.style.position = 'initial';
        accordionBottom4.style.transform = 'initial';
    }
}

accordion4.addEventListener('click', validateAccordion4);



