class BooleanInput {
    constructor(attribute) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = !!attribute.value;
        checkbox.onchange = function() {
            attribute.onValueChange(this.checked);
        };
        return checkbox;
    }
}
