class ValidateBox extends FormInput {
    constructor() {
        super();
        this.tag = 'input';
        this.setEasyuiClass('validatebox');
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'required', valueType: 'boolean'},
            {name: 'validType', valueType: 'string'},
            {name: 'editable', valueType: 'boolean'},
            {name: 'disabled', valueType: 'boolean'},
            {name: 'readonly', valueType: 'boolean'},
        ];
    }

}

ValidateBox.displayName = 'ValidateBox(验证框)';
