import { useState } from "react"
import Tabs from '@mui/material/Tabs'
import { Tab } from "@mui/material"
import Todolist from "./Todolist"
import Home from "./Home"

export default function MuiTabs() {
    const [tabIndex, setIndex] = useState(0);

    return (
        <>
            <Tabs value={tabIndex} onChange={(_e, eventIndex) => setIndex(eventIndex)}>
                <Tab label="Home" />
                <Tab label="List" />
            </Tabs>

            {tabIndex === 0 && <Home /> || tabIndex === 1 && <Todolist />}
        </>
    )
}
    
