Chart.defaults.font.family = 'Lexend';
Chart.defaults.color = '#000';
var ctx = document.getElementById("baseCostComparison");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [['Jan', '2022'], ['Fev', '2022'], ['Mar', '2022'], ['Abr', '2022'], ['Mai', '2022'], ['Jun', '2022'], ['Jul', '2022'], ['Ago', '2022'], ['Set', '2022'], ['Out', '2022'], ['Nov', '2022'], ['Dez', '2022'],],
        datasets: [
            {
                label: 'Valor Dem. + Cons. atuais',
                data: [69752.33, 78480.95, 92580.35, null, 93015.08, 80428.31, 62896.03, 73503.07, 107831.62, 104863.07, 116390.71, 96271.07],
                backgroundColor: '#CC443D',
                pointStyle: 'circle',
                stack: 'Atual',
                barPercentage: 0.5,
            },
            {
                label: 'Valor Dem. proposta',
                data: [40413.62, 40413.62, 40413.62, null, 40413.62, 40413.62, 40413.62, 40413.62, 46239.50, 46776.33, 56188.76, 41514.27],
                backgroundColor: '#0E438C', //colorInfo
                pointStyle: 'rect',
                stack: 'Proposto',
                barPercentage: 1.1,
            },
            {
                label: 'Valor Cons. proposto',
                data: [31472.34, 37458.25, 40202.34, null, 42215.53, 33887.75, 24343.50, 29558.13, 46045.97, 44647.12, 51258.62, 42153.33],
                backgroundColor: '#F2B63D',
                pointStyle: 'triangle',
                stack: 'Proposto',
                barPercentage: 1.1,
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
                text: 'Custo-base: atual x proposto',
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
                        title = title.replace(',', '/');
                        if (context[0].parsed.y == null) {
                            title += ' - Indisponível';
                        }
                        return title;
                    },
                    label: function (context) {
                        if (context.parsed.y == null) {
                            return null;
                        } else {
                            let label = context.dataset.label || '';
                            label += ': ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                            return label;
                        }
                    },
                    footer: function (tooltipItems) {
                        if (tooltipItems[0].parsed.y == null || tooltipItems.length <= 1){
                            return null
                        }

                        let sum = 0;
                        tooltipItems.forEach(function(tooltipItem) {
                          sum += tooltipItem.parsed.y;
                        });
                        return 'Total: ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sum);
                    },
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false,
                },
                ticks: {
                    maxRotation: 0,
                },
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'R$',
                },
                grid: {
                    color: "#C3C3C3",
                }
            },
        },
    },
});