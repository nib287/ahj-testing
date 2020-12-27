export default class validator {
   constructor() {
       this.validCardNumber = null;
   }

    getValidation(value) {
        if(!value) return false;
        if (/[^0-9-\s]+/.test(value)) return false;

        let nCheck = 0; 
        let nDigit = 0;
        let bEven = false;
        value = value.replace(/\D/g, '');
        
        for (let n = value.length - 1; n >= 0; n--) {
            let cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }
        
        if ((nCheck % 10) == 0) return this.validCardNumber = value;    
    } 
}
