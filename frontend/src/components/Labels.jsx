import React from 'react';
import {default as api} from '../store/apiSlice';
import { getLabels } from '../helper/helper';



export default function Labels(){

  const {data,isFetching,isSuccess,isError}  = api.useGetLabelsQuery();
  let transactions;


  if(isFetching){
    transactions = <div>Fetching</div>
  }else if(isSuccess){
      transactions = getLabels(data,'type').map((v,i)=> <LabelComponents key={i} data={v}></LabelComponents>)
  }else if(isError){
    transactions = <div>Error</div>
  }

  return (
    <>
      {transactions}
    </>
  )
}

function LabelComponents({data}){
  if(!data) return <></>;
  return(
      <div className='labels flex justify-between'>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded py-3" style={{background:data.color ?? "#fcd9c74f"}}></div>
          <h3 className='text-md text-gray-50 text-labels'>{data.type ?? ""}</h3>
        </div>
        <h3 className='font-bold'  style={{color:data.color ?? "#feffff"}}>{`${Math.round(data.percent)}`??0}%</h3>
      </div>
  )
}

