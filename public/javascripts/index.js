
/// Timeline by Doneela
const circleOne = document.getElementById("c1");
const circleTwo = document.getElementById("c2");
const circleThree = document.getElementById("c3");
const circleFour = document.getElementById("c4");
const heading = document.getElementById("main-heading");
const content = document.getElementById("main-content");
const contentSmall = document.getElementById("small-content");
const timelineLogo = document.getElementById("timeline-icon");

circleOne.addEventListener("click", () => {
  circleOne.classList.add("active-circle");
  circleTwo.classList.remove("active-circle");
  circleThree.classList.remove("active-circle");
  circleFour.classList.remove("active-circle");

  heading.innerHTML = "Orientation <&nbsp;>";
  contentSmall.innerHTML = "";
  content.innerHTML =
    "Ecell being the entrepreneurship cell is an active club channelizing the real-world start-up ideas and problem solving providing a platform, where you not only implement your ideas but also develop a tangible counterpart to your ideas.The aim of the club is to educate you all with the applicative problem solving, financial literacy, management and leadership in a scholastic environment of workshops and events inclusive of several interactive sessions.We believe in transferring the same passion and enthusiasm to you which has been carried by us through our legacy.";
  timelineLogo.innerHTML =
    '<img class="timelineIcon" src="/images/HomePage/Timeline/new_orientation.png">';
});
circleTwo.addEventListener("click", () => {
  circleOne.classList.remove("active-circle");
  circleTwo.classList.add("active-circle");
  circleThree.classList.remove("active-circle");
  circleFour.classList.remove("active-circle");

  heading.innerHTML = "Srijan <&nbsp;>";
  contentSmall.innerHTML = "NATIONAL INNOVATION & ENTREPRENEURSHIP SUMMIT";
  content.innerHTML =
    "SRIJAN is a unique initiative by The Entrepreneurship Cell, NIT Silchar, to motivate and educate people about entrepreneurship and to provide a meeting ground for Corporate experts and young entrepreneurs E Summit NIT Silchar.";
  timelineLogo.innerHTML =
    '<img class="timelineIcon" src="/images/HomePage/Timeline/Srijan-3.0.png">';
});
circleThree.addEventListener("click", () => {
  circleOne.classList.remove("active-circle");
  circleTwo.classList.remove("active-circle");
  circleThree.classList.add("active-circle");
  circleFour.classList.remove("active-circle");

  heading.innerHTML = "Empressario <&nbsp;>";
  contentSmall.innerHTML = "";
  content.innerHTML = "Upcoming...";
  timelineLogo.innerHTML =
    '<img class="timelineIcon" src="/images/HomePage/Timeline/Timeline-Empressario.png">';
});
circleFour.addEventListener("click", () => {
  circleOne.classList.remove("active-circle");
  circleTwo.classList.remove("active-circle");
  circleThree.classList.remove("active-circle");
  circleFour.classList.add("active-circle");

  heading.innerHTML = "Incubation <&nbsp;>";
  contentSmall.innerHTML = "";
  content.innerHTML = "Upcoming...";
  timelineLogo.innerHTML =
    '<img class="timelineIcon" src="/images/HomePage/Timeline/incubation_new.png">';
});
/// Timeline by Doneela


// NavBar-javascript by Aditya
const hamburger = document.querySelector(".hamburger");
const ic = document.querySelector(".icon");
const navMenu = document.querySelector("ul");
const opc = navMenu.getElementsByTagName("a");
console.log(opc[0]);
const links = navMenu.getElementsByClassName("links");
const image = document.querySelector(".image");
const logo_1 = document.querySelector(".logo-1");

const logo_2 = document.querySelector(".logo-2");
const logoham1 = hamburger.querySelector(".logo-1");

const logoham2 = hamburger.querySelector(".logo-2");
const navbar = document.querySelector(".navbar");
const body = document.body;
const y = screen.width;
const documents = document;
document.addEventListener("scroll", opaquenavbar);
body.addEventListener("click", clickfunction);
hamburger.addEventListener("click", mobileMenu);

function clickfunction() {
  console.log("you clicked me");
}

function opaquenavbar() {
  var x = document.documentElement.scrollTop;
  console.log(x + "px");
  const y = screen.width;
  const z = screen.height;
  console.log(y);
  if (y > 872) {
    if (x > 105) {
      navbar.classList.add("opaque");
      for (var i = 0; i < opc.length; i++) {
        opc[i].style.color = "black";
      }
    }
    if (x < 105) {
      navbar.classList.remove("opaque");
      for (var i = 0; i < opc.length; i++) {
        opc[i].style.color = "white";
      }
    }
  }

  if (x > 600) {
    logo_2.remove();

    image.append(logo_1);
    logo_1.style.display = "block";
  }
  if (x < 600) {
    logo_1.remove();

    // logo_1.remove();
    image.append(logo_2);
    logo_2.style.display = "block";
  }
  if (y < 872) {
    if (x > 600) {
      logoham1.remove();

      ic.append(logoham2);
      logoham2.style.display = "block";
    }
    if (x < 600) {
      logoham2.remove();

      ic.append(logoham1);
      logoham1.style.display = "block";
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

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  navbar.classList.toggle("blur");
}
console.log(navMenu);

//  active class on gallery page
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("underline");
    current[0].className = current[0].className.replace("underline", "");
    this.className += " underline";
    console.log(
      "this of underline:::>>",
      this.innerElement(),
      document.getElementsByTagName("A")
    );
  });
}
// NavBar-javascript by Aditya


// tab part by Sakshi
function openTab(category) {
  var i;
  var x = document.getElementsByClassName("image-gallery");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  document.getElementById(category).style.display = "block";
}

const sakshi_banner = document.querySelector(".Banner_navbar");
const tab = sakshi_banner.querySelectorAll("span");

for (var i = 0; i < tab.length; i++) {
  console.log("tab", tab.length);
  tab[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active-bar");
    current[0].className = current[0].className.replace("active-bar", "");
    this.className += " active";
  });
}
// tab part by Sakshi
