"use client";
import { useEffect } from "react";
import { load, trackPageview } from "fathom-client";
import { usePathname, useSearchParams } from "next/navigation";

import {
  FATHOM_INCLUDED_DOMAINS,
  FATHOM_SITE_ID,
  IS_PROD,
} from "../lib/constants";

function Fathom() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (IS_PROD) {
      load(FATHOM_SITE_ID, {
        includedDomains: FATHOM_INCLUDED_DOMAINS,
      });
    }
  }, []);

  useEffect(() => {
    trackPageview();
  }, [pathname, searchParams]);

  return null;
}

export default Fathom;
