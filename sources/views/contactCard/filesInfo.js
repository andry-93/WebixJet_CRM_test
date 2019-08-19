import {JetView} from "webix-jet";
import {files} from "../../models/files";

export default class FilesInfo extends JetView {
	config() {
		const toolbar = {
			view: "toolbar",
			cols: [
				{
					view: "uploader",
					type: "icon",
					autowidth: true,
					icon: "fas fa-cloud-upload-alt",
					tooltip: "Upload files",
					upload: `http://localhost:3012/uploadAll/${this.getParam("contactId", true)}`,
					name: "files",
					inputName: "files",
					on: {
						onFileUpload: (upload) => {
							const id = this.getParam("contactId", true);
							let fileCol = files.find(obj => obj.Name.indexOf(upload.name
								.toLowerCase()
								.split(" ")
								.join("_")) !== -1);
							if (fileCol.length === 0) {
								files.add({
									Name: upload.name
										.toLowerCase()
										.split(" ")
										.join("_"),
									contactId: id,
									urlPuth: upload.urlPuth
								});
							}
							return false;
						}
					}
				},
				{},
				{
					view: "icon",
					icon: "fas fa-sync-alt",
					tooltip: "Refresh",
					click() {
						files.refresh();
					}
				}
			]
		};

		const fileTable = {
			view: "datatable",
			localId: "filesTable",
			select: true,
			scroll: true,
			columns: [
				{
					id: "Name",
					header: "File name",
					sort: "string",
					minWidth: 150,
					fillspace: true
				},
				{
					id: "urlPuth",
					header: "Puth",
					minWidth: 150,
					template: "<a href='#urlPuth#'>#urlPuth#</a>",
					fillspace: true
				}
			]
		};

		return {
			rows: [
				{
					rows: [
						toolbar,
						fileTable
					]
				}
			]
		};
	}

	init() {
		this.$$("filesTable").sync(files);
	}

	urlChange() {
		files.waitData.then(() => {
			files.data.filter(file => file.contactId.toString() === this.getParam("contactId", true).toString());
		});
	}

	deleteColumn(_e, id) {
		webix.confirm({
			title: "Delete",
			text: "Are you sure?"
		}).then(() => {
			files.remove(id);
		});
		return false;
	}
}
