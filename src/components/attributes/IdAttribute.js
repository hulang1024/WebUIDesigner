class IdAttribute extends BasicAttribute {
    constructor(component) {
        super(component);
        this.title = 'id';
        this.codeName = 'id';
        this.value = '';
        this.valueType = 'string';
    }

    onValueChange(value) {
        this.value = value;
        $(this.component.getDrawable()).attr('id', this.value);
    }
}
