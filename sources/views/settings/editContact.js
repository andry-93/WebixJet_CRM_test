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
							margin: 20,
							cols: [
								{
									view: "checkbox",
									label: "Current Company",
									labelWidth: 125,
									localId: "currentCompany",
									autowidth: true
								},
								{
									view: "text",
									label: "Company",
									name: "Company",
									localId: "company",
									uncheckValue: false,
									checkValue: true
								}
							]
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
								{
									paddingY: 3,
									paddingX: 2,
									width: 160,
									rows: [
										{
											borderless: false,
											type: "clean",
											data: {
												Photo: "./sources/styles/img/nouser.jpg"
											},
											template: "<div style='height: 100%; background-size: cover; background-position: center; background-image: url(#Photo#)'></div>",
											localId: "contactPhoto"
										}
									]
								},
								{
									width: 150,
									rows: [
										{
											view: "uploader",
											value: "Change photo",
											accept: "image/jpeg, image/png, image/jpg",
											multiple: false,
											on: {
												onBeforeFileAdd: (upload) => {
													const file = upload.file;
													const contactPhoto = this.$$("contactPhoto");
													let reader = new FileReader();
													reader.onload = (evt) => {
														contactPhoto.setValues({Photo: evt.target.result});
													};
													reader.readAsDataURL(file);
													return false;
												}
											}
										},
										{
											view: "button",
											label: "Delete photo",
											click: () => {
												this.$$("contactPhoto").setValues({Photo: "./sources/styles/img/nouser.jpg"});
											}
										},
										{}
									]
								},
								{}
							]
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
		const check = this.$$("currentCompany");
		const company = this.$$("company");
		const contactPhoto = this.$$("contactPhoto");
		contacts.waitData.then(() => {
			this.on(check, "onChange", () => {
				if (!check.getValue()) {
					company.disable();
				}
				else company.enable();
			});
			this.on(onSave, "onItemClick", () => {
				if (formView.validate()) {
					const formValues = formView.getDirtyValues();
					formValues.Photo = contactPhoto.getValues().Photo;
					contacts.updateItem(formView.getValues().id, formValues);
				}
			});
		});
	}

	urlChange() {
		let id = this.getParam("contactId", true);
		const formView = this.$$("editForm");
		const check = this.$$("currentCompany");
		const contactPhoto = this.$$("contactPhoto");
		contacts.waitData.then(() => {
			const contact = contacts.getItem(id);

			if (contact.Photo || contact.Photo !== "") {
				contactPhoto.setValues({Photo: contact.Photo});
			}
			formView.setValues(contact);
			if (formView.getValues().Company) {
				check.setValue(true);
			}
			else check.setValue(false);
		});
	}
}
