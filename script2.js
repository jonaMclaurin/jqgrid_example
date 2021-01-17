let myBttn = document.getElementById("add");
//let dataBttn = document.getElementById("data");
let textarea = document.getElementById("text");
let delBttn = document.getElementById("del");
let idx1 = 1;
let idx2 = 1;

myBttn.addEventListener("click", (e) => {
	//event.preventDefault();
	let selrow = $("#grid").jqGrid("getGridParam", "selrow");
	if (selrow == null) {
		alert("Please select a row");
	} else {
		let data = $("#grid").jqGrid("getRowData", selrow);
		//onsole.log(data);
		$("#grid2").jqGrid("addRow", {
			rowId: data.id,
			initdata: {
				id: data.id,
				FirstName: data.FirstName,
				LastName: data.LastName,
				IP: data.IP,
				"IP set": data.IP !== "" ? "yes" : "no",
			},
			position: "last",
		});
	}
});

del.addEventListener("click", (e) => {
	let selrow = $("#grid2").jqGrid("getGridParam", "selrow");
	if (selrow == null) {
		alert("Please select a row");
	} else {
		//console.log(selrow);
		$("#grid2").jqGrid("delGridRow", selrow);
		lastSel2 = undefined;
	}
});

/* dataBttn.addEventListener("click", (e) => {
	let ids = $("#grid").jqGrid("getDataIDs");
	let objData = [];
	for (var i = 0; i < ids.length; i++) {
		var rowId = ids[i];
		var rowData = $("#grid").jqGrid("getRowData", rowId);
		objData.push(rowData);
	}
	textarea.value = JSON.stringify(objData);
}); */

var lastSel;
var lastSel2;
var first = 0;

$(function () {
	$("#grid")
		.jqGrid({
			datatype: "local",
			caption: "My Grid",
			height: "auto",
			data: dummy /* [
				{ id: 1, FirstName: "Angela", LastName: "Mekel", IP: "123" },
				{ id: 2, FirstName: "JONA", LastName: "RM", IP: "" },
			] */,
			colNames: ["id", "First Name", "Last Name", "IP"],
			colModel: [
				{ name: "id", editable: false },
				{ name: "FirstName", label: "FirstName", editable: false },
				{ name: "LastName", label: "LastName", editable: false },
				{ name: "IP", label: "IP", editable: false },
			],
			pager: true,
			afterInsertRow: function (id, rowdata, rowel) {},
			onSelectRow: function (id, status, e) {
				if (id === lastSel) {
					$("#grid").jqGrid("setSelection", id);
				}
			},
		})
		.jqGrid("filterToolbar");

	$("#grid2").jqGrid({
		datatype: "local",
		caption: "My Grid",
		height: "auto",
		data: [
			{
				id: 1,
				FirstName: "Angela",
				LastName: "Mekel",
				IP: "192.168.23.23",
				Occupation: "OptionA",
				"IP set": "yes",
			},
		],
		colNames: ["id", "First Name", "Last Name", "IP", "Occupation", "IP set"],
		colModel: [
			{ name: "id", editable: false },
			{ name: "FirstName", label: "FirstName", editable: false },
			{ name: "LastName", label: "LastName", editable: false },
			{
				name: "IP",
				index: "IP",
				label: "IP",
				editable: true,
				edittype: "custom",
				editoptions: {
					custom_element: function (value, options) {
						console.log(value);
						let data = $("#grid2").jqGrid("getRowData", options.rowId);
						console.log(data["IP set"]);
						if (data["IP set"] === "yes") {
							return $("<input disabled>").attr("type", "text").val(value);
						} else {
							return $("<input>").attr("type", "text").val(value);
						}
					},
					custom_value: function (elem, operation, value) {
						//console.log(elem, operation, value);
						if (operation == "get") {
							return elem.val();
						} else {
							elem.val(value);
						}
					},
				},
			},
			{
				name: "Occupation",
				index: "Occupation",
				label: "Occupation",
				editable: true,
				edittype: "select",
				editoptions: {
					value: {
						OptionA: "OptionA",
						OptionB: "OptionB",
					},
				},
			},
			{ name: "IP set", editable: false, hidden: true },
		],
		pager: "#pager2",
		afterInsertRow: function (id, rowdata, rowel) {},
		onSelectRow: function (id, status, e) {
			if (id && id !== lastSel2) {
				$("#grid2").jqGrid("saveRow", lastSel2);
				//$("#grid").jqGrid("restoreRow", lastSel);
				$("#grid2").jqGrid("editRow", id, true);

				//console.log(id, lastSel2);
			} else if (id === lastSel2) {
				$("#grid2").jqGrid("editRow", id, true);
				lastSel2 = id;
			}
			lastSel2 = id;
		},
	});
});

