import logo from './logo.svg';
import './App.css';
import Canvas from './scripts/canvas';
import Vector2 from './scripts/vector2';
import { useRef } from 'react';
import {TransformGrid, CanvasTransforms} from './scripts/transformGrid';

const proto = CanvasRenderingContext2D.prototype;
const transforms = [new CanvasTransforms(proto.translate, [200, 200]), 

new CanvasTransforms(proto.scale, [0.5, 1]),
new CanvasTransforms(proto.rotate, [Vector2.d2r(45)]),
]
const objects = [new TransformGrid(transforms)];

function App() {

    let canvasRef = useRef(null);
    let listRef = useRef(objects);
    return (
        <div className="App">
            <Canvas
            objects={listRef}
            onClick={(eve, ctx) => {}}
            onRelease = {(eve, ctx) => {}}
            onMove = {(eve, ctx) => {}}
            onRender = {(ctx) => {}}
            needRendering = {true}
            props = {{width : 1000, height : 1000}}
            />
        </div>
    );
}

export default App;
