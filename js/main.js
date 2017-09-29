/*
    Name: Abstra
    Description: Modern responsive coming soon page
    Version: 1.0
    Author: ThemeImperia

    TABLE OF CONTENTS:
    1. Loading
        1.1 Preloader
        1.2 Simple Preloader
        1.3 Youtube Preloader
    2. Background photos and slideshow
    3. Youtube background
    4. Countdown
    5. Photoswipe
    6. Contact Form
    7. Ajax mailchimp
*/


/* ================================= */
/* :::::::::: 1. Loading ::::::::::: */
/* ================================= */

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    },
};

if (isMobile.any()) {
    $(".player-controls").hide();
}


/* ==================================== */
/* :::::::::: 1.1 Preloader ::::::::::: */
/* ==================================== */

var loader;

function loading() {
    loader = setTimeout(showPage, 3000);
}

/* =========================================== */
/* :::::::::: 1.2 Simple preloader ::::::::::: */
/* =========================================== */

/* ↓ If you want to use YOUTUBE BACKGROUND, please, COMMENT to this section ↓  */

function showPage() {
    $("#page").slideUp(300, function(){
        AOS.init({
        duration: 800,
        disable: window.innerHeight < 580
    });
    });
}

/* ↑ If you want to use YOUTUBE BACKGROUND, please, COMMENT to this section ↑  */

/* =========================================== */
/* :::::::::: 1.3 Youtube Preloader :::::::::: */
/* =========================================== */

/* ↓ For YOUTUBE BACKGROUND, please, UNCOMMENT this section ↓  */


//function showPage() {
//    $('#BackgroundVideo').on("YTPReady",function(){
//   $("#page").slideUp(300, function(){
//        AOS.init({
//        duration: 800,
//        disable: window.innerHeight < 580
//    });
//    });
//});
//}


/* ↑ For YOUTUBE BACKGROUND, please,  UNCOMMENT this section ↑  */


