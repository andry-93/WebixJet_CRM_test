export const companies = new webix.DataCollection({
	// data: [
	// 	{
	// 		id: 1,
	// 		value: "XB-Software",
	// 		Address: "Not specified",
	// 		Skype: "-",
	// 		Phone: "145455775511",
	// 		Email: "xb@gmail.com"
	// 	},
	// 	{
	// 		id: 2,
	// 		value: "Epam",
	// 		Address: "Not specified",
	// 		Skype: "-",
	// 		Phone: "145455775511",
	// 		Email: "epam@gmail.com"
	// 	},
	// 	{
	// 		id: 3,
	// 		value: "IBA",
	// 		Address: "Not specified",
	// 		Skype: "-",
	// 		Phone: "145455775511",
	// 		Email: "iba@gmail.com"
	// 	}
	// ]
	url: "http://localhost:3012/companies/",
	save: "rest->http://localhost:3012/companies/"
});
