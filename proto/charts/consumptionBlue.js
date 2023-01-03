Chart.defaults.font.family = 'Lexend';
Chart.defaults.color = '#000';
var ctx = document.getElementById("consumptionBlue");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [['Jan', '2022'], ['Fev', '2022'], ['Mar', '2022'], ['Abr', '2022'], ['Mai', '2022'], ['Jun', '2022'], ['Jul', '2022'], ['Ago', '2022'], ['Set', '2022'], ['Out', '2022'], ['Nov', '2022'], ['Dez', '2022'],],
        datasets: [

            {
                label: 'Fora Ponta',
                data: [328.86, 335.16, 419.50, null, 375.48, 349.02, 244.44, 284.76, 454.86, 471.24, 506.52, 454.86],
                backgroundColor: '#0E438C', //colorInfo
                borderColor: '#0E438C', //colorInfo
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 9
            },
            {
                label: 'Ponta',
                data: [152.46, 141.12, 294.89, null, 260.82, 217.98, 153.72, 207.90, 313.74, 309.96, 332.64, 296.10],
                backgroundColor: '#296DCC',
                borderColor: '#296DCC',
                pointStyle: 'triangle',
                pointRadius: 7,
                pointHoverRadius: 11

            },
            {
                label: 'Indisponível',
                data: [null, null, null, 600, null, null, null, null, null, null, null, null],
                type: 'bar',
                backgroundColor: '#F5F5F5',
                borderColor: '#C3C3C3',
                borderWidth: 1,
                pointStyle: 'star',
            },
        ]
    },
    options: {
        responsive: true,
        interaction: {
            intersect: false,
            mode: 'nearest',
            axis: 'x',
        },
        plugins: {
            title: {
                display: true,
                text: 'Consumo medido',
                font: {
                    size: 16,
                },
            },
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                },
            },
            tooltip: {
                usePointStyle: true,
                callbacks: {

                    title: function (context) {
                        let title = context[0].label || '';
                        return title.replace(',', '/');
                    },
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label == 'Indisponível') {
                            if (context.parsed.y == null) {
                                return null;
                            }
                            return 'Informações indisponíveis'
                        }
                        if (label) {
                            label = 'Consumo ' + label + ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('pt-BR').format(context.parsed.y) + " kWh";
                        }

                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    maxRotation: 0,
                },
            },
            y: {
                ticks: {
                    beginAtZero: true
                },
                title: {
                    display: true,
                    text: 'kWh',
                },
                grid: {
                    color: "#C3C3C3",
                }
            },
        },
        datasets: {
            bar: {
                barPercentage: 1.2,
            },
        },
    },
});