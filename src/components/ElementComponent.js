/*
元素组件
*/
class ElementComponent extends AbstractComponent {
    constructor() {
        super();

        var attributes = [];
        this.idAttr = new IdAttribute(this);
        attributes.push(this.idAttr);
        this.nameAttr = new NameAttribute(this);
        attributes.push(this.nameAttr);
        this.classAttr = new ClassAttribute(this);
        attributes.push(this.classAttr);

        this.styleMap = {};
        this.styleItemAttrs = new StyleAttributeFactory().createStyleAttributes(this);

        this.attributes = attributes.concat(this.styleItemAttrs);
    }

    generateIdAttributesCode() {
        var html = '';
        if (this.idAttr.value)
            html += ' id=' + String.dquote(this.idAttr.value);
        if (this.nameAttr.value)
            html += ' name=' + String.dquote(this.nameAttr.value);
        if (this.classAttr.value)
            html += ' class=' + String.dquote(this.classAttr.value);
        return html;
    }

    generateStyleAttributeCode() {
        var html = '';
        if (Object.keys(this.styleMap).length) {
            var kvs = '';
            for (var k in this.styleMap) {
                kvs += k + ':' + this.styleMap[k] + ';';
            }
            html += ' style=' + String.dquote(kvs);
        }
        return html;
    }
}
