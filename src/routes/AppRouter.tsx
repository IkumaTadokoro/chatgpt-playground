import { BrowserRouter, Routes, Route } from "react-router-dom";
import ColumnMappingPlayGround from "../pages/ColumnMappingPlayGround/ColumnMappingPlayGround";
import CompleteSentence from "../pages/CompleteSentencePlayGround/CompleteSentencePlayGround";
import TransformCsv from "../pages/TransformCsvPlayGround/TransformCsvPlayGround";
import AppFrame from "./AppFrame";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppFrame />}>
          <Route path="/complete-sentence" element={<CompleteSentence />} />
          <Route path="/column-mapping" element={<ColumnMappingPlayGround />} />
          <Route path="/transform-csv" element={<TransformCsv />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
