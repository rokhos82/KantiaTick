tick.ui = {};

tick.ui.functions = {};
tick.ui.functions.setClass = function(klasses) {
	if(klasses && typeof(klasses) == "string") {
		this.node.setAttribute("class",klasses);
	}
};

tick.ui.functions.getValue = function() {
	return this.node.value;
};

tick.ui.functions.setText = function(text) {
	var textNode = document.createTextNode(text);
	this.clearChildren();
	this.node.appendChild(textNode);
};

tick.ui.functions.clearChildren = function() {
	while(this.node.firstChild) {
		this.node.removeChild(this.node.firstChild);
	}
};

// DIV element -------------------------------------------------------------------------------------
tick.ui.div = function(root,klass) {
	this.node = document.createElement("div");
	this.root = root;
	this.root.appendChild(this.node);

	this.setClass(klass);
};
tick.ui.div.prototype.setClass = tick.ui.functions.setClass;

// LABEL element -----------------------------------------------------------------------------------
tick.ui.label = function(root,klass,text) {
	this.node = document.createElement("label");
	
	this.text = text;
	this.textNode = document.createTextNode(this.text);
	this.node.appendChild(this.textNode);
	
	this.root = root;
	this.root.appendChild(this.node);

	this.setClass(klass);
};
tick.ui.label.prototype.setClass = tick.ui.functions.setClass;
tick.ui.label.prototype.setText = tick.ui.functions.setText;
tick.ui.label.prototype.clearChildren = tick.ui.functions.clearChildren;

// INPUT element -----------------------------------------------------------------------------------
tick.ui.input = function(root,klass,type,defValue,attr,action) {
	this.node = document.createElement("input");
	this.node.type = type;

	this.action = action;
	this.node.ui = this;
	this.node.setAttribute("onblur","this.ui.action();");

	for(var k in attr) {
		var v = attr[k];
		this.node.setAttribute(k,v);
	}

	this.node.value = defValue;

	this.root = root;
	this.root.appendChild(this.node);

	this.setClass(klass);
};
tick.ui.input.prototype.setClass = tick.ui.functions.setClass;
tick.ui.input.prototype.getValue = tick.ui.functions.getValue;

// SPAN element ------------------------------------------------------------------------------------
tick.ui.span = function(root,klass,text) {
	this.node = document.createElement("span");

	this.text = text;
	this.textNode = document.createTextNode(this.text);
	this.node.appendChild(this.textNode);

	this.root = root;
	this.root.appendChild(this.node);

	this.setClass(klass);
};
tick.ui.span.prototype.setClass = tick.ui.functions.setClass;
tick.ui.span.prototype.setText = tick.ui.functions.setText;
tick.ui.span.prototype.clearChildren = tick.ui.functions.clearChildren;

// BUTTON element ----------------------------------------------------------------------------------
tick.ui.button = function(root,klass,text,action) {
	this.node = document.createElement("button");

	this.text = text;
	this.textNode = document.createTextNode(this.text);
	this.node.appendChild(this.textNode);

	this.action = action;
	this.node.ui = this;
	this.node.setAttribute("onclick","this.ui.action();");

	this.root = root;
	this.root.appendChild(this.node);

	this.setClass(klass);
}
tick.ui.button.prototype.setClass = tick.ui.functions.setClass;
tick.ui.button.prototype.setText = tick.ui.functions.setText;
tick.ui.button.prototype.clearChildren = tick.ui.functions.clearChildren;