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

    mobileMenu.querySelectorAll(".mobile-accordion-toggle").forEach((toggle) => {
        toggle.addEventListener("click", () => {
            var submenu = toggle.nextElementSibling;
            var isOpen = toggle.classList.toggle("active");

            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

            if (submenu) {
                submenu.hidden = !isOpen;
            }
        });
    });

    document.querySelectorAll(".has-mega-dropdown").forEach((item) => {
        var header = item.closest("header");
        var dropdown = item.querySelector(".fph-mega-dropdown");
        var shouldRestoreTransparent = false;
        var closeTimer;

        function openMega() {
            if (window.matchMedia("(max-width: 991px)").matches || !header) return;

            clearTimeout(closeTimer);
            shouldRestoreTransparent = header.classList.contains("header--transparent");
            header.classList.remove("header--transparent");
            item.classList.add("is-mega-open");
        }

        function closeMega() {
            if (window.matchMedia("(max-width: 991px)").matches || !header) return;

            closeTimer = setTimeout(() => {
                item.classList.remove("is-mega-open");

                if (shouldRestoreTransparent) {
                    header.classList.add("header--transparent");
                }

                shouldRestoreTransparent = false;
            }, 180);
        }

        item.addEventListener("mouseenter", openMega);
        item.addEventListener("mouseleave", closeMega);

        if (dropdown) {
            dropdown.addEventListener("mouseenter", openMega);
            dropdown.addEventListener("mouseleave", closeMega);
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

    $('.best-bio-available').each(function () {
        var $section = $(this);
        var bioOwl = $section.find('.best-bio-slider');
        var bioItemCount = bioOwl.find('.item').length;
        var bioLoop = false;

        if (!bioItemCount) {
            $section.find('.prev-btn-bio, .next-btn-bio').addClass('disabled');
            return;
        }

        bioOwl.owlCarousel({
            loop: bioLoop,
            items: 1,
            margin: 0,
            dots: false,
            nav: false,
            autoHeight: true
        });

        function updateBioNav(event) {
            var itemCount = event.item.count;
            var itemIndex = event.item.index;
            var itemsPerView = event.page.size;
            var isFirst = itemIndex === 0;
            var isLast = itemIndex + itemsPerView >= itemCount;

            $section.find('.prev-btn-bio').toggleClass('disabled', isFirst);
            $section.find('.next-btn-bio').toggleClass('disabled', isLast);

            if (itemCount <= itemsPerView) {
                $section.find('.prev-btn-bio, .next-btn-bio').addClass('disabled');
            }
        }

        bioOwl.on('initialized.owl.carousel changed.owl.carousel translated.owl.carousel', updateBioNav);
        updateBioNav({
            item: {
                count: bioItemCount,
                index: 0
            },
            page: {
                size: 1
            }
        });

        $section.on('click', '.next-btn-bio', function () {
            if (!$(this).hasClass('disabled')) {
                bioOwl.trigger('next.owl.carousel');
            }
        });

        $section.on('click', '.prev-btn-bio', function () {
            if (!$(this).hasClass('disabled')) {
                bioOwl.trigger('prev.owl.carousel');
            }
        });
    });

    // ── Feature Ingredients (mobile only ≤991px) ─────────────────
    if ($(window).width() <= 991) {
        var $fiWrap = $('.feature-ingredients-wrap');
        if ($fiWrap.length) {
            var fiItemCount = $fiWrap.find('.item').length;
            var fiLoop = false;

            $fiWrap.owlCarousel({
                loop: fiLoop,
                dots: false,
                nav: false,
                margin: 16,
                responsive: {
                    0:   { items: 1 },
                    600: { items: 1.5 },
                    768: { items: 2 }
                }
            });

            var $fiNext = $('.next-btn-fi');
            var $fiPrev = $('.prev-btn-fi');

            function updateFiNav(event) {
                if (fiLoop) {
                    $fiPrev.removeClass('disabled');
                    $fiNext.removeClass('disabled');
                    return;
                }
                var itemCount    = event.item.count;
                var itemIndex    = event.item.index;
                var itemsPerView = event.page.size;
                $fiPrev.toggleClass('disabled', itemIndex === 0);
                $fiNext.toggleClass('disabled', itemIndex + itemsPerView >= itemCount);
            }

            $fiWrap.on('initialized.owl.carousel changed.owl.carousel', updateFiNav);

            $fiNext.click(function () {
                if (!$(this).hasClass('disabled')) $fiWrap.trigger('next.owl.carousel');
            });
            $fiPrev.click(function () {
                if (!$(this).hasClass('disabled')) $fiWrap.trigger('prev.owl.carousel');
            });
        }
    }
});
