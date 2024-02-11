import React, { useState } from 'react';
import { PUGContractConfig } from "../ABI/PUG";
import MaxMintedIdReader from "./MaxMintedIdReader";
import { ethers } from 'ethers';

// 声明 window 对象的 ethereum 属性的类型
declare global {
    interface Window {
      ethereum?: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc;
    }
  }

export const MintButtonWithCounterAndModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(1);
    const amountToSendInWei = ethers.utils.parseEther("0.01"); // 转换为以太币数量

    const bigCount = BigInt(count);

    const handleMint = async () => {
        setIsLoading(true); // 设置加载状态为 true
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const totalAmount = amountToSendInWei.mul(count); // 使用 mul 方法进行乘法运算

            try {
                const contract = new ethers.Contract(PUGContractConfig.addressOrName, PUGContractConfig.abi, signer);
                const overrides = {
                    value: totalAmount // 设置发送的以太币数量
                };
                await contract.mintWithPayment(bigCount, overrides); // 调用合约的 mintWithPayment 函数
                console.log("Minting successful"); // 输出成功消息
            } catch (error) {
                console.error("Error minting:", error); // 输出错误消息

            }


            finally {
                setIsLoading(false); // 重置加载状态为 false
            }
        };
    }
    const incrementCount = () => {
        setCount(prevCount => Math.min(prevCount + 1, 5));
    };

    const decrementCount = () => {
        setCount(prevCount => Math.max(prevCount - 1, 1));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button
                    onClick={decrementCount}
                    style={{ backgroundColor: '#e8bb41', lineHeight: '0.5rem' }}
                    className="px-2 py-1 rounded-xl w-10 h-5"
                >
                    -
                </button>

                <input
                    type="text"
                    value={count}
                    onChange={e => setCount(parseInt(e.target.value))}
                    min={1}
                    max={5}
                    style={{ backgroundColor: 'black', color: '#e8bb41', fontWeight: 'bold', textAlign: 'center', borderColor: 'black', fontSize: '1.5rem' }}
                    className="px-2 py-1 border border-gray-300 rounded-md w-20"
                />

                <button
                    onClick={incrementCount}
                    style={{ backgroundColor: '#e8bb41', lineHeight: '0.5rem' }}
                    className="px-2 py-1 rounded-xl w-10 h-5"
                >
                    +
                </button>
            </div>
            <div>
                <MaxMintedIdReader />
            </div>
            <div style={{ height: '15px' }}></div> {/* 添加一个空白的 div */}

            <button
                onClick={handleMint} // 将处理函数绑定到按钮的点击事件上
                disabled={isLoading}
                style={{
                    width: '450px',
                    height: '60px',
                    borderRadius: '30px',
                    backgroundColor: '#e8bb41',
                    fontSize: '24px', // 设置字体大小为32像素
                    color: 'black' // 设置字体颜色为黑色
                }}
                className="text-white py-2 px-4 shadow-md hover:bg-yellow-400 transition duration-300"
            >
                {isLoading ? "Minting..." : "Mint"}
            </button>
        </div>
    );
};
