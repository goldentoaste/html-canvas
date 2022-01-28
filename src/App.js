import logo from './logo.svg';
import './App.css';
import Canvas from './scripts/canvas';
import Vector2 from './scripts/vector2';
import { useRef } from 'react';
import { TransformGrid, CanvasTransforms } from './scripts/transformGrid';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';



const print = (item) => {
    console.log(item)
}



const proto = CanvasRenderingContext2D.prototype;
print(proto.translate == proto.translate, proto.translate === proto.translate);
const transforms = [new CanvasTransforms(proto.translate, [200, 200]),
new CanvasTransforms(proto.scale, [0.5, 1]),
new CanvasTransforms(proto.rotate, [Vector2.d2r(45)]),
]
const objects = [new TransformGrid(transforms)];

function App() {

    let listRef = useRef(objects);
    return (
        <div className="App">
            <Canvas
                objects={listRef}
                onClick={(eve, ctx) => { }}
                onRelease={(eve, ctx) => { }}
                onMove={(eve, ctx) => { }}
                onRender={(ctx) => { }}
                needRendering={true}
                props={{ width: 1000, height: 1000 }}
            />
            <DragDropContext>
                <Droppable droppableId='wow!'>
                    {(provided, snapshot) => {
                        transforms.map((item, index) => 
                        <Draggable ref={provided.innerRef} key={index} draggableId={index} {...provided.droppableProps}>
                            <p>wow!!!</p>
                        </Draggable>)
                    }}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default App;
