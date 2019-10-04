app = {};

app.seeInfo = function () {
    $(`.resume`).on(`click`, function() {
        let bio = $(this).attr(`id`);

        if ($(`.${bio}`).hasClass(`seeInfo`)) {
            $(`.bio`).removeClass(`seeInfo`);
            $(`.resume`).removeClass(`clickedBio`);
        } else {
            $(`.bio`).removeClass(`seeInfo`);
            $(`.${bio}`).addClass(`seeInfo`);
            $(`.resume`).addClass(`clickedBio`);
            $(this).removeClass(`clickedBio`);
        }        
    })
}

app.smoothScroll = function () {
    $(`.navBar a`).on(`click`, function(event) {
        event.preventDefault();
        let scrollTo = this.hash
        $(`html`).animate({
            scrollTop: $(scrollTo).offset().top + -104
        }, 800);
    })    
}


app.services = function () {
    $(`.dial`).on(`click`, function() {
        let clickedDial = $(this).attr(`id`);
        $(`.serviceInfo`).css(`display`, `none`);
        $(`.${clickedDial}`).fadeToggle(function(){
            duration: 3000;
        });                
    })
}

app.animateValue = function (id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(function () {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);

}

app.scrollPercent = function () {
    let services = $(`#services`).offset().top + $(`#services`).outerHeight();
    $(window).scroll(function () {
        let scrollHeight = ($(window).scrollTop() + $(window).height())
        if (scrollHeight >= services) {
            app.animateValue('accValue', 0, 90, 2000);
            app.animateValue('ipoValue', 0, 85, 2000);
            app.animateValue('cfoValue', 0, 75, 2000);
            $(window).off(`scroll`);
        }
    })
}

app.testimonials = function () {

    $('.cd-testimonials-wrapper').flexslider({
        //declare the slider items
        selector: ".cd-testimonials > li",
        animation: "slide",
        //do not add navigation for paging control of each slide
        controlNav: false,
        slideshow: false,
        //Allow height of the slider to animate smoothly in horizontal mode
        smoothHeight: true,
        start: function () {
            $('.cd-testimonials').children('li').css({
                'opacity': 1,
                'position': 'relative'
            });
        }
    });        
}

app.backup = function () {
    $(`.backup`).on(`click`, function() {
        event.preventDefault();
        $(`html`).animate({
            scrollTop: 0
        }, 800);
    })
}


// INIT FUNCTION
app.init = function () {
    AOS.init();
    app.seeInfo();
    app.smoothScroll();
    app.services();
    app.testimonials();
    app.scrollPercent();
    app.backup();
};

// DOCUMENT READY
$(function () {
    app.init()
});