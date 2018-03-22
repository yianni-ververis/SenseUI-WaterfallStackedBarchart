/*****************
* UTILITIES
*****************/
const util = {
	totalRows: 0,
	labels: {},
	labelsCreated: false,
	selectedLabels: [],
	tooltip: {
		element: (d3) => {
			let element = null;
			// Create element only once
			if (!$('.sui-tip').length) {
				element = d3.select("body").append("div").attr("class", "sui-tip");
			} else {
				element = d3.select(".sui-tip")
				element.style("display", "none");
			}
			return element
		},
		html: (d, vars) => {
			var html = `
                <div class="tt-container">
                    <div class="tt-row"><div class="tt-item-header">${vars.dataRef2[d.dimension1].title}</div></div>
            `;
			for (let key in vars.dataRef2[d.dimension1].data) {
				html += `
                    <div class="tt-row padding-bottom">
                        <div class="tt-item-label">
                            <div class="box" style="background-color: ${util.labels[vars.dataRef2[d.dimension1].data[key].dimension2].color}"></div>
                            ${vars.dataRef2[d.dimension1].data[key].dimension2}:
                        </div>
                        <div class="tt-item-value">${util.roundNumber(vars, vars.dataRef2[d.dimension1].data[key].measure1Num)}</div>
                    </div>
                `;
			}
			html += `
                    <div class="tt-row border-top padding-top">
                        <div class="tt-item-label">Total</div>
                        <div class="tt-item-value">${util.roundNumber(vars, vars.dataRef2[d.dimension1].total)}</div>
                    </div>
                </div>
            `;

			return html;
		}
	},
	// helper Function to round the displayed numbers
	roundNumber: (vars, num, noPrecision) => {
		//check if the string passed is number or contains formatting like 13%
		if (/^[0-9.]+$/.test(num)) {
			num = (vars.precision && !noPrecision) ? parseFloat(num).toFixed(2) : Math.round(num);
			if (num >= 1000 && num < 1000000) {
				num = (vars.precision && !noPrecision) ? parseFloat(num / 1000).toFixed(2) : Math.round(num / 1000);
				if (/\.00$/.test(num)) {
					num = num.replace(/\.00$/, ''); // Remove .00
				}
				num += 'K'; // Add the abbreviation
			} else if (num >= 1000000 && num < 1000000000) {
				num = (vars.precision && !noPrecision) ? parseFloat(num / 1000000).toFixed(2) : Math.round(num / 1000000);
				if (/\.00$/.test(num)) {
					num = num.replace(/\.00$/, ''); // Remove .00
				}
				num += 'M'; // Add the abbreviation
			} else if (num >= 1000000000 && num < 1000000000000) {
				num = (vars.precision && !noPrecision) ? parseFloat(num / 1000000000).toFixed(2) : Math.round(num / 1000000000);
				if (/\.00$/.test(num)) {
					num = num.replace(/\.00$/, ''); // Remove .00
				}
				num += 'B'; // Add the abbreviation 
				// Change to B and add T
			} else if (num >= 1000000000000) {
				num = (vars.precision && !noPrecision) ? parseFloat(num / 1000000000000).toFixed(2) : Math.round(num / 1000000000000);
				if (/\.00$/.test(num)) {
					num = num.replace(/\.00$/, ''); // Remove .00
				}
				num += 'T'; // Add the abbreviation 
				// Change to B and add T
			}
			if (vars.symbol && vars.symbol.visible) {
				if (vars.symbol.char === "$" || vars.symbol.char === "€") {
					num = vars.symbol.char + num
				} else if (vars.symbol.char === "other") {
					if (vars.symbol.otherPosition) {
						num = vars.symbol.other + ' ' + num;
					} else {
						num = num + ' ' + vars.symbol.other;
					}
				} else {
					vars.symbol.char;
				}
			}
		}
		return num;
	}
}

export default util;