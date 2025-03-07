document.addEventListener("DOMContentLoaded", function () {
    const hamburgerIcon = document.getElementById("hamburger-icon");
    const menuMobile = document.getElementById("menu-mobile");

    function toggleMenu() {
        menuMobile.classList.toggle("active");
    }

    hamburgerIcon.addEventListener("click", toggleMenu);
});
