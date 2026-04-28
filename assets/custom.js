document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");

    hamburger.addEventListener("click", () => {
        mobileNav.classList.toggle("active");
    });
});

$(window).on('load', function () {
    var owl = $('.blogs-feature-card-wrap');

    owl.owlCarousel({
        loop: true,
        margin: 10,
        items: 3,
        dots: false,
        nav: false, // disable default nav
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3, loop: false }
        }
    });

    // Custom navigation
    $('.next-btn').click(function () {
        owl.trigger('next.owl.carousel');
    });

    $('.prev-btn').click(function () {
        owl.trigger('prev.owl.carousel');
    });
});