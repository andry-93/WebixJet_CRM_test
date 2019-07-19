import {JetView} from "webix-jet";
import {contacts} from "../../models/contacts";

export default class Contacts extends JetView {
	config() {
		return {
			view: "datatable",
			localId: "contactTable",
			select: true,
			columns: [
				{
					id: "value",
					header: "Full Name",
					fillspace: true,
					minWidth: 150,
					sort: "string"
				},
				{
					id: "Phone",
					fillspace: true,
					minWidth: 150
				},
				{
					id: "Email",
					fillspace: true,
					minWidth: 150
				},
				{
					id: "Birthday",
					fillspace: true,
					minWidth: 150,
					format: webix.i18n.longDateFormatStr,
					sort: "date"
				}
			]
		};
	}

	init() {
		this.$$("contactTable").parse(contacts);
	}
}
