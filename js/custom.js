$(document).ready(function () {
  // // timelines with slick slider
  var bar1 = '.js-loading-bar-1';
  var bar2 = '.js-loading-bar-2';
  var label1 = '.js-labels-1';
  var label2 = '.js-labels-2';
  var loading_bar_options = {
    centerMode: true,
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    focusOnSelect: true,
    // asNavFor: ".labels",
    rtl: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          // draggable: true,
        }
      }
    ],
  };
  var labels_options = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    speed: 300,
    draggable: false,
    // asNavFor: ".loading-bar",
    rtl: false,
    adaptiveHeight: true,
    initialSlide: 0
  };
  $(bar1).slick(loading_bar_options);
  $(bar1).slick('slickSetOption', 'asNavFor', label1);
  $(bar2).slick(loading_bar_options);
  $(bar2).slick('slickSetOption', 'asNavFor', label2);
  $(label1).slick(labels_options);
  $(label1).slick('slickSetOption', 'asNavFor', bar1);
  $(label2).slick(labels_options);
  $(label2).slick('slickSetOption', 'asNavFor', bar2);
  // $('.timeline-content[data-slick-index="0"]').addClass('slick-current')
  var checkSlickButtons = function(){
    if($('.loading-bar button').hasClass('slick-disabled')){
      $('.loading-bar button.slick-disabled').hide()
    }else{
      $('.loading-bar button').show()
    }
  }
  checkSlickButtons();

  $('body').on('click','.loading-bar button',function(){
    checkSlickButtons();
  })
  // // for events sponsers logos 
  var $smallowl = $('.owl-smallsize');
  // // for events sponsers logos
  $smallowl.owlCarousel({
    loop: true,
    margin: 50,
    responsiveClass: true,
    nav: false,
    rtl: false,
    autoplay: true,
    dots: false,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  });
  var refreshOwl = function ($owlinstance) {
    $owlinstance.trigger('refresh.owl.carousel');
  }
  // bg white for nav on scroll
  if (window.isScroll) {
    $(window).on('scroll', function () {
      if ($(this).scrollTop() >= 10) {
        $('body').addClass('notTop');
      } else {
        $('body').removeClass('notTop');
      }
    });
  }

  var owlRtl = function ($owlinstance) {
    $owlinstance.data('owl.carousel').options.rtl = true;
    $owlinstance.attr('dir', 'rtl');
    $owlinstance.addClass('owl-rtl');
    refreshOwl($owlinstance);
  }
  var owlltr = function ($owlinstance) {
    $owlinstance.data('owl.carousel').options.rtl = false;
    $owlinstance.attr('dir', 'ltr');
    $owlinstance.removeClass('owl-rtl');
    refreshOwl($owlinstance);
  }
  var slickRtl = function ($slickinstance) {
    $($slickinstance).slick('slickSetOption', 'rtl', true)
    $($slickinstance).attr('dir', 'rtl');
    $($slickinstance).slick('setPosition');
  }
  var slickltr = function ($slickinstance) {
    $($slickinstance).slick('slickSetOption', 'rtl', false)
    $($slickinstance).attr('dir', 'ltr');
    $($slickinstance).slick('setPosition');
  }

  var makeArabicBtn = function () {
    $('.lang-btn a').addClass('hidden');
    $('.lang-btn .ar').removeClass('hidden');
  }
  var makeEnglishBtn = function () {
    $('.lang-btn a').addClass('hidden');
    $('.lang-btn .en').removeClass('hidden');
  }
  var changeBannerImage = function ($lang) {
    if ($lang === 'rtl') {
      $('.banner img').attr('src', 'assets/img/banner/banner-ar.jpg');
    } else if ($lang === 'ltr') {
      $('.banner img').attr('src', 'assets/img/banner/banner-en.jpg');
    }
  }
  // directions of document
  if ($('html').attr('dir') === 'rtl') {
    makeEnglishBtn();
    $('link[href="css/rtl.css"]').prop('disabled', false);
    $('body .toLeft').addClass('toRight').removeClass('toLeft');
    owlRtl($smallowl);
    slickRtl($(bar1));
    slickRtl($(bar2));
    slickRtl($(label1));
    slickRtl($(label2));
    changeBannerImage('rtl');
    $("[data-localize]").localize("language/lang", {
      language: "ar"
    });
  } else if ($('html').attr('dir') === 'ltr') {
    makeArabicBtn();
    $('link[href="css/rtl.css"]').prop('disabled', true);
    owlltr($smallowl);
    slickltr($(bar1));
    slickltr($(bar2));
    slickltr($(label1));
    slickltr($(label2));
    changeBannerImage('ltr');
    $("[data-localize]").localize("language/lang", {
      language: "en"
    });
  };

  $('.lang-btn').click(function (e) {
    e.preventDefault();
    if ($('html').attr('dir') === 'ltr') {
      makeEnglishBtn();
      $('.toLeft').addClass('toRight');
      $('html').removeClass('sidebarShown ');
      $('link[href="css/rtl.css"]').prop('disabled', false);
      $('html').attr('dir', 'rtl');
      owlRtl($smallowl);
      slickRtl($(bar1));
      slickRtl($(bar2));
      slickRtl($(label1));
      slickRtl($(label2));
      changeBannerImage('rtl');
      $("[data-localize]").localize("language/lang", {
        language: "ar"
      });
    } else if ($('html').attr('dir') === 'rtl') {
      makeArabicBtn();
      $('html').removeClass('sidebarShown ');
      $('html').attr('dir', 'ltr');
      $('.toRight').removeClass('toRight').addClass('toLeft');
      $('link[href="css/rtl.css"]').prop('disabled', true);
      owlltr($smallowl);
      slickltr($(bar1));
      slickltr($(bar2));
      slickltr($(label1));
      slickltr($(label2));
      changeBannerImage('ltr');
      $("[data-localize]").localize("language/lang", {
        language: "en"
      });
    }
  });
