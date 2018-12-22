class DOMComponentClassFactory {
    constructor() {
    }

    createClasses() {
        return 'div,span,p'.split(',').map(function(elementName) {
            var cClass = (class extends ContainerComponent {
                constructor() {
                    super();
                }

                createDrawable() {
                    var elem = document.createElement('div');
                    elem.style.width = '100px';
                    elem.style.height = '20px';
                    elem.style.border = '1px solid gray';
                    return elem;
                }

                generateCode(level) {
                    var indent = CodeGenerate.indent(level);
                    var html = '';
                    html += indent + '<' + elementName;
                    [
                        this.generateIdAttributesCode(),
                        this.generateStyleAttributeCode()
                    ].forEach(function(s) {
                        if (s && ((html.length + s.length + 4) > 80)) {
                            s = '\n' + indent + CodeGenerate.indent(1) + s;
                        }
                        html += s;
                    });
                    html += '>';
                    if (this.children.length > 0 && !(this.children[0] instanceof TextNode)) {
                        html += '\n';
                    }
                    var childIndent = CodeGenerate.indent(level + 1);
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
                    var endTag = '</' + elementName + '>';
                    if (this.children.length) {
                        html += indent + endTag;
                    } else {
                        html += endTag;
                    }
                    return html;
                }
             });
            cClass.displayName = elementName;
            return cClass;
        });
    }
}
