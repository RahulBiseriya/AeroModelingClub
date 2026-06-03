
const canvas=document.getElementById('bg');
const ctx=canvas.getContext('2d');

function resize(){
canvas.width=innerWidth;
canvas.height=innerHeight;
}
resize();
addEventListener('resize',resize);

const stars=[];
for(let i=0;i<250;i++){
stars.push({
x:Math.random()*innerWidth,
y:Math.random()*innerHeight,
z:Math.random()*4+1
});
}

function animate(){
ctx.fillStyle='#050810';
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle='#00d4ff';
stars.forEach(s=>{
s.y+=s.z;
if(s.y>canvas.height){s.y=0;}
ctx.fillRect(s.x,s.y,s.z,s.z);
});
requestAnimationFrame(animate);
}
animate();

const state={battery:false,avionics:false,engine:false,navigation:false,throttle:false};

document.querySelectorAll('.sys').forEach(btn=>{
btn.onclick=()=>{
const k=btn.dataset.key;
state[k]=true;
btn.classList.add('active');
check();
}
});

function check(){
const ready=Object.values(state).every(Boolean);
document.getElementById('status').textContent =
ready ? 'Aircraft Ready For Departure' : 'Complete startup sequence';

document.getElementById('launch').disabled=!ready;
}

document.getElementById('launch').onclick=()=>{
document.body.classList.add('takeoff');
document.getElementById('status').textContent='CLEARED FOR TAKEOFF';

setTimeout(()=>{
window.location.href='index.html';},3000);
};
