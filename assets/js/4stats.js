google.load("visualization", "1", {packages:["corechart"]});

(function(){

var thejquery = jQuery;
var isError = false;

var fourStats = function(pid, apikey, lang, current_datetime) {
	
	var pid = pid,
	apikey  = apikey,
	language = lang,
	browserWidth = 0,
	browserHeight = 0,
	tzOffset = Date.parse(current_datetime)-Date.parse(new Date()),
	fsText = {
			de: {
				day_performance: 'Tages Performance',
				performance_l31d: 'Performance letzte 31 Tage',
				performance_year: 'Performance aktuelles Jahr',
				visitors: 'Besucher',
				views: 'Seitenaufrufe',
				visits: 'Besuche',
				unique_visitors: 'Eindeutige Besucher',
				new_visitors: 'Neue Besucher',
				visittime: 'Besuchsdauer',
				bounce_rate: 'Absprungrate',
				count: 'Anzahl',
				browser:'Browser',
				os:'Betriebssystem',
				sites: 'Seite',
				page:'Seite',
				pages:'Seiten',
				referrer: 'Referrer',
				keywords: 'Suchwort',
				screen: 'Bildschirm',
				apply: 'Anwenden',
				cancel: 'Abbrechen',
				from: 'Von',
				to: 'Bis',
				custom_range: 'Benutzerdefiniert',
				today: 'Heute',
				yesterday: 'Gestern',
				thismonth: 'Dieser Monat',
				lastmonth: 'Letzter Monat',
				thisyear: 'Dieses Jahr',
				no_data: 'Keine Daten vorhanden.',
				equals: 'ist gleich',
				contains: 'enthält',
				begins: 'beginnt mit',
				ends: 'endet mit',
				total: 'Gesamt',
				date: 'Datum',
				hour: 'Stunde',
				check_settings: 'Bitte überprüfen Sie Ihre Projekt-Einstellungen.',
				error_connect: 'Verbindungsfehler, bitte versuchen sie es später noch einmal.',
				error_noresults: 'Keine Ergebnisse gefunden.',
				error_tmp: 'Temporärer Fehler, bitte versuchen sie es später noch einmal.'
			},
			en: {
				day_performance: 'Day Performance',
				visitors: 'Visitors',
				views: 'Pageviews',
				visits: 'Visits',
				unique_visitors: 'Unique visitors',
				new_visitors: 'New visitors',
				visittime: 'Time on site',
				bounce_rate: 'Bounce rate',
				count: 'Count',
				browser:'Browser',
				os:'OS',
				sites: 'Page',
				page:'Page',
				pages:'Pages',
				referrer: 'Referrer',
				keywords: 'Keyword',
				screen: 'Screen',
				apply: 'Apply',
				cancel: 'Cancel',
				from: 'From',
				to: 'To',
				custom_range: 'Custom range',
				today: 'Today',
				yesterday: 'Yesterday',
				thismonth: 'This month',
				lastmonth: 'Last month',
				thisyear: 'This year',
				no_data: 'No data available.',
				equals: 'equals',
				contains: 'contains',
				begins: 'begins with',
				ends: 'ends with',
				total: 'Total',
				date: 'Date',
				hour: 'Hour',
				check_settings: 'Please check your project settings.',
				error_connect: 'Connection error, please try again later.',
				error_noresults: 'No results found.',
				error_tmp: 'Temporary error, please try again later.'
			}
		};
	
	if(!language || (language != 'de' && language != 'en')) {
		language = 'en';
	}
	function _(key, replace_vars) {
		if(typeof(fsText) != 'undefined' && 
			typeof(language) != 'undefined' && 
			typeof(fsText[language]) != 'undefined' && 
			typeof(fsText[language][key]) != 'undefined') {
			var text = fsText[language][key];
			if(replace_vars && typeof(replace_vars) == 'object') {
				$.each(replace_vars, function(search, value) {
					var regExp = new RegExp('%' + search, 'g');
				    text = text.replace(regExp, value);
				}); 
			}
			return text;
		}
		return "";
	}
	
	
	function checkError(results) {
		if(isError) {
			return true;
		}
		if(typeof(results['error']) != 'undefined' && results['error'] != '') {
			isError = true;
			thejquery('#content4stats').html('<br><h3 style="color: red;">' + (results['error']) + '</h3><p>' + _('check_settings') + '</p>');
			return true;
		}
		return false;
	}
	
	addCommas = function(str) {
		str += '';
		x = str.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	};
	
	getBrowserIconClass = function(str) {
		if(typeof(str) == 'undefined' || (typeof(str) != 'object' && typeof(str) != 'string')) {
			return '';
		}
		return 'browser-logo browser-' + str.toLowerCase().replace(/\s[0-9\.]+$/, '').replace(/\s/g, "-");
	}
	
	getOsIconClass = function(str) {
		if(typeof(str) == 'undefined' || (typeof(str) != 'object' && typeof(str) != 'string')) {
			return '';
		}
		if(str.search(/^windows/i) != -1) {
			var os_str = "windows";
		} else if(str.search(/^macintosh/i) != -1 || str.search(/^mac os/i) != -1) {
			var os_str = "macintosh";
		}
		else if(str.search(/^ios/i) != -1) {
			var os_str = "ios";
		}
		else if(str.search(/^linux/i) != -1) {
			var os_str = "linux";
		} 
		else if(str.search(/^android/i) != -1) {
			var os_str = "android";
		} 
		else {
			var os_str = "";
		}
		return 'os-logo os-'  + os_str.toLowerCase().replace(/\s[0-9\.]+$/, '').replace(/\s/g, "-");
	}
	
	parseUri = function(str) {
		var parser = document.createElement('a');
		parser.href = str;
		return parser;
	}
	
	showFSDayPerfGraph = function() {
		var date = new Date();
		date.setTime( date.getTime() + tzOffset );
		var day = date.getDate();
		var month = date.getMonth()+1;
		var year = date.getFullYear();
		
		thejquery.getJSON('https://www.4stats.de/api/numbers?pid=' + pid + '&apikey=' + apikey + '&mon=' + month + '-' + year + '&day=' + day + '&jsoncallback=?', function(data) {
			
			if(checkError(data.results)) {
				return;
			}
			
			chart_data = new Array([_('hour'), _('views'), _('visits')]);
			for(i=0; i< data.results['items'].length; i++) {
				stat = data.results['items'][i];
				chart_data.push([i, parseInt(stat.h), parseInt(stat.v)]);
			}

			var gdata = google.visualization.arrayToDataTable(chart_data);

			var options = {
				title: _('day_performance'),
				hAxis: {title: 'Hour',  baselineColor: 'white', titleTextStyle: {color: 'red'}, textStyle: {
	  				color: '#3399CC',
	  				fontSize: 10
	  			}},
				legend: 'none',
				pointSize: 4,
				lineWidth: 3,
				gridlineColor: '#ececec',
				colors:['#eeeeee', '#4caeff'],
				reverseCategories: false,
				backgroundColor: 'white',
				vAxis: {
					baselineColor: 'white',
					textPosition: 'in',
					textStyle: {
						color: '#8F8F8F',
						fontSize: 10
					}
				},
				chartArea: {
					width: "100%",
					height: "100%"
				}
			};

			var chart = new google.visualization.AreaChart(document.getElementById('chart_visitor_div'));
			chart.draw(gdata, options);
			
		});
	}
	
	
	showFSDashboard = function() {
		
		thejquery.getJSON('https://www.4stats.de/api/dashboard?pid=' + pid + '&apikey=' + apikey + '&jsoncallback=?', function(data) {
			
			if(checkError(data.results)) {
				return;
			}
			
			var header = [_("visits"), _("new_visitors"), _("views"), "Ø " + _("visittime") + " (Min.)"];
			var items_template = {"today":"today", "yesterday":"yesterday", "thismonth":"thismonth", "lastmonth":"lastmonth", "thisyear":"thisyear", "total":"total"};
			
			var items_data = {};
			
			thejquery.each(items_template, function(key, val) {
				  items_data[key] =	[data.results['visits_' + val], 
									 data.results['visits_' + val]-data.results['ret_visits_' + val],
								 	 data.results['hits_' + val], 
								 	 data.results['avg_time_' + val]];
			});

			thejquery("#fs_overview_stats thead tr").append('<th></th>');
			thejquery.each(header, function(key, val) {
				  thejquery("#fs_overview_stats thead tr").append('<th>' + val + '</th>');
			});
			
			thejquery.each(items_data, function(name, items) {
				var stats_row = '<tr><td class="row-title">' + _(name) + '</td>';
				thejquery.each(items, function(key, val) {
					if(!isNaN(val)) {
						val = addCommas(val);
					}
					stats_row += '<td class="fsnum">' + val + '</td>';
				});
				stats_row += '</tr>';
				thejquery("#fs_overview_stats tbody").append(stats_row);
			});
			

			if(data.results['visits_yth'] < data.results['visits_today']) {
				var tclass = "good";
			} else if(data.results['visits_yth'] > data.results['visits_today']) {
				var tclass = "bad";
			} else {
				var tclass = "noc";
			}
			if(data.results['visits_yth_percent'] < 0)
			{
				data.results['visits_yth_percent'] = data.results['visits_yth_percent']*-1;
			}
			thejquery("#fs_overview_stats tbody tr").first().children('td').eq(1).prepend('<small class="fs_' + tclass + '">' + data.results['visits_yth_percent'] + '%</small>');

			if(data.results['hits_yth'] < data.results['hits_today']) {
				var tclass = "good";
			} else if(data.results['hits_yth'] > data.results['hits_today']) {
				var tclass = "bad";
			} else {
				var tclass = "noc";
			}
			if(data.results['hits_yth_percent'] < 0)
			{
				data.results['hits_yth_percent'] = data.results['hits_yth_percent']*-1;
			}
			thejquery("#fs_overview_stats tbody tr").first().children('td').eq(3).prepend('<small class="fs_' + tclass + '">' + data.results['hits_yth_percent'] + '%</small>');

			thejquery("#fs_overview_stats thead tr").first().children('th').first().html('<span>' + data.results['user_online'] + '</span> Online');
			
		});
	};
	
	showFSGraphs = function() {
		
		showFSDayPerfGraph();
		
		var date = new Date();
		date.setTime(Date.parse(new Date())+tzOffset);
		date.setMonth( date.getMonth() - 1 );
		var fromday = date.getDate();
		var frommonth = date.getMonth()+1;
		var fromyear = date.getFullYear();
		var date = new Date();
		date.setTime(Date.parse(new Date())+tzOffset);
		var today = date.getDate();
		var tomonth = date.getMonth()+1;
		var toyear = date.getFullYear();
		
		thejquery.getJSON('https://www.4stats.de/api/numbers?pid=' + pid + '&apikey=' + apikey + '&from=' + fromyear + '-' + frommonth + '-' + fromday + '&to=' + toyear + '-' + tomonth + '-' + today + '&jsoncallback=?', function(data) {

			if(checkError(data.results)) {
				return;
			}

			chart_data = new Array([_('hour'), _('views'), _('visits')]);
			for(i=0; i< data.results['items'].length; i++) {
				stat = data.results['items'][i];
				chart_data.push([stat.name, parseInt(stat.h), parseInt(stat.v)]);
			}

			var gdata = google.visualization.arrayToDataTable(chart_data);

			var options = {
				title: _('performance_l31d'),
				hAxis: {title: 'Hour',  baselineColor: 'white', titleTextStyle: {color: 'red'}, textStyle: {
	  				color: '#3399CC',
	  				fontSize: 10
	  			}},
				legend: 'none',
				pointSize: 4,
				lineWidth: 3,
				gridlineColor: '#ececec',
				colors:['#eeeeee', '#4caeff'],
				reverseCategories: false,
				backgroundColor: 'transparent',
				vAxis: {
					baselineColor: 'transparent',
					textPosition: 'in',
					textStyle: {
						color: '#8F8F8F',
						fontSize: 10
					}
				},
				chartArea: {
					width: "100%",
					height: "100%"
				}
			};

			var chart = new google.visualization.AreaChart(document.getElementById('chart_visitor_div_last31'));
			chart.draw(gdata, options);
			
		});
		var date = new Date();
		date.setTime(Date.parse(new Date())+tzOffset);
		var year = date.getFullYear();
		
		thejquery.getJSON('https://www.4stats.de/api/numbers?pid=' + pid + '&apikey=' + apikey + '&year=' + year + '&jsoncallback=?', function(data) {
			
			if(checkError(data.results)) {
				return;
			}
			
			chart_data = new Array([_('hour'), _('views'), _('visits')]);
			for(i=0; i< data.results['items'].length; i++) {
				stat = data.results['items'][i];
				chart_data.push([stat.name, parseInt(stat.h), parseInt(stat.v)]);
			}

			var gdata = google.visualization.arrayToDataTable(chart_data);

			var options = {
				title: _('performance_year'),
				hAxis: {title: 'Hour',  baselineColor: 'white', titleTextStyle: {color: 'red'}, textStyle: {
	  				color: '#3399CC',
	  				fontSize: 10
	  			}},
				legend: 'none',
				pointSize: 4,
				lineWidth: 3,
				gridlineColor: '#ececec',
				colors:['#eeeeee', '#4caeff'],
				reverseCategories: false,
				backgroundColor: 'transparent',
				vAxis: {
					baselineColor: 'transparent',
					textPosition: 'in',
					textStyle: {
						color: '#8F8F8F',
						fontSize: 10
					}
				},
				chartArea: {
					width: "100%",
					height: "100%"
				}
			};

			var chart = new google.visualization.AreaChart(document.getElementById('chart_visitor_div_year'));
			chart.draw(gdata, options);
			
		});
	};

	
	showFSBoxStats = function(name) {
		
		thejquery.getJSON('https://www.4stats.de/api/' + name + '?pid=' + pid + '&apikey=' + apikey + '&jsoncallback=?', function(data) {
			
			if(checkError(data.results)) {
				return;
			}
			
			
			html = '<div><table class="table-stats bordered"><thead><tr><th>' + _('visitors') + '</th><th>' + _(name) + '</th></tr></thead><tbody>';
			for(i=0; i < data.results['items'].length; i++) {
				stat = data.results['items'][i];
				html += '<tr><td class="row-title">' + stat.count + '</td><td>';
				if(name == 'browser') {
					html += '<span class="' + getBrowserIconClass(stat.name) + '"></span> ';
				} else if(name == 'os') {
					html += '<span class="' + getOsIconClass(stat.name) + '"></span> ';
				}
				html += stat.name + '</td></tr>';
				if(i >= 9) {
					break;
				}
			}
			html += '</tbody></table></div>';
			thejquery("#fs-box-row").append(html).fadeIn(300);
		});
	};
	
	
	
	showFSVisitorLog = function() {
		
		thejquery.getJSON('https://www.4stats.de/api/visitor_log?pid=' + pid + '&apikey=' + apikey + '&jsoncallback=?', function(data) {
			
			if(checkError(data.results)) {
				return;
			}
			
			for(i=0; i < data.results['items'].length; i++) {
				stat = data.results['items'][i];
				var html = '<tr>';
				html += '<td class="one">' + stat.time + '<br>' + stat.hits + ' ' + ((stat.hits>1)?_('pages'):_('page')) + '</td>';
				html += '<td class="two"><strong>' + stat.ip + '</strong><br>';
				html += '<span class="' + getOsIconClass(stat.os) + '"></span> ' + stat.os + ' &nbsp; <span class="' + getBrowserIconClass(stat.browser) + '"></span> ' + stat.browser + '<br>';
				html += 'Screen: ' + stat.screen + ' - GEO: ' + stat.geo + '</td>';
				html += '<td class="three">';
				if(stat.referrer != '') {
					var ref = parseUri(stat.referrer);
					html += '<a href="http://' + stat.referrer + '" target="_blank">' + ref.hostname + '</a>';
				}
				html += '<br>' + stat.entry + '<br>';
				if(stat.kw != '') {
					html += 'Keyword: ' + stat.kw + '</td>';
				}
				html += '</tr>';
				thejquery("#fs-visitor-log tbody").append(html).fadeIn(300);
				if(i >= 25) {
					break;
				}
			}
		});
	};

	return {
		statsPage: function () {
			showFSGraphs();
			showFSDashboard();	
			showFSBoxStats('sites');
			window.setTimeout("showFSBoxStats('keywords')", 500);
			window.setTimeout("showFSBoxStats('referrer')", 1000);
			window.setTimeout("showFSBoxStats('browser')", 1500);
			window.setTimeout("showFSBoxStats('os')", 2000);
			window.setTimeout("showFSBoxStats('screen')", 2500);
			showFSVisitorLog();
		},
		dashBoard: function () {
			showFSWPDashboard();
		},
	};
}

window.fourStats = fourStats;

})();