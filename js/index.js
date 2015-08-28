/*
		common functions
*/
var $ = function(selector) {
		return document.querySelector(selector);
	},
	
	$$ = function(selector) {
		return document.querySelectorAll(selector);
	},
	
	// http://www.cnblogs.com/kuikui/archive/2011/12/26/2302375.html
	css = function(obj, attr, value) {
		switch (arguments.length) {
        case 2:
            if (typeof arguments[1] == "object") {    //批量设置属性
                for (var i in attr) obj.style[i] = attr[i]
            }
            else {    // 读取属性值
                return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr]
            }
            break;
        case 3:
            //设置属性
            obj.style[attr] = value;
            break;
        default:
            return "";
    	}
	},
	
	hasClass = function(obj, cls) {
    	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	},
	
	addClass = function(obj, cls) {
		if (!hasClass(obj, cls)) {
			obj.className += " " + cls;
		} 
	},
	
	// this function has some problems
	removeClass = function(obj, cls) {
		if (hasClass(obj, cls)) {
        	var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        	obj.className = obj.className.replace(reg, ' ');
    	}
	},
	
	// get an element's absolute position
	getAbsolutePositon = function(ele) {
		var left = ele.offsetLeft ? ele.offsetLeft : 0,
			top = ele.offsetTop ? ele.offsetTop : 0,
			position = {};
		
		if (ele.offsetParent != null) {
			left += getAbsolutePositon(ele.offsetParent.offsetLeft);
			top += getAbsolutePositon(ele.offsetParent.offsetTop);
		}
		
		position.left = left;
		position.top = top;
		
		return position;
	};

window.addEventListener("load", function() {

    /*
    	views tab
    */	
	var container = $("#container"),
		viewTabs = $$("#hometown ul span"),
		views = $$("#hometown ul li"),
		tabLen = viewTabs.length;
		currIndex = 0,
		isClicked = [true, false, false],
		
		hideAllViews = function () {
			for (var i = 0; i < tabLen; ++i) {
				views[i].style.display = "none";
			}
		},
		
		showOneTab = function(whichIndex) {
			if (whichIndex !== currIndex) {
				views[whichIndex].style.display = "block";
				currIndex = whichIndex;
			}
		},
		
		removeAllTabsClass = function () {
			for (var i = 0; i < tabLen; ++i) {
				viewTabs[i].className = "";
			}
		};
		 
	for (var i = 0, len = tabLen; i < len; ++i) {
		(function(index) {
			viewTabs[index].addEventListener("click", function(e) {
				if (index !== currIndex) {
				
					// 
					isClicked[index] = true;
					hideAllViews();
					showOneTab(index);
					removeClass(viewTabs[currIndex], "currView");
					removeAllTabsClass();
					addClass(this, "currView");
					
					// 如果没有点击所有Tab，那么梦想这部分就不显示
					// 第一个除外，因为它是默认显示的
					(function(arr) {
						var hope = $("#hope"),
							blessing = $("#blessing"),
							allIsClicked = true; 
						
						for (var i = 1, len = arr.length; i < len; ++i) {
							if (!arr[i]) {
								allIsClicked = false;
							}
						}
						
						if (allIsClicked) {
							hope.style.display = "block";
							blessing.style.display = "block";
						}
					})(isClicked);
					
					/*
					(function() {
						var ps = $$("#hope p"),
						len = ps.length,
						currIndex = 0,
						preIndex = -1;
						setInterval(function() {
							//alert(ps.length);
							ps[(++currIndex) % len].className = "hope-hover";
							ps[(++preIndex) % len].className = "";
						}, 3000);
					})();
					*/
					
				}
			}, false);
		})(i);
		
		// snow
		(function() {
			
			// client width and client height
			var TOTAL_WIDTH = document.documentElement.clientHeight,
				TOTAL_HEIGHT = document.documentElement.clientWidth,
				
				// for each snow
				MIN_WIDTH = MIN_HEIGHT = 10,
				MAX_WIDTH = MAX_HEIGHT = 50,
				
				START_X = 50,
				START_Y = 50,
				END_X = TOTAL_WIDTH - 50,
				END_Y = TOTAL_HEIGHT - 50,
				
				// current snow's position
				x,
				y,
				
				// total number of snow
				TOTAL_NUM = 30,
				
				// snow's style
				snowStyle = {
					position: "fixed",
					width: MIN_WIDTH + Math.floor((MAX_WIDTH - MIN_WIDTH + 1) * Math.random()) + "px",
					height: MIN_HEIGHT + Math.floor((MAX_HEIGHT - MIN_HEIGHT + 1) * Math.random()) + "px",
					fontSize: 100 + "px", //MIN_WIDTH + Math.floor((MAX_WIDTH - MIN_WIDTH + 1) * Math.random()) + "px",
					// left: START_X + Math.floor((END_X - START_X + 1) * Math.random()) + "px",
					// top: START_Y + Math.floor((END_Y - START_Y + 1) * Math.random()) + "px",
					zIndex: 99,
					color: "white"
				},
				
				productOneSnow = function () {
					var div = document.createElement("div");
					div.innerHTML = "*";
					
					for (var p in snowStyle) {
						/*
						setInterval(function() {
							
						}, 1000);
						*/
						
						div.style[p] = snowStyle[p];
						//setTimeout(productOneSnow, 1000);
					}
					
					return div;
				};
				
			
			var docFragment = document.createDocumentFragment();
			for (var x = START_X, y = START_Y; x <= END_X && y <= END_Y; x += 50, y += 50) {
				var snow = productOneSnow();
				
					// snow.style.left = x * (1 + Math.random()) + "px";
					snow.style.top = (START_Y += 50) + "px";
				
				docFragment.appendChild(snow);
			}
			// document.body.appendChild(docFragment);
		})();
	}
	
	// play music
	var audio = $("audio");
	audio.pause();
	document.body.addEventListener("dblclick", function() {
		
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	}, false);
	
	window.addEventListener("scroll", function(e) {
	
		/*
		console.log(e);
		console.log(document.documentElement.scrollHeight);
	
		console.log(document.documentElement.scrollTop);
	
		var pageY = window.pageYOffset,
			hopePosition = getAbsolutePositon($("#hope")); 
			
			console.log(hopePosition);
		*/
		
		console.log("love life, love myself!");
	}, false);
}, false);


