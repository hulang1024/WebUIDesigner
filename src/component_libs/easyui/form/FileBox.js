class FileBox extends FormInput {
    constructor() {
        super();
        this.setEasyuiClass('filebox');
        this.inheritComponents([ValidateBox]);
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'buttonText', valueType: 'string'},
            {name: 'buttonIcon', valueType: 'string'},
            {name: 'buttonAlign', valueType: 'enum', enumValues: ['right', 'left']},
            {name: 'accept', valueType: 'string'},
            {name: 'multiple', valueType: 'boolean'},
            {name: 'separator', valueType: 'string'},
        ];
    }
}
FileBox.displayName = 'FileBox(文件框)';
