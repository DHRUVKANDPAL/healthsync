import * as React from 'react';
import { PageClientImpl } from './PageClientImpl';
import { isVideoCodec } from '@/lib/types';
import "../../../styles/main.module.css";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";
export default function Page({
  params,
  searchParams,
}: {
  params: { roomName: string };
  searchParams: {
    region?: string;
    hq?: string;
    codec?: string;
  };
}) {
  const codec =
    typeof searchParams.codec === 'string' && isVideoCodec(searchParams.codec)
      ? searchParams.codec
      : 'vp9';
  const hq = searchParams.hq === 'true' ? true : false;
  // console.log(params.roomName) 
  return (
    <div className='h-screen'>
      <PageClientImpl
        roomName={params.roomName}
        region={searchParams.region}
        hq={hq}
        codec={codec}
      />
    </div>
  );
}
