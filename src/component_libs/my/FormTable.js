class FormTable extends ContainerComponent {
    constructor() {
        super();

        this.elementName = 'form';

        var elem = new Drawable(this.elementName, this);
        $(elem).addClass('dom-element');
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
FormTable.displayName = '表单';
