import React, { useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Group } from "@visx/group";
import { Tree, hierarchy } from "@visx/hierarchy";
import { LinkHorizontalStep } from "@visx/shape";
import { Drag } from "@visx/drag";
import OptionsContext from "../../../OptionsContext";

const peach = "#fd9b93";
const pink = "#fe6e9e";
const blue = "#03c0dc";
const green = "#26deb0";
const plum = "#71248e";
const lightpurple = "#374469";
const white = "#ffffff";
export const background = "#272b4d";

function RootNode({ node }) {
  return (
    <Group top={node.x} left={node.y}>
      <circle className="circle-node" r={12} fill={background} />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill={white}
      >
        {node.data.attributes.reward}
      </text>
    </Group>
  );
}

function ParentNode({ node, forceUpdate }) {
  const collapseNode = () => {
    node._children = node.children;
    node.children = null;
    forceUpdate();
  };

  return (
    <Group top={node.x} left={node.y}>
      <circle
        className="circle-node"
        r={12}
        fill={white}
        stroke={lightpurple}
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
        {node.data.attributes.reward}
      </text>
    </Group>
  );
}

function CollapsedNode({ node, forceUpdate }) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;

  const expandNode = () => {
    node.children = node._children;
    node._children = null;
    forceUpdate();
  };

  return (
    <Group top={node.x} left={node.y}>
      <rect
        className="rect-node"
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={white}
        stroke={lightpurple}
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
        {node.data.attributes.reward}
        <tspan dx={2} dy={1} fontSize={14}>
          {"»"}
        </tspan>
      </text>
    </Group>
  );
}

function LeafNode({ node }) {
  return (
    <Group top={node.x} left={node.y}>
      <circle
        className="circle-node"
        r={12}
        fill={white}
        stroke={lightpurple}
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
        {node.data.attributes.reward}
      </text>
    </Group>
  );
}

/** Handles rendering Root, Parent, and other Nodes. */
function Node({ node, forceUpdate }) {
  const isRoot = node.depth === 0;
  const isParent = !!(node.children || node._children);

  if (isRoot) return <RootNode node={node} />;
  if (isParent)
    return node.children ? (
      <ParentNode node={node} forceUpdate={forceUpdate} />
    ) : (
      <CollapsedNode node={node} forceUpdate={forceUpdate} />
    );
  return <LeafNode node={node} />;
}

const TreeGraph = ({ data, width, height }) => {
  const treeData = useMemo(() => hierarchy(data), [data]);

  // hacky fix to update the tree quicker when expanding/collapsing nodes
  // react is very slow to re-render the tree otherwise
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const margin = { top: 10, left: 80, right: 80, bottom: 10 };

  const rewardFilter = (node) => {
    if (!node.children || node.children.length === 0) return;

    // Find child nodes with their own children
    const nodesWithChildren = node.children.filter(
      (child) => child.children && child.children.length > 0
    );
    // Sort based on reward
    nodesWithChildren.sort((a, b) => a.data.attributes.reward - b.data.attributes.reward);
    const midpoint = Math.floor(nodesWithChildren.length / 2);

    const bottomHalf = nodesWithChildren.slice(0, midpoint);
    const topHalf = nodesWithChildren.slice(midpoint);

    bottomHalf.forEach(collapseNode);
    topHalf.forEach(rewardFilter);
  };

  const collapseNode = (node) => {
    node._children = node.children;
    node.children = null;
  };

  const { options, updateOptions } = useContext(OptionsContext);

  useEffect(() => {
    if (options.enableFilter) {
      rewardFilter(treeData);
      updateOptions({ enableFilter: false });
    }
  }, [options.enableFilter]);

  return (
    <>
      {width > 0 && height > 0 && (
        <Drag width={width} height={height}>
          {({ dragStart, dragEnd, dragMove, isDragging, x, y, dx, dy }) => (
            <svg width={width} height={height}>
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#aaaaaa" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect
                width={width}
                height={height}
                fill="url(#grid)"
                onMouseUp={dragEnd}
                onMouseMove={dragMove}
                onMouseDown={dragStart}
                onMouseLeave={dragEnd}
                cursor={isDragging ? "grabbing" : "grab"}
              />
              <Tree
                root={treeData}
                nodeSize={[30, 60]}
                separation={(a, b) => {
                  return a.parent === b.parent ? 1 : 1.5;
                }}
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
                      <Node key={`node-${i}`} node={node} forceUpdate={forceUpdate} />
                    ))}
                  </Group>
                )}
              </Tree>
            </svg>
          )}
        </Drag>
      )}
    </>
  );
};

export default TreeGraph;
