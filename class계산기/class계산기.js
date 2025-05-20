class Display {
    constructor(displayEl) {
        this.displayEl = displayEl;
        this.num = "";
        this.numlist = [];
        this.upDate(0)
        this.onoff = true;
    }

    upDate(n1) {
        this.displayEl.innerText = n1;
    }

    appendN(a) {
        if (!this.onoff) return;
        this.num += a;
        this.upDate(this.numlist.join(" ") + " " + this.num);
    }

    appendO(o) {
        if (!this.onoff) return;
        if (this.num !== "") {
            this.numlist.push(Number(this.num));
            this.num = "";
        }
        this.numlist.push(o);
        this.upDate(this.numlist.join(" "));
    }

    push() {
        if (!this.onoff) return;
        if (this.num != "") {
            this.numlist.push(Number(this.num));
            this.num = "";
        }
        let result = this.numlist[0];
        for (let i = 1; i < this.numlist.length; i += 2) {
            const operator = this.numlist[i];
            const next = this.numlist[i + 1];
            switch (operator) {
                case "+": result += next; break;
                case "-": result -= next; break;
                case "*": result *= next; break;
                case "/": result = next == 0 ? "다시 입력" : result / next; break;
            }
        }
        this.upDate(this.numlist.join(" ") + " = " + result);
    }
    percent() {
        if (!this.onoff) return;
        if (this.num !== "") {
            this.num = (Number(this.num) * 0.01).toString();
            this.upDate(this.numlist.join(" ") + " " + this.num);
        }
    }
    reset() {
        if (!this.onoff) return;
        this.num = "";
        this.numlist = [];
        this.upDate(0);
    }

    off() {
        this.onoff = !this.onoff;
        this.num = "";
        this.numlist = [];
        this.upDate(this.onoff ? 0 : " ");
    }
}
const calc = new Display(document.querySelector(".display"));

document.querySelectorAll(".buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.innerText;

        if (value === "ON/OFF") {
            calc.off();
            return;
        }
        if (!calc.onoff) return;
        if (value === "지우기") return calc.reset();
        if (!isNaN(value) || value === ".") {
            calc.appendN(value);
        } else if (["+", "-", "*", "/"].includes(value)) {
            calc.appendO(value);
        } else if (value === "=") {
            calc.push();
        } else if (value === "%") {
            calc.percent();
        }
    });
});