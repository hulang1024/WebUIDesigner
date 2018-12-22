
class ContainerComponent extends ElementComponent {
    constructor() {
        super();
        /* 子组件 */
        this.children = [];
    }

    /*
    @param child  extends AbstractComponent
    */
    addChild(child) {
        this.children.push(child);
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

    addDrawableChild(child) {
        this._drawable.appendChild(child);
    }

    generateCode(level) {
        var code = '';
        this.children.forEach(function(c) {
            code += c.generateCode(level + 1) + '\n';
        });
        return code;
    }
}
