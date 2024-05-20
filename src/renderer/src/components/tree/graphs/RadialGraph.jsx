import React, { useReducer } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { LinkRadialStep } from '@visx/shape';
import { pointRadial } from 'd3-shape';
import { Zoom } from '@visx/zoom';
import { localPoint } from '@visx/event';

function RadialGraph({ data, width, height }) {
  const margin = { top: 30, left: 30, right: 30, bottom: 70 };
  const stepPercent = 0.5;
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const origin = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };
  const sizeWidth = 2 * Math.PI;
  const sizeHeight = Math.min(innerWidth, innerHeight) / 2;

  const hasChildren = (node) => node.data.children && node.data.children.length > 0;

  return width < 10 ? null : (
    <Zoom width={width} height={height} scaleXMin={0.5} scaleXMax={4} scaleYMin={0.5} scaleYMax={4}>
      {(zoom) => (
        <div style={{ position: 'relative' }}>
          <svg width={width} height={height} ref={zoom.containerRef} style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab' }}>
            <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
            <rect width={width} height={height} fill="#272B4D" />
            <Group top={margin.top} left={margin.left}>
              <Tree root={hierarchy(data, (d) => (d.isExpanded ? null : d.children))} size={[sizeWidth, sizeHeight]} separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}>
                {(tree) => (
                  <Group top={origin.y} left={origin.x} transform={zoom.toString()}>
                    {tree.links().map((link, i) => (
                      <LinkRadialStep key={i} data={link} percent={stepPercent} stroke="rgb(254,110,158,0.6)" strokeWidth="1" fill="none" />
                    ))}

                    {tree.descendants().map((node, key) => {
                      const width = 40;
                      const height = 20;

                      const [radialX, radialY] = pointRadial(node.x, node.y);
                      const top = radialY;
                      const left = radialX;

                      return (
                        <Group top={top} left={left} key={key}>
                          {node.depth === 0 && (
                            <circle
                              r={12}
                              fill="url('#links-gradient')"
                              onClick={() => {
                                node.data.isExpanded = !node.data.isExpanded;
                                forceUpdate();
                              }}
                            />
                          )}
                          {node.depth !== 0 && (
                            <rect
                              height={height}
                              width={width}
                              y={-height / 2}
                              x={-width / 2}
                              fill="#272b4d"
                              stroke={hasChildren(node) ? '#03c0dc' : '#26deb0'}
                              strokeWidth={1}
                              strokeDasharray={hasChildren(node) ? '0' : '2,2'}
                              strokeOpacity={hasChildren(node) ? 1 : 0.6}
                              rx={hasChildren(node) ? 0 : 10}
                              cursor={hasChildren(node) ? "pointer" : "default"}
                              onClick={() => {
                                node.data.isExpanded = !node.data.isExpanded;
                                forceUpdate();
                              }}
                            />
                          )}
                          <text
                            dy=".33em"
                            fontSize={9}
                            fontFamily="Arial"
                            textAnchor="middle"
                            style={{ pointerEvents: 'none' }}
                            fill={node.depth === 0 ? '#71248e' : node.children ? 'white' : '#26deb0'}
                          >
                            {node.data.name}
                          </text>
                        </Group>
                      );
                    })}
                  </Group>
                )}
              </Tree>
            </Group>
            <rect
              width={width}
              height={height}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
              onDoubleClick={(event) => {
                const point = localPoint(event) || { x: 0, y: 0 };
                zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
              }}
            />
          </svg>
          {/* <div style={{ position: 'absolute', top: 10, left: 10 }}>
            <button onClick={zoom.center}>Center</button>
          </div> */}
        </div>
      )}
    </Zoom>
  );
}

export default RadialGraph;