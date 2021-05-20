let app = document.getElementById("app");
let app2 = document.getElementById("app2");
var lastSel;

let cssString =
	".open-button {background-color: #555;color: white;padding: 16px 20px;border: none;cursor: pointer;opacity: 0.8;position: fixed;bottom: 23px;right: 28px;width: 280px;}.form-popup {display: none;position: absolute;bottom: 0;left: 15px;border: 3px solid #f1f1f1;z-index: 9; height: 300px;overflow: auto;}.form-container {max-width: 300px;padding: 10px;background-color: white;}.form-container input[type=text], .form-container input[type=password] {width: 100%;padding: 15px;margin: 5px 0 22px 0;border: none;background:#f1f1f1; position: relative;}.form-container input[type=text]:focus, .form-container input[type=password]:focus {background-color: #ddd;outline: none;}.form-container .btn {background-color: #04AA6D;color: white;padding: 16px 20px;border: none;cursor: pointer;width: 100%;margin-bottom:10px;opacity: 0.8;}.form-container .cancel {background-color: red;}.form-container .btn:hover, .open-button:hover {opacity: 1;}";

let htmlString =
	'<div class="form-popup" id="myForm"><form class="form-container"><h1>Login</h1><label for="firstname"><b>First Name</b></label><input type="text" placeholder="First Name" name="firstname"><label for="psw"><b>Last Name</b></label><input type="text" placeholder="Last Name" name="psw"><input type="text" name="id"><button onclick="formHandler(event, this.form)" class="btn">Ok</button><button type="button" class="btn cancel" onclick="closeForm()">Close</button></form></div>';

loadStyleString(cssString);

document.addEventListener("submit", (event) => {
	console.log(event.type);
});

function formHandler(event, form) {
	event.preventDefault();
	let inputs = form.elements;
	console.log(lastSel);
	let firstname = inputs["firstname"];
	let lastname = inputs["psw"];
	let id = inputs["id"];
	console.log(firstname.value);
	console.log(lastname.value);
	let selrow = $("#grid").jqGrid("getGridParam", "selrow");
	let data = $("#grid").jqGrid("getRowData", id.value);
	console.log(data);
	data.FirstName = firstname.value;
	data.LastName = lastname.value;
	data.IP = data.IP;
	console.log(data);
	$("#grid").jqGrid("setRowData", id.value, data);
}

function getPosition(elem) {
	let position = elem.getBoundingClientRect();
	console.log({ position });
	let positionObj = {
		left: (position.left + position.right) / 2,
		bottom: (position.top + position.bottom) / 2,
	};
	return positionObj;
}

function positionElement(elem, reference) {
	let newPosition = getPosition(reference);
	console.log(newPosition);
	elem.style.left = newPosition.left + "px";
	elem.style.top = newPosition.bottom + "px";
}

function generateForm(hook, htmlForm) {
	let div = document.createElement("div");
	div.id = "formhook";
	div.innerHTML = htmlForm;
	hook.insertAdjacentElement("afterend", div);
}

generateForm(app, htmlString);
//positionElement(app2, app);

function loadStyleString(css) {
	let style = document.createElement("style");
	style.type = "text/css";
	try {
		style.appendChild(document.createTextNode(css));
	} catch (ex) {
		style.styleSheet.cssText = css;
	}
	let head = document.getElementsByTagName("head")[0];
	head.appendChild(style);
}

function openForm(event, rowId) {
	let formContainer = document.getElementById("myForm");
	let form = document.querySelector("#myForm > form");
	let inputs = form.elements;
	console.log(inputs);
	let firstname = inputs["firstname"];
	let lastname = inputs["psw"];
	let id = inputs["id"];
	positionElement(formContainer, event.target);
	formContainer.style.display = "block";
	let selrow = $("#grid").jqGrid("getGridParam", "selrow");
	let data = $("#grid").jqGrid("getRowData", rowId);
	console.log(data);
	firstname.value = data.FirstName;
	lastname.value = data.LastName;
	id.value = data.id;
}

function closeForm() {
	document.getElementById("myForm").style.display = "none";
}

$(function () {
	$("#grid").jqGrid({
		datatype: "local",
		caption: "My Grid",
		height: "auto",
		data: [
			{ id: 1, FirstName: "Angela", LastName: "Mekel", IP: "Click" },
			{ id: 2, FirstName: "JONA", LastName: "RM", IP: "Hey" },
		],
		colNames: ["id", "First Name", "Last Name", "IP"],
		colModel: [
			{ name: "id", editable: false },
			{ name: "FirstName", label: "FirstName", editable: false },
			{ name: "LastName", label: "LastName", editable: false },
			{
				name: "IP",
				label: "IP",
				editable: false,
				formatter: myFormatter,
				unformat: imageUnFormat,
			},
		],
		pager: true,
		afterInsertRow: function (id, rowdata, rowel) {},
		onSelectRow: function (id, status, e) {
			if (id && id !== lastSel) {
				$("#grid").jqGrid("saveRow", lastSel);
				$("#grid").jqGrid("editRow", id, true);
			} else if (id === lastSel) {
				$("#grid").jqGrid("editRow", id, true);
				lastSel = id;
			}
			lastSel = id;
		},
	});
});

function myFormatter(cellvalue, options, rowObject) {
	console.log(cellvalue, options, rowObject);
	return (
		'<button class="rowi" id="' +
		options.rowId +
		'" onclick="openForm(event,' +
		options.rowId +
		')">' +
		cellvalue +
		"</button>"
	);
}

function imageUnFormat(cellvalue, options, cell) {
	console.log($("button", cell)[0].outerText);
	return $("button", cell)[0].outerText;
}
