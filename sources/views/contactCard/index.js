import {JetView} from "webix-jet";
import "./style.css";
import {contacts} from "../../models/contacts";

export default class ContactCard extends JetView {
	config() {
		return {
			cols: [
				{
					view: "list",
					borderless: true,
					localId: "contactList",
					select: true,
					scroll: "auto",
					css: "contact-list",
					template: "<div class='contact-list_avatar' style='background-image: url(#Photo#)'></div><div><div>#value#</div><div>#Email#</div></div>",
					width: 300,
					type: {
						height: 62
					},
					on: {
						onAfterSelect(id) {
							this.$scope.show({contactId: id}).then(() => this.$scope.show("contactCard.contactView"));
						}
					}
				},
				{
					view: "resizer"
				},
				{$subview: true}
			]
		};
	}

	init() {
		this.$$("contactList").sync(contacts);
	}

	urlChange() {
		const contactList = this.$$("contactList");
		const idSelectItem = contactList.getSelectedId();
		const id = this.getParam("contactId");
		contacts.waitData.then(
			() => {
				if (id && contactList.exists(id)) {
					if (!idSelectItem) {
						contactList.select(id);
					}
				}
				else contactList.select(contactList.getFirstId());
			}
		);
	}
}
