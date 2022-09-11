function openTab(category) {
    var i;
    var x = document.getElementsByClassName("ecellteam");
    for (i = 0; i < x.length; i++) {
        console.log(x[i].style.display);
        x[i].style.display = "none";
        console.log(x[i].style.display);
    }
    if (category == 'faculty') {
        document.getElementById(category).style.display = "grid";
    } else {
        document.getElementById(category).style.display = "block";
    }
}
console.log(document.getElementById("faculty").style.display);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("ul");
const links = navMenu.getElementsByClassName("links");
const image = document.querySelector(".image");
const navbar = document.querySelector(".navbar");
const body = document.body;
const y = screen.width;
const documents = document;

body.addEventListener("click", clickfunction);
hamburger.addEventListener("click", mobileMenu);

function clickfunction() {
    console.log("you clicked me");
}

function opaquenavbar() {
    var x = document.documentElement.scrollTop;
    console.log(x + "px");
    const y = screen.width;
    console.log(y);
    if (y > 872) {

        if (x > 105) {


            navbar.classList.add("opaque");
        }
        if (x < 105) {

            navbar.classList.remove("opaque");

        }
    }
    console.log("scrolled");
}

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navbar.classList.toggle("blur");
    image.remove();
}
const navLink = document.querySelectorAll("li");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    navbar.classList.toggle("blur");
}
console.log(navMenu)

// Tabbination of navbar

const sakshi_banner = document.querySelector(".Banner_navbar");
const tab = sakshi_banner.querySelectorAll("span");

for (var i = 0; i < tab.length; i++) {
    // 
    console.log("tab", tab.length);
    tab[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active_bar");
        current[0].className = current[0].className.replace("active_bar", "");
        this.className += " active_bar";

    });
}