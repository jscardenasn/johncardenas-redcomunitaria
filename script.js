function calcular() {
  const panel = parseFloat(document.getElementById("panel").value);
  const horas = parseFloat(document.getElementById("horas").value);
  const eficiencia = parseFloat(document.getElementById("eficiencia").value);
  const bateria = parseFloat(document.getElementById("bateria").value);
  const voltaje = parseFloat(document.getElementById("voltaje").value);
  const consumo = parseFloat(document.getElementById("consumo").value);

  const energiaGenerada = panel * horas * eficiencia;
  const energiaBateria = bateria * voltaje;
  const consumoDiario = consumo * 24;
  const autonomia = energiaBateria / consumoDiario;

  let resultado = `
  ⚡ Energía generada: ${energiaGenerada.toFixed(2)} Wh/día<br>
  🔋 Energía almacenada: ${energiaBateria.toFixed(2)} Wh<br>
  🔌 Consumo diario: ${consumoDiario.toFixed(2)} Wh<br>
  ⏱️ Autonomía: ${autonomia.toFixed(2)} días<br><br>
  `;

  if (energiaGenerada >= consumoDiario) {
    resultado += "<span style='color:green;'>✅ Energía suficiente para operar 24h.</span><br>";
  } else {
    resultado += "<span style='color:red;'>⚠️ Energía insuficiente: ampliar paneles o baterías.</span><br>";
  }

  if (autonomia < 1) {
    resultado += "<span style='color:red;'>🔋 Respaldo menor a 24 horas.</span>";
  } else {
    resultado += "<span style='color:green;'>🔋 Batería adecuada.</span>";
  }

  document.getElementById("resultado").innerHTML = resultado;

  // Gráfico con Chart.js
  const ctx = document.getElementById("grafico").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Generada", "Consumida", "Batería"],
      datasets: [{
        label: "Energía (Wh)",
        data: [energiaGenerada, consumoDiario, energiaBateria],
        backgroundColor: ["#28a745", "#dc3545", "#007bff"]
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}
