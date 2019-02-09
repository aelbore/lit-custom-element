import { tryParseValue } from 'lit-custom-element'; 

describe('Utils', () => {

  it('should return boolean when value is [true or false]', () => {
    const trueResult = tryParseValue(true);
    const falseResult = tryParseValue(false);

    expect(typeof trueResult == 'boolean').toBeTruthy();
    expect(typeof falseResult == 'boolean').toBeTruthy()
    expect(falseResult).toEqual(false)
    expect(trueResult).toEqual(true)
  })

  it(`should return boolean when value is [ 'true' or 'false' ]`, () => {
    const trueResult = tryParseValue('true');
    const falseResult = tryParseValue('false');

    expect(trueResult).toEqual(true)
    expect(falseResult).toEqual(false)
  })

  it('should parse the value into int or float.', () => {
    const count = tryParseValue(1);
    expect(typeof count == 'number').toBeTruthy();
    expect(count).toEqual(1);
  })

  it('should return the string value.', () => {
    const name = tryParseValue('Maria');
    expect(typeof name === 'string').toBeTruthy();
    expect(name).toEqual('Maria');
  })

})