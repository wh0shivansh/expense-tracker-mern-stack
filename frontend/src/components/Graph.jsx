import React from 'react';
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Labels from './Labels';
import {chartData, getTotal} from '../helper/helper';
import {default as api} from '../store/apiSlice';

Chart.register(ArcElement);

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };


const graph = () => {

    const {data,isFetching,isSuccess,isError}  = api.useGetLabelsQuery();
    let graphData;
  
  
    if(isFetching){
      graphData = <div>Fetching</div>
    }else if(isSuccess){
        chartData(data);
        graphData = <Doughnut {...chartData(data)}></Doughnut>
    }else if(isError){
      graphData = <div>Error</div>
    }

    return (
        <div className='flex justify-content max-w-xs mx-auto'>
            <div className="item">
                <div className="chart relative">
                    {graphData}
                    <h3 className='mb-4 font-bold title'>
                    <span className='block text-3-xl'>{"₹"+getTotal(data)}</span></h3>
                </div>

                <div className="flex flex-col py-10 gap-4">
                    {/* LABELS  */}
                    <Labels />
                </div>
            </div>
        </div>
    )
}

export default graph