class Combo extends EasyuiComponent {
    constructor() {
        super();
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'multiple', valueType: 'boolean'},
            {name: 'multivalue', valueType: 'boolean'}
        ];
    }
}
Combo.displayName = 'Combo(自定义下拉框)';
