class Driver{
    constructor(name){
        this.name  = name;
    }
    present(){
        return 'My name is ' + this.name; 
    }
}
class Order extends Driver{
    constructor(name,orderId){
        super(name);
        this.Id = orderId;
    }
    show(){
        return this.present() + "and this is my order ID:" + this.Id;
    }
}
const driverComponent = new Order("Ashit","O-101");
driverComponent.show();