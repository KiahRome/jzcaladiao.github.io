// Variables Closet
// Global Variables
var i = 0, j = 0;
var newIndex, previous, prevPrev, next, nextNext, hidden;
var Scroller;

var Cards = document.getElementsByClassName("Article_Styles");
var Auto_Cards = document.getElementsByClassName("Button");
var Boxes = document.getElementsByClassName("Box_Styles");
var Tracker = document.getElementsByClassName("Select_Button");
var Nav_Option = document.getElementsByClassName("Nav_Option");
var Nav_Menu = document.getElementsByClassName("Nav_Menu_Keeper");
var Nav_Scroll = document.getElementsByClassName("Nav_Menu");

var Top_Bar = document.querySelector('.Top_Bar_Navigator');

var len = Cards.length;
var wid = Boxes.length;

// Initialize Navigational Menu IDs
previous = 18;
for(i=0; i<Nav_Menu.length; i++) {
    newIndex = previous + 10;

    Nav_Menu[i].id = "menu-" + i;
    Nav_Option[i+1].id = "menu-" + i;

    if(i == 4) {
        Nav_Menu[i].style.left = "60.5%";
    }
    else {
        Nav_Menu[i].style.left = previous + "%";
    }

    previous = newIndex;
}

// Navigational Menu
document.querySelectorAll('.Nav_Option').forEach (option => {
    // When top bar menu is hovered, get access to the target
    option.addEventListener('mouseover', function() {
        for(i=0; i<Nav_Menu.length; i++) {
            newIndex = parseInt(option.id.replace('menu-', ''));

            if(newIndex == i) {
                Nav_Menu[i].classList.add("Nav_Menu_Display");
                Nav_Scroll[i].scrollTop = 0;
            }
            else {
                Nav_Menu[i].classList.remove("Nav_Menu_Display");
            }
        }
    });
    // When the cursor leaves the container, Remove the overlay
    option.addEventListener('mouseleave', function() {
        for(i=0; i<Nav_Menu.length; i++) {
            Nav_Menu[i].classList.remove("Nav_Menu_Display");
        }
    });
});
document.querySelectorAll('.Nav_Menu_Keeper').forEach (menu => {
    // While the cursor is inside the container; Keep overlay active
    menu.addEventListener('mouseenter', function() {
        menu.classList.add("Nav_Menu_Display");
    });
    // When the cursor leaves the overlay container; Remove the overlay
    menu.addEventListener('mouseleave', function() {
        menu.classList.remove("Nav_Menu_Display");

        setTimeout(function() {
            menu.style.display = "none";
        }, 100);
        setTimeout(function() {
            menu.style.display = "block";
        }, 300);
    });
});

// Top Bar Navigational Menu Appearance
previous = 0;
document.addEventListener("scroll", function() {
    newIndex = document.body.scrollTop;

    if (newIndex > previous && newIndex > 200) {
        Top_Bar.style.top = "-20%";
    }
    else {
        Top_Bar.style.top = "0";
    }

    previous = newIndex;
});

// Automated Spinner
// Initialize
Scroller = setInterval(() => Spin('next'), 5000);

// Get if window is active or not
window.onfocus = function() {
    Scroller = setInterval(() => Spin('next'), 5000);
}
window.onblur = function() {
    clearInterval(Scroller);
};

// Image Carousel
function Spin(action) {
    // Ghost Clicker
    if(action == 'next') {
        Auto_Cards[1].style.opacity = "0.75";
    }
    resetInterval();
    handleCarousel(Cards, len, action);
}

// Year-based selection and Image Carousel Reuse
function Spin2(action) {
    handleCarousel(Boxes, wid, action, Tracker);
}

// Helper function for Carousel Movement
function handleCarousel(items, size, action, tracker = null) {
    for(i = 0; i < size; i++) {
        if (items[i].id === (items === Cards ? "active" : "active-box")) {
            if (action == 'prev') {
                newIndex = (i - 1 + size) % size;
            }
            else if (action == 'next') {
                newIndex = (i + 1) % size;

                // Ghost Clicker
                setTimeout(function() {
                    Auto_Cards[1].style.opacity = "0.25";
                    Auto_Cards[1].addEventListener("mouseover", function(){
                        Auto_Cards[1].style.opacity = "1";
                    });
                    Auto_Cards[1].addEventListener("mouseleave", function(){
                        Auto_Cards[1].style.opacity = "0.25";
                    });
                }, 200);
            }
            else if (action.startsWith("twenty-")) {
                newIndex = parseInt(action.replace("twenty-", ""));
            }

            previous = (newIndex - 1 + size) % size;
            next = (newIndex + 1) % size;
            nextNext = (next + 1) % size;

            items[newIndex].id = items === Cards ? "active" : "active-box";
            items[previous].id = items === Cards ? "card-zero" : "box-one";
            if (items !== Cards) {
                prevPrev = (previous - 1 + size) % size;
                items[prevPrev].id = "box-zero";
            }
            items[next].id = items === Cards ? "card-two" : "box-three";
            items[nextNext].id = items === Cards ? "card-three" : "box-four";

            // Hidden Boxes for Spin2
            if (items !== Cards) {
                for(j = 1; j < size - 4; j++) {
                    hidden = (nextNext + j) % size;
                    items[hidden].id = "hidden-box";
                }
                // Active Year Tracker
                tracker[i].id = "";
                tracker[newIndex].id = "selected";
            }
            
            break;
        }
    }
}

// Reset Scroller Interval
function resetInterval() {
    clearInterval(Scroller);
    Scroller = setInterval(() => Spin('next'), 5000);
}

// Miscellaneous
var thisWindow = document.getElementsByClassName("window");

// Back-to-Top Button Appearance
// document.addEventListener("scroll", function() {
//     document.getElementById("appear").style.opacity = document.body.scrollTop > 1500 ? "1" : "0";
// });

// Menu Scroll Overflow Reset
function backToTop() {
    document.body.scrollTop = 0;
}

function JumpTo(window) {
    for(i = 0; i < thisWindow.length; i++) {
        if(window == thisWindow[i].id) {
            thisWindow[i].scrollIntoView();
        }
    }
}