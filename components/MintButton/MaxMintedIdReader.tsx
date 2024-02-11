import React, { useState, useEffect } from 'react';
//import provider from WagmiConfig;
import { ethers } from 'ethers';
import { WagmiConfig } from 'wagmi';

const MaxMintedIdReader = () => {
    const [maxMintedId, setMaxMintedId] = useState<number | null>(null);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

    // 创建一个 ethers.js Provider 对象，并设置其连接到 BSC 主网的 URL
    const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');

    // 读取链上数据的函数
    const fetchData = async () => {
        try {
            // 获取合约实例
            const contractAddress = '0x8d089B9d20c5a6616816d64F9D38f09f50cc9557';
            const contractABI = ['function maxMintedId() view returns (uint256)'];
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            // 调用合约方法获取 maxMintedId 数据
            const maxMintedIdData = await contract.maxMintedId();

            // 更新状态
            setMaxMintedId(maxMintedIdData.toNumber());
            setIsLoadingData(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoadingData(false);
        }
    };

    // 在组件加载时调用 fetchData 函数
    useEffect(() => {
        fetchData();
    }, []);

    if (isLoadingData) {
        return <div>Loading...</div>;
    }

    if (maxMintedId !== null) {
        return (
            <div>
                <p style={{ color: '#e8bb41' }}>Minted: {maxMintedId} / 10000</p>
            </div>
        );
    }

    return <div>No data available</div>;
};

export default MaxMintedIdReader;
