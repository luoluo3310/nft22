import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { MintButtonWithCounterAndModal } from "../components/MintButton"
import Image from 'next/image';
import Head from 'next/head';
const Home: NextPage = () => {
  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <Head>
        <link href="/PUG.woff" rel="stylesheet" type="font/woff" />
      </Head>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <ConnectButton label="Connet Wallet" />

      </div>

      xs
      <div style={{ height: '5px' }}></div> {/* 添加一个空白的 div */}


      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
        <div>
          <Image alt="Description of the image" src="/PUG.jpg" width={451} height={154} /> {/* 路径和尺寸根据实际情况调整 */}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '800px', textAlign: 'center' }}>
          <p  style={{  color: '#e8bb41', fontFamily: 'PUG' }}>As the first NFT collection launched on BSC using the 404 protocol, we aim to provide a unique gas experience and take the 404 protocol to the extreme.</p>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center', // 水平居中
        alignItems: 'center', // 垂直居中
        padding: 12,
      }}>

        <MintButtonWithCounterAndModal />

      </div>



    </div>
  );
};

export default Home;
