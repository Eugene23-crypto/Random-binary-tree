let arr = [];
document.body.onkeyup = function (e) {
    if (e.keyCode === 32) { 
        //When user will press the spacebar we can get it because e.keyCode will be 32;
        let isExist = true
        do {
            //do while: So if generated number already exists, another number is generated
            const myRandom = Math.floor(Math.random() * 201) - 100;
            if (arr.findIndex(element => element === myRandom) === -1) {
                arr.push(myRandom)
                binary(arr)
                isExist = false;
            }
        } while (isExist);
    }
}
const output = document.getElementById("tree");

function binary(arr) {
    createNodes(arr);
    const el = document.querySelector('#tree');
    el.onwheel = zoom;
}

/** Delete elements when click on it */
/** deletes function take the value of the node as parameter  */
function deletes(num) {
    arr = arr.filter(element => element != num);
    binary(arr)
}

let scale = 1;
/**Zoom the svg content*/
function zoom(event) {
    const el = document.querySelector('svg');

    event.preventDefault();

    scale += event.deltaY * -0.001;

    // Restrict scale
    scale = Math.min(Math.max(.250, scale), 1);

    // Apply scale transform
    el.style.transform = `scale(${scale})`;
}