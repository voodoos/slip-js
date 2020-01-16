// @flow

export let myQueryAll = (root, selector, avoid) => {
    avoid = avoid || ".slip";
    if (!root.id)
	root.id = '_' + Math.random().toString(36).substr(2, 15);;
    let allElem = Array.from(root.querySelectorAll(selector));
    let other = Array.from(root.querySelectorAll("#"+root.id+" " + avoid + " " +selector));
    return allElem.filter(value => !other.includes(value));
};

export function cloneNoSubslip (elem) {
    let newElem = elem.cloneNode(false);
    elem.childNodes.forEach((child) => {
	if(child.classList && child.classList.contains("slip")){
	    let placeholder = document.createElement(child.tagName);
	    placeholder.classList.add("toReplace");
	    newElem.appendChild(placeholder);
	}
	else
	    newElem.appendChild(cloneNoSubslip(child));
    });
    return newElem;
}
export function replaceSubslips(clone, subslips) {
    let placeholders = myQueryAll(clone, ".toReplace");
    subslips.forEach((subslip, index) => {
	placeholders[index].replaceWith(subslip);
    });
}