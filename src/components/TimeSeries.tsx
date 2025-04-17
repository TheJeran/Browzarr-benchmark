import * as THREE from 'three'
// ! don't import things that are not used in the code, build will fail
// import { Canvas, createPortal, useThree } from '@react-three/fiber';
// import { Center, Html, Text } from '@react-three/drei'
import { Hud, OrthographicCamera, Text } from '@react-three/drei'
import { useMemo, useState, useEffect } from 'react';
import { GetTimeSeries } from './ZarrLoaderLRU';

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
    minVal:number
}

interface AxisLabels{
    labels:number[]
    positions:number[]
}

export function TimeSeries({timeSeriesLocs,DSInfo,scaling} : {timeSeriesLocs:timeSeriesLocs, DSInfo:DSInfo,scaling:scaling}){
    //This function will take in some coords, get the timeseries from zarr loader and create a new THREE scene with a static camera. Need to create a graph basically
    const {uv,normal} = timeSeriesLocs;
    const {variable, storePath} = DSInfo;
    const {maxVal,minVal} = scaling;
    const [timeSeries, setTimeSeries] = useState<number[]>([0]);
    // const [xLabls,setXLabels] = useState();
    const [yLabels, setYLabels] = useState<AxisLabels>();
    const verticleScale = 2;
    const horizontalScale = 5;
    
    useEffect(() => {
        if (uv && normal ) {
            GetTimeSeries({ TimeSeriesObject: { uv, normal, variable, storePath } })
            .then((data) => setTimeSeries(data.data as number[]));
        }
        }, [timeSeriesLocs, variable]);

    const lineObj = useMemo(() => {
        //Need to convert whatever timeseries is into vectors. Depends on the camera and scene zoom. 
        //Currently this creates a new one each time coords changes. Will need to fix later
    
        const normed = timeSeries.map((i)=>(i-minVal)/(maxVal-minVal))
        const size = timeSeries.length;
        const vecs = [];
        for (let i=0 ; i<size ; i++){
            const x = i/size*horizontalScale-horizontalScale/2;
            const y = (normed[i]-.5)*verticleScale;
            vecs.push(new THREE.Vector2(x,y))
        }
        const curve = new THREE.SplineCurve(vecs)
        const points = curve.getPoints(vecs.length*3)
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const material = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth:5 }); 
        const obj = new THREE.Line(geometry,material);
        return obj;
    },[timeSeries])
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 5;

    useEffect(()=>{
        const xMin = 0;
        const xMax = timeSeries.length;
        const xPos = [-horizontalScale/2,-horizontalScale/4,0,horizontalScale/4,horizontalScale/2];
        let yMin = (Math.ceil(minVal)-minVal)/(maxVal-minVal);
        yMin = (yMin-0.5)*verticleScale
        let yMax = (Math.floor(maxVal)-minVal)/(maxVal-minVal);
        yMax = (yMax-0.5)*verticleScale
        const step = (maxVal-minVal)/3;
        let yLabels = Array.from({ length: 3 }, (_, i) => Math.round(minVal + step * i))
        let yPos = yLabels.map(val => {
            return (((val-minVal)/(maxVal-minVal))-0.5)*verticleScale
        })
        yPos = [yMin, ...yPos.slice(1), yMax]
        yLabels = [Math.ceil(minVal),...yLabels.slice(1), Math.floor(maxVal)]
        // console unused variables
        console.log(xPos,xMin,xMax,yPos,yMin,yMax)
        
        setYLabels({
            positions:yPos,
            labels:yLabels
        })
    },[maxVal,minVal,verticleScale])

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
            <primitive object={lineObj} />
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
