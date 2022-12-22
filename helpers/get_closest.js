const DATA_SET = [90, 200, 400, 900];

function getClosest(goal) {
    const output = DATA_SET.reduce((prev, curr) => {
        return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr: prev;
    });
    console.log(output);
}

getClosest(process.argv[2]);
