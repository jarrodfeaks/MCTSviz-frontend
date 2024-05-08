import React, { useContext } from "react";
import GraphWrapper from "./GraphWrapper";
import TreeGraph from "./graphs/TreeGraph";
import TreeGraphLegacy from "./graphs/TreeGraphLegacy";
import OptionsContext from "../../OptionsContext";
import LoadingOverlay from "../loadingOverlay/LoadingOverlay";

const GraphView = ({ tree }) => {

  const { options } = useContext(OptionsContext);

  const graphMap = {
    tree: TreeGraph,
    treeLegacy: TreeGraphLegacy,
    radial: null,
  }

  const GraphComponent = graphMap[options.graphType];

  return (
    <LoadingOverlay isLoading={options.isLoading}>
      <GraphWrapper>
        {(GraphComponent && tree?.tree) && <GraphComponent data={tree.tree} />}
      </GraphWrapper>
    </LoadingOverlay>
  );
};

export default GraphView;
