import mixin from './index'

test('mixin', () => {
  class BaseFoo {
    foo() {
      return 'oo'
    }
  }

  const superFooMixin = (_super) => class extends _super {
    foo() {
      return 'f' + super.foo()
    }
  }
  const barMixin = (_super) => class extends _super {
    bar() {
      return 'bar'
    }
  }

  const Foo = mixin(BaseFoo, superFooMixin, barMixin)

  const foo = new Foo()

  expect(foo.foo()).toBe('foo')
  expect(foo.bar()).toBe('bar')
})
