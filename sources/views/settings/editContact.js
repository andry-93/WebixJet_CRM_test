import {JetView} from "webix-jet";
import {contacts} from "../../models/contacts";

export default class EditContact extends JetView {
	config() {
		return {
			rows: [
				{
					view: "template",
					css: "webix_header",
					template: "Edit contact",
					autoheight: true
				},
				{
					view: "form",
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
									label: "Save",
									autowidth: true,
									css: "webix_primary"
								}
							]
						},
						{}
					],
					rules: {
						FirstName: webix.rules.isNotEmpty,
						LastName: webix.rules.isNotEmpty,
						Phone: webix.rules.isNumber,
						Email: webix.rules.isEmail,
						Birthday: value => value < new Date() && value !== null
					}
				}
			]
		};
	}

	init() {
		const onSave = this.$$("onSave");
		const formView = this.$$("editForm");
		this.on(onSave, "onItemClick", () => {
			if (formView.validate()) {
				const formValues = formView.getDirtyValues();
				contacts.updateItem(formView.getValues().id, formValues);
			}
		});
	}

	urlChange() {
		let id = this.getParam("contactId", true);
		const formView = this.$$("editForm");
		contacts.waitData.then(() => {
			formView.setValues(contacts.getItem(id));
		});
	}
}
