tick.ui = {};

tick.ui.functions = {};
tick.ui.functions.setClass = function(klasses) {
	if(klasses && typeof(klasses) == "string") {
		this.node.setAttribute("class",klasses);
	}
}

// DIV element -------------------------------------------------------------------------------------
tick.ui.div = function(root,klass) {
	this.node = document.createElement("div");
	this.root = root;
	this.root.appendChild(this.node);

	this.setClass(klass);
};
tick.ui.div.prototype.setClass = tick.ui.functions.setClass;

// LABEL element -----------------------------------------------------------------------------------
tick.ui.label = function(root,text) {
	this.node = document.createElement("label");
	
	this.text = text;
	this.textNode = document.createTextNode(this.text);
	this.node.appendChild(this.textNode);
	
	this.root = root;
	this.root.appendChild(this.node);
};
tick.ui.label.prototype.setClass = tick.ui.functions.setClass;

// INPUT element -----------------------------------------------------------------------------------
tick.ui.input = function(root,type,action) {
	this.node = document.createElement("input");
	this.node.type = type;

	this.action = action;
	this.node.ui = this;
	this.node.setAttribute("onblur","this.ui.action();");

	this.root = root;
	this.root.appendChild(this.node);
};
tick.ui.input.prototype.setClass = tick.ui.functions.setClass;

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