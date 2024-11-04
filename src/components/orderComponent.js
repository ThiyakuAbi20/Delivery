class Order{
    constructor(orderId){
        this.Id = orderId;
    }
    present(){
        return 'This is my order number  ' + this.Id;
    }
}
const orderComponent = new Order("O-101");
orderComponent.present();