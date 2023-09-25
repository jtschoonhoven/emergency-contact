import React from "react";
import { useParams } from "react-router-dom";

interface RecordingType {
  title: string;
}

const RECORDINGS: RecordingType[] = [{ title: "Hello, world!" }];

const Recording: React.FC = () => {
  const { recordIndex: recordIndexStr } = useParams();
  let idx: number;

  // Validate that the index from `useParams` matches a real recording
  if (typeof recordIndexStr === "undefined") {
    console.error("Recording index is undefined");
    throw new Response("Not Found", { status: 404 });
  }
  try {
    idx = parseInt(recordIndexStr, 10);
  } catch (err) {
    console.error("Recording index is not an integer");
    throw new Response("Not Found", { status: 404 });
  }
  if (typeof idx !== "number" || idx < 0 || idx >= RECORDINGS.length) {
    console.error("Recording index is out of bounds");
    throw new Response("Not Found", { status: 404 });
  }

  const recording = RECORDINGS[idx];

  return (
    <>
      <p>Recording: {recording.title}</p>
    </>
  );
};

export default Recording;
