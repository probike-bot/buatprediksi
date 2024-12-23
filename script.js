document.getElementById('predictionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const predictionName = document.getElementById('predictionName').value.trim();

    if (!predictionName) {
        alert("Nama prediksi tidak boleh kosong!");
        return;
    }

    function generateUniqueBBFS(digits) {
        const result = [];
        const chanceOfDuplicate = 0.15;

        while (result.length < digits) {
            const randomDigit = Math.floor(Math.random() * 10);
            if (result.includes(randomDigit)) {
                if (Math.random() < chanceOfDuplicate) {
                    result.push(randomDigit);
                }
            } else {
                result.push(randomDigit);
            }
        }
        return result.join('');
    }

    const bbfs = generateUniqueBBFS(6);
    const fourD = bbfs.slice(-4);
    const colokBebas = bbfs[Math.floor(Math.random() * 6)];
    const lastTwoDigits = parseInt(bbfs.slice(-2));
    const dasarSize = lastTwoDigits < 50 ? 'Kecil' : 'Besar';
    const dasarParity = lastTwoDigits % 2 === 0 ? 'Genap' : 'Ganjil';
    const dasar = `${dasarSize} – ${dasarParity}`;
    const shioList = ['Tikus', 'Kerbau', 'Macan', 'Kelinci', 'Naga', 'Ular', 'Kuda', 'Kambing', 'Monyet', 'Ayam', 'Anjing', 'Babi'];
    const shio = shioList[lastTwoDigits % 12];

    const bomLine = [];
    for (let i = 0; i < bbfs.length; i++) {
        for (let j = 0; j < bbfs.length; j++) {
            if (i !== j) {
                bomLine.push(bbfs[i] + bbfs[j]);
            }
        }
    }

    // Format HTML untuk output di halaman
    const htmlOutput = `
<strong>Prediksi ${predictionName} :</strong>
<ul>
    <li>Bbfs : ${bbfs}</li>
    <li>4d ${predictionName} : ${fourD}</li>
    <li>Colok bebas ${predictionName} : ${colokBebas}</li>
    <li>Dasar : ${dasar}</li>
    <li>Shio : ${shio}</li>
    <li>20 line 2d jitu : ${bomLine.slice(0, 20).join('*')}</li>
</ul>
    `.trim();

    // Tampilkan HTML di halaman
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = htmlOutput;
});

// Fungsi tombol reset
document.getElementById('resetButton').addEventListener('click', function () {
    document.getElementById('predictionName').value = ''; // Kosongkan input
    document.getElementById('output').innerHTML = ''; // Kosongkan output
});
