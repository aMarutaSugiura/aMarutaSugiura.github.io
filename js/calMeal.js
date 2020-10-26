var foodID = 0;

function insertFood(food){
    //console.log(food["name"]);
    let table = document.getElementById('nutritionTable');
    let row_macro = table.insertRow(table.rows.length-2);
    let row_intake = table.insertRow(table.rows.length-2);
    //console.log(table.rows);

    let ncell = row_macro.insertCell(-1);
    ncell.className = "name";
    ncell.rowSpan = "2";

    let pcell = row_macro.insertCell(-1);
    pcell.className = "protein";

    let fcell = row_macro.insertCell(-1);
    fcell.className = "fat";

    let ccell = row_macro.insertCell(-1);
    ccell.className = "carbohydrate";

    let intakecell = row_intake.insertCell(-1);
    //intakecell.className = "box";
    intakecell.className ="intake";
    //intakecell.id = 'intake' + foodID;
    intakecell.colSpan = "3";
    // let slidercell = row_intake.insertCell(-1);
    // slidercell.className = "slider";
    // slidercell.colSpan = "2";

    let checkBox = "<input type='checkbox' id=check" + foodID + " onclick='switch_display(this)' checked='checked'>";

    //HTML for button
    // $("<input>", {
    //     type: 'number',
    //     id: intakeID,
    //     placeholder: '0'
    // }).appendTo("#" + intakecell.id);

    // $("#" + intakecell.id).keyup(function(){
    //     changed_box(intakeID,joinStr(intakeID, "_slider"));
    // });

    let intake = "<input type='number' id=box" + foodID + " placeholder='0' onkeyup='changed_box(" + joinStr('box', foodID) + "," + joinStr('slider', foodID) +")'>"
                + "<input type='button' onclick='adjust_slider(-10,"  + joinStr('box', foodID) + "," + joinStr('slider', foodID) + ")' value='-10g'>"
                + "<input type='range' id='slider" + foodID + "' min='0' max='2000' step='1' value='0' oninput='changed_slider(" + joinStr('box', foodID)+ "," + joinStr('slider', foodID) + ")'>"
                + "<input type='button' onclick='adjust_slider(10,"  + joinStr('box', foodID) + "," + joinStr('slider', foodID) + ")' value='+10g'>";


    //HTML for slider
    // let slider =  "<input type='button' onclick='adjust_slider(-10,"  + joinStr('box', foodID) + "," + joinStr('slider', foodID) + ")' value='-10g'>"
    //             + "<input type='range' id='slider" + foodID + "' min='0' max='1000' step='1' value='0' oninput='changed_slider(" + joinStr('box', foodID)+ "," + joinStr('slider', foodID) + ")'>"
    //             + "<input type='button' onclick='adjust_slider(10,"  + joinStr('box', foodID) + "," + joinStr('slider', foodID) + ")' value='+10g'>";

    
    
    ncell.innerHTML = checkBox + food["name"];
    pcell.innerHTML = food["protein"];
    fcell.innerHTML = food["fat"];
    ccell.innerHTML = food["carbohydrate"];

    intakecell.innerHTML = intake;
    //slidercell.innerHTML = slider;

    foodID++;
};

function switch_display(obj){

    //チェックボックスからさかのぼってマクロと摂取量のrowを取得
    let macro_row = obj.parentNode.parentNode;
    let intake_row = obj.parentNode.parentNode.parentNode.parentNode.rows[macro_row.rowIndex+1];
    //console.log(table);
    // console.log(macro_row);
    // console.log(intake_row);
    // console.log(macro_row.rowIndex);
    // console.log(intake_row.children[0].children[2]);
    macro_row.style.display = (obj.checked) ? '' : 'none';
    intake_row.style.display = (obj.checked) ? '' : 'none';
    
    //入力値を0にする
    intake_row.children[0].children[0].value = 0;
    intake_row.children[0].children[2].value = 0;
    putResult();
    //document.getElementById('box'+ i).value = 0;
    //document.getElementById('slider' + i).value = 0;
    // for(var i=0; table.rows[i];i++){
    //     console.log(table.rows[1]);
    //     //table.rows[i].style.display = (obj.checked) ? '' : 'none';
    // };
};

function initFoods(){
    
    $.getJSON("../data/nutrition.json", (foods) => {
        for (let foodNum = 0; foodNum < Object.keys(foods).length; foodNum++){
            insertFood(foods[foodNum], foodNum);
        };
    });
};

function joinStr(fstr, sstr){
    return fstr + sstr;
};

