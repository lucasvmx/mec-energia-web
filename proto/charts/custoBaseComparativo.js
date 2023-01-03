Chart.defaults.font.family = 'Lexend';
Chart.defaults.color = '#000';
var ctx = document.getElementById("custoBaseComparativo");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [['Jan', '2022'], ['Fev', '2022'], ['Mar', '2022'], ['Abr', '2022'], ['Mai', '2022'], ['Jun', '2022'], ['Jul', '2022'], ['Ago', '2022'], ['Set', '2022'], ['Out', '2022'], ['Nov', '2022'], ['Dez', '2022'],],
        datasets: [
            {
                label: 'Valor Dem. + Cons. atual',
                data: [69752.33, 78480.95, 92580.35, null, 93015.08, 80428.31, 62896.03, 73503.07, 107831.62, 104863.07, 116390.71, 96271.07],
                backgroundColor: '#FB736C', //colorSecondary
                pointStyle: 'rect',
                stack: 'Atual',
            },
            {
                label: 'Valor Dem. + Cons. estimado',
                data: [71885.96, 77871.87, 80615.97, null, 82629.15, 74301.37, 64757.12, 69971.75, 92285.47, 91423.45, 107447.38, 83667.60],
                backgroundColor: '#0A5C67',  //colorPrimary
                pointStyle: 'circle',
                stack: 'Proposto',
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
                text: 'Custo-base: atual x estimado',
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