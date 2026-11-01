jQuery(e=>{
    setup_carousel_countdown();

    /*setup_off_timers();*/
    jQuery("#shop-carousel .swiper-slide").click(e=>{
        let cur = jQuery(e.currentTarget);
        jQuery("#shop-carousel .swiper-slide").removeClass("swiper-slide--active");
        cur.addClass("swiper-slide--active");
        let id = cur.data("slide-id");
        jQuery(`#shop-carousel .carousel-item`).removeClass("carousel-item--active");
        jQuery(`#shop-carousel .carousel-item[data-slide-id=${id}]`).addClass("carousel-item--active");
        if(jQuery("#shop-carousel .carousel-item.carousel-item--active").hasClass("no-sale")){
            jQuery("#add-to-cart").addClass("disabled");
        }else{
            jQuery("#add-to-cart").removeClass("disabled");
        }
        setup_carousel_countdown();

    });
    setup_slider();

    jQuery("#add-to-cart").click(e=>{
        if($(e.currentTarget).hasClass("disabled")) return;
    });
});

Number.prototype.t = function (params) {
    return String(this.valueOf()).padStart(2, '0');
}

function gotoNextslide() {
    let curr_slide_id = jQuery("#shop-carousel .swiper-slide--active").data("slide-id");
    let total_slides = jQuery("#shop-carousel .swiper-slide").length;
    curr_slide_id++;
    if (curr_slide_id >= total_slides) curr_slide_id = 0; // اصلاح شده
    
    if( jQuery('body').find('.wd-opened') )
    {
        return;
    }

	if( jQuery('body').find('.wd-dropdown-results').hasClass('wd-opened') || jQuery('body').find('.wd-search-full-screen').hasClass('wd-opened') )
	{
		return;
    }

    if( jQuery('body').find('.wd-close-side').hasClass('wd-close-side-opened') ) return;

	jQuery(`#shop-carousel .swiper-slide[data-slide-id=${curr_slide_id}]`).click();
    jQuery(".current_slide_index").text(curr_slide_id);
}

function gotoPrevslide() {
    let curr_slide_id = jQuery("#shop-carousel .swiper-slide--active").data("slide-id");
    let total_slides = jQuery("#shop-carousel .swiper-slide").length;
    curr_slide_id--;
    if (curr_slide_id < 0) curr_slide_id = total_slides - 1; //اصلاح شده

    if( jQuery('body').find('.wd-opened') )
    {
        return;
    }

    if( jQuery('body').find('.wd-dropdown-results').hasClass('wd-opened') || jQuery('body').find('.wd-search-full-screen').hasClass('wd-opened') )
	{
		return;
    }
    if( jQuery('body').find('.wd-close-side').hasClass('wd-close-side-opened') ) return;
	jQuery(`#shop-carousel .swiper-slide[data-slide-id=${curr_slide_id}]`).click();
    jQuery(".current_slide_index").text(curr_slide_id);
}

let timerInterval = undefined;
function setup_carousel_countdown() {
    if (timerInterval) clearInterval(timerInterval);
    var countdownNumberEl = document.getElementById('countdown-number');
    var countdown = 5;
    jQuery(".total_slides").text(jQuery(".carousel-item").length)
    jQuery(".carousel-timer-circle").removeClass("active");
    setTimeout(() => {
        jQuery(".carousel-timer-circle").addClass("active");
    }, 100);

    timerInterval = setInterval(function() {
        countdown--;
        if (countdown <=0){
            gotoNextslide();
            countdown = 5;
        }

    }, 1000);
}

function setup_slider() {
    jQuery(".carousel-next").click(e=>{
        gotoNextslide();
    });
    jQuery(".carousel-prev").click(e=>{
        gotoPrevslide();
    });
}
