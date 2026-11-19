/* Floating glossy 3D orbs: interactive on pointer/touch, low-cost and viewport-aware */
(()=>{
 const init=()=>{
  const section=document.querySelector('.signature-wordmark'),stage=section?.querySelector('.signature-ball-playground'),canvas=stage?.querySelector('canvas');
  if(!stage||!canvas||stage.dataset.ballsReady)return;
  const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;stage.dataset.ballsReady='true';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const palette=['#E77B65','#397887','#172B43','#D9E5E7','#E7A16D','#78AAB5','#F2C6B6'];
  const balls=[],pointer={x:-999,y:-999,active:false,down:false};let w=1,h=1,dpr=1,raf=0,last=0,visible=false;
  const rand=(a,b)=>a+Math.random()*(b-a);
  const resize=()=>{
   const r=stage.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);dpr=Math.min(window.devicePixelRatio||1,1.35);
   canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
   const count=window.innerWidth<700?9:15;
   while(balls.length<count){const radius=rand(window.innerWidth<700?6:8,window.innerWidth<700?12:18);balls.push({x:rand(radius,w-radius),y:rand(radius,h-radius),r:radius,vx:rand(-.42,.42),vy:rand(-.62,.18),phase:rand(0,6.28),color:palette[balls.length%palette.length],glow:rand(8,15),spin:rand(-.025,.025)})}
  };
  const setPointer=e=>{const r=stage.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=true};
  stage.addEventListener('pointermove',setPointer,{passive:true});stage.addEventListener('pointerdown',e=>{setPointer(e);pointer.down=true},{passive:true});
  section.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=true},{passive:true});
  const release=()=>{pointer.down=false;pointer.active=false};section.addEventListener('pointerup',release,{passive:true});section.addEventListener('pointerleave',release,{passive:true});
  const draw=b=>{
   ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.phase*.25);
   const glow=ctx.createRadialGradient(0,0,b.r*.2,0,0,b.r+b.glow);glow.addColorStop(0,b.color+'88');glow.addColorStop(.55,b.color+'33');glow.addColorStop(1,b.color+'00');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,b.r+b.glow,0,Math.PI*2);ctx.fill();
   const sphere=ctx.createRadialGradient(-b.r*.36,-b.r*.4,1,0,0,b.r);sphere.addColorStop(0,'#FFFFFF');sphere.addColorStop(.16,'#F7F8F8');sphere.addColorStop(.34,b.color);sphere.addColorStop(1,'#14283F');ctx.fillStyle=sphere;ctx.beginPath();ctx.arc(0,0,b.r,0,Math.PI*2);ctx.fill();
   ctx.strokeStyle='rgba(255,255,255,.78)';ctx.lineWidth=1;ctx.stroke();
   ctx.strokeStyle='rgba(255,255,255,.36)';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(0,0,b.r*.72,-2.5,-.35);ctx.stroke();
   ctx.fillStyle='rgba(255,255,255,.86)';ctx.beginPath();ctx.ellipse(-b.r*.3,-b.r*.37,b.r*.24,b.r*.12,-.6,0,Math.PI*2);ctx.fill();ctx.restore();
  };
  const stop=()=>{if(raf)cancelAnimationFrame(raf);raf=0};
  const frame=now=>{
   raf=0;if(!visible||document.hidden)return;
   if(now-last<30){raf=requestAnimationFrame(frame);return}
   const dt=Math.min(2,(now-last||30)/30);last=now;ctx.clearRect(0,0,w,h);
   for(const b of balls){
    b.phase+=.018*dt;b.vx+=Math.sin(b.phase)*.008*dt;b.vy+=Math.cos(b.phase*.7)*.004*dt;
    if(pointer.active){const dx=b.x-pointer.x,dy=b.y-pointer.y,d=Math.hypot(dx,dy)||1,reach=b.r+95;if(d<reach){const force=(1-d/reach)*(pointer.down?2.4:1.15);b.vx+=dx/d*force*.12*dt;b.vy+=dy/d*force*.12*dt}}
    b.x+=b.vx*dt;b.y+=b.vy*dt;b.vx*=.992;b.vy*=.992;
    if(b.x<b.r){b.x=b.r;b.vx=Math.abs(b.vx)}if(b.x>w-b.r){b.x=w-b.r;b.vx=-Math.abs(b.vx)}
    if(b.y<b.r){b.y=b.r;b.vy=Math.abs(b.vy)}if(b.y>h-b.r){b.y=h-b.r;b.vy=-Math.abs(b.vy)}
    draw(b);
   }
   raf=requestAnimationFrame(frame);
  };
  const start=()=>{if(visible&&!document.hidden&&!raf){last=0;raf=requestAnimationFrame(frame)}};
  resize();const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop()},{threshold:0});io.observe(section);
  const ro=new ResizeObserver(resize);ro.observe(stage);document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  if(reduced){visible=true;ctx.clearRect(0,0,w,h);balls.forEach(draw)}else start();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