document.addEventListener("click", function (e) {
	let selrow1 = $("#grid").jqGrid("getGridParam", "selrow");
	let selrow2 = $("#grid2").jqGrid("getGridParam", "selrow");
	//console.log(selrow1, selrow2);
	if (!isDescendant(e.target, "gbox_grid") && selrow1) {
		//console.log(lastSel);
		$("#grid").jqGrid("resetSelection");
		lastSel = undefined;
	}
	if (!isDescendant(e.target, "gbox_grid2") && selrow2) {
		$("#grid2").jqGrid("saveRow", selrow2);
		$("#grid2").jqGrid("resetSelection");
		lastSel2 = undefined;
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
		//console.log(i);
		if (el.id === parentId) {
			isChild = true;
		}
	}
	//console.log(isChild);
	return isChild;
};

var dummy = [
	{
		id: 19,
		FirstName: "NOOEQz",
		LastName: "LiyUip",
		IP: "101.3.213.254",
	},
	{
		id: 143,
		FirstName: "JoKXCb",
		LastName: "pBuubi",
		IP: "143.68.115.48",
	},
	{
		id: 168,
		FirstName: "GrDLXH",
		LastName: "lgzGsF",
		IP: "198.165.33.151",
	},
	{
		id: 23,
		FirstName: "IHTvkF",
		LastName: "VoMmAC",
		IP: "113.121.154.227",
	},
	{
		id: 115,
		FirstName: "QiqTtI",
		LastName: "xciMld",
		IP: "19.10.184.199",
	},
	{
		id: 30,
		FirstName: "uHdxng",
		LastName: "SaeQUW",
		IP: "201.230.17.6",
	},
	{
		id: 173,
		FirstName: "fEbpRk",
		LastName: "sTaBQH",
		IP: "197.181.205.54",
	},
	{
		id: 118,
		FirstName: "zyfinN",
		LastName: "BAxNlk",
		IP: "209.184.101.48",
	},
	{
		id: 34,
		FirstName: "uqMQDq",
		LastName: "bOTqwP",
		IP: "83.113.221.87",
	},
	{
		id: 130,
		FirstName: "EPvAaQ",
		LastName: "WevECm",
		IP: "81.102.21.195",
	},
	{
		id: 193,
		FirstName: "LisYXM",
		LastName: "YyXVSf",
		IP: "69.246.121.18",
	},
	{
		id: 55,
		FirstName: "ScSaYq",
		LastName: "nTKXup",
		IP: "10.130.251.53",
	},
	{
		id: 185,
		FirstName: "onlLXQ",
		LastName: "rudgFm",
		IP: "121.203.172.189",
	},
	{
		id: 68,
		FirstName: "sxxgwm",
		LastName: "febgtD",
		IP: "99.181.228.206",
	},
	{
		id: 48,
		FirstName: "pljVQl",
		LastName: "UXVVVC",
		IP: "125.154.118.7",
	},
	{
		id: 27,
		FirstName: "TtCFYu",
		LastName: "hEKDGz",
		IP: "97.59.178.29",
	},
	{
		id: 79,
		FirstName: "mbjzfe",
		LastName: "YDVezA",
		IP: "58.129.197.6",
	},
	{
		id: 129,
		FirstName: "rkiHRc",
		LastName: "rbGCni",
		IP: "123.0.21.131",
	},
	{
		id: 145,
		FirstName: "KXUixg",
		LastName: "oAbfzS",
		IP: "207.46.30.42",
	},
	{
		id: 23,
		FirstName: "AhsDoQ",
		LastName: "fiCWHR",
		IP: "12.54.225.195",
	},
];
