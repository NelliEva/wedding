document.getElementsByClassName('r')[0].classList.add("hidden");
document.getElementsByClassName('l')[0].classList.add("hidden");

///click on img event + function + changes/////
var img = document.querySelectorAll(".gridImg");
 img.forEach(function(e){e.addEventListener('click',function(){
        this.classList.toggle("active");
        document.getElementById('modal').classList.toggle('box');
        if (this.className == "gridImg active") {
        document.getElementsByClassName('r')[0].style.display = "inline-block";
        document.getElementsByClassName('l')[0].style.display = "inline-block";
   } else if(this.className !== "gridImg active"){
   	document.getElementsByClassName('r')[0].style.display = "none";
    document.getElementsByClassName('l')[0].style.display = "none";
   }
    });
});



var btnL= document.getElementById('btnl');
var btnR = document.getElementById('btnr');
var imgsIndex = 1;



function plusImgs(n) {
  showImgs(imgsIndex += n);
}

// function currentImgs(n) {
//   showImgs(imgsIndex = n);
// }

function showImgs(n) {
  var i;
  var imgs = document.getElementsByClassName("gridImg");
  if (n > imgs.length) {imgsIndex = 1}
  if (n < 1) {imgsIndex = imgs.length}
  for (i = 0; i < imgs.length; i++) {
      imgs[i].classList.remove("active");
  }
   imgs[imgsIndex-1].classList.add("active");
}

//  function plusImgs(n) {
//   showImgs(i -= n)-;
// }

// function showImgs(n) {
//   var imgsIndex = 1;	
//   var i;
//   var imgs = document.getElementsByClassName("gridImg");
//   if (n > imgs.length) {imgsIndex = 1}
//   if (n < 1) {imgsIndex = imgs.length}
//   for ( i = imgs.length - 1; i >= 0; i--) {
//       imgs[i].classList.remove("active");
//   }
//    imgs[imgsIndex-1].classList.add("active");
// }
// ;
// btnL.addEventListener('click', showImgs);





//////function of esc btn/////////
function remove() {
     var i;
     var imgs = document.getElementsByClassName("gridImg");
     for (i = 0; i < imgs.length; i++) {
      imgs[i].classList.remove("active");
      document.getElementById('modal').classList.remove('box');
      document.getElementsByClassName('r')[0].style.display = "none";
      document.getElementsByClassName('l')[0].style.display = "none";
  
} };

/////use left right arrow + esc////////

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "Left": 
    case "ArrowLeft":
      plusImgs(-1);
      break;
    case "Right":
    case "ArrowRight":
    plusImgs(1);
      break;
    case "Esc":
    case "Escape":
    remove() 
      break;
    default:
      return;
  }
  event.preventDefault();
}, true);









function detectswipe(el,func) {
  swipe_det = new Object();
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  var min_x = 30;  //min x swipe for horizontal swipe
  var max_x = 30;  //max x difference for vertical swipe
  var min_y = 50;  //min y swipe for vertical swipe
  var max_y = 60;  //max y difference for horizontal swipe
  var direc = "";
  ele = document.getElementById(el);
  ele.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX; 
    swipe_det.sY = t.screenY;
  },false);
  ele.addEventListener('touchmove',function(e){
    e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX; 
    swipe_det.eY = t.screenY;    
  },false);
  ele.addEventListener('touchend',function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if(swipe_det.eX > swipe_det.sX) direc = "r";
      else direc = "l";
    }
    //vertical detection
    else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if(swipe_det.eY > swipe_det.sY) direc = "d";
      else direc = "u";
    }

    if (direc != "") {
      if(typeof func == 'function') func(el,direc);
    }
    direc = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  },false);  
}

function myfunction(el,d) {
  alert("you swiped on element with id '"+el+"' to "+d+" direction");
}