class FormTableTr extends ContainerComponent {
    constructor() {
        super();

        this.elementName = 'tr';

        var drawable = new Drawable(this.elementName, this);
        $(drawable).addClass('dom-element');
        this._drawable = drawable;

        var cTh = new (DOMComponentClassFactory.createClassByElementName('th'));
        cTh.createDrawable();
        this.addChild(cTh);
        var cText = new TextNode();
        this._cText = cText;
        cText.createDrawable();
        cTh.addChild(cText);
        var cTd = new (DOMComponentClassFactory.createClassByElementName('td'));
        cTd.createDrawable();
        this.addChild(cTd);
    }

    createDrawable() {
        return this._drawable;
    }

    getDrawableForSelect() {
        return this._cText.getDrawable();
    }
}
FormTableTr.displayName = '表单行';
