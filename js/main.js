
bodySize()
function bodySize() {
  $('body').css('height', $(window).height())
}
window.onresize = function(){
  bodySize();
  canvasSize();
};

window.onload = function(){
  canvasMain()
}
