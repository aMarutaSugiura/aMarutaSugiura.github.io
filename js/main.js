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
                + '除脂肪体重 : ' + lean_body_mass + 'kg'
                + '</p>'
                + '<p>'
                + '最低摂取カロリー(基礎代謝) : ' + basal_metabolism + 'kcal'
                + '</p>'
                + '<p>'
                + '最大摂取カロリー : ' + maximum_calorie_intake + 'kcal'
                + '<p>'
                + '----------------マクロ栄養素----------------'
                + '</p>'
                + '<p>'
                + 'タンパク質 : ' + protein_gram + 'g (' + protein_kcal + 'kcal)'
                + '</p>'
                + '<p>'
                + '炭水化物 : ' + carbohydrate_gram_min + ' ~ ' + carbohydrate_gram_max + 'g (' 
                + carbohydrate_kcal_min + ' ~ ' + carbohydrate_kcal_max + 'kcal)'
                + '</p>'
                
    document.write(result);
}