class NameAttribute extends BasicAttribute {
    constructor(component) {
        super(component);
        this.title = 'name';
        this.codeName = 'name';
        this.value = '';
        this.valueType = 'string';
    }

    onValueChange(value) {
        this.value = value;
        $(this.component.getDrawable()).attr('name', this.value);
    }
}
