


// let watermark = {}
 
// let setWatermark = (str) => {
//  let id = '1.23452384164.123412416';
 
//  if (document.getElementById(id) !== null) {
//  document.body.removeChild(document.getElementById(id));
//  }
 
//  //创建一个画布
//  let can = document.createElement('canvas');
//  //设置画布的长宽
//  can.width = 120;
//  can.height = 120;
 
//  let cans = can.getContext('2d');
//  //旋转角度
//  cans.rotate(-15 * Math.PI / 180);
//  cans.font = '18px Vedana';
//  //设置填充绘画的颜色、渐变或者模式
//  cans.fillStyle = 'rgba(200, 200, 200, 0.40)';
//  //设置文本内容的当前对齐方式
//  cans.textAlign = 'left';
//  //设置在绘制文本时使用的当前文本基线
//  cans.textBaseline = 'Middle';
//  //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
//  cans.fillText(str, can.width / 8, can.height / 2);
 
//  let div = document.createElement('div');
//  div.id = id;
//  div.style.pointerEvents = 'none';
//  div.style.top = '30px';
//  div.style.left = '0px';
//  div.style.position = 'fixed';
//  div.style.zIndex = '100000';
//  div.style.width = document.documentElement.clientWidth + 'px';
//  div.style.height = document.documentElement.clientHeight + 'px';
//  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
//  document.body.appendChild(div);
//  return id;
// }
 
// // 该方法只允许调用一次
// watermark.set = (str) => {
//  let id = setWatermark(str);
//  setInterval(() => {
//  if (document.getElementById(id) === null) {
//   id = setWatermark(str);
//  }
//  }, 500);
//  window.onresize = () => {
//  setWatermark(str);
//  };
// }



//tool.js
let watermark=(str_set) =>{
    // const strArr = "林氏木业";
    const strArr = str_set;

    // let ctx = document.createElement("canvas");
    // ctx.width = 250;
    // ctx.height = 100;
    // ctx.style.display = "none";
    // let cans = ctx.getContext("2d");
    // cans.rotate((-20 * Math.PI) / 180);
    // cans.font = "12px Microsoft YaHei";
    // cans.fillStyle = "rgba(17, 17, 17, 0.20)";
    // cans.textAlign = "left";
    // cans.textBaseline = "Middle";
    // cans.fillText(strArr, 0, 100);
    // cans.save();
    // return ctx.toDataURL();

    //创建一个画布
    let can = document.createElement('canvas');
    //设置画布的长宽
    can.width = 93;
    can.height = 83;
    
    let cans = can.getContext('2d');
    //旋转角度
    cans.rotate(-15 * Math.PI / 180);
    cans.font = '14px Vedana';
    //设置填充绘画的颜色、渐变或者模式0.20
    cans.fillStyle = 'rgba(200, 200, 200, 0.20)';
    //设置文本内容的当前对齐方式
    cans.textAlign = 'left';
    //设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle';
    //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText(strArr, can.width / 8, can.height / 2);
    // cans.fillText(strArr, 0, 100);
    return can.toDataURL();

}
 
export default watermark;