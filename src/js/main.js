$(document).ready(function () {
  // 모든 a 태그 중 href="#prepare" 클릭 시 안내 알럿
  $(document).on("click", "a", function (e) {
    if ($(this).attr("href") === "#prepare") {
      e.preventDefault();
      alert("준비중입니다.");
    }
  });

  // 좌측 고정 사이드바 위치 계산 함수
  // function calcSideLeft() {
  //   const $siteSide = $(".site-side");
  //   const $siteWrapLeft = $("#wrap").offset().left;
  //   if ($siteWrapLeft > 0) {
  //     $siteSide.css("left", $siteWrapLeft);
  //   }
  // }

  // 페이지 로드 및 리사이즈 시 사이드바 위치 재계산
  // calcSideLeft();
  // $(window).on("resize", calcSideLeft);

  // 패밀리 사이트 버튼 클릭 시 토글
  $(".btn-family").on("click", function (e) {
    e.stopPropagation();
    $(".site-footer__family").toggleClass("site-footer__family--active");
  });

  // 바깥 클릭 시 패밀리 사이트 닫기
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".site-footer__family, .btn-family").length) {
      $(".site-footer__family").removeClass("site-footer__family--active");
    }
  });

  // ESC 키로 패밀리 사이트 닫기
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $(".site-footer__family").removeClass("site-footer__family--active");
    }
  });

  // type-1: 큰 배너 Swiper (fade, 커스텀 컨트롤, 자동재생)
  var mainSlideLg = new Swiper("#mainSlideLg", {
    loop: true,
    effect: "fade",
    navigation: {
      nextEl: ".slide__btn--next",
      prevEl: ".slide__btn--prev",
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    on: {
      // 슬라이드 변경 시 현재/전체 페이지 및 진행바 업데이트
      slideChange: function () {
        var current = this.realIndex + 1;
        var total = this.slides.length;
        $(".slide__nums-current").text(current);
        $(".slide__nums-total").text(total);
        var percent = (current / total) * 100;
        $(".slide__progress-line").css("width", percent + "%");
      },
      // 초기화 시 현재/전체 페이지 및 진행바 세팅
      init: function () {
        var current = this.realIndex + 1;
        var total = this.slides.length;
        $(".slide__nums-current").text(current);
        $(".slide__nums-total").text(total);
        var percent = (current / total) * 100;
        $(".slide__progress-line").css("width", percent + "%");
      },
    },
  });

  // type-2: 작은 배너 Swiper (horizontal, pagination, 자동재생)
  var mainSlideSm = new Swiper("#mainSlideSm", {
    loop: true,
    pagination: {
      el: ".slide__pagination",
      clickable: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });

  // 큰 배너 슬라이드 재생/일시정지 토글 버튼 기능
  $(document).on("click", ".slide__btn--toggle", function () {
    var $btn = $(this);
    if ($btn.hasClass("slide__play")) {
      mainSlideLg.autoplay.stop();
      $btn.removeClass("slide__play").addClass("slide__pause");
    } else if ($btn.hasClass("slide__pause")) {
      mainSlideLg.autoplay.start();
      $btn.removeClass("slide__pause").addClass("slide__play");
    }
  });

  // 카드형 캐러셀 Swiper 옵션 (카드 크기 고정, slidesPerView: 'auto')
  var cardSwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: false,
  };

  // 추천 모듈교과 캐러셀
  var recommendCardSwiper = new Swiper(
    "#recommendCardSwiper",
    Object.assign({}, cardSwiperOptions, {
      navigation: {
        nextEl: "#recommendCardSwiperNext",
        prevEl: "#recommendCardSwiperPrev",
      },
      pagination: {
        el: "#recommendCardSwiperProgress",
        type: "progressbar",
      },
    })
  );

  // 인기 모듈교과 캐러셀
  var popularCardSwiper = new Swiper(
    "#popularCardSwiper",
    Object.assign({}, cardSwiperOptions, {
      navigation: {
        nextEl: "#popularCardSwiperNext",
        prevEl: "#popularCardSwiperPrev",
      },
      pagination: {
        el: "#popularCardSwiperProgress",
        type: "progressbar",
      },
    })
  );

  // 내 관심 모듈교과 캐러셀
  var myCardSwiper = new Swiper(
    "#myCardSwiper",
    Object.assign({}, cardSwiperOptions, {
      navigation: {
        nextEl: "#myCardSwiperNext",
        prevEl: "#myCardSwiperPrev",
      },
      pagination: {
        el: "#myCardSwiperProgress",
        type: "progressbar",
      },
    })
  );

  const $faqBtn = $(".faq__item-btn");

  // FAQ 내용 모두 닫기
  $(".faq__item-body").slideUp();

  // FAQ 버튼 클릭 시 해당 아이템만 열고, 나머지는 닫기
  $faqBtn.on("click", function () {
    const $currentItem = $(this).closest(".faq__item");
    // 현재 아이템 토글
    $currentItem.toggleClass("faq__item--active");
    $currentItem.children(".faq__item-body").slideToggle();
    // 나머지 아이템 닫기
    $currentItem
      .siblings(".faq__item")
      .removeClass("faq__item--active")
      .children(".faq__item-body")
      .slideUp();
  });

  const $svgEl = $("[data-logo]");
  const $svgInfo = {
    squares: `<svg aria-hidden="true"><use xlink:href="/resources/front/images/squares.svg#a"></use></svg>`,
    lines: `<svg aria-hidden="true"><use xlink:href="/resources/front/images/hamburger.svg#a"></use></svg>`,
    home: `<svg aria-hidden="true"><use xlink:href="/resources/front/images/home.svg#a"></use></svg>`,
    module: `<svg aria-hidden="true"><use xlink:href="/resources/front/images/modules.svg#a"></use></svg>`,
    heart: `<svg aria-hidden="true"><use xlink:href="/resources/front/images/heart.svg#a"></use></svg>`,
    "rarr-1": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/rarr-type-1.svg#Layer_1"></use></svg>`,
    "darr-1": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/darr-type-1.svg#a"></use></svg>`,
    "larr-1": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/rarr-type-1.svg#Layer_1"></use></svg>`,
    "uarr-1": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/darr-type-1.svg#a"></use></svg>`,
    "list-type-1-1": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/subpage/list-type-1-1.svg#a"></use></svg>`,
    "list-type-1-2": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/subpage/list-type-1-2.svg#a"></use></svg>`,
    "list-type-1-3": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/subpage/list-type-1-3.svg#a"></use></svg>`,
    "list-type-1-4": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/subpage/list-type-1-4.svg#a"></use></svg>`,
    "list-type-1-5": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/subpage/list-type-1-5.svg#a"></use></svg>`,
    "status-1": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/subpage/status-1.svg#a"></use></svg>`,
    "status-2": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/subpage/status-2.svg#a"></use></svg>`,
    "status-3": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/subpage/status-3.svg#a"></use></svg>`,
    "status-4": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/subpage/status-4.svg#a"></use></svg>`,
    "status-5": `<svg aria-hidden="true"><use xlink:href="/resources/front/images/subpage/status-5.svg#a"></use></svg>`,
  };
  if ($svgEl.length > 0) {
    $svgEl.each(function () {
      const logoType = $(this).data("logo");
      $(this).find("svg").remove();
      if ($svgInfo[logoType]) {
        $(this).append($svgInfo[logoType]);
      }
    });
  }

  $(".site-header").on("click", ".btn-menu", function () {
    if (!$(".site-side").hasClass("active")) {
      $(".site-side").addClass("active");
    } else {
      $(".site-side").removeClass("active");
    }
  });

  // ESC 키로 사이드 메뉴 닫기
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $(".site-side").removeClass("active");
    }
  });

  // 외부 클릭 시 사이드 메뉴 닫기
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".site-side, .btn-menu").length) {
      $(".site-side").removeClass("active");
    }
  });
});
