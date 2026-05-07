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
});
