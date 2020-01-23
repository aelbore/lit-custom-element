import { tryParseValue } from '../src/utils'

import { expect } from 'chai'

describe('Utils', () => {

  it('should return boolean when value is [true or false]', () => {
    const trueResult = tryParseValue(true);
    const falseResult = tryParseValue(false);

    expect(typeof trueResult == 'boolean').to.be.true
    expect(typeof falseResult == 'boolean').to.be.true
    expect(falseResult).equal(false)
    expect(trueResult).equal(true)
  })

  it(`should return boolean when value is [ 'true' or 'false' ]`, () => {
    const trueResult = tryParseValue('true');
    const falseResult = tryParseValue('false');

    expect(trueResult).equal(true)
    expect(falseResult).equal(false)
  })

  it('should parse the value into int or float.', () => {
    const count = tryParseValue(1);
    expect(typeof count == 'number').to.be.true
    expect(count).equal(1);
  })

  it('should return the string value.', () => {
    const name = tryParseValue('Maria');
    expect(typeof name === 'string').to.be.true
    expect(name).equal('Maria');
  })

})