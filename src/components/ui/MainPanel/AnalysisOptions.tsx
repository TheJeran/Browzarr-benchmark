'use client';

import React, { useEffect, useState } from 'react';
import { useAnalysisStore, useGlobalStore } from '@/utils/GlobalStates';
import { useShallow } from 'zustand/shallow';
import '../css/MainPanel.css';
import { PiMathOperationsBold } from "react-icons/pi";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '../button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const operations = ['Mean', 'Min', 'Max', 'StDev'];
const kernelOperations = ['Mean', 'Min', 'Max', 'StDev'];

const webGPUError = (
  <div className="m-0 p-5 font-sans flex-column justify-center items-center">
    <span className="text-5xl mb-4 block self-center">⚠️</span>
    <h1 className="text-2xl font-bold mb-4">WebGPU Not Available</h1>
    <p className="text-base leading-relaxed mb-1 opacity-95">
      WebGPU is not supported or enabled in your current browser. This feature is required for GPU-accelerated computing.
    </p>

    <div className="bg-white bg-opacity-15 rounded-xl border border-white border-opacity-20">
      <h3 className="m-0 mb-4 text-lg font-semibold">Try These Solutions:</h3>
      <ul className="suggestion-list">
        <li>Switch to a Chrome-based browser (Chrome, Edge, Brave)</li>
        <li>Use Safari on macOS (version 14.1 or later)</li>
        <li>Enable WebGPU in your browser&apos;s experimental features</li>
        <li>Update your browser to the latest version</li>
      </ul>
    </div>
  </div>
);

