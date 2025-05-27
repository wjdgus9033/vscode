class calculator {
    constructor(calculatorEl) {
        this.calculatorEl = calculatorEl;
        this.num = "";
        this.numlist = [];
        this.upDate(0)
        this.onoff = true;
    }

    upDate(n1) {
        this.calculatorEl.innerText = n1;
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

        const stack = [];

        for (let token of this.numlist) {
            if (typeof token === "number") {
                stack.push(token);
            } else {
                const b = stack.pop();
                const a = stack.pop();

                let result;
                switch (token) {
                    case "+": result = a + b; break;
                    case "-": result = a - b; break;
                    case "*": result = a * b; break;
                    case "/":
                        if (b === 0) {
                            this.upDate("0으로 나눌 수 없습니다");
                            return;
                        }
                        result = a / b;
                        break;
                }
                stack.push(result);
            }
        }
        const finalResult = stack.length === 1 ? stack[0] : "계산 오류";
        this.upDate(this.numlist.join(" ") + " = " + finalResult);
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

    negative() {
        if (!this.onoff) return;
        if (this.num !== "") {
            if (!this.num.startsWith("-")) {
                this.num = "-" + this.num;
            } else {
                this.num = this.num.slice(1);
            }

            let displayNum = this.num.startsWith("-") ? `(${this.num})` : this.num;
            this.upDate(this.numlist.join(" ") + " " + displayNum);
        }
    }



    percent() {
        if (!this.onoff) return;
        if (this.num !== "") {
            this.num = (Number(this.num) * 0.01).toString();
            this.upDate(this.numlist.join(" ") + " " + this.num);
        }
    }

}
const calc = new calculator(document.querySelector(".calculator"));

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
        } else if (value === "+/-") {
            calc.negative();
        }
    });
});