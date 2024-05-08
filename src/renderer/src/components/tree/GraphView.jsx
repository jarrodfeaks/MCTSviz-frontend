import React, { useContext, useEffect, useRef, useState } from "react";
import GraphWrapper from "./GraphWrapper";
import TreeGraph from "./graphs/TreeGraph";
import TreeGraphLegacy from "./graphs/TreeGraphLegacy";
import OptionsContext from "../../OptionsContext";
import LoadingOverlay from "../loadingOverlay/LoadingOverlay";
import RadialGraph from "./graphs/RadialGraph";

const GraphView = ({ tree }) => {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) {
        return;
      }
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  const { width, height } = size;

  const { options } = useContext(OptionsContext);

  const graphMap = {
    tree: TreeGraph,
    treeLegacy: TreeGraphLegacy,
    radial: RadialGraph
  };

  const GraphComponent = graphMap[options.graphType];

  return (
    <LoadingOverlay isLoading={options.isLoading}>
      <GraphWrapper>
        <div ref={containerRef} style={{ width: "100%", height: "100%", overflow: "hidden" }}>
          {GraphComponent && tree?.tree && <GraphComponent data={tree.tree} width={width} height={height} />}
        </div>
      </GraphWrapper>
    </LoadingOverlay>
  );
};

export default GraphView;
