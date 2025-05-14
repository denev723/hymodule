function calcSideLeft() {
  const $siteSide = $(".site-side");
  const $siteWrapLeft = $("#wrap").offset().left;
  if ($siteWrapLeft > 0) {
    $siteSide.css("left", $siteWrapLeft);
  }
}

calcSideLeft();
$(window).on("resize", calcSideLeft);
