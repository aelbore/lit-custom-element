import { getSetProps } from '../src/utils'

import { expect } from 'chai'

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
    expect(JSON.stringify(Object.keys(props)))
      .equal(JSON.stringify([ 'name' ]))
  })

})