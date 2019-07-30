import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView {
	config() {
		let menu = {
			view: "menu",
			id: "top:menu",
			css: "app_menu",
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='fas #icon#' style='width: 18px;'></span> #value# ",
			on: {
				onAfterSelect: () => {
					let {icon, value} = this.$$("top:menu").getSelectedItem();
					this.$$("headerApp").setHTML(`<span class='fas ${icon}'></span> ${value}`);
				}
			},
			data: [
				{value: "Contacts", id: "contacts", icon: "fa-users"},
				{value: "Companies", id: "companies", icon: "fa-building"},
				{value: "Contact card", id: "contactCard", icon: "fa-id-card"},
				{value: "Settings", id: "settings", icon: "fa-cogs"}
			]
		};

		return {
			type: "clean",
			css: "app_layout",
			rows: [
				{localId: "headerApp", type: "header", template: "Companies", css: "webix_header webix_dark"},
				{
					cols: [
						{
							rows: [{css: "webix_shadow_medium", rows: [menu]}]
						},
						{
							type: "wide",
							rows: [
								{$subview: true}
							]
						}
					]
				}
			]
		};
	}

	init() {
		this.use(plugins.Menu, "top:menu");
	}
}
