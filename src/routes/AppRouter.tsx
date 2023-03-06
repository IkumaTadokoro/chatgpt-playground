import { BrowserRouter, Routes, Route } from "react-router-dom";
import ColumnMappingPlayGround from "../pages/ColumnMappingPlayGround/ColumnMappingPlayGround";
import CompleteSentence from "../pages/CompleteSentencePlayGround/CompleteSentencePlayGround";
import TransformCsv from "../pages/TransformCsvPlayGround/TransformCsvPlayGround";
import WhisperPlayGround from "../pages/WhisperPlayGround/WhisperPlayGround";
import WhisperWithSummary from "../pages/WhisperWithSummary/WhisperWithSummary";
import AppFrame from "./AppFrame";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppFrame />}>
          <Route path="/complete-sentence" element={<CompleteSentence />} />
          <Route path="/column-mapping" element={<ColumnMappingPlayGround />} />
          <Route path="/transform-csv" element={<TransformCsv />} />
          <Route path="/whisper" element={<WhisperPlayGround />} />
          <Route
            path="/Whisper-with-summary"
            element={<WhisperWithSummary />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
