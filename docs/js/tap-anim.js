(function(){
  var d=document,w=window;
  var c=d.createElement('canvas');
  c.id='fx';
  c.style.position='fixed';
  c.style.inset='0';
  c.style.pointerEvents='none';
  c.style.zIndex='11';
  d.body.appendChild(c);
  var ctx=c.getContext('2d');
  var W,H,PR=w.devicePixelRatio||1;
  function resize(){
    W=w.innerWidth;H=w.innerHeight;
    c.width=W*PR;c.height=H*PR;
    ctx.setTransform(PR,0,0,PR,0,0);
  }
  resize();
  w.addEventListener('resize',resize);

  var parts=[];
  var colors=['#AAFF00','#E6EEF8','#ADB5BD'];
  function burst(x,y){
    for(var i=0;i<16;i++){
      var a=Math.random()*Math.PI*2;
      var sp=2+Math.random()*3;
      parts.push({
        x:x,y:y,
        vx:Math.cos(a)*sp,
        vy:Math.sin(a)*sp-1.5,
        g:0.06+Math.random()*0.04,
        r:2+Math.random()*2.5,
        life:40+Math.random()*20,
        c:colors[(Math.random()*colors.length)|0],
        o:1
      });
    }
  }

  function tick(){
    ctx.clearRect(0,0,W,H);
    for(var i=parts.length-1;i>=0;i--){
      var p=parts[i];
      p.life-=1;
      if(p.life<=0){ parts.splice(i,1); continue; }
      p.vy+=p.g;
      p.x+=p.vx;
      p.y+=p.vy;
      p.o=Math.max(0,p.life/60);
      ctx.globalAlpha=p.o;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.c;
      ctx.fill();
    }
    ctx.globalAlpha=1;
    requestAnimationFrame(tick);
  }
  tick();

  function centerOf(el){
    var r=el.getBoundingClientRect();
    return {x:r.left+r.width/2,y:r.top+r.height/2};
  }

  function attachBurst(selector,type){
    var els=d.querySelectorAll(selector);
    els.forEach(function(el){
      el.addEventListener(type,function(e){
        if(!e.isTrusted) return;
        var pos=centerOf(el);
        burst(pos.x,pos.y);
      },{passive:true});
    });
  }

  attachBurst('.tb-btn:not([arduino-uploader]):not(#btn_upload)','click');
  attachBurst('.icon-btn','click');

  var boards=d.getElementById('boards');
  if(boards){
    boards.addEventListener('change',function(e){
      if(!e.isTrusted) return;
      var pos=centerOf(boards);
      burst(pos.x,pos.y);
    },{passive:true});
  }
})();
