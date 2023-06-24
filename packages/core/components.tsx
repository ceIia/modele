import { ParsedTemplates } from "@/types/templates";
import { log } from "@/util/log";
import { useEffect, useState } from "react";

export const Editor = () => {
  const [templates, setTemplates] = useState({});

  useEffect(() => {
    if (typeof __TEMPLATES__ !== "undefined") {
      const templatePaths: ParsedTemplates = JSON.parse(__TEMPLATES__);
      setTemplates(templatePaths);
    }

    log.debug("Templates", templates);
  }, []);

  return <div>{/* render */}</div>;
};
