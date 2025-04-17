import * as THREE from 'three'
// ! don't import things that are not used in the code, build will fail
// import { Canvas, createPortal, useThree } from '@react-three/fiber';
// import { Center, Html, Text } from '@react-three/drei'
import { Hud, OrthographicCamera, Text } from '@react-three/drei'
import { useMemo, useState, useEffect } from 'react';
import { GetTimeSeries } from './ZarrLoaderLRU';
import { useControls } from 'leva';
import vertexShader from '@/utils/shaders/LineVert.glsl'

interface timeSeriesLocs{
  uv:THREE.Vector2;
  normal:THREE.Vector3
}

interface DSInfo{
    variable:string,
    storePath:string
}

interface scaling{
    maxVal:number,
    minVal:number,
    colormap:THREE.DataTexture
}

interface AxisLabels{
    labels:number[]
    positions:number[]
}

export function TimeSeries({timeSeriesLocs,DSInfo,scaling} : {timeSeriesLocs:timeSeriesLocs, DSInfo:DSInfo,scaling:scaling}){
    //This function will take in some coords, get the timeseries from zarr loader and create a new THREE scene with a static camera. Need to create a graph basically
    const {uv,normal} = timeSeriesLocs;
    const {variable, storePath} = DSInfo;
    const {maxVal,minVal,colormap} = scaling;
    const [timeSeries, setTimeSeries] = useState<number[]>([0]);
    // const [xLabls,setXLabels] = useState();
    const [yLabels, setYLabels] = useState<AxisLabels>();
    const verticalScale = 2;
    const horizontalScale = 5;
    const {width} = useControls({
        width:{value:5,
        min:1,
        max:15,
        step:1,
        label:"Line Width"
    }
    })
    
    useEffect(() => {
        if (uv && normal ) {
            GetTimeSeries({ TimeSeriesObject: { uv, normal, variable, storePath } })
            .then((data) => setTimeSeries(data.data as number[]));
        }
        }, [timeSeriesLocs, variable]);

    const material = new THREE.ShaderMaterial({
                glslVersion: THREE.GLSL3,
                uniforms: {
                    cmap:{value: colormap},
                    width: { value: width},
                    aspect: {value : window.innerWidth / window.innerHeight},
                    thickness:{value:width/50},
                    miter:{value:1},

                },
                vertexShader,
                fragmentShader:`
                out vec4 Color;
                uniform sampler2D cmap;
                varying float vNormed;

                void main() {
                    vec4 texColor = texture(cmap, vec2(vNormed, 0.1));
                    texColor.a = 1.;
                    Color = texColor;
                }
                `,
                depthWrite: false,
                });


    const geometry = useMemo(() => {
        //Need to convert whatever timeseries is into vectors. Depends on the camera and scene zoom. 
        //Currently this creates a new one each time coords changes. Will need to fix later
    
        const normed = timeSeries.map((i) => (i - minVal) / (maxVal - minVal));
        const size = timeSeries.length;
        const path = [];
        for (let i = 0; i < size; i++) {
            const x = (i / (size - 1))  * horizontalScale - (horizontalScale /2);
            const y = (normed[i] - 0.5)  * verticalScale;
            path.push([x, y, 0]); // 3D points (z = 0 for 2D)
        }

        if (path.length < 2) return new THREE.BufferGeometry(); // Need at least 2 points

        // Step 2: Duplicate vertices and compute attributes
        const numPoints = path.length;
        const positions = [];
        const directions = [];
        const previous = [];
        const next = [];
        const normValues = []
        const indices = [];

        for (let i = 0; i < numPoints; i++) {
            const point = path[i];
            const prevPoint = path[Math.max(0, i - 1)];
            const nextPoint = path[Math.min(numPoints - 1, i + 1)];
            // Duplicate vertices
            positions.push(...point, ...point); // [x, y, z, x, y, z]
            directions.push(1.0, -1.0);
            previous.push(...prevPoint, ...prevPoint);
            next.push(...nextPoint, ...nextPoint);
            normValues.push(normed[i],normed[i])
        }

        // Step 3: Create triangle indices
        for (let i = 0; i < numPoints - 1; i++) {
            const i0 = i * 2;     // First vertex of current point (+1)
            const i1 = i0 + 1;    // Second vertex of current point (-1)
            const i2 = i0 + 2;    // First vertex of next point (+1)
            const i3 = i0 + 3;    // Second vertex of next point (-1)
            indices.push(i0, i1, i2); // First triangle
            indices.push(i1, i3, i2); // Second triangle
        }

        // Step 4: Create geometry
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('direction', new THREE.Float32BufferAttribute(directions, 1));
        geometry.setAttribute('previous', new THREE.Float32BufferAttribute(previous, 3));
        geometry.setAttribute('next', new THREE.Float32BufferAttribute(next, 3));
        geometry.setAttribute('normed', new THREE.Float32BufferAttribute(normValues, 1));
        geometry.setIndex(new THREE.Uint16BufferAttribute(indices, 1));
        console.log(positions)
        return geometry
    },[timeSeries])
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 5;

    useEffect(()=>{
        const xMin = 0;
        const xMax = timeSeries.length;
        const xPos = [-horizontalScale/2,-horizontalScale/4,0,horizontalScale/4,horizontalScale/2];
        let yMin = (Math.ceil(minVal)-minVal)/(maxVal-minVal);
        yMin = (yMin-0.5)*verticalScale
        let yMax = (Math.floor(maxVal)-minVal)/(maxVal-minVal);
        yMax = (yMax-0.5)*verticalScale
        const step = (maxVal-minVal)/3;
        let yLabels = Array.from({ length: 3 }, (_, i) => Math.round(minVal + step * i))
        let yPos = yLabels.map(val => {
            return (((val-minVal)/(maxVal-minVal))-0.5)*verticalScale
        })
        yPos = [yMin, ...yPos.slice(1), yMax]
        yLabels = [Math.ceil(minVal),...yLabels.slice(1), Math.floor(maxVal)]
        // console unused variables
        console.log(xPos,xMin,xMax,yPos,yMin,yMax)
        
        setYLabels({
            positions:yPos,
            labels:yLabels
        })
    },[maxVal,minVal,verticalScale])

    return (
        <>
        <Hud renderPriority={1}>
        <OrthographicCamera
            makeDefault
            left={(frustumSize * aspect) / -2}
            right={(frustumSize * aspect) / 2}
            top={frustumSize / 2}
            bottom={frustumSize / -2}
            near={0.1}
            far={10}
            position={[0, 0, 5]}
            zoom={1}
        />
        <group position={[0,-1,0]}> 
            <mesh geometry={geometry} material={material} />
            <mesh position={[-2.5,0,0]}>
                <boxGeometry args={[.02,2,1]} />
                <meshBasicMaterial color={'black'} />
            </mesh>
            <mesh position={[0,-1,0]}>
                <boxGeometry args={[5,.02,1]} />
                <meshBasicMaterial color={'black'} />
            </mesh>
            {yLabels && yLabels.labels.map((value,index)=>(
                <Text
                    key={`y-${index}`}
                    position={[-2.6,yLabels.positions[index],0]}
                    color="black"
                    fontSize={.1}
                    anchorX="right" 
                    anchorY="middle"
                >
                    {/* Will need to revist this as labels may not always be numbers */}
                    {Math.round(value*100)/100} 
                </Text>
            ))}
        </group>
        </Hud>
        </>
    )
}
