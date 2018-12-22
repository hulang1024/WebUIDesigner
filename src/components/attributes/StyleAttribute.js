class StyleAttribute extends BasicAttribute {
    constructor() {
        super();
    }

    onValueChange(value) {
        this.value = value;
        var styleMap = this.component.styleMap;
        if (value) {
            styleMap[this.codeName] = this.value;
        } else {
            delete styleMap[this.codeName];
        }
        $(this.component.getDrawable()).css(styleMap);
    }
}
