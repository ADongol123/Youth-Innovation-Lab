import "./App.css";
import React, { useState } from "react";
import Task1 from "./components/Task1";
import Task2 from "./components/Task2";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
function App() {
  const [state, setState] = useState();
  return (
    <Tabs isLazy>
      <TabList h="10vh" margin="auto" width="50%">
        <Tab>Task 1</Tab>
        <Tab>Task 2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Task1 />
        </TabPanel>
        <TabPanel>
          <Task2 />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
