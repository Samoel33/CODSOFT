const nav = document.querySelector('.navigation-bar');
const landingPageServices = document.querySelector('.main-container-1');


const activeLink = window.location.pathname;
const navList = document.querySelectorAll('ul li a');
navList.forEach(link => {
    if (link.href.includes(`${activeLink}`)) link.classList.add('active')
});
if (landingPageServices) {
    const navHeight = nav.getBoundingClientRect().height;
    const stickyNav = function(entries) {
        const [entry] = entries;
        console.log(entries);
        if (!entry.isIntersecting) nav.classList.add('sticky');
        else nav.classList.remove('sticky');
    }
    const headerObserver = new IntersectionObserver(
        stickyNav, {
            root: null,
            threshold: 0.2,
            //rootMargin: `-${navHeight}px`
        }
    )
    headerObserver.observe(landingPageServices);
}

//IMAGE VISIBLE ON SCROLL USING INTERSECTION oBSERVER
const main_container = document.querySelectorAll('.main-container-1');
const images = document.querySelectorAll('.cover-image-1');
if (main_container) {
    const imageVisibility = function(entries, observer) {
        const [entry] = entries;
        console.log(entry);
        if (!entry.isIntersecting) return;
        else {
            entry.target.classList.remove("hide-section");
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    }
    const imageVisible = new IntersectionObserver(
        imageVisibility, {
            root: null,
            threshold: 0.5,
        }
    );
    images.forEach(image => {
        imageVisible.observe(image);
        image.classList.add("hide-section");
    })
}

//BURGER ANIMATION
const navigationBarList = document.querySelector('.navigation-bar-lists');
const burger = document.querySelector('.burger');
const lines = document.querySelector('.line');

burger.addEventListener('click', (e) => {
    e.preventDefault(e);
    burger.classList.toggle('active-burger');
    navigationBarList.classList.toggle('active-Nav');
    lines.classList.add('rotateLine');
});

// CARD SLIDES
if (document.querySelector('#card')) {

    const slider = function() {
        const slides = document.querySelectorAll('#profiles .content');
        const btnLeft = document.querySelector('.nextPage-left');
        const btnRight = document.querySelector('.nextPage-right');
        let curSlide = 0;
        const maxSlide = slides.length;

        const goToSlide = function(slide) {
            slides.forEach(
                (s, i) => (s.style.transform = `translateX(${200 * (i - slide)}%)`)
            );
        };
        const nextSlide = function() {
            if (curSlide === maxSlide - 1) {
                curSlide = 0;
            } else {
                curSlide++;
            }
            goToSlide(curSlide);

        };
        const prevSlide = function() {
            if (curSlide === 0) {
                curSlide = maxSlide - 1;
            } else {
                curSlide--;
            }
            goToSlide(curSlide);
        };
        const init = function() {
            goToSlide(0);
        };
        init();
        btnRight.addEventListener('click', nextSlide);
        btnLeft.addEventListener('click', prevSlide);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') prevSlide();
            e.key === 'ArrowRight' && nextSlide();
        });

    }
    slider();
}

//GALLERY slider
const slideContainer = document.querySelector('.autoSlider');
const textSlide = document.querySelector('.we-do .title');
const imageSlides = document.querySelector('.autoSlider img');
const clickImage = document.querySelectorAll('.galleryContainer img');
const overRealy = document.querySelectorAll('.galleryContainer .overRelay-hidden');
const arraySlide = ['SLIDE1.jpg', 'SLIDE2.jpg', 'SLIDE3.jpg', 'SLIDE4.jpg', 'SLIDE5.jpg'];
const arrayText = ['TESTING OF SWITCHGEAR', 'CT TESTING', 'VT TESTING', 'BREAKER TESTING', 'P. TRANSFORMER TESTING'];
var i = 0;
var j = 0;

if (slideContainer) {
    function textIn() {
        textSlide.textContent = arrayText[i];
        if (i < arrayText.length - 1) i++;
        else i = 0;
        setTimeout("textIn()", 3500);
    }
    textIn();

    function imageIn() {
        imageSlides.src = `../public/images/site/SLIDE/${arraySlide[i]}`;
        if (j < arraySlide.length - 1) j++;
        else j = 0;

        setTimeout('imageIn()', 3500);
    }
    imageIn();
    //IMAGE CLICKABLE GALLERY

    clickImage.forEach(imageCliked => {
        imageCliked.addEventListener('click', () => {
            imageCliked.classList.toggle('zoomImage');

            function relayFun() {
                overRealy.forEach(relay => {
                    relay.classList.toggle("show");
                })
            }
            if (imageCliked) {

                relayFun();
            }
        });
    })

}