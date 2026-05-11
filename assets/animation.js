(function () {
  function initBlurTextAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setTimeout(initBlurTextAnimation, 100);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var wrappers = gsap.utils.toArray('.text-animation').filter(function (wrapper) {
      return !wrapper.closest('[data-no-blur-animation]');
    });

    if (!wrappers.length) return;

    wrappers.forEach(function (wrapper) {
      var headings = gsap.utils.toArray(wrapper.querySelectorAll('h1, h2, h3, h4, h5, h6')).filter(function (element) {
        return element.textContent.trim().length;
      });

      var bodyText = gsap.utils.toArray(wrapper.querySelectorAll('p, li, a')).filter(function (element) {
        return element.textContent.trim().length;
      });

      gsap.set(headings, {
        autoAlpha: 0,
        y: 34,
        clipPath: 'inset(0% 0% 100% 0%)',
        willChange: 'transform, opacity, clip-path',
      });

      gsap.set(bodyText, {
        autoAlpha: 0,
        y: 18,
        filter: 'blur(14px)',
        willChange: 'transform, opacity, filter',
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top 86%',
        once: true,
        onEnter: function () {
          gsap.to(headings, {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: 'auto',
            clearProps: 'willChange,clipPath',
          });

          gsap.to(bodyText, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power3.out',
            stagger: 0.05,
            delay: headings.length ? 0.16 : 0,
            overwrite: 'auto',
            clearProps: 'willChange',
          });
        },
      });
    });

    window.addEventListener('load', function () {
      ScrollTrigger.refresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlurTextAnimation);
  } else {
    initBlurTextAnimation();
  }
})();
