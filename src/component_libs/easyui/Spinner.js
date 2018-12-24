class Spinner extends FormInput {
    constructor() {
        super();
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'value', valueType: 'number'},
            {name: 'min', valueType: 'number'},
            {name: 'max', valueType: 'number'},
            {name: 'increment', valueType: 'number'}
        ];
    }
}
Spinner.displayName = 'Spinner(微调)';
