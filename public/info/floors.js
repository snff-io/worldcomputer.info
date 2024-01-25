
let top_rows = 16;
let locations = 0;
/*
________
\/\/\/\/
/\/\/\/\
\/\/\/\/
/\/\/\/\
--------
*/
//double
for (var i = 1; i <= top_rows ; i = i * 2) {

    locations += i * i;
    console.log("row:" + i + " floor_size:" + (i * i) + " total_locations:" + locations);
}

//step
for (var i = top_rows+1; i < 100; i++) {

    locations += i * i;

    console.log("floor:" + i + " floor_size:" + (i * i) + " total_locations:" + locations );
    if (locations > 144000)
        break;
}   
