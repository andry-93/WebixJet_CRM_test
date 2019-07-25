import {JetView} from "webix-jet";
import {contacts} from "../../models/contacts";

export default class SaveForm extends JetView {
	config() {
		return {
			view: "window",
			position: "center",
			modal: true,
			id: "window",
			move: true,
			width: 500,
			head: {
				cols: [
					{template: "Add (*edit) activity", type: "header", borderless: true, localId: "headerWindow"},
					{view: "icon",
						icon: "wxi-close",
						tooltip: "Close window",
						click: () => this.closeWindow()
					}
				]
			},
			body: {
				view: "form",
				padding: 10,
				localId: "editForm",
				elements: [
					{
						view: "text",
						name: "FirstName",
						placeholder: "First name",
						label: "First name"
					},
					{
						view: "text",
						name: "LastName",
						placeholder: "Last name",
						label: "Last name"
					},
					{
						view: "text",
						label: "Company",
						name: "Company"
					},
					{
						view: "text",
						name: "Address",
						placeholder: "Address",
						label: "Address"
					},
					{
						view: "text",
						name: "Skype",
						placeholder: "Skype",
						label: "Skype"
					},
					{
						view: "text",
						name: "Phone",
						placeholder: "+ 12 345 678 90 12",
						label: "Phone"
					},
					{
						view: "text",
						name: "Email",
						placeholder: "email@email.com",
						label: "Email"
					},
					{
						view: "datepicker",
						name: "Birthday",
						placeholder: "dd/mm/YYYY",
						label: "Birthday"
					},
					{
						cols: [
							{},
							{
								view: "button",
								localId: "onSave",
								label: "Add (*save)",
								autowidth: true,
								css: "webix_primary"
							},
							{
								view: "button",
								label: "Cancel",
								autowidth: true,
								click: () => this.closeWindow()
							}
						]
					}
				],
				rules: {
					FirstName: webix.rules.isNotEmpty,
					LastName: webix.rules.isNotEmpty,
					Phone: webix.rules.isNumber,
					Email: webix.rules.isEmail,
					Birthday: value => value < new Date() && value !== null
				}
			}
		};
	}

	init() {
		const formView = this.$$("editForm");
		const button = this.$$("onSave");
		this.on(button, "onItemClick", () => {
			if (formView.validate()) {
				if (this.id) { contacts.updateItem(this.id, formView.getValues()); }
				else { contacts.add(formView.getValues()); }
				this.closeWindow();
			}
		});
	}

	showWindow(id) {
		this.getRoot().show();
		this.id = id;
		let mode = this.id ? "Edit" : "Add";
		const button = this.$$("onSave");
		button.define("label", mode);
		button.resize();
		this.$$("headerWindow").setHTML(`${mode} ${"activity"}`);
		contacts.waitData.then(() => {
			const formView = this.$$("editForm");
			if (this.id) formView.setValues(contacts.getItem(this.id));
		});
	}

	closeWindow() {
		const formView = this.$$("editForm");
		formView.clear();
		formView.clearValidation();
		this.getRoot().hide();
	}
}
