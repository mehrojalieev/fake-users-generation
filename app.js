// DOM elements
const regionSelect = document.querySelector('#region');
const errorsSlider = document.querySelector('#errorsSlider');
const errorsInput = document.querySelector('#errorsInput');
const seedInput = document.querySelector('#seed');
const randomSeedBtn = document.querySelector('#randomSeed');
const userTableBody = document.querySelector('#userTable tbody');

errorsSlider.addEventListener('input', () => {
    errorsInput.value = errorsSlider.value;
});
errorsInput.addEventListener('input', () => {
    errorsSlider.value = errorsInput.value;
});

// Generate random seed value
randomSeedBtn.addEventListener('click', () => {
    const randomSeed = Math.floor(Math.random() * 100000);
    seedInput.value = randomSeed;
    resetTable();
    generateData();
});

regionSelect.addEventListener('change', () => {
    resetTable();
    generateData();
});
errorsSlider.addEventListener('input', () => {
    resetTable();
    generateData();
});
seedInput.addEventListener('input', () => {
    resetTable();
    generateData();
});

const tableContainer = document.querySelector('.table-container');
let totalRecords = 20;
let loading = false;

tableContainer.addEventListener('scroll', () => {
    if (tableContainer.scrollTop + tableContainer.clientHeight >= tableContainer.scrollHeight && !loading) {
        loading = true; // Prevents multiple triggers during loading
        totalRecords += 10;
        generateData();
    }
});

// Main function to generate fake data
function generateData() {
    const region = regionSelect.value;
    const errorProbability = parseFloat(errorsSlider.value);
    const seed = seedInput.value ? parseInt(seedInput.value) : Math.random();

    faker.seed(seed); 

    const currentRows = userTableBody.querySelectorAll('tr').length;

    for (let i = currentRows + 1; i <= totalRecords; i++) {
        const hasError = Math.random() < errorProbability;

        const row = document.createElement('tr');
        const id = faker.random.uuid();
        const name = generateName(region);
        const address = generateAddress(region);
        const phone = generatePhone(region);

        // Add random errors if needed
        const errorFields = ['name', 'address', 'phone'];
        if (hasError) {
            const fieldToCorrupt = faker.random.arrayElement(errorFields);
            if (fieldToCorrupt === 'name') name.fullName = corruptData(name.fullName);
            if (fieldToCorrupt === 'address') address.fullAddress = corruptData(address.fullAddress);
            if (fieldToCorrupt === 'phone') phone = corruptData(phone);
        }

        row.innerHTML = `
            <td>${i}</td>
            <td>${id}</td>
            <td>${name.fullName}</td>
            <td>${address.fullAddress}</td>
            <td>${phone}</td>
        `;
        userTableBody.appendChild(row);
    }

}

function resetTable() {
    userTableBody.innerHTML = '';
    totalRecords = 20;
}

// Generate realistic name based on region
function generateName(region) {
    let firstName, lastName, middleName;
    if (region === 'poland') {
        firstName = faker.name.firstName('male');
        middleName = faker.name.firstName('female');
        lastName = faker.name.lastName();
    } else if (region === 'usa') {
        firstName = faker.name.firstName();
        middleName = faker.name.firstName();
        lastName = faker.name.lastName();
    } else if (region === 'georgia') {
        firstName = faker.name.firstName();
        middleName = faker.name.firstName();
        lastName = faker.name.lastName();
    }
    return { fullName: `${firstName} ${middleName} ${lastName}` };
}

function generateAddress(region) {
    let fullAddress;
    if (region === 'poland') {
        fullAddress = `${faker.address.city()}, ${faker.address.streetAddress()}, ${faker.address.zipCode()}`;
    } else if (region === 'usa') {
        fullAddress = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`;
    } else if (region === 'georgia') {
        fullAddress = `${faker.address.city()}, ${faker.address.streetAddress()}, ${faker.address.zipCode()}`;
    }
    return { fullAddress };
}

function generatePhone(region) {
    let phone;
    if (region === 'poland') {
        phone = faker.phone.phoneNumber('+48 ###-###-###');
    } else if (region === 'usa') {
        phone = faker.phone.phoneNumber('+1 (###) ###-####');
    } else if (region === 'georgia') {
        phone = faker.phone.phoneNumber('+995 ###-###-###');
    }
    return phone;
}

function corruptData(data) {
    const index = Math.floor(Math.random() * data.length);
    const corruptedChar = String.fromCharCode(data.charCodeAt(index) + 1);
    return data.substring(0, index) + corruptedChar + data.substring(index + 1);
}
