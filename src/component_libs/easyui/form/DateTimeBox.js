class DateTimeBox extends FormInput {
    constructor() {
        super();
        this.setEasyuiClass('datetimebox');
        this.inheritComponents([DateBox, ValidateBox]);
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'showSeconds', valueType: 'boolean'},
            {name: 'timeSeparator', valueType: 'string'}
        ];
    }
}
DateTimeBox.displayName = 'DateTimeBox(日期时间输入框)';
