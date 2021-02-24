it('sem tests, ainda', () => {})

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    })
};

const system = () => {
    console.log('init')
    getSomething().then(some => {
        console.log(`Something is ${some}`);
    })
    console.log('end');
    
}

// const system = async () => {
//     console.log('init');
//     const some = await getSomething();
//     console.log(`Something is ${some}`);
//     console.log('end');
// }

system();