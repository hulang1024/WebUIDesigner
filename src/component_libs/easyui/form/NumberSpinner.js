class NumberSpinner extends FormInput {
    constructor() {
        super();
        this.setEasyuiClass('numberspinner');
        this.inheritComponents([NumberBox, Spinner, ValidateBox]);
    }
}
NumberSpinner.displayName = 'NumberSpinner(数字微调)';
