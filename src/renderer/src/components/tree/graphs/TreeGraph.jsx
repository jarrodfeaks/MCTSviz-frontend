import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { Group } from "@visx/group";
import { Tree, hierarchy } from "@visx/hierarchy";
import { LinkHorizontalStep } from "@visx/shape";
import { Drag } from "@visx/drag";
import OptionsContext from "../../../OptionsContext";

const white = "#ffffff";

const NODE_RADIUS_NORMAL = 12;
const NODE_RADIUS_COMPACT = 3;

const NODE_PURPLE_FILL = "#272b4d";
const NODE_PURPLE_STROKE = "#374469";
const NODE_GREY_FILL = "#A2A8B9";
const NODE_PINK_FILL = "#fe6e9e";
const NODE_PINK_FILL_DIMMED = "#f9c5bb";
const NODE_VIOLET_FILL = "#525AA3";

/* creates root node of graph*/
function RootNode({ node, isCompact }) {
  if (isCompact) {
    return (
      <Group top={node.x} left={node.y}>
        <circle className="circle-node" r={NODE_RADIUS_COMPACT + 1} fill={NODE_PURPLE_FILL} />
      </Group>
    );
  }

  return (
    <Group top={node.x} left={node.y}>
      <circle className="circle-node" r={NODE_RADIUS_NORMAL} fill={NODE_PURPLE_FILL} />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={white}
      >
        {node.data.attributes.reward.toFixed(1)}
      </text>
    </Group>
  );
}
/* parent node on graph are handeled */
function ParentNode({ node, isCompact, forceUpdate }) {
  // calls the function to collapse node hiding child nodes
  const collapseNode = () => {
    node._children = node.children;
    node.children = null;
    forceUpdate();
  };
  // Styling for parent node in compact filter, reduces size and removes text
  if (isCompact) {
    return (
      <Group top={node.x} left={node.y}>
        <circle
          className="circle-node"
          r={NODE_RADIUS_COMPACT}
          fill={node.highlight ? NODE_PINK_FILL : NODE_PURPLE_FILL}
          onClick={collapseNode}
          cursor="pointer"
        />
      </Group>
    );
  }
  /* Styling for parent node for defult normal display, handels text syteling as well*/
  return (
    <Group top={node.x} left={node.y}>
      <circle
        className="circle-node"
        r={NODE_RADIUS_NORMAL}
        fill={node.highlight ? NODE_PINK_FILL : white}
        stroke={NODE_PURPLE_STROKE}
        strokeWidth={1}
        onClick={collapseNode}
        cursor="pointer"
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill="#000000"
      >
        {node.data.attributes.reward.toFixed(1)}
      </text>
    </Group>
  );
}
/* function fpr the collapsed nodes, updates style*/
function CollapsedNode({ node, isCompact, forceUpdate }) {
  // for normal size
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  const expandNode = () => {
    node.children = node._children;
    node._children = null;
    forceUpdate();
  };

  if (isCompact) {
    return (
      <Group top={node.x} left={node.y} cursor="pointer" onClick={expandNode}>
        <circle
          className="circle-node"
          r={NODE_RADIUS_COMPACT}
          fill={node.highlight ? NODE_PINK_FILL : NODE_VIOLET_FILL}
        />
        <text
          dx="0.4rem"
          dy="0.2rem"
          fontSize={12}
          fontFamily="Arial"
          textAnchor="middle"
          fill={node.highlight ? NODE_PINK_FILL : NODE_VIOLET_FILL}
        >
          {"»"}
        </text>
      </Group>
    )
  }

  return (
    <Group top={node.x} left={node.y}>
      <rect
        className="rect-node"
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={node.highlight ? NODE_PINK_FILL : white}
        stroke={NODE_PURPLE_STROKE}
        cursor="pointer"
        onClick={() => {
          expandNode();
        }}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={"#000000"}
      >
        {node.data.attributes.reward.toFixed(1)}
        <tspan dx={2} dy={1} fontSize={14}>
          {"»"}
        </tspan>
      </text>
    </Group>
  );
}
/*styling for leaf nodes, has both compact and normal styling*/
function LeafNode({ node, isCompact }) {
  if (isCompact) {
    return (
      <Group top={node.x} left={node.y}>
        <circle className="circle-node" r={NODE_RADIUS_COMPACT} fill={node.highlight ? NODE_PINK_FILL_DIMMED : NODE_GREY_FILL} />
      </Group>
    );
  }

  return (
    <Group top={node.x} left={node.y}>
      <circle
        className="circle-node"
        r={NODE_RADIUS_NORMAL}
        fill={node.highlight ? NODE_PINK_FILL_DIMMED : white}
        stroke={NODE_PURPLE_STROKE}
        strokeWidth={1}
        strokeDasharray="3,1"
        strokeOpacity={0.6}
      />
      <text
        dy=".33em"
        fontSize={9}
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill="#000000"
      >
        {node.data.attributes.reward.toFixed(1)}
      </text>
    </Group>
  );
}

