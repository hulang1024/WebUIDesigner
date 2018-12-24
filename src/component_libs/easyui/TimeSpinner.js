class TimeSpinner extends FormInput {
    constructor() {
        super();
        this.setEasyuiClass('timespinner');
        this.inheritComponents([Spinner, ValidateBox]);
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'separator', valueType: 'string'},
            {name: 'showSeconds', valueType: 'boolean'},
            {name: 'highlight', valueType: 'number'},
            {name: 'value', valueType: 'number'},
            {name: 'min', valueType: 'number'},
            {name: 'max', valueType: 'number'},
            {name: 'step', valueType: 'number'},
            {name: 'rule', valueType: 'js'}
        ]
    }
}
TimeSpinner.displayName = 'TimeSpinner(时间微调)';
