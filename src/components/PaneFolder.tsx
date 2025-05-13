'use client';
import { usePaneInput, useTweakpane } from '@lazarusa/react-tweakpane';
import * as THREE from 'three'
import { createPaneContainer } from '@/components/ui';
import { useMemo, useEffect, useState } from 'react';
THREE.Cache.enabled = true;

interface PaneFolderProps {
    variablesPromise: Promise<string[]>;
}

interface Option {
    text: string;
    value: string;
}

export function PaneFolder({ variablesPromise }: PaneFolderProps) {
    const [variables, setVariables] = useState<string[]>([]);
    const [selectedVariable, setSelectedVariable] = useState('Default');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        
        variablesPromise
            .then(resolvedVars => {
                setVariables(resolvedVars);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            });
    }, [variablesPromise]);
    
    const options = useMemo<Option[]>(() => [
        { text: 'Cube', value: 'Default' },
        { text: 'Cube2', value: 'Default2' },
        ...variables.map((element: string) => ({
            text: element,
            value: element
        }))
    ], [variables]);

    const paneConfig = useMemo(() => ({
        varName: selectedVariable
    }), [selectedVariable]);

    const paneOptions = useMemo(() => ({
        title: 'Data Plots',
        container: createPaneContainer("data-settings-pane") ?? undefined,
        expanded: true,
    }), []);

    const pane = useTweakpane(paneConfig, paneOptions);

    const [variable] = usePaneInput(pane, 'varName', {
        label: 'Variable',
        options: options,
        value: selectedVariable
    });

    useEffect(() => {
        if (variable !== selectedVariable) {
            setSelectedVariable(variable);
        }
    }, [variable]);

    if (error) {
        return <div>Error loading variables: {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading variables...</div>;
    }

    return selectedVariable;
} 