/** Handles rendering Root, Parent, and other Nodes. */
function Node({ node, isCompact, forceUpdate }) {
  const isRoot = node.depth === 0;
  const isParent = !!(node.children || node._children);

  if (isRoot) return <RootNode node={node} isCompact={isCompact} />;
  if (isParent)
    return node.children ? (
      <ParentNode node={node} isCompact={isCompact} forceUpdate={forceUpdate} />
    ) : (
      <CollapsedNode node={node} isCompact={isCompact} forceUpdate={forceUpdate} />
    );
  return <LeafNode node={node} isCompact={isCompact} />;
}

const TreeGraph = ({ data, width, height }) => {
  const treeData = useMemo(() => hierarchy(data), [data]);

  // hacky fix to update the tree quicker when expanding/collapsing nodes
  // react is very slow to re-render the tree otherwise
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const margin = { top: 10, left: 80, right: 80, bottom: 10 };

  const [isCompact, setIsCompact] = useState(false);

  // const [ zoomScale, setZoomScale ] = useState(4);
  const [scale, setScale] = useState(1);
  const minScale = 0.25;
  const maxScale = 2;

  const handleWheel = useCallback((event) => {
    const { deltaY } = event;
    setScale(prevScale => {
      let newScale = prevScale - deltaY * 0.001;
      return Math.min(Math.max(newScale, minScale), maxScale);
    });
  }, []);

  const applyFilter = (node, pc) => {
    if (!node.children || node.children.length === 0) return;
    if (pc === "") pc = 50;

    const { filterTarget, filterType } = options.treeOptions;

    // Find non-leaf child nodes
    const nodesWithChildren = node.children.filter(
      (child) => child.children && child.children.length > 0
    );

    // Sort based on target (reward or visits)
    const nodesToFilter = (filterType === "collapse" ? nodesWithChildren : node.children).toSorted(
      (a, b) => a.data.attributes[filterTarget] - b.data.attributes[filterTarget]
    );

    const splitIndex = Math.ceil(nodesToFilter.length * (Number(pc) / 100));

    const bottomHalf = nodesToFilter.slice(0, nodesToFilter.length - splitIndex);
    const topHalf = nodesToFilter.slice(-splitIndex);

    if (filterType === "highlight") {
      topHalf.forEach(highlightNode);
    }
    else if (filterType === "collapse") {
      bottomHalf.forEach(collapseNode);
    }
    topHalf.forEach((child) => applyFilter(child, pc));
  };

  const clearFilters = (node) => {
    node.highlight = undefined;
    if (node._children) {
      node.children = node._children;
      node._children = null;
    }
    if (!node.children || node.children.length === 0) return;
    node.children.forEach(clearFilters);
  };

  const highlightNode = (node) => {
    node.highlight = true;
  };

  const collapseNode = (node) => {
    node._children = node.children;
    node.children = null;
  };

  const { options, updateOptions, setGraphTypeOption } = useContext(OptionsContext);

  useEffect(() => {
    setIsCompact(options.treeOptions.size === "compact");
  }, [options.treeOptions.size]);

  useEffect(() => {
    if (options.treeOptions.applyFilter) {
      applyFilter(treeData, options.treeOptions.filterValue);
      setGraphTypeOption("tree", "applyFilter", false);
    } else if (options.treeOptions.clearFilters) {
      clearFilters(treeData);
      setGraphTypeOption("tree", "clearFilters", false);
    }
  }, [options.treeOptions.applyFilter, options.treeOptions.clearFilters]);

  return (
    <>
      {width > 0 && height > 0 && (
        <Drag width={width} height={height}>
          {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => (
            <svg width={width} height={height} onWheel={handleWheel}>
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#aaaaaa" strokeWidth="0.5" />
                </pattern>
              </defs>
              <Group fill="url(#grid)" style={{ transform: `scale(${scale})` }}>
                <rect
                  width={width / scale}
                  height={height / scale}
                  onMouseUp={dragEnd}
                  onMouseMove={dragMove}
                  onMouseDown={dragStart}
                  onMouseLeave={dragEnd}
                  cursor={isDragging ? "grabbing" : "grab"}
                />
                <Tree
                  root={treeData}
                  nodeSize={isCompact ? [15, 30] : [30, 60]}
                  separation={
                    isCompact
                      ? (a, b) => a.parent === b.parent ? 0.75 : 1.25
                      : (a, b) => a.parent === b.parent ? 1 : 1.5
                  }
                >
                  {(tree) => (
                    <Group top={margin.top + dy} left={margin.left + dx}>
                      {tree.links().map((link, i) => (
                        <LinkHorizontalStep
                          key={`link-${i}`}
                          data={link}
                          stroke="#000000"
                          fill="none"
                        />
                      ))}
                      {tree.descendants().map((node, i) => (
                        <Node
                          key={`node-${i}`}
                          node={node}
                          isCompact={isCompact}
                          forceUpdate={forceUpdate}
                        />
                      ))}
                    </Group>
                  )}
                </Tree>
              </Group>
            </svg>
          )}
        </Drag>
      )}
    </>
  );
};

export default TreeGraph;
