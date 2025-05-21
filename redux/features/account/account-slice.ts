import { filterLastMonth } from '@/domains/account/utils/filter-last-month';
import { generateRandomColor } from '@/shared/utils/generateRandomColor';
import { createSlice } from "@reduxjs/toolkit";
import { accountSliceInitialState as initialState } from './account-slice.constants';
import { IChartData } from "./account-slice.types";
import { buildCases } from "./extra-reducers";



export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    reduceStatements: (state) => {
      const lastMonthData = filterLastMonth(state.currentAccount?.statements!)

      state.accountChartData = lastMonthData.reduce<IChartData[]>((acc, item) => {
        const existing = acc.find(i => {
          return i.name === item.category
        });

        if (existing) {
          existing.total += Math.abs(item.value);
        } else {
          acc.push({
            name: item.category,
            total: Math.abs(item.value),
            color: generateRandomColor(),
            legendFontColor: '#2d2d2d',
            legendFontSize: 16,
          });
        }
        return acc;
      }, []) || [];
    }
  },
  extraReducers: buildCases
})

export const {
  reduceStatements,
} = accountSlice.actions

export default accountSlice.reducer
