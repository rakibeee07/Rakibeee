(function(){
  var root=document.documentElement;
  /* theme toggle */
  document.getElementById('theme').addEventListener('click',function(){
    var dark=root.getAttribute('data-theme')?root.getAttribute('data-theme')==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme',dark?'light':'dark');
  });


  /* contact form opens the visitor's email app */
  document.getElementById('send').addEventListener('click',function(){
    var n=document.getElementById('fn').value.trim(),e=document.getElementById('fe').value.trim(),m=document.getElementById('fm').value.trim();
    var note=document.getElementById('msg');
    if(!n||!e||!m){note.textContent='Please fill in your name, email and message first.';return;}
    if(!/^\S+@\S+\.\S+$/.test(e)){note.textContent='Please enter a valid email address.';return;}
    var body=m+'\n\nFrom: '+n+' ('+e+')';
    window.location.href='mailto:mdrakibhasan3907@gmail.com?subject='+encodeURIComponent('Message from '+n)+'&body='+encodeURIComponent(body);
    note.textContent='Your email app should open now. Press send there to deliver the message.';
  });

  /* nav highlight */
  var links=document.querySelectorAll('.nav li a');
  var ids=['home','about','education','skills','projects','cv','contact'];
  function spy(){
    var cur='home',y=window.scrollY+140;
    ids.forEach(function(id){var el=document.getElementById(id);if(el&&el.offsetTop<=y)cur=id;});
    links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur);});
  }
  window.addEventListener('scroll',spy,{passive:true});spy();

  /* hero: three-phase supply, pointer sets frequency */
  var hero=document.getElementById('home'),c=document.getElementById('wave'),x=c.getContext('2d');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t=0,W=0,H=0,dpr=window.devicePixelRatio||1,f=3,tf=3;
  function size(){var r=hero.getBoundingClientRect();W=r.width;H=r.height;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);draw();}
  function draw(){
    x.clearRect(0,0,W,H);
    var cols=['#ff6b5e','#ffc83d','#6c93ff'],amp=H*0.22;
    for(var k=0;k<3;k++){
      x.strokeStyle=cols[k];x.lineWidth=3;x.beginPath();
      for(var i=0;i<=W;i+=4){
        var y=H*0.5-amp*Math.sin(i/W*Math.PI*2*f-t-k*2*Math.PI/3);
        i?x.lineTo(i,y):x.moveTo(i,y);
      }
      x.stroke();
    }
  }
  function loop(){t+=0.03;f+=(tf-f)*0.06;draw();requestAnimationFrame(loop);}
  function move(e){
    var p=e.touches?e.touches[0]:e,r=hero.getBoundingClientRect();
    tf=1.5+Math.max(0,Math.min(1,(p.clientX-r.left)/r.width))*5.5;
    if(reduce){f=tf;draw();}
  }
  hero.addEventListener('pointermove',move);
  hero.addEventListener('touchmove',move,{passive:true});
  window.addEventListener('resize',size);
  size();
  if(!reduce)requestAnimationFrame(loop);

  /* progress + back to top */
  var prog=document.getElementById('prog'),btt=document.getElementById('btt');
  function sc(){var m=root.scrollHeight-innerHeight;prog.style.width=(m>0?scrollY/m*100:0)+'%';var on=scrollY>600;btt.style.opacity=on?1:0;btt.style.pointerEvents=on?'auto':'none';}
  window.addEventListener('scroll',sc,{passive:true});sc();
  btt.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});});

  /* rotating skill in hero */
  var words=['circuit analysis','electrical machines','AutoCAD drawings','MATLAB simulation','programming'],wi=0,rot=document.getElementById('rot');
  if(!reduce)setInterval(function(){wi=(wi+1)%words.length;rot.textContent=words[wi];},2200);

})();
