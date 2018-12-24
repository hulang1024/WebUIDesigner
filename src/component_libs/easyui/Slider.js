class Slider extends FormInput {
    constructor() {
        super();
        this.setEasyuiClass('slider');
    }

    getSpecialAttributeSpecs() {
        return [
            {name: 'mode', valueType: 'enum', enumValues: ['h', 'v']},
            {name: 'reversed', valueType: 'boolean'},
            {name: 'showTip', valueType: 'boolean'},
            {name: 'disabled', valueType: 'boolean'},
            {name: 'range', valueType: 'boolean'},
            {name: 'value', valueType: 'number'},
            {name: 'min', valueType: 'number'},
            {name: 'max', valueType: 'number'},
            {name: 'step', valueType: 'number'},
            {name: 'rule', valueType: 'js'}
        ];
    }

    getUpdateDrawable() {
        return $(this._drawable).find('.slider');
    }
}
Slider.displayName = 'Slider(滑动条)';
