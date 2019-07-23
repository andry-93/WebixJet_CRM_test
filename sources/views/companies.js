import {JetView} from "webix-jet/dist/types";
import {companies} from "../models/companies";

export default class Companies extends JetView {
	config() {
		return {
			rows: [
				{
					view: "toolbar",
					cols: [
						{
							view: "icon",
							icon: "fas fa-plus-circle",
							click: () => { this.addRow(); }
						},
						{
							view: "icon",
							icon: "far fa-file-excel",
							click() {
								webix.toExcel(this.$scope.$$("companyTable"), {
									filename: "companies",
									columns: {
										value: {header: "Company", width: 150},
										Address: {header: "Address", width: 150},
										Skype: {header: "Skype", width: 100},
										Phone: {header: "Phone", width: 100},
										Email: {header: "Email", width: 100}
									}
								});
							}
						},
						{},
						{
							view: "icon",
							icon: "fas fa-sync-alt",
							click() {
								companies.refresh();
							}
						}
					]
				},
				{
					view: "datatable",
					localId: "companyTable",
					select: true,
					rightSplit: 1,
					editable: true,
					editaction: "dblclick",
					columns: [
						{
							id: "value",
							header: ["Company Name", {content: "textFilter"}],
							editor: "text",
							fillspace: true,
							minWidth: 150,
							sort: "string"
						},
						{
							id: "Address",
							header: ["Address", {content: "textFilter"}],
							editor: "text",
							fillspace: true,
							minWidth: 150
						},
						{
							id: "Skype",
							header: ["Skype", {content: "textFilter"}],
							editor: "text",
							fillspace: true,
							minWidth: 150
						},
						{
							id: "Phone",
							header: ["Phone", {content: "textFilter"}],
							editor: "text",
							fillspace: true,
							minWidth: 150
						},
						{
							id: "Email",
							header: ["Email", {content: "textFilter"}],
							editor: "text",
							fillspace: true,
							minWidth: 150
						},
						{header: "", width: 40, template: "{common.trashIcon()}"}
					],
					onClick: {
						"wxi-trash": this.deleteColumn
					},
					rules: {
						value: webix.rules.isNotEmpty,
						Address: webix.rules.isNotEmpty,
						Email: webix.rules.isEmail
					}
				}
			]
		};
	}

	init() {
		this.$$("companyTable").sync(companies);
	}

	deleteColumn(_e, id) {
		webix.confirm({
			title: "Delete",
			text: "Are you sure?"
		}).then(() => {
			companies.remove(id);
		});
		return false;
	}

	addRow() {
		let dataTable = this.$$("companyTable");
		const data = {
			id: "",
			value: "New company",
			Address: "",
			Skype: "",
			Phone: "",
			Email: ""
		};
		dataTable.editStop();
		let id = companies.add(data, 0);
		dataTable.editRow(id);
	}
}
