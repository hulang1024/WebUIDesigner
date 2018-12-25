
class ContainerComponent extends ElementComponent {
    constructor() {
        super();
        /* 子组件 */
        this.children = [];
    }

    getChildren() {
        return this.children;
    }

    /* 往设计界面增加之后默认选中的元素 */
    getDrawableForSelect() {
        return this.getDrawable(); // 默认实现
    }

    /*
    @param child  extends AbstractComponent
    */
    addChild(child) {
        this.children.push(child);
        $(this._drawable).append(child.getDrawable());
    }

    remove() {
        $(this._drawable).remove();
        this.children.forEach(this.removeChild.bind(this));
    }

    removeChild(child) {
        var iterChild;
        for (var i = 0; i < this.children.length; i++) {
            iterChild = this.children[i];
            if (iterChild == child) {
                this.children.splice(i, 1);
                iterChild.remove();
                break;
            }
        }
    }

    generateCode(level) {
        var indent = CodeGenerate.indent(level);
        var html = '';
        var tagName = this.elementName;
        html += indent + '<' + tagName;
        [
            this.generateIdAttributesCode(),
            this.generateStyleAttributeCode()
        ].forEach(function(s) {
            if (s && ((html.length + s.length + 3 + tagName.length) > 80)) {
                s = '\n' + indent + '   ' + s;
            }
            html += s;
        });
        html += '>';
        var hasChildAndFirstNotText = this.children.length > 0 && !(this.children[0] instanceof TextNode);
        if (hasChildAndFirstNotText) {
            html += '\n';
        }
        this.children.forEach(function(c) {
            var innerHtml = c.generateCode(level + 1);
            if (c instanceof TextNode) {
                if (innerHtml) {
                    html += innerHtml;
                }
            } else {
                html += innerHtml + '\n';
            }
        });
        var endTag = '</' + tagName + '>';
        if (hasChildAndFirstNotText) {
            html += indent + endTag;
        } else {
            html += endTag;
        }
        return html;
    }
}
