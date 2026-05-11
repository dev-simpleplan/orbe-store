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
    var blogsOwl = $('.blogs-feature-card-wrap');

    blogsOwl.owlCarousel({
        loop: false,
        items: 3,
        dots: false,
        margin: 16,
        nav: false,
        responsive: {
            0: { items: 2, margin: 16 },
            600: { items: 2, margin: 16 },
            1000: { items: 3, margin: 35 }
        }
    });

    var $next = $('.next-btn');
    var $prev = $('.prev-btn');

    function updateNav(event) {
        var itemCount = event.item.count;
        var itemIndex = event.item.index;
        var itemsPerView = event.page.size;

        if (itemIndex === 0) {
            $prev.addClass('disabled');
        } else {
            $prev.removeClass('disabled');
        }

        if (itemIndex + itemsPerView >= itemCount) {
            $next.addClass('disabled');
        } else {
            $next.removeClass('disabled');
        }
    }

    blogsOwl.on('initialized.owl.carousel changed.owl.carousel', updateNav);

    $next.click(function () {
        if (!$(this).hasClass('disabled')) {
            blogsOwl.trigger('next.owl.carousel');
        }
    });

    $prev.click(function () {
        if (!$(this).hasClass('disabled')) {
            blogsOwl.trigger('prev.owl.carousel');
        }
    });

    var guidedByOwl = $('.guided-by-slider');

    guidedByOwl.owlCarousel({
        loop: false,
        items: 2,
        margin: 130,
        dots: false,
        nav: false,
        responsive: {
            0: {margin: 10 },
            600: { margin: 20 },
             991: {  margin: 130 }
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

    var peopleOwl = $('.people-of-orbe-slider');
    var peopleLoop = true;

    peopleOwl.owlCarousel({
        loop: peopleLoop,
        items: 5,
        margin: 10,
        dots: false,
        nav: false,
        responsive: {
            0: { items: 1, stagePadding: 68 },
            600: { items: 2, stagePadding: 86 },
            900: { items: 3, stagePadding: 96 },
            1200: { items: 5}
        }
    });

    var $peopleNextBtn = $('.next-btn-people');
    var $peoplePrevBtn = $('.prev-btn-people');

    function updatePeopleNav(event) {
        if (peopleLoop) {
            $peoplePrevBtn.removeClass('disabled');
            $peopleNextBtn.removeClass('disabled');
            return;
        }

        var itemCount = event.item.count;
        var itemIndex = event.item.index;
        var itemsPerView = event.page.size;

        if (itemIndex === 0) {
            $peoplePrevBtn.addClass('disabled');
        } else {
            $peoplePrevBtn.removeClass('disabled');
        }

        if (itemIndex + itemsPerView >= itemCount) {
            $peopleNextBtn.addClass('disabled');
        } else {
            $peopleNextBtn.removeClass('disabled');
        }
    }

    peopleOwl.on('initialized.owl.carousel changed.owl.carousel', updatePeopleNav);

    $peopleNextBtn.click(function () {
        if (!$(this).hasClass('disabled')) {
            peopleOwl.trigger('next.owl.carousel');
        }
    });

    $peoplePrevBtn.click(function () {
        if (!$(this).hasClass('disabled')) {
            peopleOwl.trigger('prev.owl.carousel');
        }
    });
});