$(function () {

    /* ===================================================== */
    /* :::::::: 2. Background photos and slideshow ::::::::: */
    /* ===================================================== */

    /* ↓ Remove comments if you want to use the SLIDESHOW. Don't forget to add comment on "$(".first-bg").backstretch("img/1.jpg")" below. You can choose your own duration and fade by changing "duration" and "fade" (in ms)  ↓  */

    //    $(".slideshow").backstretch([
    //                        "img/3-s.jpg",
    //                        "img/2-s.jpg",
    //                        "img/1-s.jpg"
    //                    ], {
    //        duration: 2000,
    //        fade: 2000
    //    });

    /* ↓ Add comment on "$(".first-bg").backstretch("img/1.jpg")" if you want to use the SLIDESHOW. ↓  */
    $(".first-bg").backstretch("img/1.jpg");

    $(".second-bg").backstretch("img/1.jpg"); // about
    $(".third-bg").backstretch("img/1.jpg"); // services
    $(".fourth-bg").backstretch("img/1.jpg"); // portfolio
    $(".fifth-bg").backstretch("img/1.jpg"); // contact
    


    /* ================================== */
    /* :::::: 3. Youtube background ::::: */
    /* ================================== */

    $(function playerYoutube() {
        $(".player").mb_YTPlayer();
    });
    $('#play').on("click", function clickplay() {
        $('.player').playYTP(),
        $("#play").addClass("display-none"),
        $("#pause").removeClass("display-none")
    });
    $('#pause').on("click", function clickpause() {
        $('.player').pauseYTP();
        $("#pause").addClass("display-none"),
        $("#play").removeClass("display-none")
    });
    $("#mute").on("click", function clickmute() {
        $('.player').YTPMute(),
        $("#mute").addClass("display-none"),
        $("#unmute").removeClass("display-none")
    }),
    $("#unmute").on("click", function clickunmute() {
        $('.player').YTPUnmute(),
        $("#unmute").addClass("display-none"),
        $("#mute").removeClass("display-none")
    });
    
    
    /* ================================= */
    /* :::::::::: 4. Countdown ::::::::: */
    /* ================================= */

    // To change date, simply edit: var endDate = "Dec 30, 2015 20:39:00";

    $(function countdown() {
        var endDate = "September 7, 2017 19:00:00";
        $('.countdown').countdown({
            date: endDate,
            render: function (data) {
                $(this.el).html("<div class='col-xs-6 col-sm-3 col-md-3'>" + this.leadingZeros(data.days, 3) + " <span>days</span></div><div class='col-xs-6 col-sm-3 col-md-3'>" + this.leadingZeros(data.hours, 2) + " <span>hours</span></div><div class='col-xs-6 col-sm-3 col-md-3'>" + this.leadingZeros(data.min, 2) + " <span>minutes</span></div><div class='col-xs-6 col-sm-3 col-md-3'>" + this.leadingZeros(data.sec, 2) + " <span>seconds</span></div>");
            },
        });
    });


    /* ================================== */
    /* :::::::::: 5. Photoswipe ::::::::: */
    /* ================================== */

    (function () {

        var initPhotoSwipeFromDOM = function (gallerySelector) {

            var parseThumbnailElements = function (el) {
                var thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items = [],
                    el,
                    childElements,
                    thumbnailEl,
                    size,
                    item;

                for (var i = 0; i < numNodes; i++) {
                    el = thumbElements[i];

                    // include only element nodes 
                    if (el.nodeType !== 1) {
                        continue;
                    }

                    childElements = el.children;

                    size = el.getAttribute('data-size').split('x');

                    // create slide object
                    item = {
                        src: el.getAttribute('href'),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10),
                        author: el.getAttribute('data-author'),
                        title: el.getAttribute('data-title')
                    };

                    item.el = el; // save link to element for getThumbBoundsFn

                    if (childElements.length > 0) {
                        item.msrc = childElements[0].getAttribute('src'); // thumbnail url
                        if (childElements.length > 1) {
                            item.title = childElements[1].innerHTML; // caption (contents of figure)
                        }
                    }

                    var mediumSrc = el.getAttribute('data-med');
                    if (mediumSrc) {
                        size = el.getAttribute('data-med-size').split('x');
                        // "medium-sized" image
                        item.m = {
                            src: mediumSrc,
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10)
                        };
                    }
                    // original image
                    item.o = {
                        src: item.src,
                        w: item.w,
                        h: item.h
                    };
                    items.push(item);
                }
                return items;
            };
            // find nearest parent element
            var closest = function closest(el, fn) {
                return el && (fn(el) ? el : closest(el.parentNode, fn));
            };
            var onThumbnailsClick = function (e) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
                var eTarget = e.target || e.srcElement;
                var clickedListItem = closest(eTarget, function (el) {
                    return el.tagName === 'A';
                });
                if (!clickedListItem) {
                    return;
                }
                var clickedGallery = clickedListItem.parentNode;
                var childNodes = clickedListItem.parentNode.childNodes,
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;
                for (var i = 0; i < numChildNodes; i++) {
                    if (childNodes[i].nodeType !== 1) {
                        continue;
                    }
                    if (childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }
                if (index >= 0) {
                    openPhotoSwipe(index, clickedGallery);
                }
                return false;
            };
            var photoswipeParseHash = function () {
                var hash = window.location.hash.substring(1),
                    params = {};
                if (hash.length < 5) { // pid=1
                    return params;
                }
                var vars = hash.split('&');
                for (var i = 0; i < vars.length; i++) {
                    if (!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split('=');
                    if (pair.length < 2) {
                        continue;
                    }
                    params[pair[0]] = pair[1];
                }

                if (params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }
                return params;
            };

            var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
                var pswpElement = document.querySelectorAll('.pswp')[0],
                    gallery,
                    options,
                    items;
                items = parseThumbnailElements(galleryElement);
                // define options (if needed)
                options = {

                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                    getThumbBoundsFn: function (index) {
                        // See Options->getThumbBoundsFn section of docs for more info
                        var thumbnail = items[index].el.children[0],
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();

                        return {
                            x: rect.left,
                            y: rect.top + pageYScroll,
                            w: rect.width
                        };
                    },

                    addCaptionHTMLFn: function (item, captionEl, isFake) {
                        if (!item.title) {
                            captionEl.children[0].innerText = '';
                            return false;
                        }
                        captionEl.children[0].innerHTML = item.title + '<br/><small>Photo: ' + item.author + '</small>';
                        return true;
                    }
                };

                if (fromURL) {
                    if (options.galleryPIDs) {
                        // parse real index when custom PIDs are used 
                        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                        for (var j = 0; j < items.length; j++) {
                            if (items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }

                // exit if index not found
                if (isNaN(options.index)) {
                    return;
                }

                var radios = document.getElementsByName('gallery-style');
                for (var i = 0, length = radios.length; i < length; i++) {
                    if (radios[i].checked) {
                        if (radios[i].id == 'radio-all-controls') {

                        } else if (radios[i].id == 'radio-minimal-black') {
                            options.mainClass = 'pswp--minimal--dark';
                            options.barsSize = {
                                top: 0,
                                bottom: 0
                            };
                            options.captionEl = false;
                            options.fullscreenEl = false;
                            options.shareEl = false;
                            options.bgOpacity = 0.85;
                            options.tapToClose = true;
                            options.tapToToggleControls = false;
                        }
                        break;
                    }
                }

                if (disableAnimation) {
                    options.showAnimationDuration = 0;
                }

                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);

                // see: http://photoswipe.com/documentation/responsive-images.html
                var realViewportWidth,
                    useLargeImages = false,
                    firstResize = true,
                    imageSrcWillChange;

                gallery.listen('beforeResize', function () {

                    var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
                    dpiRatio = Math.min(dpiRatio, 2.5);
                    realViewportWidth = gallery.viewportSize.x * dpiRatio;

                    if (realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200) {
                        if (!useLargeImages) {
                            useLargeImages = true;
                            imageSrcWillChange = true;
                        }

                    } else {
                        if (useLargeImages) {
                            useLargeImages = false;
                            imageSrcWillChange = true;
                        }
                    }

                    if (imageSrcWillChange && !firstResize) {
                        gallery.invalidateCurrItems();
                    }

                    if (firstResize) {
                        firstResize = false;
                    }

                    imageSrcWillChange = false;

                });

                gallery.listen('gettingData', function (index, item) {
                    if (useLargeImages) {
                        item.src = item.o.src;
                        item.w = item.o.w;
                        item.h = item.o.h;
                    } else {
                        item.src = item.m.src;
                        item.w = item.m.w;
                        item.h = item.m.h;
                    }
                });
                gallery.init();
            };

            // select all gallery elements
            var galleryElements = document.querySelectorAll(gallerySelector);
            for (var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i + 1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            // Parse URL and open gallery if it contains #&pid=3&gid=1
            var hashData = photoswipeParseHash();
            if (hashData.pid && hashData.gid) {
                openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
            }
        };

        initPhotoSwipeFromDOM('.gallery');

    })();

    /* ==================================== */
    /* :::::::::: 6. Contact Form ::::::::: */
    /* ==================================== */

    $(function contactform() {
        $('#valid-form').on("click", function clickbutton() {
            // validate and process form here 
            $("#ajax-contact-form").validate({
                rules: {
                    name: {
                        required: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    msg: {
                        required: true,
                    },
                },

                messages: {
                    name: {
                        required: "<i class='ion-ios-close-outline name'></i>",
                    },
                    email: {
                        required: "<i class='ion-ios-close-outline email'></i>",
                        email: "<i class='ion-ios-close-outline email'></i>",
                    },
                    msg: {
                        required: "<i class='ion-ios-close-outline message'></i>",
                    },

                },

// JQuery's awesome submit handler.         
            submitHandler: function (form) {
                
                // Create variables from the form
                var name = $('input#name').val();
                var email = $('input#email').val();
                var msg = $('textarea#msg').val();

                // Create variables that will be sent in a URL string to contact.php
                var dataString = '&name=' + name + '&email=' + email + '&msg=' + msg;

                    $.ajax({
                        type: "POST",
                        url: "php/contact.php",
                        data: dataString,
                        success: function (data) {
                            if (data === 'OK') {
                                $("#ajax-contact-form").find('input[type=text], input[type=email], textarea').val("");
                            };
                            if (data == 'OK') {
                                result = '<div class="notification_ok"><i class="ion-ios-checkmark-outline"></i> Your email was sent. Thanks!</div>';

                            } else {
                                result = data;
                            };
                            $('#note').html(result);
                        },
                    });
                    return false;
                },
            });
        });
    });

    /* ================================= */
    /* :::::::: 7. Ajax mailchimp :::::: */
    /* ================================= */

    //     Example MailChimp url: http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
    $('#subscribe').ajaxChimp({
        language: 'eng',
        url: 'http://cultureandcuisinehtx.us14.list-manage.com/subscribe/post?u=1f901726aadb80d097be961c6&id=f8f5b8e2e3'
    });

    // Mailchimp translation
    //
    // Defaults:
    //'submit': 'Submitting...',
    //  0: 'We have sent you a confirmation email',
    //  1: 'Please enter a value',
    //  2: 'An email address must contain a single @',
    //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //  5: 'This email address looks fake or invalid. Please enter a real email address'

    $.ajaxChimp.translations.eng = {
        'submit': '<i class="ion-ios-paperplane-outline submitting"></i> Sending...',
        0: '<i class="ion-ios-star-outline"></i> Great! You will receive notification from us soon :)',
        1: '<i class="ion-ios-close-outline"></i> You must enter a valid e-mail address.',
        2: '<i class="fa fa-warning"></i> Sorry, but your E-mail address is not valid.',
        3: '<i class="fa fa-warning"></i> Sorry, but your E-mail address is not valid.',
        4: '<i class="fa fa-warning"></i> Sorry, but your E-mail address is not valid.',
        5: '<i class="fa fa-warning"></i> Sorry, but your E-mail address is not valid.',
    };

});