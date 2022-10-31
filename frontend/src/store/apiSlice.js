import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUri = 'https://expense-tracker-24.herokuapp.com';

export const apiSlice= createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseUri}),
    endpoints:builder=>({
        //get categories
        getCategories:builder.query({
            query:()=>'/api/categories',
            providesTags:["categories"]
        }),

        //get labels
        getLabels:builder.query({
            query:()=>'/api/labels',
            providesTags:["transaction"]

        }),

        // add new transaction
        addTransaction:builder.mutation({
            query:(initialTransaction)=>({
                url:'/api/transaction',
                method:"POST",
                body:initialTransaction
            }),
            invalidatesTags:['transaction']
        }),

        //delete Record
        deleteTransaction:builder.mutation({
            query:recordid=>({
                url:'/api/transaction',
                method:"DELETE",
                body:recordid
            })
        })
    })
})

export default apiSlice;