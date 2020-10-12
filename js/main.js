function truncate(number, digit){
    //
    //number : 対象の数値
    //digit : 四捨五入したい位
    //
    //ex.
    //input : number 12.345, digit 2
    //output : 12.3
    //

    return (Math.round(number * (Math.pow(10, digit-1)))) / (Math.pow(10, digit-1));
};

function func1(){
    var body_weight = document.getElementById("body_weight").value;
    var body_fat_percentage = document.getElementById("body_fat_percentage").value;
    var lean_body_mass = body_weight * (1 - body_fat_percentage/100);
    var protein_gram = lean_body_mass * 2;
    var protein_kcal = protein_gram * 4;
    var basal_metabolism = lean_body_mass * 20;
    var maximum_calorie_intake = basal_metabolism * 2;
    var carbohydrate_kcal_min = basal_metabolism - protein_kcal;
    var carbohydrate_gram_min = carbohydrate_kcal_min / 4;
    var carbohydrate_kcal_max = maximum_calorie_intake - protein_kcal;
    var carbohydrate_gram_max = carbohydrate_kcal_max / 4;

    var result = '<p>'
                + '除脂肪体重 : ' + truncate(lean_body_mass, 2) + 'kg'
                + '</p>'
                + '<p>'
                + '最低摂取カロリー(基礎代謝) : ' + truncate(basal_metabolism, 1) + 'kcal'
                + '</p>'
                + '<p>'
                + '最高摂取カロリー : ' + truncate(maximum_calorie_intake, 1) + 'kcal'
                + '<p>'
                + '----------------マクロ栄養素----------------'
                + '</p>'
                + '<p>'
                + 'タンパク質 : ' + truncate(protein_gram, 1) + 'g (' + truncate(protein_kcal, 1) + 'kcal)'
                + '</p>'
                + '<p>'
                + '脂質 : 作成中'
                + '</p>'
                + '<p>'
                + '炭水化物 : ' + truncate(carbohydrate_gram_min,1) + 'g ~ ' + truncate(carbohydrate_gram_max,1) + 'g (' 
                + truncate(carbohydrate_kcal_min,1) + 'kcal ~ ' + truncate(carbohydrate_kcal_max,1) + 'kcal)'
                + '</p>'
                + '<p>'
                + '<input type="button" onclick='
                + '</p>';

    document.getElementById("output_result").innerHTML = result;
    //document.write(result);
};

function func2(){
    let table = document.getElementById('nutritionTable');

    var rice = document.getElementById("rice").value;
    var potato = document.getElementById("potato").value;
    var pasta = document.getElementById("pasta").value;
    var bird = document.getElementById("bird").value;
    var egg = document.getElementById("egg").value;

    var protein = document.getElementById("rice").value * 6.1/100
                + document.getElementById("potato").value * 1.6/100
                + document.getElementById("pasta").value * 12.2/100
                + document.getElementById("bird").value * 23.0/100
                + document.getElementById("egg").value * 12.3/100;

    var fat = document.getElementById("rice").value * 0.9/100
                + document.getElementById("potato").value * 0.1/100
                + document.getElementById("pasta").value * 1.9/100
                + document.getElementById("bird").value * 0.8/100
                + document.getElementById("egg").value * 10.3/100;

    var carbohydrate = document.getElementById("rice").value * 83.1/100
                + document.getElementById("potato").value * 16.9/100
                + document.getElementById("pasta").value * 73.5/100
                + document.getElementById("bird").value * 0/100
                + document.getElementById("egg").value * 0.3/100;

    var total_gram = protein+fat+carbohydrate;
    var total_calorie = protein*4 + fat*9 + carbohydrate*4;
    

    var h = '<table>'
            + '<tr>'
            +   '<th></th>'
            +   '<th>タンパク質</th>'
            +   '<th>脂質</th>'
            +   '<th>糖質</th>'
            +   '<th>合計</th>'
            + '</tr>'
            + '<tr>'
            +   '<th>[g]</th>'
            +   '<th>' + truncate(protein,2) + '(' + truncate(protein*10/(total_gram), 2) + ')</th>'
            +   '<th>' + truncate(fat,2) + '(' + truncate(fat*10/(total_gram), 2) + ')</th>'
            +   '<th>' + truncate(carbohydrate,2) + '(' + truncate(carbohydrate*10/(total_gram), 2) + ')</th>'
            +   '<th>' + truncate(total_gram,2) + '</th>'
            + '</tr>'
            + '<tr>'
            +   '<th>[kcal]</th>'
            +   '<th>' + truncate(protein*4,2) + '(' + truncate(protein*4*10/(total_calorie), 2) + ')</th>'
            +   '<th>' + truncate(fat*9,2) + '(' + truncate(fat*9*10/(total_calorie), 2) + ')</th>'
            +   '<th>' + truncate(carbohydrate*4,2) + '(' + truncate(carbohydrate*4*10/(total_calorie), 2) + ')</th>'
            +   '<th>' + truncate(total_calorie,2) + '</th>'
            + '</tr>'
            + '</table>'
            +'<p>熱量構成比<canvas id="band_graph" width="600" height="400"></canvas></p>';

    document.getElementById("meal_result").innerHTML = h;
    draw_bandgraph(truncate(protein*4*10/(total_calorie), 2), truncate(fat*9*10/(total_calorie), 2), truncate(carbohydrate*4*10/(total_calorie), 2));


};

function changed_box(boxId, sliderId){
    var quantity = document.getElementById(boxId).value;
    document.getElementById(sliderId).value = quantity;
    func2();
};

function changed_slider(boxId, sliderId){
    var quantity = document.getElementById(sliderId).value;
    console.log(quantity);
    document.getElementById(boxId).value = quantity;
    func2();
};

function adjust_slider(adNum, boxId, sliderId){
    document.getElementById(sliderId).value = document.getElementById(sliderId).value - 0  + adNum;
    document.getElementById(boxId).value = document.getElementById(sliderId).value;
    func2();
};

function reset(){
    document.getElementById('rice').value = 0;
    document.getElementById('potato').value = 0;
    document.getElementById('pasta').value = 0;
    document.getElementById('bird').value = 0;
    document.getElementById('egg').value = 0;
    document.getElementById('rice_slider').value = 0;
    document.getElementById('potato_slider').value = 0;
    document.getElementById('pasta_slider').value = 0;
    document.getElementById('bird_slider').value = 0;
    document.getElementById('egg_slider').value = 0;
    func2();
};

function draw_bandgraph(pcal, fcal, ccal){
    const canvas = document.getElementById('band_graph');

    canvas.width = 400;
    canvas.height = 50;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(255, 180, 180)';
    ctx.fillRect(0,0,pcal*canvas.width/10,50);

    ctx.fillStyle = 'rgb(255, 255, 130)';
    ctx.fillRect(pcal*canvas.width/10, 0, fcal*canvas.width/10,50);
    
    ctx.fillStyle = 'rgb(200, 200, 255)';
    ctx.fillRect(pcal*canvas.width/10+fcal*canvas.width/10, 0, ccal*canvas.width/10, 50);
    
    ctx.fillStyle = "black";
    ctx.font = "20px 'Verdana'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("P :" + pcal, pcal*canvas.width/10/2, canvas.height/2, 200);
    ctx.fillText("F :" + fcal, pcal*canvas.width/10 + fcal*canvas.width/10/2, canvas.height/2, 200);
    ctx.fillText("C :" + ccal, pcal*canvas.width/10 + fcal*canvas.width/10 + ccal*canvas.width/10/2, canvas.height/2, 200);
};