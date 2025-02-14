"use client";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import {
  encodePassphrase,
  generateRoomId,
  randomString,
} from "@/lib/client-utils";

function Tabs({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="w-full flex justify-center p-4">
      <DemoMeetingTab label="Demo" />
    </div>
  );
}

function DemoMeetingTab({ label }: { label: string }) {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));

  const startMeeting = () => {
    if (e2ee) {
      router.push(
        `/rooms/${generateRoomId()}#${encodePassphrase(sharedPassphrase)}`
      );
    } else {
      router.push(`/rooms/${generateRoomId()}`);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 flex flex-col items-center gap-4">
      <p className="text-lg font-semibold">HealthSync VideoCall Demo</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={startMeeting}
      >
        Start Meeting
      </button>
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center gap-2">
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="use-e2ee" className="text-sm">
            Enable end-to-end encryption
          </label>
        </div>
        {e2ee && (
          <div className="flex flex-col gap-2">
            <label htmlFor="passphrase" className="text-sm">
              Passphrase
            </label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
              className="border px-3 py-2 rounded-lg w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <Suspense fallback="Loading">
        <Tabs>
          <DemoMeetingTab label="Demo" />
        </Tabs>
      </Suspense>
    </main>
  );
}
