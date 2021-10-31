const {nameNormalizator} = require('../utils');

const nameNormalizatorData = [
    {input: 'John Doe', output: 'John Doe'},
    {input: 'John@Doe', output: 'John Doe'},
    {input: 'john doe', output: 'John Doe'},
    {input: 'JOHN DOE', output: 'John Doe'},
    {input: 'John-Doe', output: 'John Doe'},
    {input: 'John_Doe', output: 'John Doe'},
    {input: 'John      Doe', output: 'John Doe'},
    {input: 'John Doé', output: 'John Doe'},
    {input: 'John      .Doè.', output: 'John Doe'},
    {input: undefined, output: ''},
    {input: null, output: ''},
    {input: '', output: ''},
    {input: 'email@gmail.com', output: 'Email Gmail Com'}, //This function will not work correctly with email
    {input: '+556556447484', output: '556556447484'}, //Will not work for phones
];

describe('Test utils.js', () => {
    test('Should return normalized name', () => {
        nameNormalizatorData.forEach((testObject) => {
            const name = nameNormalizator(testObject.input);

            expect(name).toBe(testObject.output);
        });
    });
});


