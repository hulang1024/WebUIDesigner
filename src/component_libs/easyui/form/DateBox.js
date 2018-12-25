class DateBox extends FormInput {
    constructor() {
        super();
        this.setEasyuiClass('datebox');
        this.inheritComponents([ValidateBox]);
    }
}
DateBox.displayName = 'DateBox(日期输入框)';
