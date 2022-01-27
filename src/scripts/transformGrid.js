
import CanvasObj from "./canvasObj";
import Vector2 from "./vector2";
class CanvasTransforms {
    constructor(func, params) {
        this.func = func;
        this.params = params;
    }

    transform(context) {
        this.func.call(context, ...this.params);
    }
}

const gridSize = 100;
const print = (item) => {
    console.log(item)
}
class TransformGrid extends CanvasObj {
    constructor(transforms) {
        super(Vector2.zero, Vector2.zero, 0, "Transformation Grid");
        this.transforms = transforms; // a list of transformations to be applied
    }

    draw(context) {

        // print("help!");
        for (var transform of this.transforms) {
            transform.transform(context);
        } // apply all transform

        let width = context.canvas.clientWidth;
        let height = context.canvas.clientHeight;

        let w = parseInt(width / gridSize) + 1;
        let h = parseInt(height / gridSize) + 1;

      


        context.beginPath();
        context.strokeStyle = "#3e3e3e";
        for (let i =1; i < w; i++){
            context.moveTo(i * gridSize, height);
            context.lineTo(i * gridSize, -height);
            context.moveTo(-i * gridSize, height);
            context.lineTo(-i * gridSize, -height);
        }

        for(let i = 1; i< h; i++){
            context.moveTo(width, i * gridSize);
            context.lineTo(-width, i * gridSize);
            context.moveTo(width, -i * gridSize);
            context.lineTo(-width, -i * gridSize);
        }
        context.stroke();
        context.lineWidth = 5;
        context.strokeStyle = "#ff9944";
        context.beginPath();
        context.moveTo(width, 0);
        context.lineTo(-width, 0);
        context.moveTo(0, height);
        context.lineTo(0, -height);
        context.stroke();

        context.fillStyle = "#dd2244";
        context.beginPath();
        context.arc(0, 0, 10, 0, Math.PI * 2);
        context.fill();

        context.setTransform(1, 0, 0, 1, 0, 0);

    }
}
export { CanvasTransforms, TransformGrid };