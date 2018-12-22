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
                    var indent = '';
                    for (var n = level * 4; n > 0; n--) {
                        indent += ' ';
                    }
                    var html = '';
                    html += indent + '<' + elementName;
                    html += this.generateBasicAttributesCode();
                    html += '>\n';
                    this.children.forEach(function(c) {
                        html += c.generateCode(level + 1);
                    });
                    html += indent + '</' + elementName + '>\n';
                    return html;
                }
             });
            cClass.displayName = elementName;
            return cClass;
        });
    }
}
