const dateFormat = webix.Date.strToDate("%Y-%m-%d");

export const contacts = new webix.DataCollection({
	data: [
		{
			id: 1,
			FirstName: "Nelly",
			LastName: "Anderson",
			Address: "Not specified",
			Company: "ШахтаСпецСтрой",
			Skype: "-",
			Phone: "145455775511",
			Email: "alex@gmail.com",
			Photo: "./sources/styles/img/nouser.jpg",
			Birthday: "1970-07-07"
		},
		{
			id: 2,
			FirstName: "Doris",
			LastName: "Vinisky",
			Address: "",
			Company: "",
			Skype: "-",
			Phone: "155457871111",
			Email: "doris@gmail.com",
			Photo: "./sources/styles/img/nouser.jpg",
			Birthday: "1976-05-03"
		},
		{
			id: 3,
			FirstName: "Alex",
			LastName: "Brown",
			Address: "Moskow, Линейная 78-854",
			Company: "Belcoop",
			Skype: "somekun",
			Phone: "744545554391",
			Email: "alex@gmail.com",
			Photo: "./sources/styles/img/nouser.jpg",
			Birthday: "1990-07-17"
		}
	],
	scheme: {
		$init: (obj) => {
			obj.value = `${obj.FirstName} ${obj.LastName}`;
			obj.Birthday = dateFormat(obj.Birthday);
		},

		$update: (obj) => {
			obj.value = `${obj.FirstName} ${obj.LastName}`;
		},

		$save: (obj) => {
			delete obj.value;
		}
	}
});
