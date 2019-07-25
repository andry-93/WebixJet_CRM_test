import {JetView} from "webix-jet";
import {contacts} from "../../models/contacts";
import SavePopup from "./savePopup";

export default class Contacts extends JetView {
	config() {
		return {
			rows: [
				{
					view: "toolbar",
					cols: [
						{
							view: "icon",
							icon: "fas fa-plus-circle",
							tooltip: "Add field",
							click() {
								this.$scope.window.showWindow();
							}
						},
						{
							view: "icon",
							icon: "far fa-file-excel",
							tooltip: "Export",
							click() {
								webix.toExcel(this.$scope.$$("contactTable"), {
									filename: "contacts",
									columns: {
										value: {header: "Full Name", width: 150},
										Company: {header: "Company", width: 150},
										Phone: {header: "Phone", width: 100},
										Email: {header: "Email", width: 100},
										Birthday: {header: "Birthday", width: 100}
									}
								});
							}
						},
						{},
						{
							view: "icon",
							icon: "fas fa-sync-alt",
							tooltip: "Refresh",
							click() {
								contacts.refresh();
							}
						}
					]
				},
				{
					view: "datatable",
					localId: "contactTable",
					rightSplit: 2,
					columns: [
						{
							id: "value",
							header: ["Full Name", {content: "textFilter"}],
							fillspace: true,
							minWidth: 150,
							sort: "string"
						},
						{
							id: "Company",
							header: ["Company", {content: "textFilter"}],
							fillspace: true,
							minWidth: 150,
							sort: "string"
						},
						{
							id: "Phone",
							header: ["Phone", {content: "textFilter"}],
							fillspace: true,
							minWidth: 150
						},
						{
							id: "Email",
							header: ["Email", {content: "textFilter"}],
							fillspace: true,
							minWidth: 150
						},
						{
							id: "Birthday",
							header: ["Birthday", {content: "dateRangeFilter"}],
							fillspace: true,
							minWidth: 150,
							format: webix.i18n.longDateFormatStr,
							sort: "date"
						},
						{header: "", width: 40, template: "{common.editIcon()}"},
						{header: "", width: 40, template: "{common.trashIcon()}"}
					],
					onClick: {
						"wxi-trash": this.deleteColumn,
						"wxi-pencil": this.editColumn
					}
				}
			]
		};
	}

	init() {
		this.window = this.ui(SavePopup);
		this.$$("contactTable").sync(contacts);
	}

	editColumn(_e, id) {
		this.$scope.window.showWindow(id);
		return false;
	}

	deleteColumn(_e, id) {
		webix.confirm({
			title: "Delete",
			text: "Are you sure?"
		}).then(() => {
			contacts.remove(id);
		});
		return false;
	}
}