const AnalysisOptions = () => {
  const plotOn = useGlobalStore(state => state.plotOn);
  
  const {
    execute,
    operation,
    useTwo,
    kernelSize,
    kernelDepth,
    kernelOperation,
    axis,
    variable2,
    setExecute,
    setAxis,
    setOperation,
    setUseTwo,
    setVariable2,
    setKernelSize,
    setKernelDepth,
    setKernelOperation,
    setAnalysisMode
  } = useAnalysisStore(useShallow(state => ({
    execute: state.execute,
    operation: state.operation,
    useTwo: state.useTwo,
    kernelSize: state.kernelSize,
    kernelDepth: state.kernelDepth,
    kernelOperation: state.kernelOperation,
    axis: state.axis,
    variable2: state.variable2,
    setExecute: state.setExecute,
    setAxis: state.setAxis,
    setOperation: state.setOperation,
    setUseTwo: state.setUseTwo,
    setVariable2: state.setVariable2,
    setKernelSize: state.setKernelSize,
    setKernelDepth: state.setKernelDepth,
    setKernelOperation: state.setKernelOperation,
    setAnalysisMode: state.setAnalysisMode
    })));

  const { variables, dimNames } = useGlobalStore(useShallow(state => ({
    variables: state.variables,
    dimNames: state.dimNames
  })));
  
  const [showError, setShowError] = useState<boolean>(false);
  useEffect(() => {
    const checkWebGPU = async () => {
    if (!navigator.gpu) {
        setShowError(true);
        return;
    }

    try {
        const adapter = await navigator.gpu.requestAdapter();
        setShowError(false);
    } catch {
        setShowError(true);
    }
    };

    checkWebGPU();
    }, [plotOn]);

  const [popoverSide, setPopoverSide] = useState<"left" | "top">("left");
    useEffect(() => {
        const handleResize = () => {
        setPopoverSide(window.innerWidth < 768 ? "top" : "left");
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <Popover>
      <PopoverTrigger disabled={!plotOn}>
        <PiMathOperationsBold
          color={plotOn ? '' : 'var(--text-disabled)'}
          style={{
            cursor: plotOn ? 'pointer' : 'auto',
            transform: plotOn ? '' : 'scale(1)'
          }}
          className="panel-item"
        />
      </PopoverTrigger>
      
      <PopoverContent
        side={popoverSide}
        className="analysis-info"
        >
        {showError ? (
          webGPUError
        ) : (
          <>
            <Button
              className="cursor-pointer active:scale-[0.95]"
              onClick={() => {
                setUseTwo(!useTwo);
                setOperation('Default');
              }}
            >
              {useTwo ? 'Use One \n Variable' : 'Use Two Variables'}
            </Button>

            <table style={{ textAlign: 'right' }}>
              <tbody>
                <tr>
                  <th>{useTwo && 'Second Variable'}</th>
                  <td>
                    {useTwo && (
                      <Select onValueChange={setVariable2}>
                        <SelectTrigger style={{ width: '175px', marginLeft: '10px' }}>
                          <SelectValue placeholder={variable2 == 'Default' ? "Select..." : variable2} />
                        </SelectTrigger>
                        <SelectContent>
                          {variables.map((variable, idx) => (
                            <SelectItem key={idx} value={variable}>
                              {variable}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </td>
                </tr>

                <tr>
                  <th>Operation</th>
                  {!useTwo && (
                    <td>
                      <Select onValueChange={setOperation}>
                        <SelectTrigger style={{ width: '175px', marginLeft: '10px' }}>
                          <SelectValue
                            placeholder={operation === 'Default' ? 'Select...' : operation}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Dimension Reduction</SelectLabel>
                            {operations.map((op, idx) => (
                              <SelectItem key={idx} value={op}>
                                {op}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Three Dimensional</SelectLabel>
                            <SelectItem value="Convolution">Convolution</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </td>
                  )}
                  
                  {useTwo && (
                    <td>
                      <Select onValueChange={setOperation}>
                        <SelectTrigger style={{ width: '175px', marginLeft: '10px' }}>
                          <SelectValue
                            placeholder={operation === 'Default' ? 'Select...' : operation}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Dimension Reduction</SelectLabel>
                            <SelectItem value="Correlation2D">Correlation</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Three Dimensional</SelectLabel>
                            <SelectItem value="Correlation3D">Correlation</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </td>
                  )}
                </tr>

                {operation !== 'Convolution' &&
                  operation !== 'Correlation3D' &&
                  operation !== 'Default' && (
                    <tr>
                      <th>Axis</th>
                      <td>
                        <Select onValueChange={e => setAxis(parseInt(e))}>
                          <SelectTrigger style={{ width: '175px', marginLeft: '10px' }}>
                            <SelectValue placeholder={dimNames[axis]} />
                          </SelectTrigger>
                          <SelectContent>
                            {dimNames.map((dimName, idx) => (
                              <SelectItem key={idx} value={String(idx)}>
                                {dimName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  )}

                {(operation === 'Convolution' || operation === 'Correlation3D') && (
                  <>
                    {operation === 'Convolution' && (
                      <tr>
                        <th>Kernel Op.</th>
                        <td>
                          <Select onValueChange={setKernelOperation}>
                            <SelectTrigger style={{ width: '175px', marginLeft: '10px' }}>
                              <SelectValue
                                placeholder={
                                  kernelOperation === 'Default' ? 'Select...' : kernelOperation
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {kernelOperations.map((kernelOp, idx) => (
                                <SelectItem key={idx} value={kernelOp}>
                                  {kernelOp}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    )}

                    <tr>
                      <th>Kernel Size</th>
                      <td>
                        <table>
                          <tbody>
                            <tr>
                              <td style={{ textAlign: 'center', width: '50px' }}>Size</td>
                              <td style={{ textAlign: 'center', width: '50px' }}>Depth</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: 'center' }}>
                                <Select onValueChange={e => setKernelSize(parseInt(e))}>
                                  <SelectTrigger style={{ width: '69px', marginLeft: '10px' }}>
                                    <SelectValue placeholder={kernelSize} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {[1, 3, 5, 7].map((size, idx) => (
                                      <SelectItem key={idx} value={String(size)}>
                                        {size}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <Select onValueChange={e => setKernelDepth(parseInt(e))}>
                                  <SelectTrigger style={{ width: '69px', marginLeft: '10px' }}>
                                    <SelectValue placeholder={kernelDepth} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {[1, 3, 5, 7].map((depth, idx) => (
                                      <SelectItem key={idx} value={String(depth)}>
                                        {depth}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>

            <Button
              className="cursor-pointer active:scale-[0.95]"
              disabled={
                operation === 'Default' ||
                (operation === 'Convolution' && kernelOperation === 'Default') ||
                (useTwo && variable2 === 'Default')
              }
              onClick={() => {
                setExecute(!execute);
                setAnalysisMode(true);
              }}
            >
              Execute
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AnalysisOptions;