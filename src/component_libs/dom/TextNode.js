class TextNode extends AbstractComponent {
    constructor() {
        super();

        var textAttr = new BasicAttribute();
        textAttr.title = 'text';
        textAttr.codeName = 'text';
        textAttr.valueType = 'string';
        textAttr.component = this;
        textAttr.onValueChange = function(value) {
            this.value = value;
            this.component.getDrawable().innerText = this.value;
        }
        this.attributes.push(textAttr);
        this.textAttr = textAttr;
    }

    createDrawable() {
        var span = document.createElement('span');
        span.innerHTML = '文本';
        return span;
    }

    generateCode() {
        return this.textAttr.value;
    }
}
TextNode.displayName = '纯文本节点';
