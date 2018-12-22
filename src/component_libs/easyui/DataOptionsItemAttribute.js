class DataOptionsItemAttribute extends AbstractAttribute {
    constructor() {
        super();
    }

    onValueChange(value) {
        this.value = value;
        this.component.dataOptions[this.codeName] = value;
    }
}
