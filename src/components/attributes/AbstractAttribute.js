/*
组件属性
*/
class AbstractAttribute {
    constructor() {
        /* 显示名称，如宽 */
        this.title = null;
        /* 名称，如 width */
        this.codeName = null;
        /* 属性值类型, 可选值: css-enum、css-value  、boolean、string、number、enum、url、table... */
        this.valueType = null;
        /* 当前值 */
        this.value = null;
        /* 所属组件对象 */
        this.component = null;
    }

    /*
    当用户在属性设置器中改变属性值时调用，在此可去实时更新绘制组件
    @param value 新值
    */
    onValueChange(value) {}
}
