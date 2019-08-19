export const companies = new webix.DataCollection({
	url: "http://localhost:3012/companies/",
	save: "rest->http://localhost:3012/companies/",
});
