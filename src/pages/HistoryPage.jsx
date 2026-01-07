import React from "react";
import { useParams } from "react-router-dom";
import History from "./History";

export default function HistoryPage() {
  const { token } = useParams();
  return <History token={token} />;
}