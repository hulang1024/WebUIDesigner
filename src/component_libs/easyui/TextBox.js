class TextBox extends FormInput {
    constructor() {
        super();
        this.setEasyuiClass('textbox');

        this.inheritComponents([ValidateBox]);
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'value', valueType: 'string'},
            {name: 'type', valueType: 'string'},
            {name: 'multiline', valueType: 'boolean'},
            {name: 'prompt', valueType: 'string'}
        ];
    }

}
TextBox.displayName = 'TextBox(文本框)';