// change data of speakers in panel
  $('.more-btn').click(function(){
    var usercard =  $(this).closest('.usercard-content');
    var userimage = usercard.find('[data-panel-image]').attr('src');
    var username = usercard.find('[data-panel-name]').text();
    var userposition = usercard.find('[data-panel-position]').text();
    var userbio = usercard.find('[data-panel-bio]').text();
    $(document).find('[data-popup-id="user-panel"] [data-panel-image]').attr('src',userimage);
    $(document).find('[data-popup-id="user-panel"] [data-panel-name]').text(username);
    $(document).find('[data-popup-id="user-panel"] [data-panel-position]').text(userposition);
    $(document).find('[data-popup-id="user-panel"] [data-panel-bio]').text(userbio);
  });
  // /////////////////////////

  // countdown timers in hero for events
  timer = (target, date) => {
    var target = document.querySelector(target);
    var countDownDate = new Date(date).getTime();

    setInterval(() => {
      var now = new Date().getTime();
      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      target.querySelector('.days').innerText = days;
      target.querySelector('.hours').innerText = hours;
      target.querySelector('.minutes').innerText = minutes;
      target.querySelector('.seconds').innerText = seconds;

      if (distance < 0) {
        target.innerText = "Expired";
      }
    }, 1000);
  };
  var timerValue = $('#timer1').attr('data-timer');
  timer("#timer1", timerValue);
  // /////////////////////

  // tabs for events timeline 
  $('[data-tab]').on('click', function () {
    $(this).addClass('active').siblings('[data-tab]').removeClass('active')
    $(this).siblings('[data-content=' + $(this).data('tab') + ']').addClass('active').siblings('[data-content]').removeClass('active')

    $(bar1).slick('setPosition')
    $(bar2).slick('setPosition')
    $(label1).slick('setPosition')
    $(label2).slick('setPosition')
  })

  // ////////////////////////////
});
$(window).resize(function () {
  $('html').removeClass('sidebarShown ');
  
});
$(window).on('load',function(){
  $('.loader').fadeOut('slow');
});