let myBttn = document.getElementById("add");
let dataBttn = document.getElementById("data");
let textarea = document.getElementById("text");

let idx = 1;

myBttn.addEventListener("click", (e) => {
	//event.preventDefault();
	idx++;
	$("#grid").jqGrid("addRow", {
		rowID: idx,
		position: "first",
		initdata: { id: idx.toString(), FirstName: "sda", LastName: "asda" },
	});
	lastSel = idx;
});

dataBttn.addEventListener("click", (e) => {
	let ids = $("#grid").jqGrid("getDataIDs");
	let objData = [];
	for (var i = 0; i < ids.length; i++) {
		var rowId = ids[i];
		var rowData = $("#grid").jqGrid("getRowData", rowId);
		objData.push(rowData);
	}
	textarea.value = JSON.stringify(objData);
});

var lastSel;
$(function () {
	$("#grid").jqGrid({
		datatype: "local",

		caption: "My Grid",
		height: "auto",
		data: [{ id: 1, FirstName: "Angela", LastName: "Mekel" }],
		colNames: ["id", "First Name", "Last Name"],
		colModel: [
			{ name: "id", editable: false },
			{ name: "FirstName", label: "FirstName", editable: true },
			{ name: "LastName", label: "LastName", editable: true },
		],
		pager: "#pager",
		afterInsertRow: function (id, rowdata, rowel) {
			if (lastSel !== undefined) {
				$("#grid").jqGrid("editRow", id, true);
			}
		},
		onSelectRow: function (id, status, e) {
			if (id && id !== lastSel) {
				$("#grid").jqGrid("saveRow", lastSel);
				//$("#grid").jqGrid("restoreRow", lastSel);
				$("#grid").jqGrid("editRow", id, true);

				console.log(id, lastSel);
			} else if (id === lastSel) {
				$("#grid").jqGrid("editRow", id, true);
				lastSel = id;
			}
			lastSel = id;
		},
	});
	$("#grid").jqGrid("navGrid", "#pager", {
		add: true,
		edit: true,
		del: true,
		view: false,
		search: false,
		refresh: false,
	});
});

document.addEventListener("click", function (e) {
	let id = e.target.id;
	console.log(id, e.target.nodeName);
	if (!isDescendant(event.target, "gbox_grid")) {
		console.log(lastSel);
		$("#grid").jqGrid("saveRow", lastSel);
		$("#grid").jqGrid("resetSelection");
	}
});

const isDescendant = (el, parentId) => {
	let isChild = false;
	let i = 0;
	if (el.id === parentId) {
		isChild = true;
	}
	while ((el = el.parentNode)) {
		i++;
		console.log(i);
		if (el.id === parentId) {
			isChild = true;
		}
	}
	console.log(isChild);
	return isChild;
};
