
import Vector2 from "./vector2";
export default class CanvasObj {

    constructor(pos, size, angle, name) {
        this.pos = pos;
        this.size = size;
        this.name = name;
        this.angle = angle;
    }


    get x(){return this.pos.x}
    get y(){return this.pos.y}
    get width(){return this.size.x}
    get height(){return this.size.y}

    draw(context) {
        //...
    }

    pointContained(context, x, y){
        //check if (x, y) is contained in this shape.
        return false;
    }

    drawAABB(context) {
        //draw a rotated bounding box for this object.
        
        context.rotate(this.angle);
        context.translate(...this.pos.toArray());
        context.strokeStyle = "#FF80aa";
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
        context.setTransform(1,0,0,1,0,0);
        // let scaleX = this.currentSize.x / (this.size.x * 2);
        // let scaleY = this.currentSize.y / (this.size.y * 2);


        // let center = this.position.add(this.size.mul(0.5)); //move upper left corner by half of size to get to center.
        // let upperleft = this.size.mulP(-scaleX, scaleY).add(center).rotateAround(this.angle, center);
        // let upperRight = this.size.mulP(scaleX, scaleY).add(center).rotateAround(this.angle, center);
        // let botLeft = this.size.mulP(-scaleX, -scaleY).add(center).rotateAround(this.angle, center);
        // let botRight = this.size.mulP(scaleX, -scaleY).add(center).rotateAround(this.angle, center);

        // context.strokeStyle = "#FF80aa";
        // context.beginPath();
        // context.moveTo(upperleft.x, upperleft.y);

        // context.lineTo(upperRight.x, upperRight.y);
        // context.lineTo(botRight.x, botRight.y);
        // context.lineTo(botLeft.x, botLeft.y);
        // context.lineTo(upperleft.x, upperleft.y);

        // context.stroke();
    }

    toString() {
        return this.name;
    }
} 