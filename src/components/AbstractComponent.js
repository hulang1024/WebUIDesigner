/*
抽象组件，表示用户需要的组件，如输入框
*/
class AbstractComponent {
    constructor() {
        /* 组件拥有的属性集合 */
        this.attributes = [];

        /* 绘制组件对象 */
        this._drawable = null;

        this.parent = null;
    }

    getAttributes() {
        return this.attributes;
    }

    /* 创建组件以让设计器调用以绘制 */
    createDrawable() {}

    remove() {
        $(this._drawable).remove();
    }

    setDrawable(drawable) { this._drawable = drawable; }

    /* 注:不一定等于 createDrawable()的值 */
    getDrawable() { return this._drawable; }

    /* 生成代码 */
    generateCode() {
    }
}
/* 显示在设计器里的名称 */
AbstractComponent.displayName = null;
/* 显示在组件选择器中的图标 */
AbstractComponent.iconClass = null;
