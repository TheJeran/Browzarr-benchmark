'use client';

import { createPortal } from "react-dom";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { AboutModal, uiAtom } from "@/components/ui";

const Overlays = () => {
  const ui = useAtomValue(uiAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div id="overlays" />
      {mounted && createPortal(
        <>{ui.modal && <AboutModal />}</>,
        document.getElementById("overlays")!
      )}
    </>
  );
};

export default Overlays;