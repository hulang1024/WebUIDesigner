var DOMComponentClassFactory = {};

DOMComponentClassFactory.createClasses = function() {
    var names = 'div,span,p,table,tr,th,td,form';
    return names.split(',').map(function(elementName) {
        var cls = DOMComponentClassFactory.createClassByElementName(elementName);
        return cls;
    });
}

DOMComponentClassFactory.createClassByElementName = function(elementName) {
    var cls = (class extends ContainerComponent {
        constructor() {
            super();

            this.elementName = elementName;
        }
    });
    cls.displayName = elementName;
    return cls;
}
