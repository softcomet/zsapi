(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var y="1.6.12",p="left",o="right",e="up",x="down",c="in",A="out",m="none",s="auto",l="swipe",t="pinch",B="tap",j="doubletap",b="longtap",z="hold",E="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,C="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:true};f.fn.swipe=function(H){var G=f(this),F=G.data(C);if(F&&typeof H==="string"){if(F[H]){return F[H].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+H+" does not exist on jQuery.swipe")}}else{if(F&&typeof H==="object"){F.option.apply(this,arguments)}else{if(!F&&(typeof H==="object"||!H)){return w.apply(this,arguments)}}}return G};f.fn.swipe.version=y;f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:A};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:E,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:i};function w(F){if(F&&(F.allowPageScroll===undefined&&(F.swipe!==undefined||F.swipeStatus!==undefined))){F.allowPageScroll=m}if(F.click!==undefined&&F.tap===undefined){F.tap=F.click}if(!F){F={}}F=f.extend({},f.fn.swipe.defaults,F);return this.each(function(){var H=f(this);var G=H.data(C);if(!G){G=new D(this,F);H.data(C,G)}})}function D(a4,au){var au=f.extend({},au);var az=(a||d||!au.fallbackToMouseEvents),K=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ax=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",V=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",T=az?null:"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,ac=0,a1=0,aZ=0,H=1,ap=0,aJ=0,N=null;var aR=f(a4);var aa="start";var X=0;var aQ={};var U=0,a2=0,a5=0,ay=0,O=0;var aW=null,af=null;try{aR.bind(K,aN);aR.bind(aD,a9)}catch(aj){f.error("events not supported "+K+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(K,aN);aR.bind(aD,a9);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(C,null);aR=null};this.option=function(bc,bb){if(typeof bc==="object"){au=f.extend(au,bc)}else{if(au[bc]!==undefined){if(bb===undefined){return au[bc]}else{au[bc]=bb}}else{if(!bc){return au}else{f.error("Option "+bc+" does not exist on jQuery.swipe.options")}}}return null};function aN(bd){if(aB()){return}if(f(bd.target).closest(au.excludedElements,aR).length>0){return}var be=bd.originalEvent?bd.originalEvent:bd;var bc,bf=be.touches,bb=bf?bf[0]:be;aa=g;if(bf){X=bf.length}else{if(au.preventDefaultEvents!==false){bd.preventDefault()}}ag=0;aP=null;aJ=null;ac=0;a1=0;aZ=0;H=1;ap=0;N=ab();S();ai(0,bb);if(!bf||(X===au.fingers||au.fingers===i)||aX()){U=ar();if(X==2){ai(1,bf[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}if(au.swipeStatus||au.pinchStatus){bc=P(be,aa)}}else{bc=false}if(bc===false){aa=q;P(be,aa);return bc}else{if(au.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[be.target]);if(au.hold){bc=au.hold.call(aR,be,be.target)}},this),au.longTapThreshold)}an(true)}return null}function a3(be){var bh=be.originalEvent?be.originalEvent:be;if(aa===h||aa===q||al()){return}var bd,bi=bh.touches,bc=bi?bi[0]:bh;var bf=aH(bc);a2=ar();if(bi){X=bi.length}if(au.hold){clearTimeout(af)}aa=k;if(X==2){if(a1==0){ai(1,bi[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}else{aH(bi[1]);aZ=at(aQ[0].end,aQ[1].end);aJ=aq(aQ[0].end,aQ[1].end)}H=a7(a1,aZ);ap=Math.abs(a1-aZ)}if((X===au.fingers||au.fingers===i)||!bi||aX()){aP=aL(bf.start,bf.end);ak(be,aP);ag=aS(bf.start,bf.end);ac=aM();aI(aP,ag);if(au.swipeStatus||au.pinchStatus){bd=P(bh,aa)}if(!au.triggerOnTouchEnd||au.triggerOnTouchLeave){var bb=true;if(au.triggerOnTouchLeave){var bg=aY(this);bb=F(bf.end,bg)}if(!au.triggerOnTouchEnd&&bb){aa=aC(k)}else{if(au.triggerOnTouchLeave&&!bb){aa=aC(h)}}if(aa==q||aa==h){P(bh,aa)}}}else{aa=q;P(bh,aa)}if(bd===false){aa=q;P(bh,aa)}}function M(bb){var bc=bb.originalEvent?bb.originalEvent:bb,bd=bc.touches;if(bd){if(bd.length&&!al()){G();return true}else{if(bd.length&&al()){return true}}}if(al()){X=ay}a2=ar();ac=aM();if(ba()||!am()){aa=q;P(bc,aa)}else{if(au.triggerOnTouchEnd||(au.triggerOnTouchEnd==false&&aa===k)){if(au.preventDefaultEvents!==false){bb.preventDefault()}aa=h;P(bc,aa)}else{if(!au.triggerOnTouchEnd&&a6()){aa=h;aF(bc,aa,B)}else{if(aa===k){aa=q;P(bc,aa)}}}}an(false);return null}function a9(){X=0;a2=0;U=0;a1=0;aZ=0;H=1;S();an(false)}function L(bb){var bc=bb.originalEvent?bb.originalEvent:bb;if(au.triggerOnTouchLeave){aa=aC(h);P(bc,aa)}}function aK(){aR.unbind(K,aN);aR.unbind(aD,a9);aR.unbind(ax,a3);aR.unbind(V,M);if(T){aR.unbind(T,L)}an(false)}function aC(bf){var be=bf;var bd=aA();var bc=am();var bb=ba();if(!bd||bb){be=q}else{if(bc&&bf==k&&(!au.triggerOnTouchEnd||au.triggerOnTouchLeave)){be=h}else{if(!bc&&bf==h&&au.triggerOnTouchLeave){be=q}}}return be}function P(bd,bb){var bc,be=bd.touches;if((J()&&W())||(Q()&&aX())){if(J()&&W()){bc=aF(bd,bb,l)}if((Q()&&aX())&&bc!==false){bc=aF(bd,bb,t)}}else{if(aG()&&bc!==false){bc=aF(bd,bb,j)}else{if(ao()&&bc!==false){bc=aF(bd,bb,b)}else{if(ah()&&bc!==false){bc=aF(bd,bb,B)}}}}if(bb===q){if(W()){bc=aF(bd,bb,l)}if(aX()){bc=aF(bd,bb,t)}a9(bd)}if(bb===h){if(be){if(!be.length){a9(bd)}}else{a9(bd)}}return bc}function aF(be,bb,bd){var bc;if(bd==l){aR.trigger("swipeStatus",[bb,aP||null,ag||0,ac||0,X,aQ]);if(au.swipeStatus){bc=au.swipeStatus.call(aR,be,bb,aP||null,ag||0,ac||0,X,aQ);if(bc===false){return false}}if(bb==h&&aV()){aR.trigger("swipe",[aP,ag,ac,X,aQ]);if(au.swipe){bc=au.swipe.call(aR,be,aP,ag,ac,X,aQ);if(bc===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ac,X,aQ]);if(au.swipeLeft){bc=au.swipeLeft.call(aR,be,aP,ag,ac,X,aQ)}break;case o:aR.trigger("swipeRight",[aP,ag,ac,X,aQ]);if(au.swipeRight){bc=au.swipeRight.call(aR,be,aP,ag,ac,X,aQ)}break;case e:aR.trigger("swipeUp",[aP,ag,ac,X,aQ]);if(au.swipeUp){bc=au.swipeUp.call(aR,be,aP,ag,ac,X,aQ)}break;case x:aR.trigger("swipeDown",[aP,ag,ac,X,aQ]);if(au.swipeDown){bc=au.swipeDown.call(aR,be,aP,ag,ac,X,aQ)}break}}}if(bd==t){aR.trigger("pinchStatus",[bb,aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchStatus){bc=au.pinchStatus.call(aR,be,bb,aJ||null,ap||0,ac||0,X,H,aQ);if(bc===false){return false}}if(bb==h&&a8()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchIn){bc=au.pinchIn.call(aR,be,aJ||null,ap||0,ac||0,X,H,aQ)}break;case A:aR.trigger("pinchOut",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchOut){bc=au.pinchOut.call(aR,be,aJ||null,ap||0,ac||0,X,H,aQ)}break}}}if(bd==B){if(bb===q||bb===h){clearTimeout(aW);clearTimeout(af);if(Z()&&!I()){O=ar();aW=setTimeout(f.proxy(function(){O=null;aR.trigger("tap",[be.target]);if(au.tap){bc=au.tap.call(aR,be,be.target)}},this),au.doubleTapThreshold)}else{O=null;aR.trigger("tap",[be.target]);if(au.tap){bc=au.tap.call(aR,be,be.target)}}}}else{if(bd==j){if(bb===q||bb===h){clearTimeout(aW);O=null;aR.trigger("doubletap",[be.target]);if(au.doubleTap){bc=au.doubleTap.call(aR,be,be.target)}}}else{if(bd==b){if(bb===q||bb===h){clearTimeout(aW);O=null;aR.trigger("longtap",[be.target]);if(au.longTap){bc=au.longTap.call(aR,be,be.target)}}}}}return bc}function am(){var bb=true;if(au.threshold!==null){bb=ag>=au.threshold}return bb}function ba(){var bb=false;if(au.cancelThreshold!==null&&aP!==null){bb=(aT(aP)-ag)>=au.cancelThreshold}return bb}function ae(){if(au.pinchThreshold!==null){return ap>=au.pinchThreshold}return true}function aA(){var bb;if(au.maxTimeThreshold){if(ac>=au.maxTimeThreshold){bb=false}else{bb=true}}else{bb=true}return bb}function ak(bb,bc){if(au.preventDefaultEvents===false){return}if(au.allowPageScroll===m){bb.preventDefault()}else{var bd=au.allowPageScroll===s;switch(bc){case p:if((au.swipeLeft&&bd)||(!bd&&au.allowPageScroll!=E)){bb.preventDefault()}break;case o:if((au.swipeRight&&bd)||(!bd&&au.allowPageScroll!=E)){bb.preventDefault()}break;case e:if((au.swipeUp&&bd)||(!bd&&au.allowPageScroll!=u)){bb.preventDefault()}break;case x:if((au.swipeDown&&bd)||(!bd&&au.allowPageScroll!=u)){bb.preventDefault()}break}}}function a8(){var bc=aO();var bb=Y();var bd=ae();return bc&&bb&&bd}function aX(){return !!(au.pinchStatus||au.pinchIn||au.pinchOut)}function Q(){return !!(a8()&&aX())}function aV(){var be=aA();var bg=am();var bd=aO();var bb=Y();var bc=ba();var bf=!bc&&bb&&bd&&bg&&be;return bf}function W(){return !!(au.swipe||au.swipeStatus||au.swipeLeft||au.swipeRight||au.swipeUp||au.swipeDown)}function J(){return !!(aV()&&W())}function aO(){return((X===au.fingers||au.fingers===i)||!a)}function Y(){return aQ[0].end.x!==0}function a6(){return !!(au.tap)}function Z(){return !!(au.doubleTap)}function aU(){return !!(au.longTap)}function R(){if(O==null){return false}var bb=ar();return(Z()&&((bb-O)<=au.doubleTapThreshold))}function I(){return R()}function aw(){return((X===1||!a)&&(isNaN(ag)||ag<au.threshold))}function a0(){return((ac>au.longTapThreshold)&&(ag<r))}function ah(){return !!(aw()&&a6())}function aG(){return !!(R()&&Z())}function ao(){return !!(a0()&&aU())}function G(){a5=ar();ay=event.touches.length+1}function S(){a5=0;ay=0}function al(){var bb=false;if(a5){var bc=ar()-a5;if(bc<=au.fingerReleaseThreshold){bb=true}}return bb}function aB(){return !!(aR.data(C+"_intouch")===true)}function an(bb){if(bb===true){aR.bind(ax,a3);aR.bind(V,M);if(T){aR.bind(T,L)}}else{aR.unbind(ax,a3,false);aR.unbind(V,M,false);if(T){aR.unbind(T,L,false)}}aR.data(C+"_intouch",bb===true)}function ai(bd,bb){var bc={start:{x:0,y:0},end:{x:0,y:0}};bc.start.x=bc.end.x=bb.pageX||bb.clientX;bc.start.y=bc.end.y=bb.pageY||bb.clientY;aQ[bd]=bc;return bc}function aH(bb){var bd=bb.identifier!==undefined?bb.identifier:0;var bc=ad(bd);if(bc===null){bc=ai(bd,bb)}bc.end.x=bb.pageX||bb.clientX;bc.end.y=bb.pageY||bb.clientY;return bc}function ad(bb){return aQ[bb]||null}function aI(bb,bc){bc=Math.max(bc,aT(bb));N[bb].distance=bc}function aT(bb){if(N[bb]){return N[bb].distance}return undefined}function ab(){var bb={};bb[p]=av(p);bb[o]=av(o);bb[e]=av(e);bb[x]=av(x);return bb}function av(bb){return{direction:bb,distance:0}}function aM(){return a2-U}function at(be,bd){var bc=Math.abs(be.x-bd.x);var bb=Math.abs(be.y-bd.y);return Math.round(Math.sqrt(bc*bc+bb*bb))}function a7(bb,bc){var bd=(bc/bb)*1;return bd.toFixed(2)}function aq(){if(H<1){return A}else{return c}}function aS(bc,bb){return Math.round(Math.sqrt(Math.pow(bb.x-bc.x,2)+Math.pow(bb.y-bc.y,2)))}function aE(be,bc){var bb=be.x-bc.x;var bg=bc.y-be.y;var bd=Math.atan2(bg,bb);var bf=Math.round(bd*180/Math.PI);if(bf<0){bf=360-Math.abs(bf)}return bf}function aL(bc,bb){var bd=aE(bc,bb);if((bd<=45)&&(bd>=0)){return p}else{if((bd<=360)&&(bd>=315)){return p}else{if((bd>=135)&&(bd<=225)){return o}else{if((bd>45)&&(bd<135)){return x}else{return e}}}}}function ar(){var bb=new Date();return bb.getTime()}function aY(bb){bb=f(bb);var bd=bb.offset();var bc={left:bd.left,right:bd.left+bb.outerWidth(),top:bd.top,bottom:bd.top+bb.outerHeight()};return bc}function F(bb,bc){return(bb.x>bc.left&&bb.x<bc.right&&bb.y>bc.top&&bb.y<bc.bottom)}}}));
},{}],2:[function(require,module,exports){


module.exports = function(percentCircle) {

  percentCircle.each(function() {
    var $this = $(this)

    // get the percentage, set via data attribute 
    var percentage = $this.data('percentage')
    var color = $this.css('background-color')


    // convert supplied value (percentage, 1-100) into degree (out of 360)
    var degree = calculateDegree(percentage)


    if (degree <= 180) {

      // both colors here are effectively mask colors

      $this.css('background-image', 'linear-gradient(' + (90+degree) + 'deg, transparent 50%, #DEDEDE 50%), linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')
      // $this.css('background-image', '-webkit-linear-gradient(' + (90+degree) + 'deg, transparent 50%, #DEDEDE 50%), -webkit-linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')

    } else {

      // the first color here needs to be set to the same as the 

      $this.css('background-image', 'linear-gradient(' + (degree-90) + 'deg, transparent 50%, '+color+' 50%), linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')
      // $this.css('background-image', '-webkit-linear-gradient(' + (degree-90) + 'deg, transparent 50%, #DEDEDE 50%), -webkit-linear-gradient(90deg, #DEDEDE 50%, transparent 50%)')

    }

  })

}



var calculateDegree = function(percentage) {
  var degree = percentage * 3.6
  return degree
}
},{}],3:[function(require,module,exports){
var setPercentCircle = require('../components/percent-circle')



module.exports = function() {


  setPercentCircle( $('.js_percent-circle') )


}
},{"../components/percent-circle":2}],4:[function(require,module,exports){
/* ---------------------------------------

Globals - init 
(initializaers)

*/


module.exports = function() {



  // Init selectBox

  $('select').selectBox({'mobile':true})




  // Tooltip menus
  $('[data-toggle="tooltip"]').tooltip({html: true})




}
},{}],5:[function(require,module,exports){





module.exports = function() {

  "use strict";

  $(document).on('show.bs.modal', '.modal', centerModal);


  $(window).on("resize", function () {
    $('.modal:visible').each(centerModal);
  });

}




/*

Helper scripts for this module

Notes:
- if any of these need to be used in other modules, move them
  into a helper file (to then be imported and used here)
*/



function centerModal() {

  $(this).css('display', 'block');

  var $dialog      = $(this).find(".modal-dialog");
  var offset       = ($(window).height() - $dialog.height()) / 2;
  var bottomMargin = parseInt($dialog.css('marginBottom'), 10);

  // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
  if(offset < bottomMargin) {
    offset = bottomMargin;
  }

  $dialog.css("margin-top", offset);
  
}
},{}],6:[function(require,module,exports){
/* ---------------------------------------

Globals - Sidebar

*/


var swipe = require('jquery-touchswipe')


module.exports = function() {



  // Navbar Toggle

  // $(".nav-trigger").click(function() {
  $("#navTrigger").click(function() {
    $("body").toggleClass("sb-is-open")
    $.get('/users/toggleSidebar')
  })





  // Swipe Toggle

  $(function() {
    $("body").swipe( {

      swipe:function(event, direction) {

        // Close on swipe left
        if ( direction === 'left' ) {

          $("body").removeClass('sb-is-open')



        // Open on swipe right
        } else if ( direction === 'right' ) {

          $("body").addClass('sb-is-open')

        }
      }
    })

  });



}
},{"jquery-touchswipe":1}],7:[function(require,module,exports){
/* ---------------------------------------

Global Scripts

*/




var globalInitializers = require('./global/global.inits')
globalInitializers()

var sidebarInit = require('./global/global.sidebar')
sidebarInit()

var globalModals = require('./global/global.modals')
globalModals()

var batteryStatuses = require('./global/global.bat-stats')
batteryStatuses()
},{"./global/global.bat-stats":3,"./global/global.inits":4,"./global/global.modals":5,"./global/global.sidebar":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvanF1ZXJ5LXRvdWNoc3dpcGUvanF1ZXJ5LnRvdWNoU3dpcGUubWluLmpzIiwibnBtLXBpcGVsaW5lL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvcGVyY2VudC1jaXJjbGUuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvZ2xvYmFsL2dsb2JhbC5iYXQtc3RhdHMuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvZ2xvYmFsL2dsb2JhbC5pbml0cy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLm1vZGFscy5qcyIsIm5wbS1waXBlbGluZS9qYXZhc2NyaXB0cy9nbG9iYWwvZ2xvYmFsLnNpZGViYXIuanMiLCJucG0tcGlwZWxpbmUvamF2YXNjcmlwdHMvZ2xvYmFscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oYSl7aWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCYmZGVmaW5lLmFtZC5qUXVlcnkpe2RlZmluZShbXCJqcXVlcnlcIl0sYSl9ZWxzZXthKGpRdWVyeSl9fShmdW5jdGlvbihmKXt2YXIgeT1cIjEuNi4xMlwiLHA9XCJsZWZ0XCIsbz1cInJpZ2h0XCIsZT1cInVwXCIseD1cImRvd25cIixjPVwiaW5cIixBPVwib3V0XCIsbT1cIm5vbmVcIixzPVwiYXV0b1wiLGw9XCJzd2lwZVwiLHQ9XCJwaW5jaFwiLEI9XCJ0YXBcIixqPVwiZG91YmxldGFwXCIsYj1cImxvbmd0YXBcIix6PVwiaG9sZFwiLEU9XCJob3Jpem9udGFsXCIsdT1cInZlcnRpY2FsXCIsaT1cImFsbFwiLHI9MTAsZz1cInN0YXJ0XCIsaz1cIm1vdmVcIixoPVwiZW5kXCIscT1cImNhbmNlbFwiLGE9XCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3csdj13aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQmJiF3aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkLGQ9d2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZHx8d2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkLEM9XCJUb3VjaFN3aXBlXCI7dmFyIG49e2ZpbmdlcnM6MSx0aHJlc2hvbGQ6NzUsY2FuY2VsVGhyZXNob2xkOm51bGwscGluY2hUaHJlc2hvbGQ6MjAsbWF4VGltZVRocmVzaG9sZDpudWxsLGZpbmdlclJlbGVhc2VUaHJlc2hvbGQ6MjUwLGxvbmdUYXBUaHJlc2hvbGQ6NTAwLGRvdWJsZVRhcFRocmVzaG9sZDoyMDAsc3dpcGU6bnVsbCxzd2lwZUxlZnQ6bnVsbCxzd2lwZVJpZ2h0Om51bGwsc3dpcGVVcDpudWxsLHN3aXBlRG93bjpudWxsLHN3aXBlU3RhdHVzOm51bGwscGluY2hJbjpudWxsLHBpbmNoT3V0Om51bGwscGluY2hTdGF0dXM6bnVsbCxjbGljazpudWxsLHRhcDpudWxsLGRvdWJsZVRhcDpudWxsLGxvbmdUYXA6bnVsbCxob2xkOm51bGwsdHJpZ2dlck9uVG91Y2hFbmQ6dHJ1ZSx0cmlnZ2VyT25Ub3VjaExlYXZlOmZhbHNlLGFsbG93UGFnZVNjcm9sbDpcImF1dG9cIixmYWxsYmFja1RvTW91c2VFdmVudHM6dHJ1ZSxleGNsdWRlZEVsZW1lbnRzOlwibGFiZWwsIGJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIGEsIC5ub1N3aXBlXCIscHJldmVudERlZmF1bHRFdmVudHM6dHJ1ZX07Zi5mbi5zd2lwZT1mdW5jdGlvbihIKXt2YXIgRz1mKHRoaXMpLEY9Ry5kYXRhKEMpO2lmKEYmJnR5cGVvZiBIPT09XCJzdHJpbmdcIil7aWYoRltIXSl7cmV0dXJuIEZbSF0uYXBwbHkodGhpcyxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpfWVsc2V7Zi5lcnJvcihcIk1ldGhvZCBcIitIK1wiIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5zd2lwZVwiKX19ZWxzZXtpZihGJiZ0eXBlb2YgSD09PVwib2JqZWN0XCIpe0Yub3B0aW9uLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1lbHNle2lmKCFGJiYodHlwZW9mIEg9PT1cIm9iamVjdFwifHwhSCkpe3JldHVybiB3LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19fXJldHVybiBHfTtmLmZuLnN3aXBlLnZlcnNpb249eTtmLmZuLnN3aXBlLmRlZmF1bHRzPW47Zi5mbi5zd2lwZS5waGFzZXM9e1BIQVNFX1NUQVJUOmcsUEhBU0VfTU9WRTprLFBIQVNFX0VORDpoLFBIQVNFX0NBTkNFTDpxfTtmLmZuLnN3aXBlLmRpcmVjdGlvbnM9e0xFRlQ6cCxSSUdIVDpvLFVQOmUsRE9XTjp4LElOOmMsT1VUOkF9O2YuZm4uc3dpcGUucGFnZVNjcm9sbD17Tk9ORTptLEhPUklaT05UQUw6RSxWRVJUSUNBTDp1LEFVVE86c307Zi5mbi5zd2lwZS5maW5nZXJzPXtPTkU6MSxUV086MixUSFJFRTozLEZPVVI6NCxGSVZFOjUsQUxMOml9O2Z1bmN0aW9uIHcoRil7aWYoRiYmKEYuYWxsb3dQYWdlU2Nyb2xsPT09dW5kZWZpbmVkJiYoRi5zd2lwZSE9PXVuZGVmaW5lZHx8Ri5zd2lwZVN0YXR1cyE9PXVuZGVmaW5lZCkpKXtGLmFsbG93UGFnZVNjcm9sbD1tfWlmKEYuY2xpY2shPT11bmRlZmluZWQmJkYudGFwPT09dW5kZWZpbmVkKXtGLnRhcD1GLmNsaWNrfWlmKCFGKXtGPXt9fUY9Zi5leHRlbmQoe30sZi5mbi5zd2lwZS5kZWZhdWx0cyxGKTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIEg9Zih0aGlzKTt2YXIgRz1ILmRhdGEoQyk7aWYoIUcpe0c9bmV3IEQodGhpcyxGKTtILmRhdGEoQyxHKX19KX1mdW5jdGlvbiBEKGE0LGF1KXt2YXIgYXU9Zi5leHRlbmQoe30sYXUpO3ZhciBhej0oYXx8ZHx8IWF1LmZhbGxiYWNrVG9Nb3VzZUV2ZW50cyksSz1hej8oZD8odj9cIk1TUG9pbnRlckRvd25cIjpcInBvaW50ZXJkb3duXCIpOlwidG91Y2hzdGFydFwiKTpcIm1vdXNlZG93blwiLGF4PWF6PyhkPyh2P1wiTVNQb2ludGVyTW92ZVwiOlwicG9pbnRlcm1vdmVcIik6XCJ0b3VjaG1vdmVcIik6XCJtb3VzZW1vdmVcIixWPWF6PyhkPyh2P1wiTVNQb2ludGVyVXBcIjpcInBvaW50ZXJ1cFwiKTpcInRvdWNoZW5kXCIpOlwibW91c2V1cFwiLFQ9YXo/bnVsbDpcIm1vdXNlbGVhdmVcIixhRD0oZD8odj9cIk1TUG9pbnRlckNhbmNlbFwiOlwicG9pbnRlcmNhbmNlbFwiKTpcInRvdWNoY2FuY2VsXCIpO3ZhciBhZz0wLGFQPW51bGwsYWM9MCxhMT0wLGFaPTAsSD0xLGFwPTAsYUo9MCxOPW51bGw7dmFyIGFSPWYoYTQpO3ZhciBhYT1cInN0YXJ0XCI7dmFyIFg9MDt2YXIgYVE9e307dmFyIFU9MCxhMj0wLGE1PTAsYXk9MCxPPTA7dmFyIGFXPW51bGwsYWY9bnVsbDt0cnl7YVIuYmluZChLLGFOKTthUi5iaW5kKGFELGE5KX1jYXRjaChhail7Zi5lcnJvcihcImV2ZW50cyBub3Qgc3VwcG9ydGVkIFwiK0srXCIsXCIrYUQrXCIgb24galF1ZXJ5LnN3aXBlXCIpfXRoaXMuZW5hYmxlPWZ1bmN0aW9uKCl7YVIuYmluZChLLGFOKTthUi5iaW5kKGFELGE5KTtyZXR1cm4gYVJ9O3RoaXMuZGlzYWJsZT1mdW5jdGlvbigpe2FLKCk7cmV0dXJuIGFSfTt0aGlzLmRlc3Ryb3k9ZnVuY3Rpb24oKXthSygpO2FSLmRhdGEoQyxudWxsKTthUj1udWxsfTt0aGlzLm9wdGlvbj1mdW5jdGlvbihiYyxiYil7aWYodHlwZW9mIGJjPT09XCJvYmplY3RcIil7YXU9Zi5leHRlbmQoYXUsYmMpfWVsc2V7aWYoYXVbYmNdIT09dW5kZWZpbmVkKXtpZihiYj09PXVuZGVmaW5lZCl7cmV0dXJuIGF1W2JjXX1lbHNle2F1W2JjXT1iYn19ZWxzZXtpZighYmMpe3JldHVybiBhdX1lbHNle2YuZXJyb3IoXCJPcHRpb24gXCIrYmMrXCIgZG9lcyBub3QgZXhpc3Qgb24galF1ZXJ5LnN3aXBlLm9wdGlvbnNcIil9fX1yZXR1cm4gbnVsbH07ZnVuY3Rpb24gYU4oYmQpe2lmKGFCKCkpe3JldHVybn1pZihmKGJkLnRhcmdldCkuY2xvc2VzdChhdS5leGNsdWRlZEVsZW1lbnRzLGFSKS5sZW5ndGg+MCl7cmV0dXJufXZhciBiZT1iZC5vcmlnaW5hbEV2ZW50P2JkLm9yaWdpbmFsRXZlbnQ6YmQ7dmFyIGJjLGJmPWJlLnRvdWNoZXMsYmI9YmY/YmZbMF06YmU7YWE9ZztpZihiZil7WD1iZi5sZW5ndGh9ZWxzZXtpZihhdS5wcmV2ZW50RGVmYXVsdEV2ZW50cyE9PWZhbHNlKXtiZC5wcmV2ZW50RGVmYXVsdCgpfX1hZz0wO2FQPW51bGw7YUo9bnVsbDthYz0wO2ExPTA7YVo9MDtIPTE7YXA9MDtOPWFiKCk7UygpO2FpKDAsYmIpO2lmKCFiZnx8KFg9PT1hdS5maW5nZXJzfHxhdS5maW5nZXJzPT09aSl8fGFYKCkpe1U9YXIoKTtpZihYPT0yKXthaSgxLGJmWzFdKTthMT1hWj1hdChhUVswXS5zdGFydCxhUVsxXS5zdGFydCl9aWYoYXUuc3dpcGVTdGF0dXN8fGF1LnBpbmNoU3RhdHVzKXtiYz1QKGJlLGFhKX19ZWxzZXtiYz1mYWxzZX1pZihiYz09PWZhbHNlKXthYT1xO1AoYmUsYWEpO3JldHVybiBiY31lbHNle2lmKGF1LmhvbGQpe2FmPXNldFRpbWVvdXQoZi5wcm94eShmdW5jdGlvbigpe2FSLnRyaWdnZXIoXCJob2xkXCIsW2JlLnRhcmdldF0pO2lmKGF1LmhvbGQpe2JjPWF1LmhvbGQuY2FsbChhUixiZSxiZS50YXJnZXQpfX0sdGhpcyksYXUubG9uZ1RhcFRocmVzaG9sZCl9YW4odHJ1ZSl9cmV0dXJuIG51bGx9ZnVuY3Rpb24gYTMoYmUpe3ZhciBiaD1iZS5vcmlnaW5hbEV2ZW50P2JlLm9yaWdpbmFsRXZlbnQ6YmU7aWYoYWE9PT1ofHxhYT09PXF8fGFsKCkpe3JldHVybn12YXIgYmQsYmk9YmgudG91Y2hlcyxiYz1iaT9iaVswXTpiaDt2YXIgYmY9YUgoYmMpO2EyPWFyKCk7aWYoYmkpe1g9YmkubGVuZ3RofWlmKGF1LmhvbGQpe2NsZWFyVGltZW91dChhZil9YWE9aztpZihYPT0yKXtpZihhMT09MCl7YWkoMSxiaVsxXSk7YTE9YVo9YXQoYVFbMF0uc3RhcnQsYVFbMV0uc3RhcnQpfWVsc2V7YUgoYmlbMV0pO2FaPWF0KGFRWzBdLmVuZCxhUVsxXS5lbmQpO2FKPWFxKGFRWzBdLmVuZCxhUVsxXS5lbmQpfUg9YTcoYTEsYVopO2FwPU1hdGguYWJzKGExLWFaKX1pZigoWD09PWF1LmZpbmdlcnN8fGF1LmZpbmdlcnM9PT1pKXx8IWJpfHxhWCgpKXthUD1hTChiZi5zdGFydCxiZi5lbmQpO2FrKGJlLGFQKTthZz1hUyhiZi5zdGFydCxiZi5lbmQpO2FjPWFNKCk7YUkoYVAsYWcpO2lmKGF1LnN3aXBlU3RhdHVzfHxhdS5waW5jaFN0YXR1cyl7YmQ9UChiaCxhYSl9aWYoIWF1LnRyaWdnZXJPblRvdWNoRW5kfHxhdS50cmlnZ2VyT25Ub3VjaExlYXZlKXt2YXIgYmI9dHJ1ZTtpZihhdS50cmlnZ2VyT25Ub3VjaExlYXZlKXt2YXIgYmc9YVkodGhpcyk7YmI9RihiZi5lbmQsYmcpfWlmKCFhdS50cmlnZ2VyT25Ub3VjaEVuZCYmYmIpe2FhPWFDKGspfWVsc2V7aWYoYXUudHJpZ2dlck9uVG91Y2hMZWF2ZSYmIWJiKXthYT1hQyhoKX19aWYoYWE9PXF8fGFhPT1oKXtQKGJoLGFhKX19fWVsc2V7YWE9cTtQKGJoLGFhKX1pZihiZD09PWZhbHNlKXthYT1xO1AoYmgsYWEpfX1mdW5jdGlvbiBNKGJiKXt2YXIgYmM9YmIub3JpZ2luYWxFdmVudD9iYi5vcmlnaW5hbEV2ZW50OmJiLGJkPWJjLnRvdWNoZXM7aWYoYmQpe2lmKGJkLmxlbmd0aCYmIWFsKCkpe0coKTtyZXR1cm4gdHJ1ZX1lbHNle2lmKGJkLmxlbmd0aCYmYWwoKSl7cmV0dXJuIHRydWV9fX1pZihhbCgpKXtYPWF5fWEyPWFyKCk7YWM9YU0oKTtpZihiYSgpfHwhYW0oKSl7YWE9cTtQKGJjLGFhKX1lbHNle2lmKGF1LnRyaWdnZXJPblRvdWNoRW5kfHwoYXUudHJpZ2dlck9uVG91Y2hFbmQ9PWZhbHNlJiZhYT09PWspKXtpZihhdS5wcmV2ZW50RGVmYXVsdEV2ZW50cyE9PWZhbHNlKXtiYi5wcmV2ZW50RGVmYXVsdCgpfWFhPWg7UChiYyxhYSl9ZWxzZXtpZighYXUudHJpZ2dlck9uVG91Y2hFbmQmJmE2KCkpe2FhPWg7YUYoYmMsYWEsQil9ZWxzZXtpZihhYT09PWspe2FhPXE7UChiYyxhYSl9fX19YW4oZmFsc2UpO3JldHVybiBudWxsfWZ1bmN0aW9uIGE5KCl7WD0wO2EyPTA7VT0wO2ExPTA7YVo9MDtIPTE7UygpO2FuKGZhbHNlKX1mdW5jdGlvbiBMKGJiKXt2YXIgYmM9YmIub3JpZ2luYWxFdmVudD9iYi5vcmlnaW5hbEV2ZW50OmJiO2lmKGF1LnRyaWdnZXJPblRvdWNoTGVhdmUpe2FhPWFDKGgpO1AoYmMsYWEpfX1mdW5jdGlvbiBhSygpe2FSLnVuYmluZChLLGFOKTthUi51bmJpbmQoYUQsYTkpO2FSLnVuYmluZChheCxhMyk7YVIudW5iaW5kKFYsTSk7aWYoVCl7YVIudW5iaW5kKFQsTCl9YW4oZmFsc2UpfWZ1bmN0aW9uIGFDKGJmKXt2YXIgYmU9YmY7dmFyIGJkPWFBKCk7dmFyIGJjPWFtKCk7dmFyIGJiPWJhKCk7aWYoIWJkfHxiYil7YmU9cX1lbHNle2lmKGJjJiZiZj09ayYmKCFhdS50cmlnZ2VyT25Ub3VjaEVuZHx8YXUudHJpZ2dlck9uVG91Y2hMZWF2ZSkpe2JlPWh9ZWxzZXtpZighYmMmJmJmPT1oJiZhdS50cmlnZ2VyT25Ub3VjaExlYXZlKXtiZT1xfX19cmV0dXJuIGJlfWZ1bmN0aW9uIFAoYmQsYmIpe3ZhciBiYyxiZT1iZC50b3VjaGVzO2lmKChKKCkmJlcoKSl8fChRKCkmJmFYKCkpKXtpZihKKCkmJlcoKSl7YmM9YUYoYmQsYmIsbCl9aWYoKFEoKSYmYVgoKSkmJmJjIT09ZmFsc2Upe2JjPWFGKGJkLGJiLHQpfX1lbHNle2lmKGFHKCkmJmJjIT09ZmFsc2Upe2JjPWFGKGJkLGJiLGopfWVsc2V7aWYoYW8oKSYmYmMhPT1mYWxzZSl7YmM9YUYoYmQsYmIsYil9ZWxzZXtpZihhaCgpJiZiYyE9PWZhbHNlKXtiYz1hRihiZCxiYixCKX19fX1pZihiYj09PXEpe2lmKFcoKSl7YmM9YUYoYmQsYmIsbCl9aWYoYVgoKSl7YmM9YUYoYmQsYmIsdCl9YTkoYmQpfWlmKGJiPT09aCl7aWYoYmUpe2lmKCFiZS5sZW5ndGgpe2E5KGJkKX19ZWxzZXthOShiZCl9fXJldHVybiBiY31mdW5jdGlvbiBhRihiZSxiYixiZCl7dmFyIGJjO2lmKGJkPT1sKXthUi50cmlnZ2VyKFwic3dpcGVTdGF0dXNcIixbYmIsYVB8fG51bGwsYWd8fDAsYWN8fDAsWCxhUV0pO2lmKGF1LnN3aXBlU3RhdHVzKXtiYz1hdS5zd2lwZVN0YXR1cy5jYWxsKGFSLGJlLGJiLGFQfHxudWxsLGFnfHwwLGFjfHwwLFgsYVEpO2lmKGJjPT09ZmFsc2Upe3JldHVybiBmYWxzZX19aWYoYmI9PWgmJmFWKCkpe2FSLnRyaWdnZXIoXCJzd2lwZVwiLFthUCxhZyxhYyxYLGFRXSk7aWYoYXUuc3dpcGUpe2JjPWF1LnN3aXBlLmNhbGwoYVIsYmUsYVAsYWcsYWMsWCxhUSk7aWYoYmM9PT1mYWxzZSl7cmV0dXJuIGZhbHNlfX1zd2l0Y2goYVApe2Nhc2UgcDphUi50cmlnZ2VyKFwic3dpcGVMZWZ0XCIsW2FQLGFnLGFjLFgsYVFdKTtpZihhdS5zd2lwZUxlZnQpe2JjPWF1LnN3aXBlTGVmdC5jYWxsKGFSLGJlLGFQLGFnLGFjLFgsYVEpfWJyZWFrO2Nhc2UgbzphUi50cmlnZ2VyKFwic3dpcGVSaWdodFwiLFthUCxhZyxhYyxYLGFRXSk7aWYoYXUuc3dpcGVSaWdodCl7YmM9YXUuc3dpcGVSaWdodC5jYWxsKGFSLGJlLGFQLGFnLGFjLFgsYVEpfWJyZWFrO2Nhc2UgZTphUi50cmlnZ2VyKFwic3dpcGVVcFwiLFthUCxhZyxhYyxYLGFRXSk7aWYoYXUuc3dpcGVVcCl7YmM9YXUuc3dpcGVVcC5jYWxsKGFSLGJlLGFQLGFnLGFjLFgsYVEpfWJyZWFrO2Nhc2UgeDphUi50cmlnZ2VyKFwic3dpcGVEb3duXCIsW2FQLGFnLGFjLFgsYVFdKTtpZihhdS5zd2lwZURvd24pe2JjPWF1LnN3aXBlRG93bi5jYWxsKGFSLGJlLGFQLGFnLGFjLFgsYVEpfWJyZWFrfX19aWYoYmQ9PXQpe2FSLnRyaWdnZXIoXCJwaW5jaFN0YXR1c1wiLFtiYixhSnx8bnVsbCxhcHx8MCxhY3x8MCxYLEgsYVFdKTtpZihhdS5waW5jaFN0YXR1cyl7YmM9YXUucGluY2hTdGF0dXMuY2FsbChhUixiZSxiYixhSnx8bnVsbCxhcHx8MCxhY3x8MCxYLEgsYVEpO2lmKGJjPT09ZmFsc2Upe3JldHVybiBmYWxzZX19aWYoYmI9PWgmJmE4KCkpe3N3aXRjaChhSil7Y2FzZSBjOmFSLnRyaWdnZXIoXCJwaW5jaEluXCIsW2FKfHxudWxsLGFwfHwwLGFjfHwwLFgsSCxhUV0pO2lmKGF1LnBpbmNoSW4pe2JjPWF1LnBpbmNoSW4uY2FsbChhUixiZSxhSnx8bnVsbCxhcHx8MCxhY3x8MCxYLEgsYVEpfWJyZWFrO2Nhc2UgQTphUi50cmlnZ2VyKFwicGluY2hPdXRcIixbYUp8fG51bGwsYXB8fDAsYWN8fDAsWCxILGFRXSk7aWYoYXUucGluY2hPdXQpe2JjPWF1LnBpbmNoT3V0LmNhbGwoYVIsYmUsYUp8fG51bGwsYXB8fDAsYWN8fDAsWCxILGFRKX1icmVha319fWlmKGJkPT1CKXtpZihiYj09PXF8fGJiPT09aCl7Y2xlYXJUaW1lb3V0KGFXKTtjbGVhclRpbWVvdXQoYWYpO2lmKFooKSYmIUkoKSl7Tz1hcigpO2FXPXNldFRpbWVvdXQoZi5wcm94eShmdW5jdGlvbigpe089bnVsbDthUi50cmlnZ2VyKFwidGFwXCIsW2JlLnRhcmdldF0pO2lmKGF1LnRhcCl7YmM9YXUudGFwLmNhbGwoYVIsYmUsYmUudGFyZ2V0KX19LHRoaXMpLGF1LmRvdWJsZVRhcFRocmVzaG9sZCl9ZWxzZXtPPW51bGw7YVIudHJpZ2dlcihcInRhcFwiLFtiZS50YXJnZXRdKTtpZihhdS50YXApe2JjPWF1LnRhcC5jYWxsKGFSLGJlLGJlLnRhcmdldCl9fX19ZWxzZXtpZihiZD09ail7aWYoYmI9PT1xfHxiYj09PWgpe2NsZWFyVGltZW91dChhVyk7Tz1udWxsO2FSLnRyaWdnZXIoXCJkb3VibGV0YXBcIixbYmUudGFyZ2V0XSk7aWYoYXUuZG91YmxlVGFwKXtiYz1hdS5kb3VibGVUYXAuY2FsbChhUixiZSxiZS50YXJnZXQpfX19ZWxzZXtpZihiZD09Yil7aWYoYmI9PT1xfHxiYj09PWgpe2NsZWFyVGltZW91dChhVyk7Tz1udWxsO2FSLnRyaWdnZXIoXCJsb25ndGFwXCIsW2JlLnRhcmdldF0pO2lmKGF1LmxvbmdUYXApe2JjPWF1LmxvbmdUYXAuY2FsbChhUixiZSxiZS50YXJnZXQpfX19fX1yZXR1cm4gYmN9ZnVuY3Rpb24gYW0oKXt2YXIgYmI9dHJ1ZTtpZihhdS50aHJlc2hvbGQhPT1udWxsKXtiYj1hZz49YXUudGhyZXNob2xkfXJldHVybiBiYn1mdW5jdGlvbiBiYSgpe3ZhciBiYj1mYWxzZTtpZihhdS5jYW5jZWxUaHJlc2hvbGQhPT1udWxsJiZhUCE9PW51bGwpe2JiPShhVChhUCktYWcpPj1hdS5jYW5jZWxUaHJlc2hvbGR9cmV0dXJuIGJifWZ1bmN0aW9uIGFlKCl7aWYoYXUucGluY2hUaHJlc2hvbGQhPT1udWxsKXtyZXR1cm4gYXA+PWF1LnBpbmNoVGhyZXNob2xkfXJldHVybiB0cnVlfWZ1bmN0aW9uIGFBKCl7dmFyIGJiO2lmKGF1Lm1heFRpbWVUaHJlc2hvbGQpe2lmKGFjPj1hdS5tYXhUaW1lVGhyZXNob2xkKXtiYj1mYWxzZX1lbHNle2JiPXRydWV9fWVsc2V7YmI9dHJ1ZX1yZXR1cm4gYmJ9ZnVuY3Rpb24gYWsoYmIsYmMpe2lmKGF1LnByZXZlbnREZWZhdWx0RXZlbnRzPT09ZmFsc2Upe3JldHVybn1pZihhdS5hbGxvd1BhZ2VTY3JvbGw9PT1tKXtiYi5wcmV2ZW50RGVmYXVsdCgpfWVsc2V7dmFyIGJkPWF1LmFsbG93UGFnZVNjcm9sbD09PXM7c3dpdGNoKGJjKXtjYXNlIHA6aWYoKGF1LnN3aXBlTGVmdCYmYmQpfHwoIWJkJiZhdS5hbGxvd1BhZ2VTY3JvbGwhPUUpKXtiYi5wcmV2ZW50RGVmYXVsdCgpfWJyZWFrO2Nhc2UgbzppZigoYXUuc3dpcGVSaWdodCYmYmQpfHwoIWJkJiZhdS5hbGxvd1BhZ2VTY3JvbGwhPUUpKXtiYi5wcmV2ZW50RGVmYXVsdCgpfWJyZWFrO2Nhc2UgZTppZigoYXUuc3dpcGVVcCYmYmQpfHwoIWJkJiZhdS5hbGxvd1BhZ2VTY3JvbGwhPXUpKXtiYi5wcmV2ZW50RGVmYXVsdCgpfWJyZWFrO2Nhc2UgeDppZigoYXUuc3dpcGVEb3duJiZiZCl8fCghYmQmJmF1LmFsbG93UGFnZVNjcm9sbCE9dSkpe2JiLnByZXZlbnREZWZhdWx0KCl9YnJlYWt9fX1mdW5jdGlvbiBhOCgpe3ZhciBiYz1hTygpO3ZhciBiYj1ZKCk7dmFyIGJkPWFlKCk7cmV0dXJuIGJjJiZiYiYmYmR9ZnVuY3Rpb24gYVgoKXtyZXR1cm4gISEoYXUucGluY2hTdGF0dXN8fGF1LnBpbmNoSW58fGF1LnBpbmNoT3V0KX1mdW5jdGlvbiBRKCl7cmV0dXJuICEhKGE4KCkmJmFYKCkpfWZ1bmN0aW9uIGFWKCl7dmFyIGJlPWFBKCk7dmFyIGJnPWFtKCk7dmFyIGJkPWFPKCk7dmFyIGJiPVkoKTt2YXIgYmM9YmEoKTt2YXIgYmY9IWJjJiZiYiYmYmQmJmJnJiZiZTtyZXR1cm4gYmZ9ZnVuY3Rpb24gVygpe3JldHVybiAhIShhdS5zd2lwZXx8YXUuc3dpcGVTdGF0dXN8fGF1LnN3aXBlTGVmdHx8YXUuc3dpcGVSaWdodHx8YXUuc3dpcGVVcHx8YXUuc3dpcGVEb3duKX1mdW5jdGlvbiBKKCl7cmV0dXJuICEhKGFWKCkmJlcoKSl9ZnVuY3Rpb24gYU8oKXtyZXR1cm4oKFg9PT1hdS5maW5nZXJzfHxhdS5maW5nZXJzPT09aSl8fCFhKX1mdW5jdGlvbiBZKCl7cmV0dXJuIGFRWzBdLmVuZC54IT09MH1mdW5jdGlvbiBhNigpe3JldHVybiAhIShhdS50YXApfWZ1bmN0aW9uIFooKXtyZXR1cm4gISEoYXUuZG91YmxlVGFwKX1mdW5jdGlvbiBhVSgpe3JldHVybiAhIShhdS5sb25nVGFwKX1mdW5jdGlvbiBSKCl7aWYoTz09bnVsbCl7cmV0dXJuIGZhbHNlfXZhciBiYj1hcigpO3JldHVybihaKCkmJigoYmItTyk8PWF1LmRvdWJsZVRhcFRocmVzaG9sZCkpfWZ1bmN0aW9uIEkoKXtyZXR1cm4gUigpfWZ1bmN0aW9uIGF3KCl7cmV0dXJuKChYPT09MXx8IWEpJiYoaXNOYU4oYWcpfHxhZzxhdS50aHJlc2hvbGQpKX1mdW5jdGlvbiBhMCgpe3JldHVybigoYWM+YXUubG9uZ1RhcFRocmVzaG9sZCkmJihhZzxyKSl9ZnVuY3Rpb24gYWgoKXtyZXR1cm4gISEoYXcoKSYmYTYoKSl9ZnVuY3Rpb24gYUcoKXtyZXR1cm4gISEoUigpJiZaKCkpfWZ1bmN0aW9uIGFvKCl7cmV0dXJuICEhKGEwKCkmJmFVKCkpfWZ1bmN0aW9uIEcoKXthNT1hcigpO2F5PWV2ZW50LnRvdWNoZXMubGVuZ3RoKzF9ZnVuY3Rpb24gUygpe2E1PTA7YXk9MH1mdW5jdGlvbiBhbCgpe3ZhciBiYj1mYWxzZTtpZihhNSl7dmFyIGJjPWFyKCktYTU7aWYoYmM8PWF1LmZpbmdlclJlbGVhc2VUaHJlc2hvbGQpe2JiPXRydWV9fXJldHVybiBiYn1mdW5jdGlvbiBhQigpe3JldHVybiAhIShhUi5kYXRhKEMrXCJfaW50b3VjaFwiKT09PXRydWUpfWZ1bmN0aW9uIGFuKGJiKXtpZihiYj09PXRydWUpe2FSLmJpbmQoYXgsYTMpO2FSLmJpbmQoVixNKTtpZihUKXthUi5iaW5kKFQsTCl9fWVsc2V7YVIudW5iaW5kKGF4LGEzLGZhbHNlKTthUi51bmJpbmQoVixNLGZhbHNlKTtpZihUKXthUi51bmJpbmQoVCxMLGZhbHNlKX19YVIuZGF0YShDK1wiX2ludG91Y2hcIixiYj09PXRydWUpfWZ1bmN0aW9uIGFpKGJkLGJiKXt2YXIgYmM9e3N0YXJ0Ont4OjAseTowfSxlbmQ6e3g6MCx5OjB9fTtiYy5zdGFydC54PWJjLmVuZC54PWJiLnBhZ2VYfHxiYi5jbGllbnRYO2JjLnN0YXJ0Lnk9YmMuZW5kLnk9YmIucGFnZVl8fGJiLmNsaWVudFk7YVFbYmRdPWJjO3JldHVybiBiY31mdW5jdGlvbiBhSChiYil7dmFyIGJkPWJiLmlkZW50aWZpZXIhPT11bmRlZmluZWQ/YmIuaWRlbnRpZmllcjowO3ZhciBiYz1hZChiZCk7aWYoYmM9PT1udWxsKXtiYz1haShiZCxiYil9YmMuZW5kLng9YmIucGFnZVh8fGJiLmNsaWVudFg7YmMuZW5kLnk9YmIucGFnZVl8fGJiLmNsaWVudFk7cmV0dXJuIGJjfWZ1bmN0aW9uIGFkKGJiKXtyZXR1cm4gYVFbYmJdfHxudWxsfWZ1bmN0aW9uIGFJKGJiLGJjKXtiYz1NYXRoLm1heChiYyxhVChiYikpO05bYmJdLmRpc3RhbmNlPWJjfWZ1bmN0aW9uIGFUKGJiKXtpZihOW2JiXSl7cmV0dXJuIE5bYmJdLmRpc3RhbmNlfXJldHVybiB1bmRlZmluZWR9ZnVuY3Rpb24gYWIoKXt2YXIgYmI9e307YmJbcF09YXYocCk7YmJbb109YXYobyk7YmJbZV09YXYoZSk7YmJbeF09YXYoeCk7cmV0dXJuIGJifWZ1bmN0aW9uIGF2KGJiKXtyZXR1cm57ZGlyZWN0aW9uOmJiLGRpc3RhbmNlOjB9fWZ1bmN0aW9uIGFNKCl7cmV0dXJuIGEyLVV9ZnVuY3Rpb24gYXQoYmUsYmQpe3ZhciBiYz1NYXRoLmFicyhiZS54LWJkLngpO3ZhciBiYj1NYXRoLmFicyhiZS55LWJkLnkpO3JldHVybiBNYXRoLnJvdW5kKE1hdGguc3FydChiYypiYytiYipiYikpfWZ1bmN0aW9uIGE3KGJiLGJjKXt2YXIgYmQ9KGJjL2JiKSoxO3JldHVybiBiZC50b0ZpeGVkKDIpfWZ1bmN0aW9uIGFxKCl7aWYoSDwxKXtyZXR1cm4gQX1lbHNle3JldHVybiBjfX1mdW5jdGlvbiBhUyhiYyxiYil7cmV0dXJuIE1hdGgucm91bmQoTWF0aC5zcXJ0KE1hdGgucG93KGJiLngtYmMueCwyKStNYXRoLnBvdyhiYi55LWJjLnksMikpKX1mdW5jdGlvbiBhRShiZSxiYyl7dmFyIGJiPWJlLngtYmMueDt2YXIgYmc9YmMueS1iZS55O3ZhciBiZD1NYXRoLmF0YW4yKGJnLGJiKTt2YXIgYmY9TWF0aC5yb3VuZChiZCoxODAvTWF0aC5QSSk7aWYoYmY8MCl7YmY9MzYwLU1hdGguYWJzKGJmKX1yZXR1cm4gYmZ9ZnVuY3Rpb24gYUwoYmMsYmIpe3ZhciBiZD1hRShiYyxiYik7aWYoKGJkPD00NSkmJihiZD49MCkpe3JldHVybiBwfWVsc2V7aWYoKGJkPD0zNjApJiYoYmQ+PTMxNSkpe3JldHVybiBwfWVsc2V7aWYoKGJkPj0xMzUpJiYoYmQ8PTIyNSkpe3JldHVybiBvfWVsc2V7aWYoKGJkPjQ1KSYmKGJkPDEzNSkpe3JldHVybiB4fWVsc2V7cmV0dXJuIGV9fX19fWZ1bmN0aW9uIGFyKCl7dmFyIGJiPW5ldyBEYXRlKCk7cmV0dXJuIGJiLmdldFRpbWUoKX1mdW5jdGlvbiBhWShiYil7YmI9ZihiYik7dmFyIGJkPWJiLm9mZnNldCgpO3ZhciBiYz17bGVmdDpiZC5sZWZ0LHJpZ2h0OmJkLmxlZnQrYmIub3V0ZXJXaWR0aCgpLHRvcDpiZC50b3AsYm90dG9tOmJkLnRvcCtiYi5vdXRlckhlaWdodCgpfTtyZXR1cm4gYmN9ZnVuY3Rpb24gRihiYixiYyl7cmV0dXJuKGJiLng+YmMubGVmdCYmYmIueDxiYy5yaWdodCYmYmIueT5iYy50b3AmJmJiLnk8YmMuYm90dG9tKX19fSkpOyIsIlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHBlcmNlbnRDaXJjbGUpIHtcblxuICBwZXJjZW50Q2lyY2xlLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKVxuXG4gICAgLy8gZ2V0IHRoZSBwZXJjZW50YWdlLCBzZXQgdmlhIGRhdGEgYXR0cmlidXRlIFxuICAgIHZhciBwZXJjZW50YWdlID0gJHRoaXMuZGF0YSgncGVyY2VudGFnZScpXG4gICAgdmFyIGNvbG9yID0gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJylcblxuXG4gICAgLy8gY29udmVydCBzdXBwbGllZCB2YWx1ZSAocGVyY2VudGFnZSwgMS0xMDApIGludG8gZGVncmVlIChvdXQgb2YgMzYwKVxuICAgIHZhciBkZWdyZWUgPSBjYWxjdWxhdGVEZWdyZWUocGVyY2VudGFnZSlcblxuXG4gICAgaWYgKGRlZ3JlZSA8PSAxODApIHtcblxuICAgICAgLy8gYm90aCBjb2xvcnMgaGVyZSBhcmUgZWZmZWN0aXZlbHkgbWFzayBjb2xvcnNcblxuICAgICAgJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ2xpbmVhci1ncmFkaWVudCgnICsgKDkwK2RlZ3JlZSkgKyAnZGVnLCB0cmFuc3BhcmVudCA1MCUsICNERURFREUgNTAlKSwgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjREVERURFIDUwJSwgdHJhbnNwYXJlbnQgNTAlKScpXG4gICAgICAvLyAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoJyArICg5MCtkZWdyZWUpICsgJ2RlZywgdHJhbnNwYXJlbnQgNTAlLCAjREVERURFIDUwJSksIC13ZWJraXQtbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjREVERURFIDUwJSwgdHJhbnNwYXJlbnQgNTAlKScpXG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyB0aGUgZmlyc3QgY29sb3IgaGVyZSBuZWVkcyB0byBiZSBzZXQgdG8gdGhlIHNhbWUgYXMgdGhlIFxuXG4gICAgICAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAnbGluZWFyLWdyYWRpZW50KCcgKyAoZGVncmVlLTkwKSArICdkZWcsIHRyYW5zcGFyZW50IDUwJSwgJytjb2xvcisnIDUwJSksIGxpbmVhci1ncmFkaWVudCg5MGRlZywgI0RFREVERSA1MCUsIHRyYW5zcGFyZW50IDUwJSknKVxuICAgICAgLy8gJHRoaXMuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJy13ZWJraXQtbGluZWFyLWdyYWRpZW50KCcgKyAoZGVncmVlLTkwKSArICdkZWcsIHRyYW5zcGFyZW50IDUwJSwgI0RFREVERSA1MCUpLCAtd2Via2l0LWxpbmVhci1ncmFkaWVudCg5MGRlZywgI0RFREVERSA1MCUsIHRyYW5zcGFyZW50IDUwJSknKVxuXG4gICAgfVxuXG4gIH0pXG5cbn1cblxuXG5cbnZhciBjYWxjdWxhdGVEZWdyZWUgPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XG4gIHZhciBkZWdyZWUgPSBwZXJjZW50YWdlICogMy42XG4gIHJldHVybiBkZWdyZWVcbn0iLCJ2YXIgc2V0UGVyY2VudENpcmNsZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvcGVyY2VudC1jaXJjbGUnKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXG4gIHNldFBlcmNlbnRDaXJjbGUoICQoJy5qc19wZXJjZW50LWNpcmNsZScpIClcblxuXG59IiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbkdsb2JhbHMgLSBpbml0IFxuKGluaXRpYWxpemFlcnMpXG5cbiovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblxuXG5cbiAgLy8gSW5pdCBzZWxlY3RCb3hcblxuICAkKCdzZWxlY3QnKS5zZWxlY3RCb3goeydtb2JpbGUnOnRydWV9KVxuXG5cblxuXG4gIC8vIFRvb2x0aXAgbWVudXNcbiAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe2h0bWw6IHRydWV9KVxuXG5cblxuXG59IiwiXG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgJChkb2N1bWVudCkub24oJ3Nob3cuYnMubW9kYWwnLCAnLm1vZGFsJywgY2VudGVyTW9kYWwpO1xuXG5cbiAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCcubW9kYWw6dmlzaWJsZScpLmVhY2goY2VudGVyTW9kYWwpO1xuICB9KTtcblxufVxuXG5cblxuXG4vKlxuXG5IZWxwZXIgc2NyaXB0cyBmb3IgdGhpcyBtb2R1bGVcblxuTm90ZXM6XG4tIGlmIGFueSBvZiB0aGVzZSBuZWVkIHRvIGJlIHVzZWQgaW4gb3RoZXIgbW9kdWxlcywgbW92ZSB0aGVtXG4gIGludG8gYSBoZWxwZXIgZmlsZSAodG8gdGhlbiBiZSBpbXBvcnRlZCBhbmQgdXNlZCBoZXJlKVxuKi9cblxuXG5cbmZ1bmN0aW9uIGNlbnRlck1vZGFsKCkge1xuXG4gICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgdmFyICRkaWFsb2cgICAgICA9ICQodGhpcykuZmluZChcIi5tb2RhbC1kaWFsb2dcIik7XG4gIHZhciBvZmZzZXQgICAgICAgPSAoJCh3aW5kb3cpLmhlaWdodCgpIC0gJGRpYWxvZy5oZWlnaHQoKSkgLyAyO1xuICB2YXIgYm90dG9tTWFyZ2luID0gcGFyc2VJbnQoJGRpYWxvZy5jc3MoJ21hcmdpbkJvdHRvbScpLCAxMCk7XG5cbiAgLy8gTWFrZSBzdXJlIHlvdSBkb24ndCBoaWRlIHRoZSB0b3AgcGFydCBvZiB0aGUgbW9kYWwgdy8gYSBuZWdhdGl2ZSBtYXJnaW4gaWYgaXQncyBsb25nZXIgdGhhbiB0aGUgc2NyZWVuIGhlaWdodCwgYW5kIGtlZXAgdGhlIG1hcmdpbiBlcXVhbCB0byB0aGUgYm90dG9tIG1hcmdpbiBvZiB0aGUgbW9kYWxcbiAgaWYob2Zmc2V0IDwgYm90dG9tTWFyZ2luKSB7XG4gICAgb2Zmc2V0ID0gYm90dG9tTWFyZ2luO1xuICB9XG5cbiAgJGRpYWxvZy5jc3MoXCJtYXJnaW4tdG9wXCIsIG9mZnNldCk7XG4gIFxufSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5HbG9iYWxzIC0gU2lkZWJhclxuXG4qL1xuXG5cbnZhciBzd2lwZSA9IHJlcXVpcmUoJ2pxdWVyeS10b3VjaHN3aXBlJylcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG5cblxuICAvLyBOYXZiYXIgVG9nZ2xlXG5cbiAgLy8gJChcIi5uYXYtdHJpZ2dlclwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIiNuYXZUcmlnZ2VyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwic2ItaXMtb3BlblwiKVxuICAgICQuZ2V0KCcvdXNlcnMvdG9nZ2xlU2lkZWJhcicpXG4gIH0pXG5cblxuXG5cblxuICAvLyBTd2lwZSBUb2dnbGVcblxuICAkKGZ1bmN0aW9uKCkge1xuICAgICQoXCJib2R5XCIpLnN3aXBlKCB7XG5cbiAgICAgIHN3aXBlOmZ1bmN0aW9uKGV2ZW50LCBkaXJlY3Rpb24pIHtcblxuICAgICAgICAvLyBDbG9zZSBvbiBzd2lwZSBsZWZ0XG4gICAgICAgIGlmICggZGlyZWN0aW9uID09PSAnbGVmdCcgKSB7XG5cbiAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcygnc2ItaXMtb3BlbicpXG5cblxuXG4gICAgICAgIC8vIE9wZW4gb24gc3dpcGUgcmlnaHRcbiAgICAgICAgfSBlbHNlIGlmICggZGlyZWN0aW9uID09PSAncmlnaHQnICkge1xuXG4gICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoJ3NiLWlzLW9wZW4nKVxuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gIH0pO1xuXG5cblxufSIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5HbG9iYWwgU2NyaXB0c1xuXG4qL1xuXG5cblxuXG52YXIgZ2xvYmFsSW5pdGlhbGl6ZXJzID0gcmVxdWlyZSgnLi9nbG9iYWwvZ2xvYmFsLmluaXRzJylcbmdsb2JhbEluaXRpYWxpemVycygpXG5cbnZhciBzaWRlYmFySW5pdCA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5zaWRlYmFyJylcbnNpZGViYXJJbml0KClcblxudmFyIGdsb2JhbE1vZGFscyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5tb2RhbHMnKVxuZ2xvYmFsTW9kYWxzKClcblxudmFyIGJhdHRlcnlTdGF0dXNlcyA9IHJlcXVpcmUoJy4vZ2xvYmFsL2dsb2JhbC5iYXQtc3RhdHMnKVxuYmF0dGVyeVN0YXR1c2VzKCkiXX0=
