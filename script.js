document.getElementById('predictionForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const predictionName = document.getElementById('predictionName').value.trim();

    if (!predictionName) {
        alert("Nama prediksi tidak boleh kosong!");
        return;
    }

    function generateUniqueBBFS(digits) {
        const result = [];
        const digitCount = {}; // Melacak jumlah kemunculan setiap digit
        let hasDuplicate = false; // Melacak apakah sudah ada angka kembar

        while (result.length < digits) {
            const randomDigit = Math.floor(Math.random() * 10);

            // Hitung jumlah kemunculan digit
            digitCount[randomDigit] = (digitCount[randomDigit] || 0);

            // Jika digit sudah ada lebih dari dua kali, lewati
            if (digitCount[randomDigit] >= 2) {
                continue;
            }

            // Cegah lebih dari satu angka kembar
            if (digitCount[randomDigit] === 1) {
                if (hasDuplicate || Math.random() > 0.15) {
                    continue;
                }
                hasDuplicate = true; // Tandai bahwa angka kembar sudah muncul
            }

            // Tambahkan digit ke hasil dan perbarui digitCount
            result.push(randomDigit);
            digitCount[randomDigit]++;
        }

        return result.join('');
    }

    const bbfs = generateUniqueBBFS(6);
    const fourD = bbfs.slice(-4);
    const colokBebas = bbfs[Math.floor(Math.random() * 6)];
    const lastTwoDigits = parseInt(bbfs.slice(-2)); // 2 digit terakhir BBFS
    const dasarSize = lastTwoDigits < 50 ? 'Kecil' : 'Besar';
    const dasarParity = lastTwoDigits % 2 === 0 ? 'Genap' : 'Ganjil';
    const dasar = `${dasarSize} – ${dasarParity}`;

    // Tabel shio 2024
    const shioMapping = {
    "Ular": [1, 13, 25, 37, 49, 61, 73, 85, 97],
    "Naga": [2, 14, 26, 38, 50, 62, 74, 86, 98],
    "Kelinci": [3, 15, 27, 39, 51, 63, 75, 87, 99],
    "Harimau": [4, 16, 28, 40, 52, 64, 76, 88, 0],
    "Kerbau": [5, 17, 29, 41, 53, 65, 77, 89],
    "Tikus": [6, 18, 30, 42, 54, 66, 78, 90],
    "Babi": [7, 19, 31, 43, 55, 67, 79, 91],
    "Anjing": [8, 20, 32, 44, 56, 68, 80, 92],
    "Ayam": [9, 21, 33, 45, 57, 69, 81, 93],
    "Monyet": [10, 22, 34, 46, 58, 70, 82, 94],
    "Kambing": [11, 23, 35, 47, 59, 71, 83, 95],
    "Kuda": [12, 24, 36, 48, 60, 72, 84, 96]
    };

    let shio = "Tidak Diketahui";
    for (const [key, values] of Object.entries(shioMapping)) {
        if (values.includes(lastTwoDigits)) {
            shio = key;
            break;
        }
    }

    // Generate unique 2D bom combinations
    const bomLineSet = new Set();
    for (let i = 0; i < bbfs.length; i++) {
        for (let j = 0; j < bbfs.length; j++) {
            if (i !== j) {
                bomLineSet.add(bbfs[i] + bbfs[j]); // Tambahkan kombinasi unik ke Set
            }
        }
    }
    const bomLine = Array.from(bomLineSet); // Convert Set to array

    // Format HTML untuk output di halaman
    const htmlOutput = `
<strong>Prediksi ${predictionName} :</strong>
<ul>
    <li>Bbfs : ${bbfs}</li>
    <li>4d ${predictionName} : ${fourD}</li>
    <li>Colok bebas ${predictionName} : ${colokBebas}</li>
    <li>Dasar : ${dasar}</li>
    <li>Shio : ${shio}</li>
    <li>Bom line 2d jitu : ${bomLine.join('*')}</li>
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
