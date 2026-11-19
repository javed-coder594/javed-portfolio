/* Interactive footer balls: lightweight 2D physics with mouse + touch impulses */
(() => {
 const init=()=>{
  const stage=document.querySelector('.footer-ball-playground');
  const canvas=stage?.querySelector('canvas');
  if(!stage||!canvas||stage.dataset.ballsReady) return;
  stage.dataset.ballsReady='true';
  const ctx=canvas.getContext('2d');
  if(!ctx) return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile=window.matchMedia('(max-width:700px)').matches;
  const colors=['#ff684f','#f5f0e7','#102844','#e8a16d','#397f98','#ffffff'];
  const balls=[];
  const pointer={x:-9999,y:-9999,active:false,down:false,px:0,py:0};
  let w=0,h=0,dpr=1,raf=0,last=0,running=true;
  const rand=(a,b)=>a+Math.random()*(b-a);
  const resize=()=>{
   const rect=stage.getBoundingClientRect();
   w=rect.width;h=rect.height;dpr=Math.min(devicePixelRatio||1,1.6);
   canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
   ctx.setTransform(dpr,0,0,dpr,0,0);
   const count=mobile?10:16;
   while(balls.length<count){
    const r=rand(mobile?11:13,mobile?20:25);
    balls.push({x:rand(r,w-r),y:rand(r+4,h-r-18),vx:rand(-.8,.8),vy:rand(-.5,.7),r,
     rot:rand(0,Math.PI*2),spin:rand(-.012,.012),color:colors[balls.length%colors.length],
     phase:rand(0,6.28),mass:r*r});
   }
  };
  const point=e=>{const r=stage.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=true};
  stage.addEventListener('pointermove',e=>{point(e);},{passive:true});
  stage.addEventListener('pointerleave',()=>{pointer.active=false;pointer.down=false;},{passive:true});
  stage.addEventListener('pointerdown',e=>{point(e);pointer.down=true;},{passive:true});
  stage.addEventListener('pointerup',()=>{pointer.down=false;},{passive:true});
  const drawBall=b=>{
   ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.rot);
   const spikes=8,inner=b.r*.76,outer=b.r;
   ctx.beginPath();
   for(let i=0;i<spikes*2;i++){const a=i*Math.PI/spikes-Math.PI/2,rr=i%2?inner:outer;const x=Math.cos(a)*rr,y=Math.sin(a)*rr;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}
   ctx.closePath();
   ctx.shadowColor=b.color;ctx.shadowBlur=12;
   const g=ctx.createRadialGradient(-b.r*.32,-b.r*.38,1,0,0,b.r*1.2);
   g.addColorStop(0,'#ffffff');g.addColorStop(.16,b.color);g.addColorStop(1,b.color==='#102844'?'#050b13':'#172b43');
   ctx.fillStyle=g;ctx.fill();ctx.shadowBlur=0;
   ctx.strokeStyle='rgba(255,255,255,.45)';ctx.lineWidth=1;ctx.stroke();
   ctx.beginPath();ctx.ellipse(-b.r*.2,-b.r*.35,b.r*.28,b.r*.12,-.55,0,Math.PI*2);
   ctx.fillStyle='rgba(255,255,255,.45)';ctx.fill();
   ctx.restore();
  };
  const step=time=>{
   if(!running)return;
   if(time-last<24){raf=requestAnimationFrame(step);return}last=time;
   ctx.clearRect(0,0,w,h);
   // faint interactive orbit lines
   ctx.save();ctx.strokeStyle='rgba(132,174,199,.10)';ctx.lineWidth=1;
   for(let k=1;k<=3;k++){ctx.beginPath();ctx.ellipse(w/2,h+24,w*(.18+k*.12),h*(.24+k*.1),0,Math.PI,Math.PI*2);ctx.stroke()}
   ctx.restore();
   for(let i=0;i<balls.length;i++){
    const b=balls[i];b.vy+=.035;b.vx*=.999;b.vy*=.999;
    if(pointer.active){
     const dx=b.x-pointer.x,dy=b.y-pointer.y,dist=Math.hypot(dx,dy)||1,reach=b.r+75;
     if(dist<reach){const force=(1-dist/reach)*(pointer.down?2.8:1.15);b.vx+=dx/dist*force;b.vy+=dy/dist*force}
    }
    b.x+=b.vx;b.y+=b.vy;b.rot+=b.spin;
    if(b.x<b.r){b.x=b.r;b.vx=Math.abs(b.vx)*.82}
    if(b.x>w-b.r){b.x=w-b.r;b.vx=-Math.abs(b.vx)*.82}
    if(b.y<b.r){b.y=b.r;b.vy=Math.abs(b.vy)*.8}
    if(b.y>h-b.r-5){b.y=h-b.r-5;b.vy=-Math.abs(b.vy)*.78;b.vx*=.985}
    for(let j=i+1;j<balls.length;j++){
     const o=balls[j],dx=o.x-b.x,dy=o.y-b.y,dist=Math.hypot(dx,dy)||.001,min=b.r+o.r+2;
     if(dist<min){const nx=dx/dist,ny=dy/dist,over=(min-dist)*.5;b.x-=nx*over;b.y-=ny*over;o.x+=nx*over;o.y+=ny*over;const rel=(o.vx-b.vx)*nx+(o.vy-b.vy)*ny;if(rel<0){const impulse=rel*-.78;b.vx-=impulse*nx;b.vy-=impulse*ny;o.vx+=impulse*nx;o.vy+=impulse*ny}}
    }
    b.vx=Math.max(-4,Math.min(4,b.vx));b.vy=Math.max(-4,Math.min(4,b.vy));
    drawBall(b);
   }
   raf=requestAnimationFrame(step);
  };
  resize();window.addEventListener('resize',resize,{passive:true});
  if(reduce){balls.forEach(b=>{b.vx=0;b.vy=0;b.spin=0})}
  const observer=new IntersectionObserver(entries=>{running=entries[0].isIntersecting&&!document.hidden;if(running){last=0;raf=requestAnimationFrame(step)}else cancelAnimationFrame(raf)},{threshold:.01});
  observer.observe(stage);
  document.addEventListener('visibilitychange',()=>{running=!document.hidden&&stage.getBoundingClientRect().bottom>0&&stage.getBoundingClientRect().top<innerHeight;if(running){last=0;raf=requestAnimationFrame(step)}else cancelAnimationFrame(raf)});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();