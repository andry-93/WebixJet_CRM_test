import {JetView} from "webix-jet";
import {contacts} from "../../models/contacts";
import {companies} from "../../models/companies";
import FilesInfo from "./filesInfo";

export default class ContactView extends JetView {
	config() {
		let Toolbar = {
			view: "toolbar",
			height: 36,
			borderless: true,
			elements: [
				{
					rows: [
						{},
						{
							template: this.selectedName,
							autoheight: true,
							borderless: true,
							css: "contact-info",
							localId: "templateName"
						},
						{}
					]
				}
			]
		};

		let Info = {
			cols: [
				{
					maxWidth: 200,
					borderless: true,
					template: this.selectedContactImg,
					autoheight: true,
					localId: "templateImg"
				},
				{rows: [
					{
						template: this.selectedContact,
						autoheight: true,
						borderless: true,
						css: "contact-info",
						localId: "templateInfo"
					}
				]}
			]
		};

		return {
			localId: "container",
			type: "template",
			rows: [
				{
					rows: [
						Toolbar,
						{
							cols: [
								Info
							]
						},
						{id: "FilesInfo", $subview: FilesInfo}
					]
				}
			]
		};
	}

	urlChange() {
		let id = this.getParam("contactId", true);
		webix.promise.all([
			contacts.waitData,
			companies.waitData
		]).then(() => {
			if (id && contacts.exists(id)) {
				let contactItem = contacts.getItem(id);
				this.$$("templateName").setValues({value: contactItem.value});
				this.$$("templateImg").setValues({Photo: contactItem.Photo});
				this.$$("templateInfo").setValues({...contactItem, Company: companies.getItem(contactItem.CompanyId).value});
			}
		});
	}

	selectedName(obj) {
		return `<span><strong>${obj.value || ""}</strong></span>`;
	}

	selectedContactImg(obj) {
		let photo = obj.Photo || "./sources/styles/img/nouser.jpg";
		return `
			<img src="${photo}" class="contact-info_photo" ondragstart="return false"/>
		`;
	}

	selectedContact(obj) {
		return `
			<div>
				<i class="fas fa-phone"></i> <span>${obj.Phone || "-"}</span><br>
				<i class="fas fa-envelope"></i> <span>${obj.Email || "-"}</span><br>
				<i class="fab fa-skype"></i> <span>${obj.Skype || "-"}</span><br>
			</div>
			<div>
				<i class="fas fa-building"></i> <span>${obj.Company || "-"}</span><br>
				<i class="far fa-calendar-alt"></i> <span>${webix.i18n.dateFormatStr(obj.Birthday) || "-"}</span><br>
				<i class="fas fa-map-marker-alt"></i> <span>${obj.Address || "-"}</span>
			</div>
		`;
	}
}
