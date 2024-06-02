export class TestClass {}

export class TestExtendedClass extends TestClass {}

export function topLevelFunction() {
  console.log('Hello from the top level!');
}

window.TestClass = TestClass;
window.TestExtendedClass = TestExtendedClass;
