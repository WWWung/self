var canvas = $('#canvas')

function canvasSize(){
  canvas[0].height = document.documentElement.clientHeight;
  canvas[0].width = document.documentElement.offsetWidth;
}
canvasSize()
var ctx = canvas[0].getContext('2d');

function canvasMain(){
  let lineList = [];
  let dropList = [];
  let mosPos = [0, 0];
  let gravity = 0.5;
  let pw = $(document).width();
  let ph = $(document).height();
  let radius = 0;
  let speed = 0;
  let lineNum = 0;

  document.addEventListener('mousemove',function(e){
    mosPos[0] = e.pageX;
    mosPos[1] = e.pageY;
    radius = (mosPos[0]-pw/2)/(pw/2)
  })

  function createLine(){
    let obj = {
      speed: 25+Math.round(Math.random()*10),
      die: false,
      posx: Math.random()*2*canvas[0].width-(0.5*canvas[0].width),
      posy: -200,
      color: getColor(Math.round(Math.random()*40+140),Math.round(Math.random()*35+140),Math.round(Math.random()*35+140)),
      h: 25+Math.round(Math.random()*20)
    };
    lineList.push(obj);
  }

  function creatDrop(x,y){
    let obj = {
      die: false,
      posx: x,
      posy: y,
      radius: Math.random()*1.5+1,
      speedx: (Math.random()-0.5)*8,
      speedy: Math.random()*(-6)-3
    }
    return obj
  }

  function madeDrop(x,y){
    let maxDrop = Math.floor(Math.random()*5+5)
    for(var i=0;i<maxDrop;i++){
      dropList.push(creatDrop(x,y))
    }
  }

  window.requestAnimationFrame(rainStart);
  function rainStart(){
    if(Math.random()>lineNum){
      createLine()
      createLine()
    }
    speed = speed + (radius-speed)/50
    dropList.forEach((item,index)=>{
      item.speedx += speed/2
      item.speedy += gravity
      item.posx += item.speedx
      item.posy += item.speedy

      if(item.posy>=canvas[0].height){
        item.die=true
      }
    })

    for(var i=dropList.length-1;i>=0;i--){
      if(dropList[i].die){
        dropList.splice(i,1)
      }
    }

    let deadLine = canvas[0].height - Math.floor(Math.random()*canvas[0].height/6)

    lineList.forEach((item,index)=>{
      let dis = Math.sqrt( ((item.posx+speed*item.h)-mosPos[0])*((item.posx+speed*item.h)-mosPos[0])+((item.posy+item.h)-mosPos[1])*((item.posy+item.h)-mosPos[1]) )

      if(dis<30 && mosPos[0]!=0){
        madeDrop(item.posx+speed*item.h,item.posy+item.h)
        item.die = true
      }
      if((item.posy+item.h)>deadLine){
        if(Math.random()>0.6){
          madeDrop(item.posx+speed*item.h,item.posy+item.h)
          item.die = true
        }
      }
      if(item.posy>ph){
        item.die=true;
      }else{
        item.posy = item.posy+item.speed
        item.posx = item.posx+item.speed*speed
      }
    })

    for(var i=lineList.length-1;i>=0;i--){
      if(lineList[i].die){
        lineList.splice(i,1)
      }
    }
    render();
    window.requestAnimationFrame(rainStart);
  }

  function render(){
    ctx.clearRect(0,0,canvas[0].width,canvas[0].height)

    lineList.forEach((item)=>{
      if(!item.die){
        ctx.beginPath();
        ctx.strokeStyle=item.color;
        ctx.lineWidth=3;
        ctx.moveTo(item.posx,item.posy);
        ctx.lineTo(item.posx+speed*item.h,item.posy+item.h);
        ctx.stroke();
      }
    })

    ctx.lineWidth=1;
    ctx.strokeStyle='#fff';
    dropList.forEach((item)=>{
      ctx.beginPath();
      ctx.arc(item.posx,item.posy,item.radius,Math.random()*Math.PI*2,1*Math.PI);
      ctx.stroke();
    })
  }
}
