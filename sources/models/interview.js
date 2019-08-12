const dateFormat = webix.Date.strToDate("%Y-%m-%d %H-%i-%s");

export const interview = new webix.DataCollection({
	// data: [
	// 	{
	// 		id: 1,
	// 		CompanyId: 3,
	// 		ContactId: 1,
	// 		Date: "2009-07-30 13-22-00"
	// 	},
	// 	{
	// 		id: 2,
	// 		CompanyId: 2,
	// 		ContactId: 1,
	// 		Date: "2009-07-29 13-00-00"
	// 	},
	// 	{
	// 		id: 3,
	// 		CompanyId: 1,
	// 		ContactId: 3,
	// 		Date: "2009-08-15 12-30-00"
	// 	}
	// ],
	url: "http://localhost:3012/interview/",
	save: "rest->http://localhost:3012/interview/",

	scheme: {
		$init: (obj) => {
			obj.Date = dateFormat(obj.Date);
		}
	}
});
