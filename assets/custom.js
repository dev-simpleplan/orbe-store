document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeMenu = document.querySelector(".close-menu");

    if (!hamburger || !mobileMenu || !closeMenu) return;

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.add("active");
        document.body.classList.add("mobile-menu-open");

        if (window.lenis) {
            window.lenis.stop();
        }
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        document.body.classList.remove("mobile-menu-open");

        if (window.lenis) {
            window.lenis.start();
        }
    });
});

$(window).on('load', function () {
    var owl = $('.blogs-feature-card-wrap');

    owl.owlCarousel({
        loop: false,
        items: 3,
        dots: false,
        nav: false,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });

    var $next = $('.next-btn');
    var $prev = $('.prev-btn');

    function updateNav(event) {
        var itemCount = event.item.count;   // total items
        var itemIndex = event.item.index;   // current position
        var itemsPerView = event.page.size; // visible items

        // Disable prev at start
        if (itemIndex === 0) {
            $prev.addClass('disabled');
        } else {
            $prev.removeClass('disabled');
        }

        // Disable next at end
        if (itemIndex + itemsPerView >= itemCount) {
            $next.addClass('disabled');
        } else {
            $next.removeClass('disabled');
        }
    }

    // Run on init + change
    owl.on('initialized.owl.carousel changed.owl.carousel', updateNav);

    // Custom navigation
    $next.click(function () {
        if (!$(this).hasClass('disabled')) {
            owl.trigger('next.owl.carousel');
        }
    });

    $prev.click(function () {
        if (!$(this).hasClass('disabled')) {
            owl.trigger('prev.owl.carousel');
        }
    });

    // Guided By Slider Carousel
    var guidedByOwl = $('.guided-by-slider');

    guidedByOwl.owlCarousel({
        loop: false,
        items: 3,
        dots: false,
        nav: false,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 2 }
        }
    });

    var $guidedNextBtn = $('.next-btn-guided');
    var $guidedPrevBtn = $('.prev-btn-guided');

    function updateGuidedNav(event) {
        var itemCount = event.item.count;
        var itemIndex = event.item.index;
        var itemsPerView = event.page.size;

        if (itemIndex === 0) {
            $guidedPrevBtn.addClass('disabled');
        } else {
            $guidedPrevBtn.removeClass('disabled');
        }

        if (itemIndex + itemsPerView >= itemCount) {
            $guidedNextBtn.addClass('disabled');
        } else {
            $guidedNextBtn.removeClass('disabled');
        }
    }

    guidedByOwl.on('initialized.owl.carousel changed.owl.carousel', updateGuidedNav);

    $guidedNextBtn.click(function () {
        if (!$(this).hasClass('disabled')) {
            guidedByOwl.trigger('next.owl.carousel');
        }
    });

    $guidedPrevBtn.click(function () {
        if (!$(this).hasClass('disabled')) {
            guidedByOwl.trigger('prev.owl.carousel');
        }
    });
});

