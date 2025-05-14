$(document).ready(function () {
  function calcSideLeft() {
    const $siteSide = $(".site-side");
    const $siteWrapLeft = $("#wrap").offset().left;
    if ($siteWrapLeft > 0) {
      $siteSide.css("left", $siteWrapLeft);
    }
  }

  calcSideLeft();
  $(window).on("resize", calcSideLeft);

  $(".btn-family").on("click", function (e) {
    e.stopPropagation();
    $(".site-footer__family").toggleClass("site-footer__family--active");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".site-footer__family, .btn-family").length) {
      $(".site-footer__family").removeClass("site-footer__family--active");
    }
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $(".site-footer__family").removeClass("site-footer__family--active");
    }
  });
});
