import {JetView} from "webix-jet";
import {files} from "../../models/files";

export default class FilesInfo extends JetView {
	config() {
		const fileTable = {
			view: "datatable",
			localId: "filesTable",
			select: true,
			scroll: true,
			rightSplit: 1,
			columns: [
				{
					id: "Name",
					header: "File name",
					sort: "string",
					minWidth: 150,
					fillspace: true
				},
				{
					id: "Change",
					header: "Change date",
					sort: "date",
					width: 150,
					format: webix.i18n.longDateFormatStr
				},
				{
					id: "Size",
					header: "Size",
					template: obj => `${Math.floor(obj.Size / 1024)} Kb`,
					sort: obj => obj.Size
				},
				{
					id: "delete",
					header: "",
					template: "{common.trashIcon()}",
					width: 40
				}
			],
			onClick: {
				"wxi-trash": this.deleteColumn
			}
		};

		return {
			rows: [
				fileTable,
				{
					cols: [
						{},
						{
							autowidth: true,
							view: "uploader",
							type: "icon",
							label: " Upload file",
							icon: "fas fa-cloud-upload-alt",
							autosend: false,
							on: {
								onBeforeFileAdd: (upload) => {
									const id = this.getParam("contactId", true);
									files.add({
										Name: upload.name,
										Change: upload.file.lastModifiedDate,
										Size: upload.file.size,
										contactId: id
									});
									return false;
								}
							}
						},
						{}
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
