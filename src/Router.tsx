import { Routes, Route } from "react-router-dom";
import {Home} from "./Home";
import {About} from "./About";
import {Gigs} from "./Gigs";
import {Media} from "./Media";
import {Contact} from "./Contact";



export function Router() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="gigs" element={<Gigs />} />
    <Route path="media" element={<Media />}/>
    <Route path="contact" element={<Contact />} />
  </Routes>;
}