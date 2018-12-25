class NumberBox extends FormInput {
    constructor() {
        super();
        this.setEasyuiClass('numberbox');
        this.inheritComponents([ValidateBox]);
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'value', valueType: 'number'},
            {name: 'min', valueType: 'number'},
            {name: 'max', valueType: 'number'},
            {name: 'precision', valueType: 'number'}
        ];
    }
}
NumberBox.displayName = 'NumberBox(数值输入框)';
