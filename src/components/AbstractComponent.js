/*
抽象组件，表示用户需要的组件，如输入框
方法可重写
*/
class AbstractComponent {
    constructor() {
        /* 组件拥有的属性集合 */
        this.attributes = [];
        /* 是否继承属性, 如果是则值是直接父类们 */
        this.inheritComponentClasses = [];

        /* 绘制组件对象 */
        this._drawable = null;

        this.parent = null;
    }

    getAttributes() {
        return this.attributes;
    }

    /* 创建组件以让设计器调用以绘制 */
    createDrawable() {}
    /* 获取绘制对象 */
    getDrawable() { return this._drawable; }
    /* 获取属性更新操作的绘制对象 */
    getUpdateDrawable() { return this.getDrawable(); }

    remove() {
        $(this._drawable).remove();
    }

    /* 生成代码 */
    generateCode() {
    }
}
/* 显示在设计器里的名称 */
AbstractComponent.displayName = null;
/* 显示在组件选择器中的图标 */
AbstractComponent.iconClass = null;
