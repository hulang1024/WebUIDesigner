class FormTableTr extends ContainerComponent {
    constructor() {
        super();

        this.elementName = 'tr';

        var drawable = new Drawable(this.elementName, this);
        $(drawable).addClass('dom-element');
        this._drawable = drawable;

        var cTh = new (DOMComponentClassFactory.createClassByElementName('th'));
        drawable.appendChild(cTh.createDrawable());
        this.children.push(cTh);
        var cTd = new (DOMComponentClassFactory.createClassByElementName('td'));
        drawable.appendChild(cTd.createDrawable());
        this.children.push(cTd);
    }

    createDrawable() {
        return this._drawable;
    }
}
FormTableTr.displayName = '表单行';
