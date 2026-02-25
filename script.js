let weatherData = [];

// LOAD JSON
fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    weatherData = data;
    console.log("✅ Loaded:", weatherData);
  })
  .catch(err => console.log("❌ Error:", err));


// SEARCH BY DATE
function getByDate() {
  if (weatherData.length === 0) {
    document.getElementById("dateResult").innerText = "Data not loaded";
    return;
  }

  let date = document.getElementById("dateInput").value;

  let result = weatherData.find(item => item.date === date);

  document.getElementById("dateResult").innerText =
    result
      ? `Temp: ${result.temp}°C | Humidity: ${result.humidity}%`
      : "No data found";
}


// STATS
function getStats() {
  let year = document.getElementById("yearInput").value;

  let filtered = weatherData.filter(item => item.year == year);

  let months = {};

  filtered.forEach(item => {
    if (!months[item.month]) {
      months[item.month] = [];
    }
    months[item.month].push(item.temp);
  });

  let tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  for (let m in months) {
    let temps = months[m];

    temps.sort((a, b) => a - b);

    let max = Math.max(...temps);
    let min = Math.min(...temps);
    let median = temps[Math.floor(temps.length / 2)];

    tbody.innerHTML += `
      <tr>
        <td>${m}</td>
        <td>${max}</td>
        <td>${min}</td>
        <td>${median}</td>
      </tr>
    `;
  }
}