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
						label: "First name"
					},
					{
						view: "text",
						name: "LastName",
						label: "Last name"
					},
					{
						view: "text",
						name: "Address",
						label: "Birthday"
					},
					{
						view: "text",
						name: "Skype",
						label: "Skype"
					},
					{
						view: "text",
						name: "Phone",
						label: "Phone"
					},
					{
						view: "text",
						name: "Email",
						label: "Email"
					},
					{
						view: "datepicker",
						name: "Birthday",
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
				rules: {}
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
