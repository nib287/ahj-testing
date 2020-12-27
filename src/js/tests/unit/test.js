import Validator from '../../validator';
import PaymentSystem from '../../paymentSystem';

const validator = new Validator()
const paymentSystem = new PaymentSystem({}, validator);

test.each([
    ['true validation', '4000001234567899', '4000001234567899'],
    ['true validation', '  4000     0012     3456     7899  ', '4000001234567899'],
    ['true validation', '4000 0012 3456 7899', '4000001234567899'],
    ['false validation', '', false]
])(('it should be %s'), (_, input, expected) => {
    expect(validator.getValidation(input)).toBe(expected);
});

test('it should be false validation', () => {
    expect(validator.getValidation('4000 0012 3456 789')).toBeUndefined();
});

test.each([
    ['the payment system was found', '2400000123456789', 'world'],
    ['the payment system was found', '3000001234567899', 'diners'],
    ['the payment system was found', '3100001234567899', 'jcb'],
    ['the payment system was found', '3400001234567899', 'american'],
    ['the payment system was found', '4000001234567899', 'visa'],
    ['the payment system was found', '5000001234567899', 'maestro'],
    ['the payment system was found', '5100001234567899', 'master'],
    ['the payment system was found', '6000001234567899', 'discover'],
])(('it should be %s'), (_, input, expected) => {
    paymentSystem.validator.validCardNumber = input
    
    expect(paymentSystem.findSystem()).toBe(expected);
});

test.each([
    ['the payment system not found', '1400000123456789'],
    ['the payment system not found', ''],
])(('it should be %s'), (_, input) => {
    paymentSystem.validator.validCardNumber = input
    
    expect(paymentSystem.findSystem()).toBeNull();
});

