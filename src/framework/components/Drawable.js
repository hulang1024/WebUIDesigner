class Drawable {
    constructor(containerElementName, component) {
        var element = document.createElement(containerElementName);
        $(element).addClass('component');
        element.getComponent = function() {
            return component;
        }
        return element;
    }


}
