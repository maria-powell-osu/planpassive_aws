FILE EXPLANATIONS
    tsconfig.json :     configuration to tell typescript how to compile to js (es5 is current version of js)
    typings.js:         contains typescript definitions files which is used for static type checking, intellisense etc. for third party libraries
    boot.js:            starting point for the application
    app.component.js:   main app component
    package.json:       tsc:w run typescript in watch mode which makes the code autoupdate in browser

    .component.ts:      our file we are editing
    .component.js.map:  contains mapping for debugging, auto-generated
    .component.js:      contains the compiled js code, auto-generated


ANGULAR DIRECTIVES
 3 Kinds:  
    1) Components:              directives with a template.
    2) Structural directives:   change the DOM layout by adding and removing DOM elements.
    3) Attribute directives:    change the appearance or behavior of an element, component, or another directive.
