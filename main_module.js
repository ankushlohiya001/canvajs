//function to select element from html
let html=query=>document.querySelector(query);
const app=html("#app");
const appTitle=html("#title");
appTitle.innerHTML="testing app!";
let $={
    default:0,
    context:0,
    stroke:true,
    fill:false,
    s_col:"black",
    s_fil:"black",
    s_fil_type:"nonzero",
    fps:60,
    c_pos:{x:0,y:0},
    lin_ang:180
},
mouse={};
//Math functions
const PI=Math.PI;
let dr=ang=>(PI/180)*(ang);
let sin=ang=>Math.sin(dr(ang)),
cos=ang=>Math.cos(dr(ang)),
random=(strt,end)=>Math.floor(Math.random()*(end-strt)+strt);
//Functions that specifie stroke or fill
let sof=(cntxt)=>{
    cntxt.strokeStyle=$.s_col;
    cntxt.fillStyle=$.s_fil;
    $.stroke?cntxt.stroke():"";
    $.fill?cntxt.fill($.s_fil_type):"";
    [$.stroke,$.fill]=[true,false];
},
//setting up FPS for rendering
setFPS=(val)=>$.fps=val;
//function to create new element using js
let newElem=(elem,appnd=app)=>{
    let pkil=document.createElement(elem);
    appnd.appendChild(pkil);
    $[elem]=$.hasOwnProperty(elem)?$[elem]:[];
    $[elem].push(pkil);
    pkil["add"]=(obj)=>{
        for(let i in obj){
            pkil.setAttribute(i,obj[i]);
        }
        }
    return pkil;
};
//function for canvas
let createCanvas=(width=innerWidth,height=innerHeight)=>{
    let canvasEl=newElem("canvas");
    $.cntxt=$.hasOwnProperty("cntxt")?$.cntxt:[];
    $.cntxt.push(canvasEl.getContext("2d"));
    canvasEl.height= height;
    canvasEl.width= width;
};
//function for print
let print=(...whttt)=>console.log(...whttt);
let selCanvas=(canva)=>{
    $.default=canva;
},
selContext=(cntx)=>{
    $.context=cntx;
};
let scale=(x,y,cntxt=$.cntxt[$.context])=>{
    cntxt.scale(1.5*x,1.5*y);
}
export {circle,arc,scale,clock,line,lineStyle,selCanvas,selContext,save,restore,dot,arcTo,bezierCurve,quadraticCurve,PI,sin,cos,random,font,write,move,mouse,setFPS,print,newPath,newElem,createCanvas,rect,lineTo,at,ellipse,fill,noStroke,color}
import {setup,draw} from "./app.js"
//function to exec one time only contains declarations etc.
//frquent used var
setup();
$.cntxt[$.context].scale(1.5,1.5);
const cntt=$.cntxt[$.context],
canvas=$.canvas[$.default];
let [pox,poy]=[$.c_pos.x,$.c_pos.y];
//canvas shapes
//draws a rectangle define width,height
let rect=(wid,hei,cntxt=cntt)=>{
    cntxt.rect(pox,poy,wid,hei);
    sof(cntxt);
},
//function to specifie the location where to draw
//shapes
at=(lox,loy)=>{
    [pox,poy]=[lox,loy];
},
//a function recommended while drawing a line
//it moves context to position defined by
//at function
move=(cntxt=cntt)=>cntxt.moveTo(pox,poy),
//draws a line to point
lineTo=(e_x,e_y,cntxt=cntt)=>{
    cntxt.lineTo(e_x,e_y);
    sof(cntxt);
},
//draws a ellipse using radii
ellipse=(radx,rady,rotate,s_a,e_a,cntxt=cntt)=>{
    cntxt.ellipse(pox,poy,radx,rady,dr(rotate),dr(s_a),dr(e_a));
    sof(cntxt);
},
circle=(rad,cntxt=cntt)=>{
    cntxt.arc(pox,poy,rad,0,44/7);
    sof(cntxt);
},
arc=(rad,s_a,e_a,clck=false,cntxt=cntt)=>{
    cntxt.arc(pox,poy,rad,dr(s_a),dr(e_a),clck);
    sof(cntxt);
},
//fills a closed area with color set using args..
fill=(cls,type)=>{
    [$.fill,$.s_fil,$.s_fil_type]=[true,cls,type];
},
//not to draw lines
noStroke=()=>$.stroke=false,
//set color for stroke
color=(cls)=>$.s_col=cls,
//start a new path
newPath=(cntxt=cntt)=>{
    cntxt.beginPath();
    $.s_col=$.s_fil="black";
},
//write text in canvas
write=(whttt,cntxt=cntt)=>{
    cntxt.strokeStyle=$.s_col;
    cntxt.fillStyle=$.s_fil;
    $.fill?cntxt.fillText(whttt,pox,poy):"";
    $.stroke?cntxt.strokeText(whttt,pox,poy):"";
    [$.stroke,$.fill]=[true,false];
},
font=(font="sans",size="16",cntxt=cntt)=>{
    cntxt.font=`${size}px ${font}`;
},
arcTo=(s_x,s_y,e_x,e_y,rad,cntxt=cntt)=>{
    cntxt.arcTo(s_x,s_y,e_x,e_y,rad);
    sof(cntxt);
},
quadraticCurve=(cp_x,cp_y,e_x,e_y,cntxt=cntt)=>{
    cntxt.quadraticCurveTo(cp_x,cp_y,e_x,e_y);
    sof(cntxt);
},
bezierCurve=(cp0_x,cp0_y,cp1_x,cp1_y,e_x,e_y,cntxt=cntt)=>{
    cntxt.bezierCurveTo(cp0_x,cp0_y,cp1_x,cp1_y,e_x,e_y);
    sof(cntxt);
},
dot=(size=2,cntxt=cntt)=>{
cntxt.arc(pox,poy,size,0,44/7);
cntxt.fill();
},
save=(cntxt=cntt)=>{
    cntxt.save();
},
restore=(cntxt=cntt)=>{
    cntxt.restore();
},
lineStyle=(obj={width:1,cap:"butt",join:"miter"},cntxt=cntt)=>{
    cntxt.lineWidth=obj.width;
    cntxt.lineCap=obj.cap;
    cntxt.lineJoin=obj.join;
},
clock=ang=>{
    $.lin_ang=ang;
},
line=(len,cntxt=cntt)=>{
    lineTo(pox+cos($.lin_ang)*len,poy+sin($.lin_ang)*len);
    sof(cntxt);
};
//starting position of mouse
[mouse.x,mouse.y]=[canvas.width/2,canvas.height/2];
//adding events to our app to capture mouse location
app.addEventListener("mousemove",(mose)=>{
    mouse.x=mose.clientX-8,
    mouse.y=mose.clientY-8;
});
//erase canvas and then rewrite again at specific fps
//defined in setup
setInterval(()=>{
    cntt.clearRect(0,0,canvas.width,canvas.height);
    cntt.beginPath();
    draw();
    // cntt.beginPath();
},1000/$.fps);
