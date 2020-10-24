/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

// const startingTime = performance.now();
const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");


/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// calculate if element is in viewport
let elementInView = (element) => {
    const window_width = window.innerWidth;
    const window_height = window.innerHeight;
    const position = element.getBoundingClientRect();
    /* The window_width > 870 statement is added because the active state won't work
    when screen size gets smaller the whole section will not be
    in the viewport only part of it*/

    if (window_width > 870) {
        if ((position.top >= 0 && position.left >= 0) && (position.right <= window_width) && (position.bottom <= window_height)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (position.top >= 0 && position.left >= 0) {
            return true;
        }
        else {
            return false;
        }
    }

}

// Scroll to top button
let topScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
let createListItem = () => {

    for (section of sections) {
        // Create list item
        const navItem = document.createElement("li");
        const navLink = document.createElement("a");
        // Get data from section
        const data = section.getAttribute("data-nav");
        const sectionId = section.getAttribute("id");
        // Set innerHtml value and add classes to link
        navLink.innerHTML = data;
        navLink.classList.add("menu__link");
        navLink.setAttribute("href", `#${sectionId}`);
        // Append items to the parent
        navItem.appendChild(navLink);
        navList.appendChild(navItem);
    }
}

// Add class 'active' to section and nav when element in view
let position = () => {
    for (section of sections) {
        if (elementInView(section)) {
            section.classList.add('active');
            const link_list = document.querySelectorAll(".menu__link");
            for (link of link_list) {
                // add active class to link where section is in view
                if (link.innerHTML == section.getAttribute("data-nav")) {
                    link.classList.add('activeNav');
                }
                // remove active class for Nav-item not in view
                else {
                    link.classList.remove('activeNav');
                }
            }
        }
        // remove active class for sections not in view
        else {
            section.classList.remove('active');
        }
    }
}

// Scroll to anchor ID using scrollTO event
let scrollTO = (e) => {
    e.preventDefault();
    if (e.target.nodeName === "A") {
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
document.addEventListener('DOMContentLoaded', createListItem);

//Smooth scroll to the selected section
document.getElementById("navbar__list").addEventListener('click', scrollTO);

// Set sections as active
document.addEventListener("scroll", position);

// const endingTime = performance.now();
// console.log('This code took ' + (endingTime - startingTime) + ' milliseconds.');