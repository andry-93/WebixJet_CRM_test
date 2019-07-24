const dateFormat = webix.Date.strToDate("%Y-%m-%d");

export const interview = new webix.DataCollection({
	data: [
		{
			id: 1,
			CompanyId: 3,
			ContactId: 1,
			Date: "2009-07-30"
		},
		{
			id: 2,
			CompanyId: 2,
			ContactId: 1,
			Date: "2009-07-29"
		},
		{
			id: 3,
			CompanyId: 1,
			ContactId: 3,
			Date: "2009-08-15"
		}
	],

	scheme: {
		$init: (obj) => {
			obj.Date = dateFormat(obj.Date);
		}
	}
});
