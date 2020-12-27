import '../style.css';
import DOM from './dom';
import Validator from './validator';
import PaymentSystem from './paymentSystem';

const dom = new DOM();
const validator = new Validator()
const paymentSystem = new PaymentSystem(dom, validator);
paymentSystem.init();


