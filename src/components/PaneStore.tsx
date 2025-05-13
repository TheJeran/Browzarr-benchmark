'use client';
import { usePaneInput, useTweakpane } from '@lazarusa/react-tweakpane';
import { createPaneContainer } from '@/components/ui';
import { useEffect, useState } from 'react';

interface PaneStoreProps {
    variablesPromise: Promise<string[]>;
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
export function PaneStore({ variablesPromise }: PaneStoreProps) {
    const [optionsVariables, setOptionsVariables] = useState<
        { text: string; value: string }[] | null
    >(null);

    useEffect(() => {
        getVariablesOptions(variablesPromise).then(setOptionsVariables);
    }, [variablesPromise]);

    if (!optionsVariables) return null;

    return <PaneStoreLoaded optionsVariables={optionsVariables} />;
}

// This renders only when data is ready and uses hooks safely
function PaneStoreLoaded({ optionsVariables }: { optionsVariables: { text: string; value: string }[]}) {
    const paneContainer = createPaneContainer('data-settings-pane');
    const [variable, setVariable] = useState('Default');
    const pane = useTweakpane(
        {
            varName: 'Default',
        },
        {
            title: 'Data Plots',
            container: paneContainer ?? undefined,
            expanded: true,
        }
    );

    usePaneInput(pane, 'varName', {
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

    return variable;
}
