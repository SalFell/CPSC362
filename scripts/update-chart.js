const ctx = document.getElementById('myChart');

export function updateChart() {
    if(ctx != undefined) {
        window.alert("Create a chart first!");
        return;
    }
    else {
        ctx.destroy();
    }
}