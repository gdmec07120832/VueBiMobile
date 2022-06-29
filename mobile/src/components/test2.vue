
<template>
  <div class="text" :style="[{ opacity: opacity }]">
    {{ text }}
  </div>
</template>

<script>
export default {

  beforeMount() {
    this.text += 1;
    this.timer();
  },
  data: {
    text: 100000,
    opacity: 0,
  },
  methods: {
    timer() {
      var self = this;
      setInterval(() => {
        self.text += 1;
      }, 6000);
    },
  },

  
  watch: {

    text() {
      var self = this;
      self.opacity = 1;
      setTimeout(() => {
        self.opacity = 0;
      }, 3000);
    },

  },




};













	function menu(){
		var navList = document.getElementById('nav-list');
		console.log(navList);
		var navBtn = document.getElementById('nav-btn');
		console.log(navBtn);	

		navBtn.onclick = function(){
			var i = 156;
			var j = 0;
			if(!navList.offsetHeight){
				var idOut = setInterval(frameOut, 1);
				function frameOut() {
					if (j == 156) {
						clearInterval(idOut);
					} else {
						j++; 
						navList.style.height = j + 'px';  
					}
					console.log("j==155:" + navList.offsetHeight);
				}
			}else {
				var idIn = setInterval(frameIn, 1);//每隔指定的时间就执行对应的函数或代码
				function frameIn() {
					if (i == 0) {
						clearInterval(idIn); //显示当前时间 ( setInterval() 函数会每秒执行一次函数，类似手表)。使用 clearInterval() 来停止执行:
					} else {
						i--; 
						navList.style.height = i + 'px';
					}
					console.log("i==0:" + navList.offsetHeight);
				}
			}
			console.log("click");
		}
		console.log("menu.navList.style.height:",navList.offsetHeight);
	} 

	menu();


</script>

<style>
.text {
  font-size: 33px;
  transition: opacity 2s ease;
}
</style>