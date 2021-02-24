it('nada agora', function () {} )

// const soma = (a, b) =>  a + b;

const soma = a =>  a + a;

console.log(soma(4))

it('a function test...', function() {
    console.log('Function', this)
})

it('an arrow test...', () => {
    console.log('Arrow', this)
})