//alert()

    $(function(){
//  	slider.init();
//  	console.log(capHandHeight);
//  	init();
        orient();
        $(".assistBtn").on("touchend",function(){
			if(!$(".btn").hasClass("assistBtn")){
				return false;
			}
			$(".btn").removeClass("assistBtn");
        	var marginLeft = $(".tongs").offset().left+"px";
        	$(".tongs").removeClass("left-right");
        	$(".tongs").css("left",marginLeft);
        	var pointArray = recordPoint()
			tonging(pointArray)
        })
        
    });
   $(window).bind( 'orientationchange', function(e){
    	var evtObj = e||window.event;
        orient(evtObj);
    });
    
   function orient(e) {
//      alert('gete');
        if (window.orientation == 0 || window.orientation == 180) {
//      	alert('gete');
            $("body").attr("class", "portrait");
            orientation = 'portrait';
            $(".indexct_tips").remove();
            return false;
        }
        else if (window.orientation == 90 || window.orientation == -90) {
            $("body").attr("class", "landscape");
            orientation = 'landscape';
            util.tips("请在竖屏状态使用");
            $(document).on("touchmove",function(evt){
				var evtObj = evt||window.event;
				evtObj.preventDefault();
			})
            return false;
        }
    }
   function init(randNumCow){
// 	$(".tongs").addClass("left-right").css("top","-60%");
	$(".tongs").css("top","-60%");
   	$(".btn").addClass("assistBtn");
   	console.log(randNumCow);
   	switch(randNumCow){
   		
   		case 0: $(".cow").eq(randNumCow).css({"top":"0%","left":"90%"});
		addMoveClass(randNumCow);
			break;
		case 1: $(".cow").eq(randNumCow).css({"top":"15%","left":"8%"});
		addMoveClass(randNumCow);
			break;
		case 2: $(".cow").eq(randNumCow).css({"top":"49%","left":"40%"});
		addMoveClass(randNumCow);
			break;
		case 3: $(".cow").eq(randNumCow).css({"top":"24%","left":"34%"});
		addMoveClass(randNumCow);
			break;
		case 4: $(".cow").eq(randNumCow).css({"top":"35%","left":"66%"});
		addMoveClass(randNumCow);
			break;
		case 5: $(".cow").eq(randNumCow).css({"top":"48%","left":"66%"});
		addMoveClass(randNumCow);
			break;
		default:
			break;
   	}
   	
   }
   function addMoveClass(_randNumCow){
   	$(".cow"+(_randNumCow+1)).addClass("movecow"+(_randNumCow+1));
	$(".cow"+(_randNumCow+1)).find(".trans-wrap").addClass("trans");
	$(".cow"+(_randNumCow+1)).removeClass("cowfix"+(_randNumCow+1));
   }
    function recordPoint(){
    	var pointArray = [];
    	var cowObjs = $(".cow-list .cow");
    	cowObjs.each(function(value,index){
    		var cowName = "cow" + value;
    		cowName = {};
    		cowName.left = $(this).offset().left;
    		cowName.top = $(this).offset().top;
    		pointArray.push(cowName);
    	})
    	return pointArray;
    	
    }
	function tonging(point){
//		for (var i = 0;i<100;i++) {

//		}
			var randNumCow = Math.floor(Math.random()*6);
		//012345
		var capHandHeight = $(".tongs").height();
		var comparHeight = point[randNumCow].top;
		var thisPointTop = comparHeight - capHandHeight + 20;
		var thisPointLeft = point[randNumCow].left + 20;
		var cowTop =  $(".cow")[randNumCow].offsetTop;
		var moveClass = "movecow";
		$(".tongs").animate({top:thisPointTop,left:thisPointLeft},1000,function(){
			$(".cow").eq(randNumCow).removeClass(moveClass+randNumCow);
			$(this).animate({top:thisPointTop-100},500);
			var $thisCow =  $(".cow").eq(randNumCow).animate({"top":cowTop-100+"px"},500);
			$(".cow"+(randNumCow+1)).removeClass(moveClass+(randNumCow+1));
			$(".cow"+(randNumCow+1)).find(".trans").removeClass("trans");
//			$(".cow"+(randNumCow+1)).addClass("cowfix"+(randNumCow+1));
			$(".cow"+(randNumCow+1)).css("left",thisPointLeft);
			var t = setTimeout(function(){
				switch (1){
				case 1: util.prize1("刻度奶杯");//实物奖品用
					break;
				case 2: util.prize2("五元券");//券类奖品用
					break;
				case 3: util.prize3();//未中奖用
					break;
				case 4: util.prize3();
					break;
				case 5: util.prize3();
					break;
				case 0: util.prize3();
					break;
				default:
					break;
				}
				$(".express-area").on("click",function(){
					$("#areaMask").fadeIn();
	    			$("#areaLayer").animate({"bottom": 0});
	    		})
				$(".prize-confirm .tell").on("touchend",function(){
		        	console.log("success");
		        	var address = $(".express-area dd").html();
		        	console.log(address);
		        	$(".prize-layer").remove();
		        	util.successTips("领取成功")
		        	init(randNumCow,point);
	        	});
	        	$(".prize-confirm .onceAgain").on("touchend",function(){
		        	console.log("success");
		        	$(".prize-layer").remove();
		        	init(randNumCow,point);
	        	});
			},800)
			
			
			
		});
		
	}
