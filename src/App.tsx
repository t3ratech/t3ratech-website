import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { WhatsAppGroups } from "./pages/WhatsAppGroups";
import { Nfts } from "./pages/Nfts";
import { GumroadProducts } from "./pages/GumroadProducts";
import { ChromeWebstore } from "./pages/ChromeWebstore";
import { Mcp } from "./pages/Mcp";
import "./styles.css";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="whatsapp-groups" element={<WhatsAppGroups />} />
          <Route path="nfts" element={<Nfts />} />
          <Route path="gumroad" element={<GumroadProducts />} />
          <Route path="chrome" element={<ChromeWebstore />} />
          <Route path="mcp" element={<Mcp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
