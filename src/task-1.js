import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const reverseString = () => {
  rl.question('white... ', (answer) => {
    const result = answer.split('').reverse().join('');
    console.log(`result: ${result}`);
    reverseString();
  });
};

export default reverseString;
