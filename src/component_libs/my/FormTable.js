class FormTable extends ContainerComponent {
    constructor() {
        super();

        this.elementName = 'form';

        var elem = document.createElement(this.elementName);
        elem.className = 'dom-element';
        this._drawable = elem;

        var cTable = new (DOMComponentClassFactory.createClassByElementName('table'));
        cTable.classAttr.value = 'form';
        elem.appendChild(cTable.createDrawable());

        this.children.push(cTable);
        this._cTable = cTable;
    }

    createDrawable() {
        return this._drawable;
    }

    addChild(child) {
        this._cTable.addChild(child);
    }
}
FormTable.displayName = 'form>table.form';
