import {JetView} from "webix-jet";
import {interview} from "../../models/interview";
import {companies} from "../../models/companies";

export default class Interview extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			cols: [
				{
					view: "icon",
					icon: "fas fa-plus-circle",
					tooltip: "Add field",
					click: () => { this.addRow(); }
				},
				{},
				{
					view: "icon",
					icon: "fas fa-sync-alt",
					tooltip: "Refresh",
					click() {
						interview.refresh();
					}
				}
			]
		};

		const interviewTable = {
			view: "datatable",
			localId: "interviewTable",
			select: true,
			scroll: true,
			editable: true,
			editaction: "dblclick",
			rightSplit: 1,
			minWidth: 357,
			columns: [
				{
					id: "CompanyId",
					header: "Company",
					sort: "string",
					minWidth: 150,
					options: companies,
					editor: "select",
					fillspace: true
				},
				{
					id: "Date",
					header: "Date",
					sort: "date",
					width: 150,
					editor: "date",
					format: webix.i18n.longDateFormatStr
				},
				{
					id: "delete",
					header: "",
					template: "{common.trashIcon()}",
					width: 40
				}
			],
			rules: {
				CompanyId: webix.rules.isNotEmpty,
				Date: webix.rules.isNotEmpty
			},
			onClick: {
				"wxi-trash": this.deleteColumn
			}
		};

		const companyInfo = {
			rows: [
				{
					template: "About company",
					css: "webix_header",
					autoheight: true
				},
				{
					template: this.selectedCompany,
					localId: "templateInfo",
					css: "contact-info",
					gravity: 2,
					minWidth: 200
				}
			]
		};

		return {
			view: "scrollview",
			scroll: "auto",
			minHeight: 200,
			body: {
				cols: [
					{
						gravity: 2,
						rows: [
							toolbar,
							interviewTable
						]
					},
					companyInfo
				]
			}
		};
	}

	init() {
		this.$$("interviewTable").sync(interview);
	}

	urlChange() {
		interview.waitData.then(() => {
			const interviewTable = this.$$("interviewTable");
			const templateInfo = this.$$("templateInfo");
			templateInfo.setValues([]);
			interviewTable.attachEvent("onSelectChange", () => {
				const idCompany = interviewTable.getSelectedItem().CompanyId;
				const companyItem = companies.getItem(idCompany);
				templateInfo.setValues(companyItem);
			});
			interview.data.filter(item => item.ContactId.toString() === this.getParam("contactId", true).toString());
		});
	}

	deleteColumn(_e, id) {
		webix.confirm({
			title: "Delete",
			text: "Are you sure?"
		}).then(() => {
			interview.remove(id);
		});
		return false;
	}

	addRow() {
		let dataTable = this.$$("interviewTable");
		const data = {
			CompanyId: "",
			ContactId: this.getParam("contactId", true),
			Date: ""
		};
		dataTable.editStop();
		let id = interview.add(data, 0);
		dataTable.validate();
		dataTable.editRow(id);
	}

	selectedCompany(obj) {
		return `
			<div>
				<i class="fas fa-building"></i> <span>${obj.value || "-"}</span><br>
				<i class="fas fa-map-marker-alt"></i> <span>${obj.Address || "-"}</span><br>
				<i class="fab fa-skype"></i> <span>${obj.Skype || "-"}</span><br>
				<i class="fas fa-phone"></i> <span>${obj.Phone || "-"}</span><br>
				<i class="fas fa-envelope"></i> <span>${obj.Email || "-"}</span><br>
			</div>
		`;
	}
}
