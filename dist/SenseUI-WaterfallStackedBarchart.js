!function(t){function e(a){if(n[a])return n[a].exports;var r=n[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,a){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={initialProperties:{qHyperCubeDef:{qDimensions:[],qMeasures:[],qInitialDataFetch:[{qWidth:3,qHeight:500}]}},definition:{type:"items",component:"accordion",items:{dimensions:{uses:"dimensions",min:2,max:2},measures:{uses:"measures",min:1,max:1},sorting:{uses:"sorting"},settings:{uses:"settings",items:{}},customSection:{component:"expandable-items",label:"Waterfall Stacked Barchart Settings",items:{general:{type:"items",label:"General",items:{sort:{type:"boolean",component:"switch",label:"Sort Dimension (Desc)",ref:"vars.sort",options:[{value:!0,label:"Sort"},{value:!1,label:"Do not Sort"}],defaultValue:!1}}},bar:{type:"items",label:"Bar",items:{fillColor:{type:"string",expression:"none",label:"Bar color Hex Values, separated by comma",defaultValue:"#332288, #88CCEE, #117733, #DDCC77, #CC6677, #3399CC, #99CC66, #275378, #B35A01, #B974FD",ref:"vars.bar.fillColor"},textColor:{type:"string",expression:"none",label:"Text color Hex values, separated by comma",defaultValue:"#FFFFFF, #000000, #FFFFFF, #000000, #000000, #000000, #000000, #FFFFFF, #000000, #000000",ref:"vars.bar.textColor"}}}}}}},support:{snapshot:!0,export:!0,exportData:!0}};e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={totalRows:0,labels:{},labelsCreated:!1,selectedLabels:[],tooltip:{element:function(t){var e=null;return $(".sui-tip").length?(e=t.select(".sui-tip"),e.style("display","none")):e=t.select("body").append("div").attr("class","sui-tip"),e},html:function(t,e){var n='\n                <div class="tt-container">\n                    <div class="tt-row"><div class="tt-item-header">'+e.dataRef2[t.dimension1].title+"</div></div>\n            ";for(var r in e.dataRef2[t.dimension1].data)n+='\n                    <div class="tt-row padding-bottom">\n                        <div class="tt-item-label">\n                            <div class="box" style="background-color: '+a.labels[e.dataRef2[t.dimension1].data[r].dimension2].color+'"></div>\n                            '+e.dataRef2[t.dimension1].data[r].dimension2+':\n                        </div>\n                        <div class="tt-item-value">'+a.roundNumber(e,e.dataRef2[t.dimension1].data[r].measure1Num)+"</div>\n                    </div>\n                ";return n+='\n                    <div class="tt-row border-top padding-top">\n                        <div class="tt-item-label">Total</div>\n                        <div class="tt-item-value">'+a.roundNumber(e,e.dataRef2[t.dimension1].total)+"</div>\n                    </div>\n                </div>\n            ",n}},roundNumber:function(t,e,n){return/^[0-9.]+$/.test(e)&&(e=t.precision&&!n?parseFloat(e).toFixed(2):Math.round(e),e>=1e3&&e<1e6?(e=t.precision&&!n?parseFloat(e/1e3).toFixed(2):Math.round(e/1e3),/\.00$/.test(e)&&(e=e.replace(/\.00$/,"")),e+="K"):e>=1e6&&e<1e9?(e=t.precision&&!n?parseFloat(e/1e6).toFixed(2):Math.round(e/1e6),/\.00$/.test(e)&&(e=e.replace(/\.00$/,"")),e+="M"):e>=1e9&&e<1e12?(e=t.precision&&!n?parseFloat(e/1e9).toFixed(2):Math.round(e/1e9),/\.00$/.test(e)&&(e=e.replace(/\.00$/,"")),e+="B"):e>=1e12&&(e=t.precision&&!n?parseFloat(e/1e12).toFixed(2):Math.round(e/1e12),/\.00$/.test(e)&&(e=e.replace(/\.00$/,"")),e+="T"),t.symbol&&t.symbol.visible&&("$"===t.symbol.char||"€"===t.symbol.char?e=t.symbol.char+e:"other"===t.symbol.char?e=t.symbol.otherPosition?t.symbol.other+" "+e:e+" "+t.symbol.other:t.symbol.char)),e}};e.default=a},function(t,e,n){var a=n(4);"string"==typeof a&&(a=[[t.i,a,""]]);var r={hmr:!0};r.transform=void 0,r.insertInto=void 0;n(6)(a,r);a.locals&&(t.exports=a.locals)},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}var r=n(2),i=a(r),o=n(1),s=a(o),l=n(0),d=a(l),u=window&&window.define||u;u(["qlik","jquery","./d3.min"],function(t,e,n){return{initialProperties:d.default.initialProperties,definition:d.default.definition,support:d.default.support,paint:function(a,r){var o={v:"1.0.3",id:r.qInfo.qId,name:"SUI-StackedBarParetto",data:r.qHyperCube.qDataPages[0].qMatrix.filter(function(t){return!t[0].qIsNull}),height:a.height(),width:a.width(),totalColumns:r.qHyperCube.qSize.qcx,dimension1:{label:r.qHyperCube.qDimensionInfo[0].qFallbackTitle},dimension2:{label:r.qHyperCube.qDimensionInfo[1].qFallbackTitle},measure1:{label:r.qHyperCube.qMeasureInfo[0].qFallbackTitle},selected:[],element:a,layout:r,this:this,margin:{top:20,right:20,bottom:50,left:60},precision:!0,sort:!!r.vars.sort,palette:["#332288","#88CCEE","#117733","#DDCC77","#CC6677","#3399CC","#99CC66","#275378","#B35A01","#B974FD","#993300","#99CCCC","#669933","#898989","#EDA1A1","#C6E2A9","#D4B881","#137D77","#D7C2EC","#FF5500","#15DFDF","#93A77E","#CB5090","#BFBFBF"],paletteText:["#FFFFFF","#000000","#FFFFFF","#000000","#000000","#000000","#000000","#FFFFFF","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"],bar:{fillColor:r.vars.bar.fillColor?r.vars.bar.fillColor.split(","):["#332288","#88CCEE","#117733","#DDCC77","#CC6677","#3399CC","#99CC66","#275378","#B35A01","#B974FD","#993300","#99CCCC","#669933","#898989","#EDA1A1","#C6E2A9","#D4B881","#137D77","#D7C2EC","#FF5500","#15DFDF","#93A77E","#CB5090","#BFBFBF"],textColor:r.vars.bar.textColor?r.vars.bar.textColor.split(","):["#FFFFFF","#000000","#FFFFFF","#000000","#000000","#000000","#000000","#FFFFFF","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000","#000000"]},label:{visible:1,width:150,characters:50,rightPadding:50,padding:15,minWidth:100},font:{size:10},tooltip:{visible:1}};s.default.totalRows=s.default.totalRows?s.default.totalRows:r.qHyperCube.qSize.qcy;var l=s.default.tooltip.element(n);o.this.backendApi.hasSelections()||(s.default.labels={},s.default.labelsCreated=!1,s.default.selectedLabels=[]);var d=0;o.dataRef=[];for(var u=0;u<o.data.length;u++){var f=d;d+=o.data[u][2].qNum;var c=d;o.dataRef.push({dimension1:o.data[u][0].qText,dimension2:o.data[u][1].qText,measure1:o.data[u][2].qText,measure1Num:o.data[u][2].qNum,qElemNumber1:o.data[u][0].qElemNumber,start:f,end:c})}o.dataRef2=[];var p=0;d=0;var m=0;for(u=0;u<o.data.length;u++)o.dataRef2[o.data[u][0].qText]||(o.dataRef2[o.data[u][0].qText]={title:o.data[u][0].qText,data:[],total:0,amount:0,cumulativeAmount:0},m+=1),f=d,d+=o.data[u][2].qNum,c=d,o.dataRef2[o.data[u][0].qText].data.push({dimension1:o.data[u][0].qText,dimension2:o.data[u][1].qText,measure1:o.data[u][2].qText,measure1Num:o.data[u][2].qNum,qElemNumber1:o.data[u][0].qElemNumber,qElemNumber2:o.data[u][1].qElemNumber,start:f,end:c,class:o.data[u][1].qNum>=0?"positive":"negative"}),s.default.labelsCreated||(s.default.labels[o.data[u][1].qText]?s.default.labels[o.data[u][1].qText].total+=o.data[u][2].qNum:(s.default.labels[o.data[u][1].qText]={title:o.data[u][1].qText,qElemNumber:o.data[u][1].qElemNumber,color:o.bar.fillColor[p],textColor:o.bar.textColor[p],total:o.data[u][2].qNum},p+=1));s.default.labelsCreated=!0,f=0,c=0;var b=o.dataRef[o.dataRef.length-1].end;if(m>1)for(var h in s.default.labels)(0===s.default.selectedLabels.length||s.default.selectedLabels.includes(h))&&(c+=s.default.labels[h].total,o.dataRef.push({dimension1:"Total",dimension2:h,measure1:s.default.labels[h].total,measure1Num:s.default.labels[h].total,start:f,end:c,qElemNumber1:s.default.labels[h].qElemNumber,percentage:parseInt(s.default.labels[h].total/b*100)+"%"}),f=c);var x=0,v=null;for(h in o.dataRef2){o.dataRef2[h].start=x;var g=!0,y=!1,C=void 0;try{for(var R,F=o.dataRef2[h].data[Symbol.iterator]();!(g=(R=F.next()).done);g=!0){var w=R.value;o.dataRef2[h].amount+=w.measure1Num,o.dataRef2[h].total+=w.measure1Num}}catch(t){y=!0,C=t}finally{try{!g&&F.return&&F.return()}finally{if(y)throw C}}x+=o.dataRef2[h].amount,o.dataRef2[h].end=x,o.dataRef2[h].cumulativeAmount=v?o.dataRef2[h].amount+o.dataRef2[v].cumulativeAmount:o.dataRef2[h].amount,v=h}for(h in o.dataRef2)o.dataRef2[h].cumulativePercentage=parseFloat((o.dataRef2[h].cumulativeAmount/x).toFixed(2));o.dataRef2.Total={title:"Total",data:[],total:0,amount:0,cumulativeAmount:0};for(u in o.dataRef)"Total"===o.dataRef[u].dimension1&&(o.dataRef2.Total.data.push({dimension1:o.dataRef[u].dimension1,dimension2:o.dataRef[u].dimension2,measure1:o.dataRef[u].measure1,measure1Num:o.dataRef[u].measure1Num}),o.dataRef2.Total.total+=o.dataRef[u].measure1Num);o.dataRef3=[];for(h in o.dataRef2)o.dataRef3.push(o.dataRef2[h]);if(o.sort){o.dataRef3.sort(function(t,e){return"Total"===t.title||"Total"===e.title?-1:t.total<e.total});var q=[];f=c=0;var k=1;for(h in o.dataRef3)for(var T in o.dataRef)if(o.dataRef[T].dimension1===o.dataRef3[h].title&&"Total"!==o.dataRef[T].dimension1){var B=o.dataRef[T];B.start=q[k-1]?q[k-1].end:f,B.end=B.start+B.measure1Num,q.push(B),f=B.end,k+=1}else if(o.dataRef[T].dimension1===o.dataRef3[h].title&&"Total"===o.dataRef[T].dimension1){var N=o.dataRef[T];q.push(N)}o.dataRef=q;for(h in o.dataRef3)h=parseInt(h),0===h?(o.dataRef3[h].start=0,o.dataRef3[h].end=o.dataRef3[h].total):h&&"Total"!==o.dataRef3[h].title&&(o.dataRef3[h].start=o.dataRef3[h-1].end,o.dataRef3[h].end=o.dataRef3[h].start+o.dataRef3[h].total)}o.css=i.default,o.css+="\n                #"+o.id+"_inner .outer,\n                #"+o.id+"_inner .content {\n                    overflow-x: auto;\n                    overflow-y: hidden;\n                }\n                #"+o.id+"_inner .content .legend {\n                    font-size: "+o.font.size+"px;\n                }\n            ",e("#"+o.id+"_css").length&&e("#"+o.id+"_css").remove();var A="";for(var E in s.default.labels)A+='<div class="column" style="font-size: '+o.font.size+'px;" key="'+E+'" qelemnumber="'+s.default.labels[E].qElemNumber+'"><div class="box" style="background-color:'+s.default.labels[E].color+'"></div>'+s.default.labels[E].title+"</div>";o.template='\n                <div id="'+o.id+'_inner" class="senseui-StackedBarParetto">\n                    <div class="content"></div>\n                    <div class="legend">'+A+"</div>\n                </div>\n            ",e('<style id="'+o.id+'_css">').html(o.css).appendTo("head"),a.html(o.template),e("#"+o.id+"_inner .column").on("click",function(t){var e=parseInt(t.target.attributes.qelemnumber.value),n=t.target.attributes.key.value;o.this.backendApi.selectValues(1,[e],!0),s.default.selectedLabels.includes(n)?s.default.selectedLabels.splice(s.default.selectedLabels.indexOf(n),1):s.default.selectedLabels.push(n)});var S=parseInt(o.bar.width)&&o.bar.width*o.totalRows>o.width?o.bar.width*o.totalRows:o.width-o.margin.left-o.margin.right,D=o.height-o.margin.top-o.margin.bottom,L=n.scaleBand().rangeRound([0,S]).padding(.3),P=n.scaleLinear().range([D,0]),M=n.axisBottom(L),I=n.axisLeft(P);L.domain(o.dataRef.map(function(t){return t.dimension1})),P.domain([0,n.max(o.dataRef,function(t){return t.end})]);var j=n.select("#"+o.id+"_inner .content").append("svg").attr("width",S+o.margin.left+o.margin.right).attr("height",D+o.margin.top+o.margin.bottom/2).append("g").attr("transform","translate("+o.margin.left+","+o.margin.top+")");return j.append("g").attr("class","x axis").attr("transform","translate(0,"+D+")").call(M).selectAll("text"),j.append("g").attr("class","y axis").call(I.tickFormat(function(t){return s.default.roundNumber(o,t)})),j.selectAll(".bar").data(o.dataRef).enter().append("rect").attr("height",0).attr("class",function(t){return"bar "+t.class}).attr("x",function(t){return L(t.dimension1)}).attr("width",L.bandwidth()).attr("y",function(t){return P(Math.max(t.start,t.end))}).attr("height",function(t){return Math.abs(P(t.start)-P(t.end))}).attr("style",function(t){return"fill:"+s.default.labels[t.dimension2].color+";"}).on("mousemove",function(t){o.tooltip.visible&&l.html(s.default.tooltip.html(t,o)).style("left",n.event.pageX-e(".sui-tip").width()/2+"px").style("top",n.event.pageY-e(".sui-tip").height()-10+"px").style("display","inline-block")}).on("mouseout",function(){l.style("display","none")}).on("click",function(t){"Total"===t.dimension1?(o.this.backendApi.selectValues(1,[t.qElemNumber1],!0),s.default.selectedLabels.includes(t.dimension2)?s.default.selectedLabels.splice(s.default.selectedLabels.indexOf(t.dimension2),1):s.default.selectedLabels.push(t.dimension2)):o.this.backendApi.selectValues(0,[t.qElemNumber1],!0),l.style("display","none")}),j.selectAll(".text").data(o.dataRef3).enter().append("text").style("font-size","10px").attr("text-anchor","middle").attr("x",function(t){return L(t.title)+L.bandwidth()/2}).attr("y",function(t){return P(t.end)-5}).text(function(t){return s.default.roundNumber(o,t.total)}),j.selectAll(".text").data(o.dataRef).enter().filter(function(t){return"Total"===t.dimension1}).append("text").style("font-size","10px").attr("text-anchor","middle").attr("x",function(t){return L(t.dimension1)+L.bandwidth()/2}).attr("y",function(t){return P(t.end)+(P(t.start)-P(t.end))/2+5}).attr("style",function(t){return"font-size:10px; fill:"+s.default.labels[t.dimension2].textColor+";"}).text(function(t){return t.percentage}),j.selectAll(".x.axis .tick").on("click",function(t){o.this.backendApi.selectValues(0,[o.dataRef2[t].data[0].qElemNumber1],!0)}),console.info("%c "+o.name+" "+o.v+": ","color: red",o.id+" Loaded!"),t.Promise.resolve()}}})},function(t,e,n){e=t.exports=n(5)(!1),e.push([t.i,'.senseui-StackedBarParetto .legend {\n  text-align: center;\n}\n.senseui-StackedBarParetto .legend .column {\n  display: inline-block;\n  padding-right: 10px;\n  cursor: pointer;\n}\n.senseui-StackedBarParetto .box {\n  display: inline-block;\n  margin-right: 3px;\n  width: 10px;\n  height: 10px;\n}\n.senseui-StackedBarParetto .line {\n  fill: none;\n  stroke: purple;\n  stroke-width: 1.5px;\n}\n.senseui-StackedBarParetto .line.connector {\n  stroke: grey;\n  stroke-dasharray: 3;\n}\n.senseui-StackedBarParetto .bar {\n  cursor: pointer;\n}\n.senseui-StackedBarParetto .bar:hover {\n  fill: #77b62a;\n}\n.senseui-StackedBarParetto .bar text {\n  fill: white;\n  font: 12px sans-serif;\n  text-anchor: middle;\n}\n.senseui-StackedBarParetto .axis text {\n  font: 10px sans-serif;\n  fill: gray;\n}\n.senseui-StackedBarParetto .axis path,\n.senseui-StackedBarParetto .axis line {\n  fill: none;\n  stroke: lightgray;\n  shape-rendering: crispEdges;\n}\n.senseui-StackedBarParetto .domain {\n  stroke: gray;\n}\n.senseui-StackedBarParetto .x.axis .tick {\n  cursor: pointer;\n}\n/* TOOLTIP */\n.sui-tip {\n  position: absolute;\n  font-size: 11px;\n  padding: 8px;\n  background: white !important;\n  color: #666666;\n  border: 1px solid #CCCCCC;\n  /* #404040 = 64,64,64 */\n  border-radius: 2px;\n  box-sizing: border-box;\n  background-color: rgba(64, 64, 64, 0.9);\n  line-height: 1.5;\n  border-radius: 5px;\n  max-width: 350px;\n  -webkit-transition: opacity 1s;\n  /* Safari */\n  transition: opacity 1s;\n  z-index: 1022;\n  font-family: Arial, Helvetica, sans-serif !important;\n  -webkit-box-shadow: 0px 4px 7px -4px #999999;\n  -moz-box-shadow: 0px 4px 7px -4px #999999;\n  box-shadow: 0px 4px 7px -4px #999999;\n}\n.sui-tip .dimension {\n  font-weight: bold;\n  font-size: 14px;\n  display: block;\n}\n.sui-tip .measure {\n  display: block;\n}\n.sui-tip .box {\n  width: 10px;\n  height: 10px;\n  display: inline-block;\n  margin-right: 5px;\n  border: 1px solid #CCCCCC;\n}\n.sui-tip:after,\n.sui-tip:before {\n  top: 100%;\n  left: 50%;\n  border: solid transparent;\n  content: " ";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n}\n.sui-tip:after {\n  border-color: rgba(255, 255, 255, 0);\n  border-top-color: #ffffff;\n  border-width: 10px;\n  margin-left: -10px;\n}\n.sui-tip:before {\n  border-color: rgba(153, 153, 153, 0);\n  border-top-color: #999999;\n  border-width: 11px;\n  margin-left: -11px;\n}\n.sui-tip .tt-container {\n  display: -webkit-flex;\n  display: flex;\n  flex: 1 0 0;\n  flex-flow: column wrap;\n}\n.sui-tip .tt-container .tt-row {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n  -webkit-justify-content: flex-start;\n  justify-content: flex-start;\n}\n.sui-tip .tt-container .tt-row .tt-item-header {\n  flex: 1 0 100%;\n  box-sizing: border-box;\n  background: white;\n  color: #666666;\n  padding-bottom: 5px;\n  font-size: 12px;\n  font-weight: bold;\n}\n.sui-tip .tt-container .tt-row .tt-item-label {\n  flex: 1 0 auto;\n  box-sizing: border-box;\n  background: white;\n  color: #666666;\n}\n.sui-tip .tt-container .tt-row .tt-item-value {\n  flex: 1 0 auto;\n  box-sizing: border-box;\n  background: white;\n  color: #333333;\n  text-align: right;\n  padding-left: 5px;\n}\n.sui-tip .tt-container .tt-row:nth-child(2) {\n  padding-top: 5px;\n}\n.sui-tip .border-top {\n  border-top: 1px solid lightgray;\n}\n.sui-tip .padding-top {\n  padding-top: 5px;\n}\n.sui-tip .padding-bottom {\n  padding-bottom: 5px;\n}\n',""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=a(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([i]).join("\n")}return[n].join("\n")}function a(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var a=n(e,t);return e[2]?"@media "+e[2]+"{"+a+"}":a}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(a[i]=!0)}for(r=0;r<t.length;r++){var o=t[r];"number"==typeof o[0]&&a[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(t,e,n){function a(t,e){for(var n=0;n<t.length;n++){var a=t[n],r=m[a.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](a.parts[i]);for(;i<a.parts.length;i++)r.parts.push(u(a.parts[i],e))}else{for(var o=[],i=0;i<a.parts.length;i++)o.push(u(a.parts[i],e));m[a.id]={id:a.id,refs:1,parts:o}}}}function r(t,e){for(var n=[],a={},r=0;r<t.length;r++){var i=t[r],o=e.base?i[0]+e.base:i[0],s=i[1],l=i[2],d=i[3],u={css:s,media:l,sourceMap:d};a[o]?a[o].parts.push(u):n.push(a[o]={id:o,parts:[u]})}return n}function i(t,e){var n=x(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var a=y[y.length-1];if("top"===t.insertAt)a?a.nextSibling?n.insertBefore(e,a.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),y.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=x(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,r)}}function o(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=y.indexOf(t);e>=0&&y.splice(e,1)}function s(t){var e=document.createElement("style");return t.attrs.type="text/css",d(e,t.attrs),i(t,e),e}function l(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",d(e,t.attrs),i(t,e),e}function d(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function u(t,e){var n,a,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var d=g++;n=v||(v=s(e)),a=f.bind(null,n,d,!1),r=f.bind(null,n,d,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(e),a=p.bind(null,n,e),r=function(){o(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),a=c.bind(null,n),r=function(){o(n)});return a(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;a(t=e)}else r()}}function f(t,e,n,a){var r=n?"":a.css;if(t.styleSheet)t.styleSheet.cssText=R(e,r);else{var i=document.createTextNode(r),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(i,o[e]):t.appendChild(i)}}function c(t,e){var n=e.css,a=e.media;if(a&&t.setAttribute("media",a),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var a=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(a=C(a)),r&&(a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([a],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(o),s&&URL.revokeObjectURL(s)}var m={},b=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),h=function(t){return document.querySelector(t)},x=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=h.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),v=null,g=0,y=[],C=n(7);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=b()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return a(n,e),function(t){for(var i=[],o=0;o<n.length;o++){var s=n[o],l=m[s.id];l.refs--,i.push(l)}if(t){a(r(t,e),e)}for(var o=0;o<i.length;o++){var l=i[o];if(0===l.refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete m[l.id]}}}};var R=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,a=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r))return t;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:a+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}}]);