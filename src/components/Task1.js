import { Center } from "@chakra-ui/react";
import axios from "axios";
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const Task1 = () => {
  const [organization, setOrganization] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [colors,seColors] = React.useState([]);
  while (colors.length < 50) {
    do {
      var color = Math.floor(Math.random() * 1000000 + 1);
    } while (colors.indexOf(color) >= 0);
    colors.push("#" + ("000000" + color.toString(16)).slice(-6));
  }
  React.useEffect(() => {
    axios
      .get("https://mdsa.bipad.gov.np/api/v1/organization")
      .then((response) => {
        setOrganization(response.data.results.splice(0, 50));
      });
    axios.get("https://mdsa.bipad.gov.np/api/v1/project").then((response) => {
      setProjects(response.data.results);
    });
  }, []);

  const data = useMemo(
    () =>
      organization?.map((o) => {
        return {
          name: o.oname,
          value: projects.filter((p) => p.oid === o.oid).length,
        };
      }),
    [organization, projects]
  );

  return (
    <Center>
      <PieChart width={1200} height={800}>
        <Pie
          dataKey="value"
          data={data}
          cx={500}
          cy={250}
          innerRadius={170}
          outerRadius={200}
          fill="#82ca9d"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Center>
  );
};

export default Task1;
