/**
 * Author: Andrew Franklin
 * Date: 10/11/2026
 * Date: 10/12/2026
 * - Added win check
 * - TODO add vertical and horizontal check
 * - TODO make continue screen fade in and out
 */
let turn = null
let gameboard = document.getElementById("gameboard")

const panels = gameboard.getElementsByClassName("panel");
const initial_slate = panels;
const choose_x = document.getElementById("choose_x")
const choose_o = document.getElementById("choose_0")
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let player_1_choice = true;
let p1_score = 0; let p2_score = 0;

function clearBoard() {
    for (let j = 0; j < panels.length; j++) {
        if (panels[j].hasChildNodes()) {
            panels[j].childNodes[0].remove();
            panels[j].style.setProperty("background-color", "rgba(79, 78, 78, 0.46)")
        }
    }
}
function isEmpty() {
    for (let j = 0; j < panels.length; j++) {
        if (panels[j].hasChildNodes() === true) {
            return false;
        }
    }
    return true;
}

function _matching(first, second, third) {
    if (first.innerText !== "" && (first.innerText == second.innerText && second.innerText == third.innerText)) {
        if (first.innerText === "X") {
            if (player_1_choice === "X") {
                p1_score++
                p1.innerText = p1.innerText.split(":")[0] + ": " + p1_score
            }
            else {
                p2_score++
                p2.innerText = p2.innerText.split(":")[0] + ": " + p2_score
            }
        }
        else {
            if (player_1_choice === "O") {
                p1_score++
                p1.innerText = p1.innerText.split(":")[0] + ": " + p1_score
            }
            else {
                p2_score++
                p2.innerText = p2.innerText.split(":")[0] + ": " + p2_score
            }
        }
        const goAgain = confirm("Next match?")
        if (goAgain) {
            clearBoard()
            return true;
        }
        else {
            window.location.reload()
            return true;
        }
    }
    return false;
}

function getWinner() {

    //check crossed
    let first = panels[0]
    let second = panels[4]
    let third = panels[8]
    let res = _matching(first, second, third)
    if (res) { return; }

    first = panels[2]; second = panels[4]; third = panels[6]
    res = _matching(first, second, third)
    if (res) { return; }

    //check rows

    first = panels[0]; second = panels[1]; third = panels[2]
    res = _matching(first, second, third)
    if (res) { return; }

    first = panels[3]; second = panels[4]; third = panels[5]
    res = _matching(first, second, third)
    if (res) { return; }

    first = panels[6]; second = panels[7]; third = panels[8]
    res = _matching(first, second, third)
    if (res) { return; }

    //check columns

    first = panels[0]; second = panels[3]; third = panels[6]
    res = _matching(first, second, third)
    if (res) { return; }

    first = panels[1]; second = panels[4]; third = panels[7]
    res = _matching(first, second, third)
    if (res) { return; }

    first = panels[2]; second = panels[5]; third = panels[8]
    res = _matching(first, second, third)
    if (res) { return; }

}

function isFilled() {
    for (let j = 0; j < panels.length; j++) {
        if (panels[j].hasChildNodes() === false) {
            return false;
        }
    }
    return true;
}

choose_x.addEventListener("click", () => {
    if (isEmpty()) {
        turn = false;
    }
})
choose_o.addEventListener("click", () => {
    if (isEmpty()) {
        turn = true;

    }
})

function markBoard(boardPiece) {
    const mark = document.createElement("p")
    mark.style.fontSize = "100px"
    mark.style.position = 'relative'
    if (boardPiece.hasChildNodes()) {
        alert("You cannot override turns!")
        return false;
    }
    if (turn) {
        mark.innerText = "O"
        mark.style.color = "red"
        boardPiece.style.setProperty("background-color", "rgba(255, 8, 8, 0.13)")
    }
    else {
        mark.innerText = "X"
        mark.style.color = "aqua"
        boardPiece.style.setProperty("background-color", "rgba(8, 255, 226, 0.13)")
    }
    turn = !turn
    boardPiece.appendChild(mark);
    return true;
}

for (let i = 0; i < panels.length; i++) {
    panels[i].addEventListener('click', () => {
        if (turn === null) {
            alert("Player 1 choose your character first!")
        }
        else if (isFilled()) {
            alert("Sorry board is filled!")
        }
        else {
            if (choose_o.disabled === false) {
                choose_o.disabled = true;
                choose_x.disabled = true;
                if (turn) {
                    player_1_choice = "O"
                    p2.style.setProperty("color", "rgb(8, 255, 226)")
                    p1.style.setProperty("color", "rgb(255, 8, 8)")
                }
                else {
                    player_1_choice = "X"
                    p2.style.setProperty("color", "rgb(255, 8, 8)")
                    p1.style.setProperty("color", "rgb(8, 255, 226)")
                }
            }
            markBoard(panels[i])

            requestAnimationFrame(
                () => {
                    setTimeout(() => {
                        getWinner()
                    }, 0);
                }
            )

        }
    }
    )

}