$(function(){

	/*滚动后下拉菜单固定*/
	$(window).scroll(function(){
		
		if($(window).scrollTop() >= 70){
			$(".nav .enable").css("display","none");
			$(".nav .disable").css("display","block");
			$(".nav").css({
				position:"fixed",
				top:0,
			})
		}
		if($(window).scrollTop() <= 60){
			$(".nav .enable").css("display","block");
			$(".nav .disable").css("display","none");
			$(".nav").css({
				position:"relative",
				
			})
		}
	})

	/*首页下拉菜单选项卡*/
	navList();
	function navList(){
		var nowIndex = null;
		$(".nav .nav_list").mouseover(function(ev){
			// console.log(ev.target);
			// console.log(this);
			
			// console.log($(ev.target).closest("ul").attr("class"));
			if(ev.target.nodeName.toLowerCase() == "a" && $(ev.target).closest("ul").attr("class") == "nav_ul"){
				nowIndex = $(ev.target).closest("li").index();
				
			}
			// console.log(nowIndex);
				if(nowIndex <= 5){
					$(".nav .list_box").stop().animate({
						opacity:1
					}).css({
						display:"block"	,
					});
					
					$(".nav .list_box").find("div").css("display","none");
					$(".nav .list_box").find("div").eq(nowIndex).css("display","block");

				}else{
					$(".nav .list_box").css("display","none");
					$(".nav .list_box").find("div").css("display","none");
				}
			
		})
		$(".nav .nav_list").mouseout(function(){
			$(".nav .list_box").stop().animate({
				opacity:0
			});
			$(".nav .list_box").css("display","none");
			$(".nav .list_box").find("div").css("display","none");
			
		})
	}
	

	// 轮播图
	banner();
	function banner(){
		var timer = null;
		var thisIndex = 0;
		$(".banner .banner_bottom").find("a").eq(thisIndex).attr("class","active");
		move();
		
			
		$(".banner").hover(function(){
			clearInterval(timer);
		},function(){
			move();
		});	

		$(".banner .banner_bottom").on("click","a",function(){
			$(".banner .banner_bottom").find("a").attr("class","");
			$(this).attr("class","active");
			thisIndex = $(this).index();
			console.log(thisIndex);
			$(".banner ul").stop().animate({
					top:-500*(thisIndex+1)
				});
		})
		function move(){
			timer = setInterval(function(){
				$(".banner ul").stop().animate({
					top:-500*++thisIndex
				});
				

				
				if(thisIndex == 2){
					$(".banner ul").css("top","0px");
					thisIndex = 0;
					// $(".banner .banner_bottom").find("a").attr("class","").eq(0).attr("class","active");
	
				}
				$(".banner .banner_bottom").find("a").attr("class","").eq(thisIndex-1).attr("class","active");
			},4000);
		}



	}
	//top四件套加载
	top_load();
	function top_load(){
		$.ajax({
			url:"../json/top_four.json",
			success:function(arr){
				for(var i = 0; i < arr.length; i++){
					$(`<li><a href=""><img src="${arr[i].img}" alt=""></a></li>`).appendTo($(".top_four .top_four_box"));
				}
			},
			error:function(msg){
				console.log("错误" + msg);
			}
		})
	}
	//bottom四件套加载
	bottom_load();
	function bottom_load(){
		$.ajax({
			url:"../json/bottom_four.json",
			success:function(arr){
				for(var i = 0; i < arr.length; i++){
					$(`<li><a href=""><img src="${arr[i].img}" alt=""></a></li>`).appendTo($(".bottom_four .bottom_four_box"));	
				}

			},
			error:function(msg){
				console.log("错误" + msg);
			}
		})
	}
	//热门商品
	hot_commodities_load();
	function hot_commodities_load(){
		$.ajax({
			url:"../json/hotGoods.json",
			success:function(arr){
				for(var i = 0; i < arr.length; i++){

						$(`<li>
								<a href="" class = "show"><img src="${arr[i].img[0].src}" alt=""></a>
								<div class="msg_box">
								<h3>${arr[i].title}</h3>
								<span>${arr[i].desc}</span>
								<ul class="hot_goods_color">
									<li class="active"><img src="${arr[i].img[0].color}" alt=""></li>
								</ul>
								<p>${arr[i].price}</p>
								</div>
								<div class="detail">
									查看详情
								</div>
							</li>`).appendTo($(".hot_commodities .hot_goods"));
						for(var j = 1; j < arr[i].img.length; j++){
							$(`<a href=""><img src="${arr[i].img[j].src}" alt=""></a>`).insertAfter($(".hot_commodities .hot_goods").eq(i).find(".show"));
							$(`<li><img src="${arr[i].img[j].color}" alt=""></li>`).appendTo($(".hot_commodities .hot_goods").eq(i).find(".hot_goods_color"));
						}
						
					
				}

			},
			error:function(msg){
				console.log("加载失败" + "msg");
			}


		})
	}
	
	
})