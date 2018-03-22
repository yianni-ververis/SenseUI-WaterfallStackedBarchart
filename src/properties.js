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
					general: {
						type: "items",
						label: "General",
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
						}
					},					
					bar: {
						type: "items",
						label: "Bar",
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