class DOMComponentClassFactory {
    constructor() {
    }

    createClasses() {
        return 'div,span,p,table,tr,td'.split(',').map(function(elementName) {
            var cClass = (class extends ContainerComponent {
                constructor() {
                    super();

                    this.elementName = elementName;
                }

             });
            cClass.displayName = elementName;
            return cClass;
        });
    }
}
