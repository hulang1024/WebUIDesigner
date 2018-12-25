class ClassAttribute extends BasicAttribute {
    constructor(component) {
        super(component);
        this.title = 'class';
        this.codeName = 'class';
        this.value = '';
        this.valueType = 'string';
    }

    onValueChange(value) {
        this.value = value;
        $(this.component.getDrawable()).removeClass().addClass(this.value);
    }
}
