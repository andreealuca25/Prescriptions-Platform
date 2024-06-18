import { useState, useEffect } from "react";
import ReactFlow, { ConnectionLineType } from "react-flow-renderer";
import dagre from "dagre";
import Cookies from "js-cookie";

/*Code adapted from: https://reactflow.dev/docs/examples/layout/dagre/ */
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

function MedicalDrugsGraph() {
  const [initialNodes, setInitialNode] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );
  useEffect(() => {
    fetch("http://localhost:3001/getAllMedications", {
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Expose-Headers": "id-patient",
        "Access-Control-Expose-Headers": "auth-token",
        "auth-token": Cookies.get("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const initialNodes = [];
        const initialEdges = [];
        let x = 0,
          y = 0;
        data.answer.medicalDrugs.map((drug) => {
          let obj = {
            id: drug,
            data: { label: drug },
            position: { x: x, y: y },
          };
          x += 100; //change position for node
          y += 100;
          initialNodes.push(obj);
        });
        setInitialNode(initialNodes);

        data.answer.sourceTarget.map((st) => {
          let obj = {
            id: st,
            source: st.split("-")[0],
            target: st.split("-")[1],
            animated: true,
            style: { stroke: "black" },
          };
          initialEdges.push(obj);
        });

        setInitialEdges(initialEdges);
      });
  }, []);

  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    />
  );
}

export default MedicalDrugsGraph;
