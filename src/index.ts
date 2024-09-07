interface CValueObject {
  cvalue?: number | string | CValueObject | undefined;
    [key: string]: CValueObject | number | string | undefined;
}

function sumCValue(obj: CValueObject| undefined): number {
    let sum = 0;

    for (const key in obj) {
        const item = obj[key];

        if (key === 'cvalue') {
            const cvalue = item;

            console.log(`Processing cvalue: ${cvalue}`);

            switch (typeof cvalue) {
                case 'number':
                    sum += cvalue;
                    console.log(`Added number: ${cvalue}`);
                    break;

                case 'string':
                    const num = parseFloat(cvalue);
                    if (!isNaN(num)) {
                        sum += num;
                        console.log(`Converted and added string number: ${num}`);
                    } else {
                        sum += 2021; // Add 2021 for an invalid string
                        console.log(`Invalid number string: "${cvalue}", added 2021`);
                    }
                    break;

                case 'object':
                    if (cvalue !== null) {
                        console.log(`cvalue is an object, calling sumCValue recursively`);
                        sum += sumCValue(cvalue); // Recursive call for processing nested objects
                    } else {
                        console.log(`cvalue is null, skipping`);
                    }
                    break;

                case 'undefined':
                    sum += 2021; // Add 2021 for undefined
                    console.log(`cvalue is undefined, added 2021`);
                    break;

                default:
                    console.log(`cvalue is not a number, string, or object, skipping`);
                    break;
            }
        } else if (typeof item === 'object' && item !== null) {
            // Processing objects that do not have 'cvalue' but may contain objects with 'cvalue'
            console.log(`Processing nested object key: ${key}`);
            sum += sumCValue(item); // Recursive call for processing nested objects
        } else {
            sum += 2021;
            console.log(`Key ${key} is not 'cvalue' and not an object, skipping`);
        }
    }

    console.log(`Total sum: ${sum}`);
    return sum;
}

// Example usage
const exampleObj: CValueObject = {
    field1: { cvalue: 1 },
    field2: { cvalue: "2" }, // String that converts to a number
    field3: { cvalue: { nestedField: { cvalue: 3 } } }, // Nested object
    field4: { cvalue: "not a number" }, // String that is not a valid number
    field5: { cvalue: undefined }, // undefined
    field6: { cvalue: "also not a number" }, // String that is not a valid number
    undefined
};

console.log(`Final result: ${sumCValue(exampleObj)}`); // 8090
