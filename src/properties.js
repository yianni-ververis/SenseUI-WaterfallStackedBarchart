const properties = {
	initialProperties: {
		qHyperCubeDef: {
			qDimensions: [],
			qMeasures: [],
			qInitialDataFetch: [{
				qWidth: 3,
				qHeight: 500
			}]
		}
	},
	definition: {
		type: "items",
		component: "accordion",
		items: {
			// data : {
			//     uses: "data",
			//     min: 2,
			//     max: 6
			// },                    
			dimensions: {
				uses: "dimensions",
				min: 2,
				max: 2
			},
			measures: {
				uses: "measures",
				min: 1,
				max: 1
			},
			sorting: {
				uses: "sorting"
			},
			settings: {
				uses: "settings",
				items: {}
			},
			customSection: {
				component: "expandable-items",
				label: "Waterfall Stacked Barchart Settings",
				items: {
					pareto: {
						type: "items",
						label: "Pareto-like look & feel",
						items: {
							sort: {
								type: "boolean",
								component: "switch",
								label: "Sort Dimension (Desc)",
								ref: "vars.sort",
								options: [{
									value: true,
									label: "Sort"
								}, {
									value: false,
									label: "Do not Sort"
								}],
								defaultValue: false
							},
							cumulativeLine: {
								type: "boolean",
								component: "switch",
								label: "Show Cumulative Line?",
								ref: "vars.line.show",
								options: [{
									value: true,
									label: "Show"
								}, {
									value: false,
									label: "Hide"
								}],
								defaultValue: false
							},
							cumulativeLineColor: {
								type: "string",
								expression: "none",
								label: "Line color Hex Value",
								defaultValue: "#c6c6c6",
								ref: "vars.line.color",
								show: function (data) {
									if (data.vars.line && data.vars.line.show) {
										return true;
									}
								},
							},
							cumulativeLinePosition: {
								type: "number",
								expression: "none",
								label: function (data) {
									if (data.vars.line && data.vars.line.show) {
										return `Cumulative ${data.vars.line.position * 100}%`;
									}
								},
								component: "slider",
								ref: "vars.line.position",
								defaultValue: 0.8,
								min: 0,
								max: 1,
								step: 0.1,
								show: function (data) {
									if (data.vars.line && data.vars.line.show) {
										return true;
									}
								},
							},
						}
					},
					bar: {
						type: "items",
						label: "Bar Settings",
						items: {
							fillColor: {
								type: "string",
								expression: "none",
								label: "Bar color Hex Values, separated by comma",
								defaultValue: "#332288, #88CCEE, #117733, #DDCC77, #CC6677, #3399CC, #99CC66, #275378, #B35A01, #B974FD",
								ref: "vars.bar.fillColor"
							},
							textColor: {
								type: "string",
								expression: "none",
								label: "Text color Hex values, separated by comma",
								defaultValue: "#FFFFFF, #000000, #FFFFFF, #000000, #000000, #000000, #000000, #FFFFFF, #000000, #000000",
								ref: "vars.bar.textColor"
							},
						}
					},
					yaxis: {
						type: "items",
						label: "Y-Axis",
						items: {
							yaxisposition: {
								type: "boolean",
								component: "switch",
								label: "Position",
								ref: "vars.yaxis",
								options: [{
									value: false,
									label: "Left"
								}, {
									value: true,
									label: "Right"
								}],
								defaultValue: false
							},
						}
					}
				}
			}
		}
	},
	support: {
		snapshot: true,
		export: true,
		exportData: true
	}
}

export default properties;