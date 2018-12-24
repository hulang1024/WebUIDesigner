var DOMComponentClassFactory = {};

DOMComponentClassFactory.createClasses = function() {
    var names = 'div,span,p,table,tr,th,td,form';
    return names.split(',').map(function(elementName) {
        var cClass = DOMComponentClassFactory.createClassByElementName(elementName);
        cClass.displayName = elementName;
        return cClass;
    });
}

DOMComponentClassFactory.createClassByElementName = function(elementName) {
    return (class extends ContainerComponent {
        constructor() {
            super();

            this.elementName = elementName;
        }
    });
}
