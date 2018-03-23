import css from './index.less';
import util from './utilities';
import properties from './properties'

const define = (window && window.define) || define;

define([
	'qlik',
	'jquery',
	'./d3.min'
],
	function (qlik, $, d3) {
		"use strict";
		return {
			initialProperties: properties.initialProperties,
			definition: properties.definition,
			support: properties.support,
			paint: function ($element, layout) {
				var vars = {
					v: '1.0.6',
					id: layout.qInfo.qId,
					name: 'SUI-StackedBarParetto',
					data: layout.qHyperCube.qDataPages[0].qMatrix.filter(d => !d[0].qIsNull),
					height: $element.height(),
					width: $element.width(),
					totalColumns: layout.qHyperCube.qSize.qcx,
					dimension1: {
						label: layout.qHyperCube.qDimensionInfo[0].qFallbackTitle
					},
					dimension2: {
						label: layout.qHyperCube.qDimensionInfo[1].qFallbackTitle
					},
					measure1: {
						label: layout.qHyperCube.qMeasureInfo[0].qFallbackTitle,
					},
					selected: [],
					element: $element,
					layout: layout,
					this: this,
					margin: { top: 20, right: 60, bottom: 50, left: 60 },
					precision: true,
					sort: (layout.vars.sort) ? true : false,
					palette: ['#332288', '#88CCEE', '#117733', '#DDCC77', '#CC6677', '#3399CC', '#99CC66', '#275378', '#B35A01', '#B974FD', '#993300', '#99CCCC', '#669933', '#898989', '#EDA1A1', '#C6E2A9', '#D4B881', '#137D77', '#D7C2EC', '#FF5500', '#15DFDF', '#93A77E', '#CB5090', '#BFBFBF'],
					paletteText: ['#FFFFFF', '#000000', '#FFFFFF', '#000000', '#000000', '#000000', '#000000', '#FFFFFF', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
					bar: {
						fillColor: (layout.vars.bar.fillColor) ? layout.vars.bar.fillColor.split(',') : ['#332288', '#88CCEE', '#117733', '#DDCC77', '#CC6677', '#3399CC', '#99CC66', '#275378', '#B35A01', '#B974FD', '#993300', '#99CCCC', '#669933', '#898989', '#EDA1A1', '#C6E2A9', '#D4B881', '#137D77', '#D7C2EC', '#FF5500', '#15DFDF', '#93A77E', '#CB5090', '#BFBFBF'],
						textColor: (layout.vars.bar.textColor) ? layout.vars.bar.textColor.split(',') : ['#FFFFFF', '#000000', '#FFFFFF', '#000000', '#000000', '#000000', '#000000', '#FFFFFF', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
					},
					line: {
						show: (layout.vars.line.show) ? true : false,
						color: (layout.vars.line.color) ? layout.vars.line.color : '#9e9e9e',
						position: (layout.vars.line.position) ? layout.vars.line.position : 0.8,
					},
					label: {
						visible: 1,
						width: 150,
						characters: 50,
						rightPadding: 50,
						padding: 15,
						minWidth: 100
					},
					font: {
						size: 10,
					},
					tooltip: {
						visible: 1
					},
					yaxis: (layout.vars.yaxis) ? true : false,
				};
				util.totalRows = (util.totalRows) ? util.totalRows : layout.qHyperCube.qSize.qcy;
				const tip = util.tooltip.element(d3);
				// If all selections are cleared from the toolbar, then clear selected in the extension
				if (!vars.this.backendApi.hasSelections()) {
					util.labels = {};
					util.labelsCreated = false;
					util.selectedLabels = [];
				}
				/*****************
				* DATA
				*****************/
				var cumulative = 0;
				vars.dataRef = [];
				for (var i = 0; i < vars.data.length; i++) {
					var start = cumulative;
					cumulative += vars.data[i][2].qNum;
					var end = cumulative;
					vars.dataRef.push({
						"dimension1": vars.data[i][0].qText,
						"dimension2": vars.data[i][1].qText,
						"measure1": vars.data[i][2].qText,
						"measure1Num": vars.data[i][2].qNum,
						"qElemNumber1": vars.data[i][0].qElemNumber,
						"start": start,
						"end": end
					})
				}
				vars.dataRef2 = [];
				var index = 0
				cumulative = 0
				var totalDimension1 = 0;
				for (i = 0; i < vars.data.length; i++) {
					if (!vars.dataRef2[vars.data[i][0].qText]) {
						vars.dataRef2[vars.data[i][0].qText] = {
							title: vars.data[i][0].qText,
							data: [],
							total: 0,
							amount: 0,
							cumulativeAmount: 0
						};
						totalDimension1 += 1;
					}
					start = cumulative;
					cumulative += vars.data[i][2].qNum;
					end = cumulative;
					vars.dataRef2[vars.data[i][0].qText].data.push({
						"dimension1": vars.data[i][0].qText,
						"dimension2": vars.data[i][1].qText,
						"measure1": vars.data[i][2].qText,
						"measure1Num": vars.data[i][2].qNum,
						"qElemNumber1": vars.data[i][0].qElemNumber,
						"qElemNumber2": vars.data[i][1].qElemNumber,
						"start": start,
						"end": end,
						"class": (vars.data[i][1].qNum >= 0) ? 'positive' : 'negative'
					})
					// Do the labels
					if (!util.labelsCreated) {
						if (!util.labels[vars.data[i][1].qText]) {
							util.labels[vars.data[i][1].qText] = {
								title: vars.data[i][1].qText,
								qElemNumber: vars.data[i][1].qElemNumber,
								color: vars.bar.fillColor[index],
								textColor: vars.bar.textColor[index],
								total: vars.data[i][2].qNum
							}
							index += 1;
						} else {
							util.labels[vars.data[i][1].qText].total += vars.data[i][2].qNum;
						}
					}
				}
				// Mark it as done so no redraw upon selections
				util.labelsCreated = true;
				// Add the sum totals for each dimension2
				start = 0;
				end = 0;
				var grandTotal = vars.dataRef[vars.dataRef.length - 1].end;
				if (totalDimension1 > 1) {
					for (var key in util.labels) {
						if (util.selectedLabels.length === 0 || util.selectedLabels.includes(key)) {
							end += util.labels[key].total
							vars.dataRef.push({
								"dimension1": 'Total',
								"dimension2": key,
								"measure1": util.labels[key].total,
								"measure1Num": util.labels[key].total,
								"start": start,
								"end": end,
								"qElemNumber1": util.labels[key].qElemNumber,
								"percentage": parseInt((util.labels[key].total / grandTotal) * 100) + '%'
							})
							start = end;
						}
					}
				}
				//typecast Amount to #, calculate total, and cumulative amounts
				var totalAmount = 0;
				var previousKey = null;
				for (key in vars.dataRef2) {
					vars.dataRef2[key].start = totalAmount;
					for (var value of vars.dataRef2[key].data) {
						vars.dataRef2[key].amount += value.measure1Num;
						vars.dataRef2[key].total += value.measure1Num;
					}
					totalAmount += vars.dataRef2[key].amount;
					vars.dataRef2[key].end = totalAmount;
					if (previousKey) {
						vars.dataRef2[key].cumulativeAmount = vars.dataRef2[key].amount + vars.dataRef2[previousKey].cumulativeAmount;
					} else {
						vars.dataRef2[key].cumulativeAmount = vars.dataRef2[key].amount;
					}
					previousKey = key;
				}
				//now calculate cumulative % from the cumulative amounts & total, round %
				for (key in vars.dataRef2) {
					vars.dataRef2[key]['cumulativePercentage'] = parseFloat((vars.dataRef2[key].cumulativeAmount / totalAmount).toFixed(2));
				}
				// Add the totals from dataRef, to dataRef2 & dataRef3 for the tooltips
				vars.dataRef2['Total'] = {
					title: 'Total',
					data: [],
					total: 0,
					amount: 0,
					cumulativeAmount: 0
				};
				for (i in vars.dataRef) {
					if (vars.dataRef[i].dimension1 === 'Total') {
						vars.dataRef2['Total'].data.push({
							"dimension1": vars.dataRef[i].dimension1,
							"dimension2": vars.dataRef[i].dimension2,
							"measure1": vars.dataRef[i].measure1,
							"measure1Num": vars.dataRef[i].measure1Num
						})
						vars.dataRef2['Total'].total += vars.dataRef[i].measure1Num;
					}
				}
				// Dump the vars.dataRef2 into an array of objects so d3 can use
				vars.dataRef3 = [];
				for (key in vars.dataRef2) {
					vars.dataRef3.push(vars.dataRef2[key])
				}
				if (vars.sort) {
					// Sort xaxis desc
					vars.dataRef3.sort(function (a, b) {
						if (a.title === 'Total' || b.title === 'Total') return -1
						return a.total < b.total;
					});
					// Redefine the start & end points on the yaxis
					let dataRefTemp = [];
					start = end = 0;
					let index = 1;
					for (key in vars.dataRef3) {
						for (let key2 in vars.dataRef) {
							if (vars.dataRef[key2].dimension1 === vars.dataRef3[key].title && vars.dataRef[key2].dimension1 !== 'Total') {
								let temp = vars.dataRef[key2];
								temp.start = (dataRefTemp[index - 1]) ? dataRefTemp[index - 1].end : start;
								temp.end = temp.start + temp.measure1Num
								dataRefTemp.push(temp);
								start = temp.end;
								index += 1;
							} else if (vars.dataRef[key2].dimension1 === vars.dataRef3[key].title && vars.dataRef[key2].dimension1 === 'Total') {
								let temp = vars.dataRef[key2];
								dataRefTemp.push(temp);
							}
						}
					}
					vars.dataRef = dataRefTemp;
					for (key in vars.dataRef3) {
						key = parseInt(key)
						if (key === 0) {
							vars.dataRef3[key].start = 0;
							vars.dataRef3[key].end = vars.dataRef3[key].total;
						} else if (key && vars.dataRef3[key].title !== 'Total') {
							vars.dataRef3[key].start = vars.dataRef3[key - 1].end;
							vars.dataRef3[key].end = vars.dataRef3[key].start + vars.dataRef3[key].total;
						}
					}
				}

				/*****************
				* CSS & HTML
				*****************/
				// Combine the css and inject
				vars.css = css;
				vars.css += `
                #${vars.id}_inner .outer,
                #${vars.id}_inner .content {
                    overflow-x: auto;
                    overflow-y: hidden;
                }
                #${vars.id}_inner .content .legend {
                    font-size: ${vars.font.size}px;
                }
            `;
				if ($(`#${vars.id}_css`).length) { // insert only once
					$(`#${vars.id}_css`).remove();
				}
				var legend = '';
				for (let key in util.labels) {
					legend += `<div class="column" style="font-size: ${vars.font.size}px;" key="${key}" qelemnumber="${util.labels[key].qElemNumber}"><div class="box" style="background-color:${util.labels[key].color}"></div>${util.labels[key].title}</div>`
				}
				// Insert the template for manipulation
				vars.template = `
                <div id="${vars.id}_inner" class="senseui-StackedBarParetto">
                    <div class="content"></div>
                    <div class="legend">${legend}</div>
                </div>
            `;
				$(`<style id="${vars.id}_css">`).html(vars.css).appendTo("head")
				$element.html(vars.template)

				/*****************
				* UTILITIES
				*****************/
				$(`#${vars.id}_inner .column`).on('click', (e) => {
					var qElemNumber = parseInt(e.target.attributes.qelemnumber.value);
					var key = e.target.attributes.key.value;
					vars.this.backendApi.selectValues(1, [qElemNumber], true);
					if (util.selectedLabels.includes(key)) {
						util.selectedLabels.splice(util.selectedLabels.indexOf(key), 1);
					} else {
						util.selectedLabels.push(key)
					}
				})

				/*****************
				* D3
				*****************/
				let width = (parseInt(vars.bar.width) && (vars.bar.width * vars.totalRows > vars.width)) ? vars.bar.width * vars.totalRows : vars.width - vars.margin.left - vars.margin.right,
					height = vars.height - vars.margin.top - vars.margin.bottom,
					padding = 0.3;

				var x = d3.scaleBand()
					.rangeRound([0, width])
					.padding(padding)
				let y = d3.scaleLinear()
					.range([height, 0])
				// var ycum = d3.scaleLinear().domain([0, 1]).range([height, 0]); // Pareto Line
				var xAxis = d3.axisBottom(x);
				var yAxis = (vars.yaxis) ? d3.axisRight(y) : d3.axisLeft(y);
				x.domain(vars.dataRef.map(function (d) { return d.dimension1; }));
				y.domain([0, d3.max(vars.dataRef, function (d) { return d.end; })]);
				var chart = d3.select(`#${vars.id}_inner .content`).append("svg")
					.attr("width", width + vars.margin.left + vars.margin.right)
					.attr("height", height + vars.margin.top + (vars.margin.bottom / 2))
					.append("g")
					.attr("transform", "translate(" + vars.margin.left + "," + vars.margin.top + ")");
				chart.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis)
					.selectAll("text");
				chart.append("g")
					.attr("class", "y axis")
					.attr("transform", function() {
						return (vars.yaxis) ? `translate(${width}, 0)` : -1;
					})					
					.call(yAxis
						.tickFormat(function (d) {
							return util.roundNumber(vars, d)
						}));
				chart.selectAll(".bar")
					.data(vars.dataRef)
					.enter().append("rect")
					.attr("height", 0)
					.attr("class", function (d) { return "bar " + d.class })
					.attr("x", function (d) { return x(d.dimension1); })
					.attr("width", x.bandwidth())
					.attr("y", function (d) { return y(Math.max(d.start, d.end)); })
					.attr("height", function (d) { return Math.abs(y(d.start) - y(d.end)); })
					.attr('style', function (d) { return `fill:${util.labels[d.dimension2].color};`; })
					.on("mousemove", function (d) {
						if (vars.tooltip.visible) {
							tip
								.html(util.tooltip.html(d, vars))
								// .style("left", d3.event.pageX - ($('.sui-tip').width() / 2 + 7) + "px")
								// .style("top", d3.event.pageY - $('.sui-tip').height() - 30 + "px")
								.style("left", d3.event.pageX - ($('.sui-tip').width() / 2) + "px")
								.style("top", d3.event.pageY - $('.sui-tip').height() - 10 + "px")
								.style("display", "inline-block")
						}
					})
					.on("mouseout", function () {
						tip.style("display", "none");
					})
					.on('click', function (d) {
						if (d.dimension1 === 'Total') {
							vars.this.backendApi.selectValues(1, [d.qElemNumber1], true)
							if (util.selectedLabels.includes(d.dimension2)) {
								util.selectedLabels.splice(util.selectedLabels.indexOf(d.dimension2), 1);
							} else {
								util.selectedLabels.push(d.dimension2)
							}
						} else {
							vars.this.backendApi.selectValues(0, [d.qElemNumber1], true)
						}
						tip.style("display", "none");
					});

				// Add the text on top of the bars
				chart.selectAll(".text")
					.data(vars.dataRef3)
					.enter().append("text")
					.style("font-size", `10px`)
					.attr("text-anchor", "middle")
					.attr("x", function (d) { return x(d.title) + (x.bandwidth() / 2); })
					.attr("y", function (d) { return y((d.end) ? d.end : d.total) - 5; })
					.text(function (d) { return util.roundNumber(vars, d.total); })

				// Add the text for the Totals
				chart.selectAll(".text")
					.data(vars.dataRef)
					.enter()
					.filter(function (d) { return d.dimension1 === 'Total' })
					.append("text")
					.style("font-size", `10px`)
					.attr("text-anchor", "middle")
					.attr("x", function (d) { return x(d.dimension1) + (x.bandwidth() / 2); })
					.attr("y", function (d) { return y(d.end) + (y(d.start) - y(d.end)) / 2 + 5; })
					.attr('style', function (d) { return `font-size:10px; fill:${util.labels[d.dimension2].textColor};`; })
					// .text(function (d) {	return util.roundNumber(d.end); })
					.text(function (d) { return d.percentage; })

				// Add x axis interactivity
				chart.selectAll(".x.axis .tick")
					.on("click", function (d) {
						vars.this.backendApi.selectValues(0, [vars.dataRef2[d].data[0].qElemNumber1], true);
					})

				//Draw Pareto line
				// var guide = d3.line()
				// 	.x(function (d) { return x(d.title) + (x.bandwidth() / 2); })
				// 	.y(function (d) { return ycum(d.cumulativePercentage) })
				// 	// .curve(d3.curveBasis);
				// chart.append('path')
				// 	.data([vars.dataRef3])
				// 	.attr('class', 'line')
				// 	.attr('d', guide);

				// Add the Cumulative Pareto line
				if (vars.line.show) {
					var guide = d3.line()
						.x(function (d) { return x(d.title) + (x.bandwidth() / 2); })
						.y(function () { return y(totalAmount*vars.line.position) })
					chart.append('path')
						.data([vars.dataRef3])
						.style("stroke", vars.line.color)
						.style("stroke-width", 2)
						.style("stroke-dasharray", '5,5')
						.attr('d', guide);
				}

				// console.log(vars)
				console.info(`%c ${vars.name} ${vars.v}: `, 'color: red', `${vars.id} Loaded!`);
				return qlik.Promise.resolve();
			}
		};

	});
