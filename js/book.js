let pager = $('.pager');

let menu = $('.menu-list li');

let pages = $('.page');

let status = [0,1]

// menu.eq(2).on('click',function(){
//   pager.eq(1).addClass('prev-page')
//   pager.eq(1).css('zIndex','99')
// })

menu.on('click',function(){
  let index = menu.index($(this)) // 面
  if(!(index===status[0]||index===status[1])){
    let current = status[0]/2    //当前页（以左侧页为准且注意页与面两个概念）
    let to = index%2?(index-status[1])/2 + current:(index-status[0])/2 + current;
    pages.css('transform','')
    pager.css('zIndex','')
    if(to>current){
      pager.eq(to).css('zIndex',99)
      pages.eq(status[1]).css('transform','rotateY(180deg)')
      for(var j=1;j<=to;j++){
        pager.eq(j).addClass('prev-page');
        pager.eq(j).removeClass('next-page');
      }
    }else{
      to++;
      pager.eq(to).css('zIndex',99)
      for(var j=to;j<pager.length-1;j++){
        pager.eq(j).addClass('next-page');
        pager.eq(j).removeClass('prev-page');
      }
    }
    if(index%2){
      status[0] = index-1;
      status[1] = index;
    }else{
      status[0] = index;
      status[1] = index+1;
    }
    pager.eq(status[0]/2).css('zIndex',99)
  }

})
