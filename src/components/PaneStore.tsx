'use client';
import { useButtonBlade, usePaneInput, useTweakpane } from '@lazarusa/react-tweakpane';
import { createPaneContainer } from '@/components/ui';
import { useEffect, useMemo, useState } from 'react';
import { colormaps } from '@/components/textures';

interface PaneStoreProps {
    variablesPromise: Promise<string[]>;
    onSettingsChange: (settings: { variable: string; plotType: string; cmap: string; flipCmap: boolean }) => void;
}

async function getVariablesOptions(variablesPromise: Promise<string[]>) {
    return [
        { text: 'cube', value: 'Default' },
        ...(await variablesPromise).map((element: string) => ({
            text: element,
            value: element
        }))
    ];
}

// This wrapper handles loading state
export function PaneStore({ variablesPromise, onSettingsChange }: PaneStoreProps) {
    const [optionsVariables, setOptionsVariables] = useState<{ text: string; value: string }[] | null>(null);

    useEffect(() => {
        getVariablesOptions(variablesPromise).then(setOptionsVariables);
    }, [variablesPromise]);

    if (!optionsVariables) return null;

    return <PaneStoreLoaded optionsVariables={optionsVariables} onSettingsChange={onSettingsChange} />;
}

// This renders only when data is ready and uses hooks safely
function PaneStoreLoaded({ optionsVariables, onSettingsChange }: { 
    optionsVariables: { text: string; value: string }[];
    onSettingsChange: (settings: { variable: string; plotType: string; cmap: string; flipCmap: boolean }) => void;
}) {
    const [flipCmap, setFlipCmap] = useState<boolean>(false)
    
    const colormaps_array = useMemo(() => colormaps.map(colormap => ({
        text: colormap,
        value: colormap
    })), []);
      
    const paneContainer = createPaneContainer('data-settings-pane');
    const [variable, setVariable] = useState('Default');
    const pane = useTweakpane(
        {
            varName: 'Default',
            plottype: 'point-cloud',
            cmap: 'Spectral'
        },
        {
            title: 'Data Plots',
            container: paneContainer ?? undefined,
            expanded: true,
        }
    );

    usePaneInput(pane, 'varName', {
        index: 0,
        label: 'Variable',
        options: optionsVariables,
        value: 'Default',
    }, (event) => {
        setVariable(event.value);
    });

    // Force reset to default when options change
    useEffect(() => {
        if (!optionsVariables.find(opt => opt.value === variable)) {
            setVariable('Default');
            // Update the pane input value
            if (pane.current?.instance) {
                pane.current.instance.refresh();
            }
        }
    }, [optionsVariables, variable, pane]);

    const [plotType] = usePaneInput(pane, 'plottype', {
        label: 'Plot type',
        options: [
            { text: 'volume', value: 'volume' },
            { text: 'point-cloud', value: 'point-cloud' },
        ],
        value: 'point-cloud'
    });
     
    const [cmap] = usePaneInput(pane, 'cmap', {
        label: 'colormap',
        options: colormaps_array,
        value: 'Spectral'
    });
     
    useButtonBlade(pane, {
        title: "Flip Colors"
    }, () => setFlipCmap(x => !x));

    useEffect(() => {
        onSettingsChange({ variable, plotType, cmap, flipCmap });
    }, [variable, plotType, cmap, flipCmap, onSettingsChange]);

    return null;
}