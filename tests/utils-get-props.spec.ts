import { getSetProps } from 'lit-custom-element'

class GetPropsSpec {

  private _name;

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value
  }

}

describe('GetPropsSpec', () => {

  it('should get the props.', () => {
    const props = getSetProps(GetPropsSpec)
    expect(Object.keys(props)).toEqual([ 'name' ])
  })

})