(this["webpackJsonpwallpaper-generator"]=this["webpackJsonpwallpaper-generator"]||[]).push([[0],{14:function(e,i,t){},15:function(e,i,t){},27:function(e,i,t){"use strict";t.r(i);var n=t(1),o=t.n(n),s=t(5),d=t.n(s),r=(t(14),t(2)),a=t(3),h=t(9),c=t(8),g=(t(15),t(6)),u=t.n(g),l=t(7),w=t.n(l),p=function(){function e(i,t,n,o,s){Object(r.a)(this,e),this.Fill=void 0,this.RidgeXStart=void 0,this.RidgeYStart=void 0,this.Smoodness=void 0,this.Amplitude=void 0,this.NoiceStart=void 0,this.Fill=i,this.RidgeXStart=0,this.RidgeYStart=t,this.Smoodness=n,this.Amplitude=o,this.NoiceStart=s}return Object(a.a)(e,[{key:"DrawRidge",value:function(e){e.beginShape(),e.noStroke(),e.fill(this.Fill),e.vertex(0,e.windowHeight);var i=this.NoiceStart,t=this.RidgeYStart-e.noise(i)*this.Amplitude;e.vertex(0,t);for(var n=0;n<=e.windowWidth;n+=this.Smoodness)e.vertex(n,t),i+=.03,t=this.RidgeYStart-e.noise(i)*this.Amplitude;e.vertex(e.windowWidth,t),e.vertex(e.windowWidth,e.windowHeight),e.endShape(e.CLOSE)}}]),e}(),b=t(0),S=function e(){Object(r.a)(this,e),this.Amplitude=100,this.Smoodness=5,this.NumberOfRidges=4,this.SpaceBetweenRidges=100,this.RidgeColor="#732e09",this.MoonXPosition=0,this.MoonYPosition=0,this.MoonSize=300},R=function(){var e=new S;return Object(b.jsx)("div",{children:Object(b.jsx)(u.a,{setup:function(i,t){i.createCanvas(i.windowWidth,i.windowHeight).parent(t),e.MoonXPosition=i.windowWidth/10*i.random(2,8),e.MoonYPosition=i.height-e.SpaceBetweenRidges*e.NumberOfRidges-i.noise(0)*e.Amplitude*1.5;var n=w.a.create(20,20,"Settings");n.bindRange("Amplitude",0,300,e.Amplitude,1,e),n.bindRange("Smoodness",1,10,e.Smoodness,.2,e),n.bindRange("NumberOfRidges",1,10,e.NumberOfRidges,1,e),n.bindRange("SpaceBetweenRidges",50,200,e.SpaceBetweenRidges,1,e),n.bindColor("RidgeColor","#732e09",e),n.bindRange("MoonXPosition",0,i.windowWidth,e.MoonXPosition,1,e),n.bindRange("MoonYPosition",0,i.windowHeight,e.MoonYPosition,1,e),n.bindRange("MoonSize",0,1e3,e.MoonSize,1,e),n.setGlobalChangeHandler((function(){return i.redraw()})),i.noLoop()},draw:function(i){var t=i.color(e.RidgeColor),n=i.red(t),o=i.green(t),s=i.blue(t),d=0,r=0;i.background(51),i.fill(230),i.ellipse(e.MoonXPosition,e.MoonYPosition,e.MoonSize);for(var a=e.NumberOfRidges;a>=1;a--){var h=i.height-e.SpaceBetweenRidges*a-.3*e.Amplitude;new p(i.color(n+d,o+r,s),h,e.Smoodness,e.Amplitude,a^10*a).DrawRidge(i),d+=30,r+=20}},windowResized:function(e){e.resizeCanvas(e.windowWidth,e.windowHeight)}})})},f=function(e){Object(h.a)(t,e);var i=Object(c.a)(t);function t(){return Object(r.a)(this,t),i.apply(this,arguments)}return Object(a.a)(t,[{key:"render",value:function(){return Object(b.jsx)("div",{className:"App",children:Object(b.jsx)(R,{})})}}]),t}(o.a.Component),m=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,28)).then((function(i){var t=i.getCLS,n=i.getFID,o=i.getFCP,s=i.getLCP,d=i.getTTFB;t(e),n(e),o(e),s(e),d(e)}))};d.a.render(Object(b.jsx)(o.a.StrictMode,{children:Object(b.jsx)(f,{})}),document.getElementById("root")),m()}},[[27,1,2]]]);
//# sourceMappingURL=main.f703f144.chunk.js.map