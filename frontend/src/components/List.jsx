import React from 'react';
import 'boxicons';
import {default as api} from '../store/apiSlice';


const List = () => {

  const {data,isFetching,isSuccess,isError}  = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  let transactions;

  const handleClick = (e)=>{
    if(!e.target.dataset.id)return 0;
    deleteTransaction({_id:e.target.dataset.id})
  }

  if(isFetching){
    transactions = <div>Fetching</div>
  }else if(isSuccess){
      transactions = data.map((v,i)=> <Transaction key={i} category={v}  handler={handleClick}></Transaction>)
  }else if(isError){
    transactions = <div>Error</div>
  }



  return (
    <div className="flex flex-col py-6 gap-3 history-box">
        <h1 className='py-4 font-bold text-xl add-transaction'>History</h1>
        {transactions}
    </div>
  )
}
export default List

function Transaction({category,handler}){
    if(!category)return null;
    return(
        <div className='item flex justify-center bg-gray-50 py-2 rounded-4 histories' style={{borderRight:`8px solid ${category.color ?? "#e5e5e5"}`,boxShadow:`0 1px 1px ${category.color ?? "red"}`}}>
            <button className='px-3' onClick={handler} ><box-icon data-id={category._id??""} name="trash" size="15px" color={category.color ?? "#e5e5e5"}></box-icon></button>
            <span className='block w-full'>{category.name ?? ""}</span>
        </div>
    )
}