function add_food(){
    let food = {"name": document.getElementById("newName").value,
                "protein": document.getElementById("newProtein").value *100/document.getElementById("basisAmount").value,
                "fat": document.getElementById("newFat").value*100/document.getElementById("basisAmount").value,
                "carbohydrate": document.getElementById("newCarbohydrate").value*100/document.getElementById("basisAmount").value
            };
    //console.log(food);

    document.getElementById("newName").value = '';
    document.getElementById("newProtein").value = '';
    document.getElementById("newFat").value = '';
    document.getElementById("newCarbohydrate").value = '';

    

    insertFood(food);
};

function changed_box(boxId, sliderId){
    let quantity = boxId.value;
    //console.log(quantity);
    if(quantity == ''){
        sliderId.value = 0;
        //console.log(sliderId.value);
    }else{
        sliderId.value = quantity;
    };
    
    putResult();
};

function changed_slider(boxId, sliderId){
    let quantity = sliderId.value;
    //console.log(quantity);
    boxId.value = quantity;
    putResult();
};

function adjust_slider(adNum, boxId, sliderId){
    //console.log(sliderId);
    sliderId.value = sliderId.value - 0  + adNum;
    boxId.value = sliderId.value;
    putResult();
};

function reset(){
    for(let i = 0; i<foodID; i++){
        document.getElementById('box'+ i).value = 0;
        document.getElementById('slider' + i).value = 0;
    }

    document.getElementById("newName").value = '';
    document.getElementById("newProtein").value = '';
    document.getElementById("newFat").value = '';
    document.getElementById("newCarbohydrate").value = '';
    document.getElementById("basisAmount").value = 100;

    putResult();
};

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

function draw_bandgraph(pcal, fcal, ccal){
    const canvas = document.getElementById('band_graph');

    canvas.width = $( window ).width()*0.95;
    canvas.height = 20;

    //console.log(pcal)

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(255, 180, 180)';
    ctx.fillRect(0,0,pcal*canvas.width/10,50);

    ctx.fillStyle = 'rgb(255, 255, 130)';
    ctx.fillRect(pcal*canvas.width/10, 0, fcal*canvas.width/10,50);
    
    ctx.fillStyle = 'rgb(200, 200, 255)';
    ctx.fillRect(pcal*canvas.width/10+fcal*canvas.width/10, 0, ccal*canvas.width/10, 50);
    
    ctx.fillStyle = "black";
    ctx.font = "15px 'Verdana'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("P :" + pcal, pcal*canvas.width/10/2, canvas.height/2, 200);
    ctx.fillText("F :" + fcal, pcal*canvas.width/10 + fcal*canvas.width/10/2, canvas.height/2, 200);
    ctx.fillText("C :" + ccal, pcal*canvas.width/10 + fcal*canvas.width/10 + ccal*canvas.width/10/2, canvas.height/2, 200);
};

function putResult(){
    let pAll = document.getElementsByClassName('protein');
    let fAll = document.getElementsByClassName('fat');
    let cAll = document.getElementsByClassName('carbohydrate');

    let protein = 0;
    let fat = 0;
    let carbohydrate = 0;

    for(let i = 0; i<pAll.length; i++){
        let intakeAmount = document.getElementById('box'+i).value;
        //console.log('intakeAmount : ' + intakeAmount);
        protein += Number(pAll[i].textContent) * intakeAmount/100;
        fat += Number(fAll[i].textContent) * intakeAmount/100;
        carbohydrate += Number(cAll[i].textContent) * intakeAmount/100;
    };

    //それぞれのpfcを計算，合計

    //console.log('p:'+protein+' f:'+fat+' c:'+carbohydrate);

    let total_gram = protein + fat + carbohydrate;
    let total_calorie = protein*4 + fat*9 + carbohydrate*4;
    
    document.getElementById('r_gp').innerText = truncate(protein, 2);
    document.getElementById('r_gf').innerText = truncate(fat,2);
    document.getElementById('r_gc').innerText = truncate(carbohydrate, 2);
    document.getElementById('g_total').innerText = truncate(total_gram,2);

    document.getElementById('r_cp').innerText = truncate(protein*4,2);
    document.getElementById('r_cf').innerText = truncate(fat*9, 2);
    document.getElementById('r_cc').innerText = truncate(carbohydrate*4, 2);
    document.getElementById('c_total').innerText = truncate(total_calorie, 2);
    
    
    draw_bandgraph(truncate(protein*4*10/(total_calorie), 2), truncate(fat*9*10/(total_calorie), 2), truncate(carbohydrate*4*10/(total_calorie), 2));
};

$(document).ready(function() {
    initFoods();
})

//$( '#band_graph' ).get( 0 ).width = $( window ).width();