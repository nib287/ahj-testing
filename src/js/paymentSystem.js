export default class PaymentSystem {
    constructor(dom, validator) {
        this.dom = dom;
        this.validator = validator;
        this.systemsList = {
            world: [2],
            diners: [30, 36, 38],
            jcb: [31, 35],
            american: [34, 37],
            visa: [4],
            maestro: [50, 56, 57, 58],
            master: [51, 52, 53, 54, 55, 63, 67],
            discover: [60, 64, 65]
        }
    }

    init() {
        this.dom.form.addEventListener('submit', e => {
            e.preventDefault();
            
            this.validator.getValidation(this.dom.input.value);
            if(!this.validator.validCardNumber) {
                this.dom.tooltip.textContent = 'not a valid card number';
                this.dom.tooltip.classList.remove('valid')
                this.dom.tooltip.classList.add('invalid')
                this.dom.input.value = '';
            }
            if(this.validator.validCardNumber) {
                if(this.dom.previosImg) this.dom.previosImg.classList.add('icons__grey');
                const img = this.findImg();
                this.dom.previosImg = img;
                img.classList.remove('icons__grey');
                this.dom.tooltip.textContent = 'card number is valid';
                this.dom.tooltip.classList.remove('invalid')
                this.dom.tooltip.classList.add('valid')
                this.dom.input.value = '';
                this.validator.validCardNumber = null;
            } 
        });    
    }

    findSystem() {
        const firsNumber = this.validator.validCardNumber[0];
        if(firsNumber == 2) return 'world';
        if(firsNumber == 4) return 'visa';
        
        const firsAndSecondNumber = this.validator.validCardNumber[0] + this.validator.validCardNumber[1];
        let result = null;
        for(let key in this.systemsList) {
            this.systemsList[key].forEach(el => {
                if(el == firsAndSecondNumber) result = key;
            });
        }

        return result;
    }

    findImg() {
        const sysName = this.findSystem();
        return Array.from(this.dom.img).find(el => el.dataset.sysname == sysName);  
    }  
}
