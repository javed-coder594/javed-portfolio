/* Lightweight signature orbs: GPU-friendly motion, viewport-paused, pointer-reactive */
(()=>{
 const init=()=>{
  const stage=document.querySelector('.signature-ball-playground'),canvas=stage?.querySelector('canvas');
  if(!stage||!canvas||stage.dataset.ballsReady)return;
  const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;stage.dataset.ballsReady='true';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,mobile=matchMedia('(max-width:700px)').matches;
  const palette=['#E77B65','#397887','#172B43','#D9E5E7','#E7A16D','#78AAB5'];
  const balls=[],pointer={x:-1000,y:-1000,active:false,down:false};let w=0,h=0,dpr=1,raf=0,last=0,visible=false;
  const rand=(a,b)=>a+Math.random()*(b-a);
  const resize=()=>{const r=stage.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);dpr=Math.min(devicePixelRatio||1,1.25);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);const count=mobile?7:11;while(balls.length<count){const radius=rand(mobile?7:9,mobile?13:17);balls.push({x:rand(radius,w-radius),y:rand(0,h),r:radius,vx:rand(-.22,.22),vy:rand(-.48,-.18),phase:rand(0,6.28),color:palette[balls.length%palette.length],glow:rand(5,10)})}};
  const point=e=>{const r=stage.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;pointer.active=true};
  stage.addEventListener('pointermove',point,{passive:true});stage.addEventListener('pointerleave',()=>{pointer.active=false;pointer.down=false},{passive:true});stage.addEventListener('pointerdown',e=>{point(e);pointer.down=true},{passive:true});stage.addEventListener('pointerup',()=>{pointer.down=false},{passive:true});
  const draw=b=>{ctx.save();ctx.translate(b.x,b.y);const glow=ctx.createRadialGradient(0,0,1,0,0,b.r+b.glow);glow.addColorStop(0,b.color+'66');glow.addColorStop(1,b.color+'00');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,b.r+b.glow,0,6.283);ctx.fill();const sphere=ctx.createRadialGradient(-b.r*.34,-b.r*.38,1,0,0,b.r);sphere.addColorStop(0,'#fff');sphere.addColorStop(.22,b.color);sphere.addColorStop(1,'#172B43');ctx.fillStyle=sphere;ctx.beginPath();ctx.arc(0,0,b.r,0,6.283);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.62)';ctx.lineWidth=1;ctx.stroke();ctx.fillStyle='rgba(255,255,255,.58)';ctx.beginPath();ctx.ellipse(-b.r*.28,-b.r*.34,b.r*.23,b.r*.11,-.55,0,6.283);ctx.fill();ctx.restore()};
  const stop=()=>{if(raf)cancelAnimationFrame(raf);raf=0};
  const frame=now=>{raf=0;if(!visible||document.hidden)return;if(now-last<32){raf=requestAnimationFrame(frame);return}const dt=Math.min(2,(now-last||32)/32);last=now;ctx.clearRect(0,0,w,h);for(const b of balls){b.phase+=.012*dt;b.vx+=Math.sin(b.phase)*.006*dt;b.vy-=.0015*dt;if(pointer.active){const dx=b.x-pointer.x,dy=b.y-pointer.y,d=Math.hypot(dx,dy)||1,reach=b.r+68;if(d<reach){const force=(1-d/reach)*(pointer.down?1.25:.48);b.vx+=dx/d*force*.08*dt;b.vy+=dy/d*force*.08*dt}}b.x+=b.vx*dt;b.y+=b.vy*dt;b.vx*=.995;b.vy*=.998;if(b.x<-b.r)b.x=w+b.r;if(b.x>w+b.r)b.x=-b.r;if(b.y<-b.r-5){b.y=h+b.r*.6;b.vy=-rand(.25,.55)}if(b.y>h+b.r)b.y=-b.r;draw(b)}raf=requestAnimationFrame(frame)};
  const start=()=>{if(visible&&!reduced&&!document.hidden&&!raf){last=0;raf=requestAnimationFrame(frame)}};resize();const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else stop()},{threshold:0});io.observe(stage);const ro=new ResizeObserver(resize);ro.observe(stage);document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  if(reduced){balls.forEach(b=>{b.vx=0;b.vy=0});ctx.clearRect(0,0,w,h);balls.forEach(draw)}
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
